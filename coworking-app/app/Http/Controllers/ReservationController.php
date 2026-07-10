<?php

namespace App\Http\Controllers;
use App\Http\Controllers\InvoiceController;
use App\Models\Reservation;
use App\Models\Space;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
{
    $user = auth()->user();
    $isAdminOrManager = $user->isAdmin() || $user->isManager();

    if ($isAdminOrManager) {
        $query = Reservation::with(['user', 'space'])->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('start_time', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('start_time', '<=', $request->date_to);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $reservations = $query->get();

    } else {
        $reservations = Reservation::with('space')
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }

    return Inertia::render('Reservations/Index', [
        'reservations' => $reservations,
        'auth'         => ['user' => $user],
        'filters'      => $request->only(['status', 'date_from', 'date_to', 'search']),
    ]);
}

public function create(Request $request)
{
    if (!$request->query('space_id')) {
        return redirect()->route('spaces.index');
    }

    $space = Space::findOrFail($request->query('space_id'));
    $equipments = \App\Models\Equipment::where('is_active', true)->get();

    // Si l'espace est un open space, on calcule les places occupées.
    // Si un créneau précis est fourni en query string, on l'utilise (cas futur d'un filtre live).
    // Sinon, on prend une fenêtre large (aujourd'hui → +30 jours) pour donner
    // un aperçu visuel des places déjà prises, même sans créneau encore choisi.
    $occupiedSeats = [];
    if ($space->is_open_space) {
        $start = $request->query('start')
            ? Carbon::parse($request->query('start'))
            : Carbon::now();

        $end = $request->query('end')
            ? Carbon::parse($request->query('end'))
            : Carbon::now()->addDays(30);

        $occupiedSeats = $space->getOccupiedSeats($start, $end);
    }

    return Inertia::render('Reservations/Create', [
        'space'         => $space,
        'equipments'    => $equipments,
        'occupiedSeats' => $occupiedSeats,
        'auth'          => ['user' => auth()->user()->load('abonnementActif.plan')],
    ]);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'space_id'       => 'required|exists:spaces,id',
        'start_datetime' => 'required|date|after:now',
        'end_datetime'   => 'required_if:type,heure|nullable|date|after:start_datetime',
        'type'           => 'required|in:heure,demi-journee',
        // seat_number obligatoire uniquement si l'espace est un open space
        'seat_number'    => 'nullable|integer|min:1',
    ]);

    $start = Carbon::parse($validated['start_datetime']);
    $end = $validated['type'] === 'heure'
        ? Carbon::parse($validated['end_datetime'])
        : $start->copy()->addHours(4);

    $space = Space::findOrFail($validated['space_id']);

    // Validation open space — place obligatoire
    if ($space->is_open_space && empty($validated['seat_number'])) {
        return back()->withErrors([
            'seat_number' => 'Veuillez choisir une place pour cet open space.',
        ]);
    }

    // Validation open space — place dans la capacité
    if ($space->is_open_space && $validated['seat_number'] > $space->capacity) {
        return back()->withErrors([
            'seat_number' => 'Cette place n\'existe pas dans cet espace.',
        ]);
    }

    $seatNumber = $space->is_open_space ? $validated['seat_number'] : null;

    if (Reservation::hasConflict(
        $validated['space_id'],
        $start,
        $end,
        null,
        $seatNumber
    )) {
        return back()->withErrors([
            'start_datetime' => $space->is_open_space
                ? 'Cette place est déjà réservée sur ce créneau.'
                : 'Ce créneau est déjà réservé pour cet espace.',
        ]);
    }

    $totalPrice = match($validated['type']) {
        'heure'        => $space->price_par_heure * $start->diffInHours($end),
        'demi-journee' => $space->price_par_demi_journee ?? ($space->price_par_heure * 4),
    };

    $reduction = auth()->user()->getReductionTarif();
    if ($reduction > 0) {
        $totalPrice = $totalPrice * (1 - ($reduction / 100));
    }

    Reservation::create([
        'user_id'     => auth()->id(),
        'space_id'    => $validated['space_id'],
        'start_time'  => $start,
        'end_time'    => $end,
        'type'        => $validated['type'],
        'status'      => 'pending',
        'total_price' => $totalPrice,
        'seat_number' => $seatNumber,
    ]);

    return redirect()->route('reservations.index')
        ->with('success', 'Réservation effectuée avec succès !');
}


    public function cancel(Reservation $reservation)
    {

        if (!auth()->user()->isAdmin() && $reservation->user_id !== auth()->id()) {
            abort(403);
        }

        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('reservations.index')
            ->with('success', 'Réservation annulée.');
    }

   public function confirm(Reservation $reservation)
{
    $reservation->update(['status' => 'confirmed']);

    InvoiceController::sendConfirmationEmail($reservation);

    return redirect()->route('reservations.index')
        ->with('success', 'Réservation confirmée.');
}

