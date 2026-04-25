# Tutoriel d'Installation : Projet Coworking B2

Ce document explique étape par étape comment récupérer le projet depuis GitHub et le faire tourner localement sur votre machine.

## 🛠️ 1. Prérequis
Avant de commencer, assurez-vous d'avoir installé sur votre machine :
- **PHP** (v8.2 ou supérieur) - *via XAMPP par exemple*
- **Composer** (Gestionnaire de paquets PHP)
- **Node.js et npm** (Pour compiler React et Tailwind)
- **MySQL / MariaDB** (via XAMPP, WAMP ou un service local)
- **Git**

## 📥 2. Récupérer le projet
Ouvrez votre terminal et clonez le dépôt GitHub dans le dossier de votre choix :
```bash
git clone https://github.com/VOTRE_NOM/VOTRE_DEPOT_COWORKING.git
cd VOTRE_DEPOT_COWORKING
```
*(Remplacez l'URL par celle de votre propre dépôt GitHub)*

## 📦 3. Installer les dépendances
Le projet utilise deux types de dépendances : PHP (via Composer) et JavaScript (via NPM).
Lancez ces deux commandes l'une après l'autre :
```bash
composer install
npm install
```

## ⚙️ 4. Configuration de l'environnement (.env)
Laravel a besoin de son fichier de configuration caché pour fonctionner.
1. Dupliquez le fichier d'exemple :
```bash
cp .env.example .env
```
*(Sur Windows, vous pouvez simplement copier/coller le fichier `.env.example` et renommer la copie en `.env`)*

2. Ouvrez ce fichier `.env` dans votre éditeur de code et configurez la connexion à la base de données :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=coworking
DB_USERNAME=root
DB_PASSWORD=
```
*(Assurez-vous que la base de données `coworking` est bien créée dans votre phpMyAdmin/MySQL)*

## 🔑 5. Générer la clé de l'application
Pour des raisons de sécurité, chaque installation de Laravel doit avoir sa propre clé.
```bash
php artisan key:generate
```

## 🗄️ 6. Préparer la base de données (Migrations)
Maintenant que le fichier `.env` est configuré, il faut créer toutes les tables (utilisateurs, rôles, réservations, etc.) dans votre base de données :
```bash
php artisan migrate
```
*(Si vous voulez également insérer de fausses données pour tester, vous pouvez utiliser `php artisan migrate --seed`)*

## 🚀 7. Lancer le projet
Pour que l'application fonctionne, il faut lancer **deux terminaux** simultanément :

**Terminal 1 (Serveur Backend PHP) :**
```bash
php artisan serve
```

**Terminal 2 (Compilateur Frontend React/Tailwind) :**
```bash
npm run dev
```

🌐 **C'est prêt !** Rendez-vous dans votre navigateur à l'adresse : **[http://localhost:8000](http://localhost:8000)**.
