<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Si l'utilisateur n'est pas connecté → rediriger vers le login
        if (!auth::check()) {
            return redirect()->route('login');
        }

        // Si l'utilisateur connecté n'est PAS admin → on lui refuse l'accès
        if (!auth::user()->isAdmin()) {
            // Optionnel : rediriger vers la page d'accueil ou afficher une erreur 403
            return redirect()->route('home')->with('error', "Accès réservé à l'administration.");
        }

        // Si on arrive ici, c'est bon on laisse passer la requête
        return $next($request);
    }
}