public function edit(Reservation $reservation)
{
    //Seul le propriétaire peut modifier sa reservation

    if($reservation->user_id !== auth()->id()){
        abort(403);
    }

    //Seul les reservations en attente peuvent etre modifiées
    if($reservation->status !== 'pending'){
        return redirect()->route('reservations.index')
        ->with('error', 'Seules les réservations en attente peuvent être modifiées.');
    }
    
    //On change l'espace lié à la réservation
    $reservation->load('space');

    //On recupere tous les espaces
    $spaces = Space::all();

    return Inertia::render('Reservations/Edit', [
        'reservation' => $reservation,
        'spaces' => $spaces,
        'auth' => ['user' => auth()->user()->load('abonnementActif.plan')],
    ]);

    
}

public function update(Request $request, Reservation $reservation)
{
    // Seul le propriétaire peut modifier sa réservation
    if ($reservation->user_id !== auth()->id()) {
        abort(403);
    }

    // On ne peut modifier qu'une réservation en attente
    if ($reservation->status !== 'pending') {
        return redirect()->route('reservations.index')
            ->with('error', 'Seules les réservations en attente peuvent être modifiées.');
    }

    $validated = $request->validate([
        'space_id'       => 'required|exists:spaces,id',
        'start_datetime' => 'required|date|after:now',
        'end_datetime'   => 'required_if:type,heure|nullable|date|after:start_datetime',
        'type'           => 'required|in:heure,demi-journee',
    ]);

    $start = Carbon::parse($validated['start_datetime']);

    $end = $validated['type'] === 'heure'
        ? Carbon::parse($validated['end_datetime'])
        : $start->copy()->addHours(4);
    // Même logique que store() :
    // mode heure → on utilise end_datetime du client
    // mode demi-journee → serveur calcule +4h

    // On vérifie les conflits en EXCLUANT la réservation actuelle
    // sans ce paramètre, la réservation confliquerait avec elle-même
    if (Reservation::hasConflict($validated['space_id'], $start, $end, $reservation->id)) {
        return back()->withErrors([
            'start_datetime' => 'Ce créneau est déjà réservé pour cet espace.',
        ]);
    }

    $space = Space::findOrFail($validated['space_id']);

    // Recalcul du prix selon le nouveau créneau et le nouvel espace
    $totalPrice = match($validated['type']) {
        'heure'        => $space->price_par_heure * $start->diffInHours($end),
        'demi-journee' => $space->price_par_demi_journee ?? ($space->price_par_heure * 4),
    };

    // On applique la réduction si l'utilisateur a un abonnement actif
    $reduction = auth()->user()->getReductionTarif();
    if ($reduction > 0) {
        $totalPrice = $totalPrice * (1 - ($reduction / 100));
    }

    $reservation->update([
        'space_id'    => $validated['space_id'],
        'start_time'  => $start,
        'end_time'    => $end,
        'type'        => $validated['type'],
        'total_price' => $totalPrice,
        // Le status reste 'pending' — on ne le touche pas
    ]);

    return redirect()->route('reservations.index')
        ->with('success', 'Réservation modifiée avec succès !');
}

}
