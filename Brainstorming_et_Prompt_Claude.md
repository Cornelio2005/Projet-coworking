# Brainstorming et Architecture - Projet de Coworking B2

## 1. Vision Globale & Simplification (Anti-Gravity)
- **Objectif :** Créer une plateforme de réservation et de facturation (SaaS) pour un espace de coworking, couplée à une infrastructure réseau solide.
- **La Stack Technique Optimisée :**
  - **Backend & API :** Laravel 12
  - **Frontend :** React (Intégré via **Laravel Inertia.js** et le starter kit **Breeze**). Cela supprime le besoin de créer une API séparée et simplifie énormément l'authentification et le routage.
  - **Base de données :** MySQL 8
  - **CSS :** Tailwind CSS
  - **Infrastructure :** VPS OVH sous Ubuntu, Docker (pour containeriser Laravel/MySQL), Nginx, pfSense (pour la partie réseau).

## 2. Le MVP (Minimum Viable Product) à viser en priorité
1.  **Authentification :** Login, inscription, rôles (Admin vs Membre/Visiteur).
2.  **Espaces :** Table `spaces` avec nom, type (bureau, salle), capacité.
3.  **Réservation :** Sélection d'un créneau, vérification anti-doublon (très important), validation.
4.  **Facturation :** Génération simple d'un PDF à la volée avec `barryvdh/laravel-dompdf`.

---
---

# 🤖 PROMPT MASTER À ENVOYER À CLAUDE

**Copiez-collez le texte ci-dessous dans une nouvelle conversation avec Claude :**

```text
Agis en tant que Développeur Senior Fullstack et Professeur Expert (spécialisé en Laravel, React, et Architecture Système). 

Je suis étudiant en niveau B2 et je dois réaliser un projet annuel complexe : une plateforme de gestion pour un espace de coworking. Mon équipe est composée de 4 personnes. Nous avons très peu de temps (4 séances de projet) avant notre soutenance le 10 juillet.

Voici notre stack technique choisie pour simplifier au maximum tout en gardant une qualité professionnelle :
- Laravel 12
- React (via Laravel Inertia.js et le starter kit Breeze)
- Tailwind CSS
- MySQL 8

Le but est d'avoir un MVP hyper robuste plutôt qu'une usine à gaz non fonctionnelle. Le MVP doit comprendre :
1. Auth avec rôles (Admin / Client)
2. Catalogue des salles/bureaux
3. Moteur de réservation (avec sécurité contre les conflits d'agenda/doublons)
4. Génération de facture PDF basique

TON RÔLE :
Tu vas être mon tuteur pas-à-pas. Je ne veux PAS que tu me craches tout le code du projet d'un seul coup. Je veux qu'on procède de manière méthodique et pédagogique, étape par étape.

RÈGLES DE FONCTIONNEMENT :
1. À chaque étape, explique-moi brièvement le "pourquoi" avant le "comment".
2. Donne-moi les commandes exactes à taper dans mon terminal.
3. Donne-moi le code précis à intégrer.
4. Attends TOUJOURS que je valide que l'étape actuelle fonctionne chez moi avant de passer à la suite.
5. Si je rencontre une erreur, aide-moi à la déboguer méthodiquement.

Pour commencer, dis-moi "Bonjour ! Je suis prêt à t'accompagner. Es-tu prêt pour l'Étape 1 : l'initialisation du projet Laravel avec Inertia et React ?" et attends ma réponse.
```
