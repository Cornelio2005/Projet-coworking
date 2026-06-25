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
    Clock,
    MapPin,
    Check,
    X,
    User,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/**
 * Capitalise proprement "cornelio BENISSAN" -> "Cornelio Benissan"
 * On corrige ça ici en attendant une normalisation côté backend.
 */
function formatName(name = '') {
    return name
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const NAV_LINKS_ADMIN = [
    { label: 'Espaces', href: '/spaces' },
    { label: 'Réservations', href: '/reservations' },
];

const NAV_LINKS_CLIENT = [
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

/* ─────────────────────────────────────────
    SOUS-COMPOSANTS
───────────────────────────────────────── */

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

function SectionTitle({ children, action }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">{children}</h2>
            {action}
        </div>
    );
}

function ReservationRow({ reservation }) {
    return (
        <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <CalendarDays size={18} className="text-[#2D6A5A]" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {reservation.space_name}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {reservation.time_start} – {reservation.time_end}
                    </span>
                    {reservation.location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {reservation.location}
                        </span>
                    )}
                </div>
            </div>

            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                {reservation.date}
            </span>
        </div>
    );
}

/**
 * Liste des prochaines réservations.
 * Remplace l'ancienne section "Actions rapides" qui dupliquait la navbar :
 * ici on affiche une information utile (ce qui arrive bientôt) plutôt
 * que des liens déjà présents dans la navigation.
 */
function UpcomingReservations({ reservations = [] }) {
    return (
        <div>
            <SectionTitle
                action={
                    <Link
                        href="/reservations"
                        className="text-sm font-medium text-[#2D6A5A] no-underline hover:underline"
                    >
                        Voir tout
                    </Link>
                }
            >
                Prochaines réservations
            </SectionTitle>

            {reservations.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                    {reservations.slice(0, 3).map((r) => (
                        <ReservationRow key={r.id} reservation={r} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 px-6 py-10 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                        <CalendarDays size={18} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                        Aucune réservation à venir
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        Réservez un espace pour le voir apparaître ici.
                    </p>
                    <Link
                        href="/spaces"
                        className="bg-[#2D6A5A] text-white font-medium text-sm px-4 py-2 rounded-lg no-underline hover:bg-[#255A4C] transition-colors duration-150"
                    >
                        Réserver un espace
                    </Link>
                </div>
            )}
        </div>
    );
}

function PendingReservationRow({ reservation, onValidate, onReject }) {
    return (
        <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <User size={18} className="text-[#2D6A5A]" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {reservation.user_name}
                    <span className="text-gray-400 font-normal"> · {reservation.space_name}</span>
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span>{reservation.date}</span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {reservation.time_start} – {reservation.time_end}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => onReject(reservation.id)}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors duration-150 cursor-pointer"
                    title="Refuser"
                >
                    <X size={14} />
                </button>
                <button
                    onClick={() => onValidate(reservation.id)}
                    className="w-8 h-8 rounded-lg bg-[#2D6A5A] text-white hover:bg-[#255A4C] flex items-center justify-center transition-colors duration-150 cursor-pointer"
                    title="Valider"
                >
                    <Check size={14} />
                </button>
            </div>
        </div>
    );
}

/**
 * Réservations en attente de validation — remplace l'ancienne section
 * "Actions rapides" de l'admin, qui dupliquait deux liens déjà présents
 * dans la navbar (Espaces, Réservations).
 */
function PendingReservations({ reservations = [] }) {
    const handleValidate = (id) => {
        router.patch(`/reservations/${id}/validate`);
    };

    const handleReject = (id) => {
        router.patch(`/reservations/${id}/reject`);
    };

    return (
        <div>
            <SectionTitle
                action={
                    <Link
                        href="/reservations?status=pending"
                        className="text-sm font-medium text-[#2D6A5A] no-underline hover:underline"
                    >
                        Voir tout
                    </Link>
                }
            >
                Réservations en attente
                {reservations.length > 0 && (
                    <span className="ml-2 bg-[#C4714B]/10 text-[#C4714B] text-xs font-semibold px-2 py-0.5 rounded-full">
                        {reservations.length}
                    </span>
                )}
            </SectionTitle>

            {reservations.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                    {reservations.slice(0, 4).map((r) => (
                        <PendingReservationRow
                            key={r.id}
                            reservation={r}
                            onValidate={handleValidate}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 px-6 py-8 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                        <Check size={18} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                        Aucune réservation en attente
                    </p>
                    <p className="text-sm text-gray-500">
                        Tout est traité, bon travail.
                    </p>
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────
    PAGE PRINCIPALE
───────────────────────────────────────── */

export default function Dashboard({ auth, stats, upcomingReservations = [], pendingReservations = [] }) {
    const user = auth.user;
    const role = user.role;
    const navLinks = ['admin', 'manager'].includes(role) ? NAV_LINKS_ADMIN : NAV_LINKS_CLIENT;

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

            {/* ─────────────────────────────────────────
                NAVBAR
            ───────────────────────────────────────── */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <img src="/logo.png" alt="Cowork'In" className="h-8 w-auto" />

                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
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


                        {!['admin', 'manager'].includes(role) && (
                            <Link
                                href="/cart"
                                className="p-2 text-gray-500 hover:text-[#2D6A5A] hover:bg-gray-100 rounded-full transition-colors duration-150 cursor-pointer relative"
                                title="Mon panier"
                            >
                                <ShoppingCart size={18} />
                            </Link>
                        )}

                        <div className="w-px h-6 bg-gray-200 mx-2" />

                        <ProfileMenu user={user} role={role} onLogout={handleLogout} />
                    </div>
                </div>
            </nav>

            {/* ─────────────────────────────────────────
                CONTENU PRINCIPAL
            ───────────────────────────────────────── */}
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

                {/* ─────────────────────────────────────────
                    VUE ADMIN
                ───────────────────────────────────────── */}
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

                        <PendingReservations reservations={pendingReservations} />

                        <div className="mt-6">
                            <Link
                                href="/spaces/create"
                                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#2D6A5A] font-medium text-sm px-4 py-2.5 rounded-lg no-underline hover:border-[#2D6A5A] hover:shadow-sm transition-all duration-150"
                            >
                                <Plus size={16} />
                                Créer un espace
                            </Link>
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE MANAGER
                ───────────────────────────────────────── */}
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

                {/* ─────────────────────────────────────────
                    VUE MEMBER
                ───────────────────────────────────────── */}
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

                        <UpcomingReservations reservations={upcomingReservations} />
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE CLIENT
                ───────────────────────────────────────── */}
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

                        <UpcomingReservations reservations={upcomingReservations} />
                    </div>
                )}
            </main>
        </div>
    );
}