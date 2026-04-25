<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

// -----------------------------------------------
// ROUTES AUTHENTIFIÉES (tous les rôles)
// -----------------------------------------------

Route::middleware(['auth', 'verified'])->group(function () {
    // 'verified' vérifie que l'email est confirmé.
    // On regroupe ici toutes les routes nécessitant
    // une simple connexion.

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // --- PROFIL (routes Breeze — on les garde) ---
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    // --- ESPACES (lecture seule pour les clients) ---
    Route::get('/spaces', [SpaceController::class, 'index'])
        ->name('spaces.index');
    // Un client peut consulter les espaces
    // disponibles pour faire une réservation.

    // --- RÉSERVATIONS (clients et admins) ---
    Route::get('/reservations', [ReservationController::class, 'index'])
        ->name('reservations.index');
    // Le controller filtre automatiquement selon
    // le rôle : admin voit tout, client voit le sien.

    Route::get('/reservations/create', [ReservationController::class, 'create'])
        ->name('reservations.create');
    // Formulaire de nouvelle réservation.

    Route::post('/reservations', [ReservationController::class, 'store'])
        ->name('reservations.store');
    // POST car on envoie des données au serveur.

    Route::patch('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel'])
        ->name('reservations.cancel');
    // PATCH car on modifie partiellement la
    // réservation (uniquement le statut).
});

// -----------------------------------------------
// ROUTES ADMIN UNIQUEMENT
// Double protection : auth + admin middleware.
// -----------------------------------------------

Route::middleware(['auth', 'admin'])->group(function () {
    // Ces routes nécessitent d'être connecté ET
    // d'avoir le rôle admin.

    // --- GESTION DES ESPACES (CRUD admin) ---
    Route::get('/spaces/create', [SpaceController::class, 'create'])
        ->name('spaces.create');

    Route::post('/spaces', [SpaceController::class, 'store'])
        ->name('spaces.store');

    Route::get('/spaces/{space}/edit', [SpaceController::class, 'edit'])
        ->name('spaces.edit');

    Route::put('/spaces/{space}', [SpaceController::class, 'update'])
        ->name('spaces.update');
    // PUT = mise à jour complète de la ressource.

    Route::delete('/spaces/{space}', [SpaceController::class, 'destroy'])
        ->name('spaces.destroy');

    // --- CONFIRMATION RÉSERVATION (admin) ---
    Route::patch('/reservations/{reservation}/confirm', [ReservationController::class, 'confirm'])
        ->name('reservations.confirm');
    // Seul l'admin peut confirmer une réservation.
});

// Routes d'authentification générées par Breeze :
// /login, /register, /logout, /forgot-password...
require __DIR__.'/auth.php';