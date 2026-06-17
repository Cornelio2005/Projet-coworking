import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, MapPin, User } from 'lucide-react';
import { useEffect } from 'react';

export default function AccessGranted({ reservation }) {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center px-4 font-['Roboto',sans-serif]">
            <Head title="Accès accordé — Cowork'In" />

            <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-12 max-w-md w-full text-center">

                {/* Icône succès */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#D1FAE5] rounded-full p-5">
                        <CheckCircle size={48} color="#2D6A5A" />
                    </div>
                </div>

                {/* Titre */}
                <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[26px] text-[#2D6A5A] mb-2">
                    Accès autorisé
                </h1>
                <p className="text-sm text-[#888888] font-light mb-8">
                    Votre réservation a été validée avec succès. Bienvenue !
                </p>

                {/* Détails de la réservation */}
                <div className="bg-[#F9F6F0] border border-[#EBE6DE] rounded-2xl p-6 mb-8 text-left flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <User size={18} color="#2D6A5A" className="shrink-0" />
                        <div>
                            <span className="text-xs text-[#888888] block font-light">Utilisateur</span>
                            <span className="text-sm font-semibold text-[#1a1a1a]">{reservation?.user_name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-[#EBE6DE] pt-3">
                        <MapPin size={18} color="#2D6A5A" className="shrink-0" />
                        <div>
                            <span className="text-xs text-[#888888] block font-light">Espace réservé</span>
                            <span className="text-sm font-semibold text-[#1a1a1a]">{reservation?.space_name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-[#EBE6DE] pt-3">
                        <Clock size={18} color="#2D6A5A" className="shrink-0" />
                        <div>
                            <span className="text-xs text-[#888888] block font-light">Horaires</span>
                            <span className="text-sm font-semibold text-[#1a1a1a]">
                                {reservation?.start_time} - {reservation?.end_time}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <img src="/logo.png" alt="Cowork'In" className="h-8 w-auto mx-auto opacity-60" />
            </div>
        </div>
    );
}
