<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Abonnement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AbonnementController extends Controller
{
    public function index()
    {
        $plans = Plan::where('is_active', true)->get();
        // On récupère uniquement les plans actifs
        // pour ne pas afficher des plans désactivés.

        $abonnementActif = auth()->user()->abonnementActif();
        // On récupère l'abonnement actif de l'utilisateur
        // pour savoir s'il est déjà abonné et à quel plan.

        return Inertia::render('Abonnements/Index', [
            'plans'           => $plans,
            'abonnementActif' => $abonnementActif,
            'auth'            => ['user' => auth()->user()],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $user = auth()->user();

        // Vérification : l'utilisateur a déjà un abonnement actif
        if ($user->hasAbonnementActif()) {
            return back()->withErrors([
                'plan_id' => 'Vous avez déjà un abonnement actif.',
            ]);
        }

        $dateDebut = Carbon::today();
        $dateFin   = Carbon::today()->addMonth();
        // addMonth() ajoute exactement 1 mois à la date du jour.

        Abonnement::create([
            'user_id'          => $user->id,
            'plan_id'          => $validated['plan_id'],
            'date_debut'       => $dateDebut,
            'date_fin'         => $dateFin,
            'statut'           => 'actif',
            'heures_consommees'=> 0,
        ]);

        // On passe automatiquement le rôle client → member
        // pour qu'il bénéficie des réductions abonné.
        if ($user->isClient()) {
            $user->update(['role' => 'member']);
        }

        return redirect()->route('abonnements.index')
            ->with('success', 'Abonnement souscrit avec succès !');
    }
}