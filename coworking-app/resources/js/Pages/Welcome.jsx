import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { CalendarDays, CheckCircle, Euro, QrCode, Star, ArrowRight, Zap, Briefcase, Building2 } from 'lucide-react';

export default function Welcome({ canLogin, canRegister }) {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    // États hover pour les micro-interactions sur les boutons
    const [hoverCta1, setHoverCta1] = useState(false);
    const [hoverCta2, setHoverCta2] = useState(false);
    const [hoverLogin, setHoverLogin] = useState(false);
    const [hoverRegister, setHoverRegister] = useState(false);
    const [hoverFinal, setHoverFinal] = useState(false);

    return (
        <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">

            {/* ─────────────────────────────────────────
                NAVBAR
            ───────────────────────────────────────── */}
            <nav className="bg-white px-12 py-4 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] sticky top-0 z-[100]">
                <img
                    src="/logo.png"
                    alt="Cowork'In"
                    className="h-[42px] w-auto"
                />

                <div className="flex items-center gap-6">
                    <a href="#espaces" className="text-sm text-[#555] no-underline font-medium">
                        Nos espaces
                    </a>
                    <a href="#formules" className="text-sm text-[#555] no-underline font-medium">
                        Formules
                    </a>

                    {canLogin && (
                        <div className="flex gap-2.5">
                            <Link
                                href="/login"
                                onMouseEnter={() => setHoverLogin(true)}
                                onMouseLeave={() => setHoverLogin(false)}
                                className={`px-5 py-2 border-2 border-[#0080FF] rounded-lg font-medium no-underline text-sm transition-all duration-200 ${hoverLogin ? 'bg-[#0080FF] text-white' : 'bg-transparent text-[#0080FF]'}`}
                            >
                                Se connecter
                            </Link>

                            {canRegister && (
                                <Link
                                    href="/register"
                                    onMouseEnter={() => setHoverRegister(true)}
                                    onMouseLeave={() => setHoverRegister(false)}
                                    className={`px-5 py-2 rounded-lg text-white font-medium no-underline text-sm transition-all duration-200 ${hoverRegister ? 'bg-[#245a4c] shadow-[0_4px_16px_rgba(45,106,90,0.35)]' : 'bg-[#2D6A5A] shadow-none'}`}
                                >
                                    S'inscrire
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* ─────────────────────────────────────────
                HERO
            ───────────────────────────────────────── */}
            <section className="pt-24 px-[10%] pb-20 flex flex-col items-start">
                {/* Badge */}
                <div className="bg-[#E0F2FE] text-[#2D6A5A] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 inline-flex items-center gap-1.5">
                    <CheckCircle size={13} />
                    Espaces disponibles dès maintenant
                </div>

                <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[56px] text-[#1a1a1a] leading-[1.1] max-w-[680px] mb-6">
                    Votre espace de travail,{' '}
                    <span className="text-[#2D6A5A]">quand vous voulez.</span>
                </h1>

                <p className="font-light text-[18px] text-[#555555] max-w-[500px] leading-[1.7] mb-10">
                    Réservez un poste, un bureau ou une salle en quelques clics. Accédez facilement et profitez de tous nos services.
                </p>

                <div className="flex gap-4 flex-wrap">
                    <Link
                        href="/register"
                        onMouseEnter={() => setHoverCta1(true)}
                        onMouseLeave={() => setHoverCta1(false)}
                        className={`bg-[#ff9d73] text-white font-semibold text-[15px] px-8 py-3.5 rounded-[10px] no-underline flex items-center gap-2 transition-all duration-200 ${hoverCta1 ? 'shadow-[0_6px_20px_rgba(45,106,90,0.35)]' : 'shadow-none'}`}
                    >
                        Réserver un espace
                        <ArrowRight size={16} />
                    </Link>

                    <a href="#espaces"
                        onMouseEnter={() => setHoverCta2(true)}
                        onMouseLeave={() => setHoverCta2(false)}
                        className={`font-semibold text-[15px] px-8 py-3.5 rounded-[10px] no-underline border-2 border-[#2D6A5A] transition-all duration-200 ${hoverCta2 ? 'bg-[#EAE5DF] text-[#2D6A5A]' : 'bg-white text-[#2D6A5A]'}`}
                    >
                        Découvrir nos espaces
                    </a>
                </div>

                {/* Chiffres clés */}
                <div className="flex gap-12 mt-16 flex-wrap">
                    {[
                        { value: '4', label: 'Types d\'espaces' },
                        { value: '3', label: 'Formules d\'abonnement' },
                        { value: '100%', label: 'En ligne, 24h/24' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="font-['Montserrat',sans-serif] font-extrabold text-[32px] text-[#2D6A5A]">
                                {stat.value}
                            </div>
                            <div className="text-[13px] text-[#888] font-normal">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                GALERIE DES ESPACES
            ───────────────────────────────────────── */}
            <section id="espaces" className="py-20 px-[10%] bg-white">
                <div className="mb-10">
                    <h2 className="font-['Montserrat',sans-serif] font-extrabold text-[34px] text-[#1a1a1a] mb-2">
                        Nos espaces
                    </h2>
                    <p className="text-[15px] text-[#888] font-light">
                        Des environnements pensés pour votre productivité.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', label: 'Open space' },
                        { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', label: 'Bureau privé' },
                        { url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80', label: 'Salle de conférence' },
                        { url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80', label: 'Espace détente' },
                    ].map((photo, index) => (
                        <div key={index} className="relative rounded-[14px] overflow-hidden">
                            <img
                                src={photo.url}
                                alt={photo.label}
                                className="w-full h-[260px] object-cover block"
                            />
                            {/* Dégradé bas */}
                            <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[rgba(0,0,0,0.45)] to-transparent" />
                            <span className="absolute bottom-4 left-4 text-white font-['Montserrat',sans-serif] font-bold text-[15px]">
                                {photo.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                FORMULES & ABONNEMENTS
            ───────────────────────────────────────── */}
            <section id="formules" className="py-20 px-[10%] bg-[#F5F0EA]">
                <div className="mb-12 text-center">
                    <h2 className="font-['Montserrat',sans-serif] font-extrabold text-[34px] text-[#1a1a1a] mb-2">
                        Nos formules
                    </h2>
                    <p className="text-[15px] text-[#888] font-light">
                        Une offre adaptée à chaque usage, de l'occasionnel au résidentiel.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 items-stretch">
                    {/* CARTE 1 — À la carte */}
                    <div className="bg-white rounded-2xl py-9 px-7 flex flex-col gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <Zap size={28} color="#2D6A5A" />
                        <div>
                            <h3 className="font-['Montserrat',sans-serif] font-extrabold text-xl text-[#1a1a1a] mb-1">
                                À la carte
                            </h3>
                            <p className="text-[13px] text-[#888] font-light">
                                Pour un usage occasionnel
                            </p>
                        </div>
                        <div>
                            <span className="font-['Montserrat',sans-serif] font-extrabold text-[32px] text-[#2D6A5A]">
                                dès 5€
                            </span>
                            <span className="text-sm text-[#888]"> / heure</span>
                        </div>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {[
                                'Accès open space à l\'heure',
                                'Réservation en ligne 24h/24',
                                'Annulation flexible',
                                'Badge QR Code à l\'entrée',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-[#444]">
                                    <CheckCircle size={14} color="#2D6A5A" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" className="mt-auto p-3 bg-[#F5F0EA] text-[#2D6A5A] border-none rounded-[10px] text-sm font-['Montserrat',sans-serif] font-bold cursor-pointer no-underline text-center transition-all duration-200">
                            Commencer
                        </Link>
                    </div>

                    {/* CARTE 2 — Abonnement (mise en avant) */}
                    <div className="bg-[#2D6A5A] rounded-2xl py-9 px-7 flex flex-col gap-4 shadow-[0_8px_32px_rgba(45,106,90,0.3)] relative">
                        {/* Badge populaire */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4714B] text-white text-[11px] font-bold font-['Montserrat',sans-serif] px-3.5 py-1 rounded-full whitespace-nowrap">
                            Le plus populaire
                        </div>

                        <Star size={28} color="#FFFFFF" />
                        <div>
                            <h3 className="font-['Montserrat',sans-serif] font-extrabold text-xl text-white mb-1">
                                Membre
                            </h3>
                            <p className="text-[13px] text-white/70 font-light">
                                Pour un usage régulier
                            </p>
                        </div>
                        <div>
                            <span className="font-['Montserrat',sans-serif] font-extrabold text-[32px] text-white">
                                dès 150€
                            </span>
                            <span className="text-sm text-white/70"> / mois</span>
                        </div>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {[
                                'Accès illimité aux open spaces',
                                'Badge QR Code instantané',
                                'Jusqu\'à -30% sur les réservations',
                                'Accès salles de réunion inclus',
                                'Wi-Fi dédié membres',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                                    <CheckCircle size={14} color="#FFFFFF" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" className="mt-auto p-3 bg-white text-[#2D6A5A] border-none rounded-[10px] text-sm font-['Montserrat',sans-serif] font-bold cursor-pointer no-underline text-center">
                            S'abonner
                        </Link>
                    </div>

                    {/* CARTE 3 — Bureaux privés */}
                    <div className="bg-white rounded-2xl py-9 px-7 flex flex-col gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <Building2 size={28} color="#2D6A5A" />
                        <div>
                            <h3 className="font-['Montserrat',sans-serif] font-extrabold text-xl text-[#1a1a1a] mb-1">
                                Bureaux privés
                            </h3>
                            <p className="text-[13px] text-[#888] font-light">
                                Pour les équipes résidentes
                            </p>
                        </div>
                        <div>
                            <span className="font-['Montserrat',sans-serif] font-extrabold text-[32px] text-[#2D6A5A]">
                                Sur devis
                            </span>
                        </div>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {[
                                'Bureau fermé et sécurisé',
                                'Tout équipé (mobilier, écrans)',
                                'Accès 24h/24 et 7j/7',
                                'Gestion multi-utilisateurs',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-[#444]">
                                    <CheckCircle size={14} color="#2D6A5A" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" className="mt-auto p-3 bg-[#F5F0EA] text-[#2D6A5A] border-none rounded-[10px] text-sm font-['Montserrat',sans-serif] font-bold cursor-pointer no-underline text-center">
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────
                POURQUOI COWORK'IN
            ───────────────────────────────────────── */}
            <section className="py-20 px-[10%] bg-white">
                <h2 className="font-['Montserrat',sans-serif] font-extrabold text-[34px] text-[#1a1a1a] mb-10 text-center">
                    Pourquoi Cowork'In ?
                </h2>

                <div className="grid grid-cols-3 gap-6">
                    {[
                        {
                            icon: <CalendarDays size={24} color="#2D6A5A" />,
                            title: 'Réservation simple',
                            desc: 'Réservez un poste ou une salle en quelques clics, par heure ou demi-journée.',
                            color: 'bg-[#E0F2FE]',
                        },
                        {
                            icon: <QrCode size={24} color="#2D6A5A" />,
                            title: 'Accès QR Code',
                            desc: 'Votre badge d\'accès numérique généré instantanément après confirmation.',
                            color: 'bg-[#FCE7F3]',
                        },
                        {
                            icon: <Euro size={24} color="#2D6A5A" />,
                            title: 'Facturation automatique',
                            desc: 'Recevez votre facture PDF par e-mail dès que votre réservation est confirmée.',
                            color: 'bg-[#E0F2FE]',
                        },
                    ].map((card, index) => (
                        <div key={index} className={`${card.color} rounded-2xl py-8 px-6`}>
                            <div className="mb-4">{card.icon}</div>
                            <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-[#2D6A5A] mb-2.5">
                                {card.title}
                            </h3>
                            <p className="font-light text-[15px] text-[#444444] leading-[1.6]">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                CTA FINAL
            ───────────────────────────────────────── */}
            <section className="bg-[#2D6A5A] py-20 px-[10%] flex flex-col items-center text-center">
                <h2 className="font-['Montserrat',sans-serif] font-extrabold text-[36px] text-white mb-4 max-w-[600px] leading-[1.2]">
                    Prêt à rejoindre Cowork'In ?
                </h2>
                <p className="font-light text-[17px] text-white/80 mb-9 max-w-[460px] leading-[1.7]">
                    Créez votre compte gratuitement et réservez votre premier espace dès aujourd'hui.
                </p>
                <Link
                    href="/register"
                    onMouseEnter={() => setHoverFinal(true)}
                    onMouseLeave={() => setHoverFinal(false)}
                    className={`font-['Montserrat',sans-serif] font-bold text-[16px] px-10 py-4 rounded-[10px] no-underline flex items-center gap-2 transition-all duration-200 ${hoverFinal ? 'bg-[#F0EBE3] text-[#2D6A5A] shadow-[0_6px_20px_rgba(0,0,0,0.2)]' : 'bg-white text-[#2D6A5A] shadow-none'}`}
                >
                    Créer mon compte
                    <ArrowRight size={16} />
                </Link>
            </section>

            {/* ─────────────────────────────────────────
                FOOTER
            ───────────────────────────────────────── */}
            <footer className="bg-white py-6 px-[10%] flex justify-between items-center border-t border-[#E5E5E5]">
                <img
                    src="/logo.png"
                    alt="Cowork'In"
                    className="h-9 w-auto"
                />
                <p className="font-light text-[13px] text-[#888888] m-0">
                    © 2026 Groupe 6 — Projet Annuel ESGI Lyon — Tous droits réservés
                </p>
            </footer>

        </div>
    );
}