import { Head } from '@inertiajs/react';
import { XCircle } from 'lucide-react';

export default function AccessDenied({ reason }) {
    return (
        <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center px-4">
            <Head title="Accès refusé — Cowork'In" />

            <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-12 max-w-md w-full text-center">

                {/* Icône erreur */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#FEE2E2] rounded-full p-5">
                        <XCircle size={48} color="#C4714B" />
                    </div>
                </div>

                {/* Titre */}
                <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[26px] text-[#C4714B] mb-2">
                    Accès refusé
                </h1>
                <p className="text-sm text-[#888888] font-light mb-8">
                    Votre QR code n'a pas pu être validé.
                </p>

                {/* Raison */}
                <div className="bg-[#FEF3C7] rounded-2xl p-5 mb-8">
                    <p className="text-sm text-[#92400E]">
                        {/* Message d'erreur retourné par le controller */}
                        {reason}
                    </p>
                </div>

                {/* Logo */}
                <img src="/logo.png" alt="Cowork'In" className="h-8 w-auto mx-auto opacity-60" />
            </div>
        </div>
    );
}