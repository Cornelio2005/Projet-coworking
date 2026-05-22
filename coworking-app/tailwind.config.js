import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        // On indique à Tailwind où chercher les classes
        // utilisées — il supprime tout le reste du CSS final
        // (tree-shaking). Le .jsx est crucial pour React.
    ],

    theme: {
        extend: {
            colors: {
                // On ajoute nos couleurs de charte
                // pour pouvoir écrire bg-bleu, text-vert, etc.
                'bleu':  '#E0F2FE',
                'rose':  '#FCE7F3',
                'vert':  '#2D6A5A',
                'vert-clair': '#3D8B73',
                'beige': '#F5F0EA',
            },
            fontFamily: {
                // On déclare nos polices pour pouvoir
                // écrire font-montserrat et font-roboto
                'montserrat': ['Montserrat', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        // Plugin Breeze pour styliser les formulaires
    ],
}