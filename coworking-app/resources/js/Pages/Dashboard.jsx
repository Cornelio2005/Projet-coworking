import { Head, Link, router } from '@inertiajs/react';
import {
    CalendarDays,
    Building2,
    Euro,
    ClipboardList,
    Plus,
    Star,
    ArrowRight,
    LogOut,
    ShoppingCart,
    Bell,
    ChevronDown,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function formatName(name = '') {
    return name
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const NAV_LINKS = [
    { label: 'Espaces', href: '/spaces' },
    { label: 'Réservations', href: '/reservations' },
    { label: 'Abonnements', href: '/abonnements' },
];

const ROLE_LABELS = {
    admin: 'Administrateur',
    manager: 'Gestionnaire',
    member: 'Membre',
    client: 'Client',
};

function ProfileMenu({ user, role, onLogout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const initials = formatName(user.name)
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
            >
                <div className="w-8 h-8 rounded-full bg-[#2D6A5A] text-white text-xs font-semibold flex items-center justify-center">
                    {initials}
                </div>
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{formatName(user.name)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ROLE_LABELS[role] ?? role}</p>
                    </div>
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 no-underline"
                    >
                        Mon profil
                    </Link>
                    <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 no-underline"
                    >
                        Paramètres
                    </Link>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer text-left border-t border-gray-100 mt-1"
                    >
                        <LogOut size={14} />
                        Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                {icon}
            </div>
            <div className="font-semibold text-2xl text-gray-900 mb-1 tabular-nums">
                {value}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    );
}

function ActionCard({ label, href, icon }) {
    return (
        <Link
            href={href}
            className="group bg-white rounded-2xl p-5 flex items-center gap-4 no-underline border border-gray-200 hover:border-[#2D6A5A] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
            <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#EAF3F0] flex items-center justify-center transition-colors duration-200 shrink-0">
                {icon}
            </div>
            <span className="font-medium text-sm text-gray-800">{label}</span>
            <ArrowRight
                size={16}
                className="text-gray-300 group-hover:text-[#2D6A5A] ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200"
            />
        </Link>
    );
}

function SectionTitle({ children }) {
    return (
        <h2 className="font-semibold text-lg text-gray-900 mb-4">{children}</h2>
    );
}

export default function Dashboard({ auth, stats }) {
    const user = auth.user;
    const role = user.role;

    const handleLogout = () => {
        router.post('/logout');
    };

    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    const subtitle = {
        admin: 'Tableau de bord administrateur',
        manager: 'Tableau de bord gestionnaire',
        member: "Votre abonnement est actif. Vos réservations en open-space sont incluses.",
        client: 'Bienvenue sur votre espace personnel.',
    }[role];

    return (
        <div className="min-h-screen bg-[#FAFAF7] font-sans">
            <Head title="Dashboard — Cowork'In" />

            {/* NAVBAR */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <img src="/logo.png" alt="Cowork'In" className="h-8 w-auto" />
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-[#2D6A5A] hover:bg-gray-50 no-underline transition-colors duration-150"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            className="p-2 text-gray-500 hover:text-[#2D6A5A] hover:bg-gray-100 rounded-full transition-colors duration-150 cursor-pointer relative"
                            title="Notifications"
                        >
                            <Bell size={18} />
                        </button>
                        <Link
                            href="/cart"
                            className="p-2 text-gray-500 hover:text-[#2D6A5A] hover:bg-gray-100 rounded-full transition-colors duration-150 cursor-pointer relative"
                            title="Mon panier"
                        >
                            <ShoppingCart size={18} />
                        </Link>
                        <div className="w-px h-6 bg-gray-200 mx-2" />
                        <ProfileMenu user={user} role={role} onLogout={handleLogout} />
                    </div>
                </div>
            </nav>

            {/* CONTENU PRINCIPAL */}
            <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="font-semibold text-2xl text-gray-900 mb-1">
                            Bonjour, {formatName(user.name).split(' ')[0]}
                        </h1>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                    <p className="hidden sm:block text-sm text-gray-400 capitalize">{today}</p>
                </div>

                {/* VUE ADMIN */}
                {role === 'admin' && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                            <StatCard
                                label="Réservations aujourd'hui"
                                value={stats.reservations_today ?? '—'}
                                icon={<CalendarDays size={20} className="text-[#2D6A5A]" />}
                            />
                            <StatCard
                                label="Espaces disponibles"
                                value={stats.spaces_count ?? '—'}
                                icon={<Building2 size={20} className="text-[#2D6A5A]" />}
                            />
                            <StatCard
                                label="Revenus du mois"
                                value={stats.monthly_revenue !== undefined ? `${stats.monthly_revenue} €` : '—'}
                                icon={<Euro size={20} className="text-[#2D6A5A]" />}
                            />
                        </div>
                        <SectionTitle>Actions rapides</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <ActionCard label="Gérer les espaces" href="/spaces" icon={<Building2 size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Toutes les réservations" href="/reservations" icon={<ClipboardList size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Créer un espace" href="/spaces/create" icon={<Plus size={18} className="text-[#2D6A5A]" />} />
                        </div>
                    </div>
                )}

                {/* VUE MANAGER */}
                {role === 'manager' && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <StatCard
                                label="Réservations aujourd'hui"
                                value={stats.reservations_today ?? '—'}
                                icon={<CalendarDays size={20} className="text-[#2D6A5A]" />}
                            />
                            <StatCard
                                label="Espaces disponibles"
                                value={stats.spaces_count ?? '—'}
                                icon={<Building2 size={20} className="text-[#2D6A5A]" />}
                            />
                        </div>
                        <SectionTitle>Actions rapides</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <ActionCard label="Gérer les espaces" href="/spaces" icon={<Building2 size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Voir les réservations" href="/reservations" icon={<ClipboardList size={18} className="text-[#2D6A5A]" />} />
                        </div>
                    </div>
                )}

                {/* VUE MEMBER */}
                {role === 'member' && (
                    <div>
                        <div className="bg-[#2D6A5A] rounded-2xl py-7 px-7 mb-10 flex flex-wrap items-center justify-between gap-5">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 rounded-xl p-3">
                                    <Star size={24} className="text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-base text-white mb-1 flex items-center gap-2">
                                        Abonné Cowork'In
                                        <span className="bg-white/15 text-[11px] font-medium px-2 py-0.5 rounded-full">
                                            Actif
                                        </span>
                                    </div>
                                    <div className="text-sm text-white/70 max-w-md">
                                        {stats.abonnement_actif
                                            ? 'Vos réservations en open-space sont incluses — accès illimité.'
                                            : "Pas d'abonnement actif."}
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/abonnements"
                                className="bg-white text-[#2D6A5A] font-medium text-sm px-4 py-2 rounded-lg no-underline whitespace-nowrap hover:bg-white/90 transition-colors duration-150"
                            >
                                Mon abonnement
                            </Link>
                        </div>
                        <SectionTitle>Actions rapides</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <ActionCard label="Réserver un espace" href="/spaces" icon={<CalendarDays size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Mes réservations" href="/reservations" icon={<ClipboardList size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Mon abonnement" href="/abonnements" icon={<Star size={18} className="text-[#2D6A5A]" />} />
                        </div>
                    </div>
                )}

                {/* VUE CLIENT */}
                {role === 'client' && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <div className="bg-[#2D6A5A] rounded-2xl py-8 px-7 flex flex-col justify-between gap-6">
                                <div>
                                    <div className="font-semibold text-lg text-white mb-2">
                                        Besoin d'un espace ?
                                    </div>
                                    <div className="text-sm text-white/70 leading-relaxed">
                                        Réservez un poste, un bureau ou une salle en quelques clics.
                                    </div>
                                </div>
                                <Link
                                    href="/spaces"
                                    className="bg-white text-[#2D6A5A] font-medium text-sm px-5 py-2.5 rounded-lg no-underline flex items-center gap-2 self-start hover:bg-white/90 transition-colors duration-150"
                                >
                                    Voir les espaces
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div className="bg-white rounded-2xl py-8 px-7 flex flex-col justify-between gap-6 border border-gray-200">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-[#C4714B]/10 text-[#C4714B] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                                            Offre membre
                                        </span>
                                    </div>
                                    <div className="font-semibold text-lg text-gray-900 mb-2">
                                        Passez à la vitesse supérieure
                                    </div>
                                    <div className="text-sm text-gray-500 leading-relaxed">
                                        Économisez jusqu'à <strong className="text-gray-700">-30%</strong> sur vos réservations grâce à nos abonnements membres.
                                    </div>
                                </div>
                                <Link
                                    href="/abonnements"
                                    className="bg-[#C4714B] text-white font-medium text-sm px-5 py-2.5 rounded-lg no-underline flex items-center gap-2 self-start hover:bg-[#B25E3A] transition-colors duration-150"
                                >
                                    Découvrir les offres
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                        <SectionTitle>Actions rapides</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <ActionCard label="Mes réservations" href="/reservations" icon={<ClipboardList size={18} className="text-[#2D6A5A]" />} />
                            <ActionCard label="Consulter les espaces" href="/spaces" icon={<Building2 size={18} className="text-[#2D6A5A]" />} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}