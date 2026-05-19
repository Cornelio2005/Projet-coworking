<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Space;
use Inertia\Inertia;

class SpaceController extends Controller
{
    public function index(Request $request)
{
    $query = \App\Models\Space::query();

    // Filtre par type d'espace
    if ($request->filled('type')) {
        $query->where('type', $request->type);
    }

    // Filtre par capacité minimale
    if ($request->filled('capacite_min')) {
        $query->where('capacity', '>=', (int) $request->capacite_min);
    }

    // Filtre par date — on exclut les espaces qui ont
    // déjà une réservation pending ou confirmed ce jour-là
    if ($request->filled('date')) {
        $query->whereDoesntHave('reservations', function ($q) use ($request) {
            $q->whereDate('start_time', $request->date)
              ->whereIn('status', ['pending', 'confirmed']);
        });
    }

    $spaces = $query->get();

    return \Inertia\Inertia::render('Spaces/Index', [
        'spaces'  => $spaces,
        'filters' => $request->only(['type', 'capacite_min', 'date']),
        // On renvoie les filtres actifs pour pré-remplir
        // les champs du formulaire côté React.
    ]);
}

    public function create()
    {
        return \Inertia\Inertia::render('Spaces/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name'                   => 'required|string|max:255',
        'description'            => 'required|string',
        'type'                   => 'required|in:bureau_individuel,bureau_partage,salle_reunion,espace_detente',
        'capacity'               => 'required|integer|min:1',
        'price_par_heure'        => 'required|numeric|min:0',
        'price_par_demi_journee' => 'required|numeric|min:0',
        'is_available'           => 'boolean',
        'image'                  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('spaces', 'public');
    }

    Space::create($validated);

    return redirect()->route('spaces.index')
        ->with('success', 'Espace créé avec succès !');
}

    public function edit(\App\Models\Space $space)
    {
        return \Inertia\Inertia::render('Spaces/Edit', [
            'space' => $space,
        ]);
    }

    public function update(Request $request, \App\Models\Space $space)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'capacity' => 'required|integer|min:1',
            'price_par_heure' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        $space->update($validated);

        return redirect()->route('spaces.index')->with('success', 'Espace mis à jour avec succès.');
    }

    public function destroy(\App\Models\Space $space)
    {
        $space->delete();
        return redirect()->route('spaces.index')->with('success', 'Espace supprimé.');
    }
    public function show(Space $space)
{
    $reservations = $space->reservations()
        ->with('user')
        ->whereIn('status', ['pending', 'confirmed'])
        ->orderBy('start_time', 'asc')
        ->get();

    return Inertia::render('Spaces/Show', [
        'space' => $space,
        'reservations' => $reservations,
    ]);
}
}
