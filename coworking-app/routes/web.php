<?php
use Carbon\Carbon;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AbonnementController;
use Inertia\Inertia;

// On importe tous les controllers nécessaires.
// ProfileController vient de Breeze — on le garde.

// -----------------------------------------------
// ROUTES PUBLIQUES
// -----------------------------------------------

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        // On garde les props existantes de Breeze
        // qui permettent d'afficher les boutons
        // Login/Register sur la page d'accueil.
    ]);
});

Route::get('/access/{qr_token}', [App\Http\Controllers\AccessController::class, 'verify'])
    ->name('access.verify');

// -----------------------------------------------
// ROUTES AUTHENTIFIÉES (tous les rôles)
// -----------------------------------------------

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        $user = auth()->user();
        $stats = [];


        if (in_array($user->role,['admin', 'manager'])) {
            $today = Carbon::today();

            $stats['reservations_today'] = \App\Models\Reservation::whereDate('start_time', $today)
            ->count();

            $stats['spaces_count'] = \App\Models\Space::count();

            $stats['monthly_revenue'] = \App\Models\Reservation::where('status', 'confirmed')
            ->whereMonth('start_time', $today->month)
            ->whereYear('start_time', $today->year)
            ->join('spaces', 'reservations.space_id', '=', 'spaces.id')
            ->sum('spaces.price_par_demi_journee');
        }

        if ($user->role === 'member') {

            $stats['abonnement_actif'] = $user->hasAbonnementActif(); 
        }
        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'stats' => $stats,
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');

    // --- PROFIL (routes Breeze — on les garde) ---
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    // --- ESPACES (lecture seule pour tous) ---
    Route::get('/spaces', [SpaceController::class, 'index'])
        ->name('spaces.index');
    // Un client peut consulter les espaces
    // disponibles pour faire une réservation.

    // --- RÉSERVATIONS (tous les rôles connectés) ---
    Route::get('/reservations', [ReservationController::class, 'index'])
        ->name('reservations.index');
    // Le controller filtre automatiquement selon
    // le rôle : admin voit tout, client voit le sien.

    Route::patch('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel'])
        ->name('reservations.cancel');
    Route::get('/reservations/{reservation}/invoice', [InvoiceController::class, 'download'])
        ->name('reservations.invoice');
    // PATCH car on modifie partiellement la
    // réservation (uniquement le statut).

    // --- RÉSERVATIONS (clients et membres uniquement) ---
    Route::middleware(['role:client,member'])->group(function () {
        Route::get('/reservations/create', [ReservationController::class, 'create'])
            ->name('reservations.create');
        // Formulaire de nouvelle réservation.

        Route::post('/reservations', [ReservationController::class, 'store'])
            ->name('reservations.store');
        // On protège aussi le store — un admin ne doit
        // pas pouvoir poster une réservation non plus.
         // Abonnements
    Route::get('/abonnements', [AbonnementController::class, 'index'])
        ->name('abonnements.index');
    Route::post('/abonnements', [AbonnementController::class, 'store'])
        ->name('abonnements.store');
    });
});

// -----------------------------------------------
// ROUTES ADMIN / MANAGER UNIQUEMENT
// Double protection : auth + role middleware.
// -----------------------------------------------
Route::middleware(['auth', 'verified', 'role:admin,manager'])->group(function () {

    // --- GESTION DES ESPACES (CRUD admin) ---
    Route::get('/spaces/create', [SpaceController::class, 'create'])
        ->name('spaces.create');

    Route::get('/spaces/{space}', [SpaceController::class, 'show'])
        ->name('spaces.show');

    Route::post('/spaces', [SpaceController::class, 'store'])
        ->name('spaces.store');

    Route::get('/spaces/{space}/edit', [SpaceController::class, 'edit'])
        ->name('spaces.edit');

    Route::put('/spaces/{space}', [SpaceController::class, 'update'])
        ->name('spaces.update');
    // PUT = mise à jour complète de la ressource.

    Route::delete('/spaces/{space}', [SpaceController::class, 'destroy'])
        ->name('spaces.destroy');

    // --- CONFIRMATION RÉSERVATION (admin/manager) ---
    Route::patch('/reservations/{reservation}/confirm', [ReservationController::class, 'confirm'])
        ->name('reservations.confirm');
    // Seul l'admin/manager peut confirmer une réservation.
});

// Routes d'authentification générées par Breeze :
// /login, /register, /logout, /forgot-password...
require __DIR__.'/auth.php';

Route::post('/test-upload', function (\Illuminate\Http\Request $request) {
    file_put_contents(storage_path('logs/test-upload.log'), json_encode([
        'all'       => $request->all(),
        'files'     => $request->allFiles(),
        'has_image' => $request->hasFile('image')
    ]));
    return response()->json(['success' => true]);
})->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);