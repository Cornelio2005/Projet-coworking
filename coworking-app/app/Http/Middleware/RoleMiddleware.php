<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // Si l'utilisateur n'est pas connecté → login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        // On vérifie si le rôle de l'utilisateur est dans la liste autorisée
        if (!in_array($user->role, $roles)) {
            return redirect()->route('dashboard')
                ->with('error', 'Vous n\'avez pas accès à cette page.');
        }

        return $next($request);
    }
}