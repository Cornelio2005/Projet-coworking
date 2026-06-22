<?php

use Carbon\Carbon;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AbonnementController;
use App\Http\Controllers\AccessController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// -----------------------------------------------
// ROUTES PUBLIQUES
// -----------------------------------------------

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/access/{qr_token}', [AccessController::class, 'verify'])
    ->name('access.verify');

// -----------------------------------------------
// ROUTES AUTHENTIFIÉES (tous les rôles)
// -----------------------------------------------

Route::middleware(['auth', 'verified'])->group(function () {

    // --- DASHBOARD ---
    Route::get('/dashboard', function () {
        $user = auth()->user();
        $stats = [];

        if (in_array($user->role, ['admin', 'manager'])) {
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
            'auth'  => ['user' => $user],
            'stats' => $stats,
        ]);
    })->name('dashboard');

    // --- PROFIL (Breeze) ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- ESPACES (lecture seule pour tous) ---
    Route::get('/spaces', [SpaceController::class, 'index'])->name('spaces.index');

    // --- RÉSERVATIONS (tous les rôles connectés) ---
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::patch('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel'])->name('reservations.cancel');
    Route::get('/reservations/{reservation}/invoice', [InvoiceController::class, 'download'])->name('reservations.invoice');

    // --- ROUTES CLIENTS ET MEMBRES UNIQUEMENT ---
    Route::middleware(['role:client,member'])->group(function () {

        // Réservations
        Route::get('/reservations/create', [ReservationController::class, 'create'])->name('reservations.create');
        Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');

        // Panier
        Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
        Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
        Route::delete('/cart/{id}', [CartController::class, 'remove'])->name('cart.remove');
        Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

        // Abonnements
        Route::get('/abonnements', [AbonnementController::class, 'index'])->name('abonnements.index');
        Route::post('/abonnements', [AbonnementController::class, 'store'])->name('abonnements.store');

    }); // fin role:client,member

}); // fin auth,verified

// -----------------------------------------------
// ROUTES ADMIN / MANAGER UNIQUEMENT
// -----------------------------------------------

Route::middleware(['auth', 'verified', 'role:admin,manager'])->group(function () {

    // Gestion espaces
    Route::get('/spaces/create', [SpaceController::class, 'create'])->name('spaces.create');
    Route::post('/spaces', [SpaceController::class, 'store'])->name('spaces.store');
    Route::get('/spaces/{space}', [SpaceController::class, 'show'])->name('spaces.show');
    Route::get('/spaces/{space}/edit', [SpaceController::class, 'edit'])->name('spaces.edit');
    Route::put('/spaces/{space}', [SpaceController::class, 'update'])->name('spaces.update');
    Route::delete('/spaces/{space}', [SpaceController::class, 'destroy'])->name('spaces.destroy');

    // Confirmation réservation
    Route::patch('/reservations/{reservation}/confirm', [ReservationController::class, 'confirm'])->name('reservations.confirm');

}); // fin admin,manager

// Routes Breeze
require __DIR__.'/auth.php';

// Route test upload (à supprimer après tests)
Route::post('/test-upload', function (\Illuminate\Http\Request $request) {
    file_put_contents(storage_path('logs/test-upload.log'), json_encode([
        'all'       => $request->all(),
        'files'     => $request->allFiles(),
        'has_image' => $request->hasFile('image')
    ]));
    return response()->json(['success' => true]);
})->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);