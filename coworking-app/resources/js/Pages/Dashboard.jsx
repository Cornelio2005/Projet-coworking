import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Building2, Euro, ClipboardList, Plus, Star, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    const user = auth.user;
    const role = user.role;

    // Hover state pour les cartes d'actions rapides
    // On stocke l'index de la carte survolée
    const [hoveredAction, setHoveredAction] = useState(null);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">
            <Head title="Dashboard — Cowork'In" />

            {/* ─────────────────────────────────────────
                NAVBAR
            ───────────────────────────────────────── */}
            <nav className="bg-white px-12 py-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <img src="/logo.png" alt="Cowork'In" className="h-[42px] w-auto" />

                <div className="flex items-center gap-4">
                    <span className="text-sm text-[#555555]">
                        {user.name}
                    </span>

                    {/* Badge membre — affiché uniquement si role === member */}
                    {role === 'member' && (
                        <span className="bg-[#2D6A5A] text-white text-[11px] font-bold font-['Montserrat',sans-serif] px-3 py-1 rounded-full flex items-center gap-1">
                            <Star size={10} />
                            Abonné Cowork'In
                        </span>
                    )}

                    {/* Badge rôle standard */}
                    {role !== 'member' && (
                        <span className="bg-[#E0F2FE] text-[#2D6A5A] font-medium text-xs px-2.5 py-1 rounded-full">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-transparent border-2 border-[#2D6A5A] text-[#2D6A5A] font-medium text-[13px] px-4 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
                    >
                        <LogOut size={14} />
                        Déconnexion
                    </button>
                </div>
            </nav>

            {/* ─────────────────────────────────────────
                CONTENU PRINCIPAL
            ───────────────────────────────────────── */}
            <main className="py-12 px-[10%]">

                {/* Message d'accueil personnalisé */}
                <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-2">
                    Bonjour, {user.name}
                </h1>
                <p className="font-light text-[15px] text-[#888888] mb-10">
                    {role === 'admin' && 'Tableau de bord administrateur'}
                    {role === 'manager' && 'Tableau de bord gestionnaire'}
                    {role === 'member' && 'Votre abonnement est actif. Vos réservations en open-space sont incluses.'}
                    {role === 'client' && 'Bienvenue sur votre espace personnel.'}
                </p>

                {/* ─────────────────────────────────────────
                    VUE ADMIN
                ───────────────────────────────────────── */}
                {role === 'admin' && (
                    <div>
                        {/* STATISTIQUES */}
                        <div className="grid grid-cols-3 gap-5 mb-10">
                            {[
                                {
                                    label: "Réservations aujourd'hui",
                                    value: stats.reservations_today ?? '_',
                                    icon: <CalendarDays size={28} color="#2D6A5A" />,
                                    color: 'bg-[#DCFCE7]',
                                },
                                {
                                    label: 'Espaces disponibles',
                                    value: stats.spaces_count ?? '_',
                                    icon: <Building2 size={28} color="#2D6A5A" />,
                                    color: 'bg-[#FEF3C7]',
                                },
                                {
                                    label: 'Revenus du mois',
                                    value: stats.monthly_revenue !== undefined ? `${stats.monthly_revenue}€` : "_",
                                    icon: <Euro size={28} color="#2D6A5A" />,
                                    color: 'bg-[#F5F0EA]',
                                },
                            ].map((stat, i) => (
                                <div key={i} className={`${stat.color} rounded-2xl p-7 border border-[rgba(0,0,0,0.04)]`}>
                                    <div className="mb-3">{stat.icon}</div>
                                    <div className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-1.5">
                                        {stat.value}
                                    </div>
                                    <div className="font-light text-sm text-[#555555]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#2D6A5A] mb-5">
                            Actions rapides
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Gérer les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                                { label: 'Toutes les réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Créer un espace', href: '/spaces/create', icon: <Plus size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`admin-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    className={`bg-white rounded-xl p-6 flex items-center gap-4 no-underline border-2 transition-all duration-200 ${hoveredAction === `admin-${i}` ? 'border-[#2D6A5A] shadow-[0_4px_16px_rgba(45,106,90,0.12)]' : 'border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
                                >
                                    {action.icon}
                                    <span className="font-medium text-[15px] text-[#2D6A5A]">
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE MANAGER
                ───────────────────────────────────────── */}
                {role === 'manager' && (
                    <div>
                        <div className="grid grid-cols-2 gap-5 mb-10">
                            {[
                                {
                                    label: "Réservations aujourd'hui",
                                    value: stats.reservations_today ?? '_',
                                    icon: <CalendarDays size={28} color="#2D6A5A" />,
                                    color: 'bg-[#DCFCE7]',
                                },
                                {
                                    label: 'Espaces disponibles',
                                    value: stats.spaces_count ?? '_',
                                    icon: <Building2 size={28} color="#2D6A5A" />,
                                    color: 'bg-[#FEF3C7]',
                                },
                            ].map((stat, i) => (
                                <div key={i} className={`${stat.color} rounded-2xl p-7 border border-[rgba(0,0,0,0.04)]`}>
                                    <div className="mb-3">{stat.icon}</div>
                                    <div className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-1.5">
                                        {stat.value}
                                    </div>
                                    <div className="font-light text-sm text-[#555555]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#2D6A5A] mb-5">
                            Actions rapides
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Gérer les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                                { label: 'Voir les réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`manager-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    className={`bg-white rounded-xl p-6 flex items-center gap-4 no-underline border-2 transition-all duration-200 ${hoveredAction === `manager-${i}` ? 'border-[#2D6A5A] shadow-[0_4px_16px_rgba(45,106,90,0.12)]' : 'border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
                                >
                                    {action.icon}
                                    <span className="font-medium text-[15px] text-[#2D6A5A]">
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE MEMBER
                ───────────────────────────────────────── */}
                {role === 'member' && (
                    <div>
                        {/* Bloc abonnement actif */}
                        <div className="bg-[#2D6A5A] rounded-2xl py-8 px-7 mb-10 flex items-center justify-between gap-5">
                            <div className="flex items-center gap-5">
                                <div className="bg-white/15 rounded-xl p-3.5">
                                    <Star size={32} color="#FFFFFF" />
                                </div>
                                <div>
                                    <div className="font-['Montserrat',sans-serif] font-extrabold text-lg text-white mb-1.5 flex items-center gap-2.5">
                                        Abonné Cowork'In
                                        <span className="bg-white/20 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                            Actif
                                        </span>
                                    </div>
                                    <div className="font-light text-sm text-white/80">
                                        {stats.abonnement_actif
                                            ? "Vous avez un abonnement actif. Vos réservations en open-space sont incluses — accès illimité."
                                            : "Pas d'abonnement actif."}
                                    </div>
                                </div>
                            </div>
                            <Link href="/abonnements" className="bg-white/15 text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg no-underline whitespace-nowrap border border-white/30">
                                Mon abonnement
                            </Link>
                        </div>

                        <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#2D6A5A] mb-5">
                            Actions rapides
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Réserver un espace', href: '/spaces', icon: <CalendarDays size={24} color="#2D6A5A" /> },
                                { label: 'Mes réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Mon abonnement', href: '/abonnements', icon: <Star size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`member-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    className={`bg-white rounded-xl p-6 flex items-center gap-4 no-underline border-2 transition-all duration-200 ${hoveredAction === `member-${i}` ? 'border-[#2D6A5A] shadow-[0_4px_16px_rgba(45,106,90,0.12)]' : 'border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
                                >
                                    {action.icon}
                                    <span className="font-medium text-[15px] text-[#2D6A5A]">
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE CLIENT
                ───────────────────────────────────────── */}
                {role === 'client' && (
                    <div>
                        {/* DEUX CARTES CÔTE À CÔTE */}
                        <div className="grid grid-cols-2 gap-5 mb-10">
                            {/* CARTE RÉSERVATION */}
                            <div className="bg-[#2D6A5A] rounded-2xl py-9 px-7 flex flex-col justify-between gap-6">
                                <div>
                                    <div className="font-['Montserrat',sans-serif] font-extrabold text-[22px] text-white mb-2">
                                        Besoin d'un espace ?
                                    </div>
                                    <div className="font-light text-sm text-white/80 leading-[1.6]">
                                        Réservez un poste, un bureau ou une salle en quelques clics.
                                    </div>
                                </div>
                                <Link href="/spaces" className="bg-white text-[#2D6A5A] font-['Montserrat',sans-serif] font-bold text-sm px-6 py-3 rounded-[10px] no-underline flex items-center gap-2 self-start">
                                    Voir les espaces
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* CARTE ABONNEMENT — terracotta doux */}
                            <div className="bg-[#FDF6F0] rounded-2xl py-9 px-7 flex flex-col justify-between gap-6 border-2 border-[#F2D5C4]">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star size={18} color="#C4714B" />
                                        <span className="bg-[#C4714B] text-white text-[10px] font-bold font-['Montserrat',sans-serif] px-2.5 py-1 rounded-full">
                                            Offre membre
                                        </span>
                                    </div>
                                    <div className="font-['Montserrat',sans-serif] font-extrabold text-[22px] text-[#7C2D12] mb-2">
                                        Passez à la vitesse supérieure
                                    </div>
                                    <div className="font-normal text-sm text-[#92400E] leading-[1.6]">
                                        Économisez jusqu'à <strong>-30%</strong> sur vos réservations grâce à nos abonnements membres.
                                    </div>
                                </div>
                                <Link href="/abonnements" className="bg-[#C4714B] text-white font-['Montserrat',sans-serif] font-bold text-sm px-6 py-3 rounded-[10px] no-underline flex items-center gap-2 self-start">
                                    Découvrir les offres
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#2D6A5A] mb-5">
                            Actions rapides
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Mes réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Consulter les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`client-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    className={`bg-white rounded-xl p-6 flex items-center gap-4 no-underline border-2 transition-all duration-200 ${hoveredAction === `client-${i}` ? 'border-[#2D6A5A] shadow-[0_4px_16px_rgba(45,106,90,0.12)]' : 'border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
                                >
                                    {action.icon}
                                    <span className="font-medium text-[15px] text-[#2D6A5A]">
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}