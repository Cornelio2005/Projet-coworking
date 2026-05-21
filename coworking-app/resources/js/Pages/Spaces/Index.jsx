import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Clock, CheckCircle, XCircle, Pencil, Plus, ArrowLeft, ImageIcon, Search, X } from 'lucide-react';

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const typeLabels = {
    'bureau_individuel': 'Bureau individuel',
    'bureau_partage': 'Bureau partagé',
    'salle_reunion': 'Salle de réunion',
    'espace_detente': 'Espace détente',
};

const typeColors = {
    'bureau_individuel': 'bg-[#E0F2FE]',
    'bureau_partage': 'bg-[#E0F2FE]',
    'salle_reunion': 'bg-[#FCE7F3]',
    'espace_detente': 'bg-[#F5F0EA]',
};

export default function Index({ spaces, filters = {} }) {
    const { auth } = usePage().props;
    const role = auth.user.role;
    const canManage = role === 'admin' || role === 'manager';

    // On initialise les filtres avec les valeurs renvoyées
    // par le controller pour pré-remplir les champs.
    const [type, setType] = useState(filters.type || '');
    const [capaciteMin, setCapaciteMin] = useState(filters.capacite_min || '');
    const [date, setDate] = useState(filters.date || '');

    const handleFilter = () => {
        // router.get recharge la page avec les filtres
        // en query string sans rechargement complet.
        router.get('/spaces', {
            type: type || undefined,
            capacite_min: capaciteMin || undefined,
            date: date || undefined,
        }, { preserveScroll: true });
    };

    const handleReset = () => {
        setType('');
        setCapaciteMin('');
        setDate('');
        router.get('/spaces');
    };

    const hasActiveFilters = type || capaciteMin || date;

    return (
        <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">
            <Head title="Espaces — Cowork'In" />

            {/* NAVBAR */}
            <nav className="bg-white px-12 py-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <Link href="/dashboard">
                    <img src="/logo.png" alt="Cowork'In" className="h-[42px] w-auto" />
                </Link>
                <Link href="/dashboard" className="flex items-center gap-1.5 font-['Roboto',sans-serif] text-sm text-[#2D6A5A] no-underline">
                    <ArrowLeft size={16} />
                    Retour au dashboard
                </Link>
            </nav>

            <main className="px-[10%] py-12">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-1">
                            Nos espaces
                        </h1>
                        <p className="font-['Roboto',sans-serif] font-light text-sm text-[#888888]">
                            {spaces.length} espace{spaces.length > 1 ? 's' : ''} trouvé{spaces.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    {canManage && (
                        <Link href="/spaces/create" className="bg-[#2D6A5A] text-white font-['Roboto',sans-serif] font-medium text-sm px-5 py-2.5 rounded-[10px] no-underline flex items-center gap-2">
                            <Plus size={16} />
                            Nouvel espace
                        </Link>
                    )}
                </div>

                {/* BARRE DE FILTRES */}
                <div className="bg-white rounded-[14px] px-6 py-5 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex gap-4 items-end flex-wrap">
                    {/* FILTRE TYPE */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-xs font-medium text-[#2D6A5A] mb-1.5">
                            Type d'espace
                        </label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] bg-white box-border ${type ? 'text-[#1a1a1a]' : 'text-[#aaa]'}`}
                        >
                            <option value="">Tous les types</option>
                            {Object.entries(typeLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* FILTRE CAPACITÉ */}
                    <div className="flex-1 min-w-[140px]">
                        <label className="block text-xs font-medium text-[#2D6A5A] mb-1.5">
                            Capacité minimum
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={capaciteMin}
                            onChange={e => setCapaciteMin(e.target.value)}
                            placeholder="Ex : 4"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] bg-white box-border"
                        />
                    </div>

                    {/* FILTRE DATE */}
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-xs font-medium text-[#2D6A5A] mb-1.5">
                            Disponible le
                        </label>
                        <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] bg-white box-border"
                        />
                    </div>

                    {/* BOUTONS */}
                    <div className="flex gap-2.5">
                        <button
                            onClick={handleFilter}
                            className="px-5 py-2.5 bg-[#2D6A5A] text-white border-none rounded-lg text-sm font-['Roboto',sans-serif] font-medium cursor-pointer flex items-center gap-1.5"
                        >
                            <Search size={15} />
                            Rechercher
                        </button>

                        {hasActiveFilters && (
                            <button
                                onClick={handleReset}
                                className="px-4 py-2.5 bg-white text-[#888] border border-[#ddd] rounded-lg text-sm font-['Roboto',sans-serif] cursor-pointer flex items-center gap-1.5"
                            >
                                <X size={15} />
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </div>

                {/* GRILLE DES ESPACES */}
                {spaces.length === 0 ? (
                    <div className="bg-white rounded-2xl py-16 px-12 text-center text-[#888888]">
                        <p className="text-[15px] mb-3">
                            Aucun espace ne correspond à vos critères.
                        </p>
                        <button
                            onClick={handleReset}
                            className="bg-[#2D6A5A] text-white border-none rounded-lg px-5 py-2.5 text-sm cursor-pointer font-['Roboto',sans-serif]"
                        >
                            Voir tous les espaces
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-5">
                        {spaces.map((space) => (
                            <div key={space.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                                {/* IMAGE */}
                                <div className="relative">
                                    {space.image ? (
                                        <img
                                            src={`/storage/${space.image}`}
                                            alt={space.name}
                                            className="w-full h-[180px] object-cover block"
                                        />
                                    ) : (
                                        <div className={`w-full h-[180px] flex items-center justify-center ${typeColors[space.type] || 'bg-[#E0F2FE]'}`}>
                                            <ImageIcon size={32} color="#2D6A5A" opacity={0.3} />
                                        </div>
                                    )}

                                    {/* BADGE TYPE sur l'image */}
                                    <span className="absolute top-3 left-3 bg-white/90 text-[#2D6A5A] font-['Roboto',sans-serif] font-medium text-[11px] px-2.5 py-1 rounded-full">
                                        {typeLabels[space.type] || space.type}
                                    </span>

                                    {/* BADGE DISPONIBILITÉ sur l'image */}
                                    <span className={`absolute top-3 right-3 font-['Roboto',sans-serif] font-semibold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 ${space.is_available ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
                                        {space.is_available
                                            ? <><CheckCircle size={11} /> Disponible</>
                                            : <><XCircle size={11} /> Indisponible</>
                                        }
                                    </span>
                                </div>

                                {/* INFOS */}
                                <div className="p-5">
                                    <h3 className="font-['Montserrat',sans-serif] font-bold text-[17px] text-[#2D6A5A] mb-2">
                                        {space.name}
                                    </h3>
                                    <p className="font-['Roboto',sans-serif] font-light text-[13px] text-[#666666] leading-relaxed mb-4 min-h-[40px]">
                                        {space.description}
                                    </p>

                                    {/* CAPACITÉ + PRIX */}
                                    <div className="flex justify-between mb-4 text-[13px] text-[#555555]">
                                        <span className="flex items-center gap-1">
                                            <Users size={14} color="#555555" />
                                            {space.capacity} personne{space.capacity > 1 ? 's' : ''}
                                        </span>
                                        <div className="flex flex-col items-end gap-0.5">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} color="#555555" />
                                                {space.price_par_heure}€/h
                                            </span>
                                            {space.price_par_demi_journee && (
                                                <span className="text-xs text-[#888]">
                                                    {space.price_par_demi_journee}€ / demi-journée
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex gap-2">
                                        {!canManage && space.is_available && (
                                            <Link
                                                href={`/reservations/create?space_id=${space.id}`}
                                                className="flex-1 bg-[#2D6A5A] text-white font-['Roboto',sans-serif] font-medium text-[13px] p-2.5 rounded-lg no-underline text-center"
                                            >
                                                Réserver
                                            </Link>
                                        )}

                                        {canManage && (
                                            <Link
                                                href={`/spaces/${space.id}`}
                                                className="flex-1 bg-[#E0F2FE] text-[#2D6A5A] font-['Roboto',sans-serif] font-medium text-[13px] p-2.5 rounded-lg no-underline text-center"
                                            >
                                                Voir les réservations
                                            </Link>
                                        )}

                                        {canManage && (
                                            <Link
                                                href={`/spaces/${space.id}/edit`}
                                                className="bg-[#F5F0EA] text-[#2D6A5A] px-3.5 py-2.5 rounded-lg no-underline flex items-center justify-center"
                                            >
                                                <Pencil size={14} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}