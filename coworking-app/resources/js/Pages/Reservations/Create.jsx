import { useForm, Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Monitor, Tv, Video, Armchair } from 'lucide-react';

function getEquipmentIcon(name) {
    if (name.toLowerCase().includes('projecteur')) return <Monitor size={18} color="#2D6A5A" />;
    if (name.toLowerCase().includes('écran')) return <Tv size={18} color="#2D6A5A" />;
    if (name.toLowerCase().includes('visio')) return <Video size={18} color="#2D6A5A" />;
    return <Monitor size={18} color="#2D6A5A" />;
}

export default function Create({ space, equipments, auth, occupiedSeats = [] }) {

    const { cartCount } = usePage().props;
    const [type, setType] = useState('heure');

    const { data, setData, post, processing, errors } = useForm({
        space_id: space.id,
        start_datetime: '',
        end_datetime: '',
        type: 'heure',
        equipments: [],
        seat_number: null,
    });

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Si l'espace est un open space, on empêche l'envoi sans place sélectionnée
        if (space.is_open_space && !data.seat_number) {
            return;
        }
        post(route('cart.add'));
    };

    const toggleEquipment = (id) => {
        const current = data.equipments;
        if (current.includes(id)) {
            setData('equipments', current.filter(e => e !== id));
        } else {
            setData('equipments', [...current, id]);
        }
    };

    const equipmentTotal = equipments
        .filter(e => data.equipments.includes(e.id))
        .reduce((sum, e) => sum + parseFloat(e.price), 0);

    return (
        <>
            <Head title={`Réserver — ${space.name}`} />
            <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">

                <nav className="bg-white px-12 py-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <img src="/logo.png" alt="Cowork'In" className="h-[42px]" />
                    <div className="flex items-center gap-6">
                        <Link href="/cart" className="relative flex items-center gap-1.5 text-sm text-[#2D6A5A] no-underline">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#C4714B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <a href="/spaces" className="flex items-center gap-1.5 text-sm text-[#2D6A5A] no-underline">
                            <ArrowLeft size={16} />
                            Retour aux espaces
                        </a>
                    </div>
                </nav>

                <div className="flex min-h-[calc(100vh-70px)]">

                    <div className="flex-1 p-12 overflow-y-auto">
                        <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[26px] text-[#2D6A5A] mb-2">
                            Réserver un espace
                        </h1>
                        <p className="text-sm text-[#888] mb-8">
                            Choisissez votre créneau pour <strong>{space.name}</strong>.
                        </p>

                        <div className="mb-8">
                            <label className="block font-medium text-[#2D6A5A] mb-3 text-sm">
                                Type de réservation
                            </label>
                            <div className="flex bg-white rounded-[10px] p-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] w-fit">
                                <button
                                    type="button"
                                    onClick={() => { setType('heure'); setData('type', 'heure'); }}
                                    className={`px-6 py-2.5 rounded-lg border-none text-sm font-['Roboto',sans-serif] font-medium cursor-pointer transition-all duration-200 ${type === 'heure' ? 'bg-[#2D6A5A] text-white' : 'bg-transparent text-[#888]'}`}
                                >
                                    À l'heure
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setType('demi-journee'); setData('type', 'demi-journee'); }}
                                    className={`px-6 py-2.5 rounded-lg border-none text-sm font-['Roboto',sans-serif] font-medium cursor-pointer transition-all duration-200 ${type === 'demi-journee' ? 'bg-[#2D6A5A] text-white' : 'bg-transparent text-[#888]'}`}
                                >
                                    Demi-journée
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Date de réservation
                            </label>
                            <input
                                type="date"
                                value={data.start_datetime.split('T')[0] || ''}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => setData('start_datetime', e.target.value + 'T' + (data.start_datetime.split('T')[1] || '08:00'))}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border bg-white"
                            />
                            {errors.start_datetime && (
                                <p className="text-red-500 text-xs mt-1">{errors.start_datetime}</p>
                            )}
                        </div>

                        {type === 'heure' && (
                            <>
                                <div className="mb-6">
                                    <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                        Heure de début
                                    </label>
                                    <input
                                        type="time"
                                        value={data.start_datetime.split('T')[1] || '08:00'}
                                        min="07:00"
                                        max="20:00"
                                        onChange={e => setData('start_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border bg-white"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                        Heure de fin
                                    </label>
                                    <input
                                        type="time"
                                        value={data.end_datetime.split('T')[1] || '09:00'}
                                        min={data.start_datetime.split('T')[1] || '08:00'}
                                        max="21:00"
                                        onChange={e => setData('end_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border bg-white"
                                    />
                                    {errors.end_datetime && (
                                        <p className="text-red-500 text-xs mt-1">{errors.end_datetime}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {type === 'demi-journee' && (
                            <div className="mb-6">
                                <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                    Créneau
                                </label>
                                <div className="flex gap-3">
                                    {[
                                        { label: 'Matin', value: '08:00', sublabel: '8h → 12h' },
                                        { label: 'Après-midi', value: '14:00', sublabel: '14h → 18h' },
                                    ].map((creneau) => (
                                        <button
                                            key={creneau.value}
                                            type="button"
                                            onClick={() => setData('start_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + creneau.value)}
                                            className={`flex-1 p-3.5 rounded-[10px] border-2 cursor-pointer text-center ${data.start_datetime.includes(creneau.value) ? 'border-[#2D6A5A] bg-[#E0F2FE]' : 'border-[#ddd] bg-white'}`}
                                        >
                                            <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2D6A5A] mb-1">
                                                {creneau.label}
                                            </p>
                                            <p className="text-xs text-[#888]">{creneau.sublabel}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SÉLECTION DE PLACE — uniquement pour les open space */}
                        {space.is_open_space && (
                            <div className="mb-8">
                                <label className="block font-medium text-[#2D6A5A] mb-3 text-sm">
                                    Choisissez votre place
                                </label>
                                <div className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                                    <div className="grid grid-cols-6 gap-3 mb-4">
                                        {Array.from({ length: space.capacity }, (_, i) => i + 1).map(seat => {
                                            const isOccupied = occupiedSeats.includes(seat);
                                            const isSelected = data.seat_number === seat;
                                            return (
                                                <button
                                                    key={seat}
                                                    type="button"
                                                    disabled={isOccupied}
                                                    onClick={() => setData('seat_number', seat)}
                                                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 text-xs font-['Montserrat',sans-serif] font-bold transition-all duration-200 ${isOccupied
                                                            ? 'bg-[#F3F4F6] border-[#ddd] text-[#bbb] cursor-not-allowed'
                                                            : isSelected
                                                                ? 'bg-[#2D6A5A] border-[#2D6A5A] text-white cursor-pointer'
                                                                : 'bg-white border-[#ddd] text-[#2D6A5A] cursor-pointer hover:border-[#2D6A5A]'
                                                        }`}
                                                >
                                                    <Armchair size={16} color={isOccupied ? '#bbb' : isSelected ? '#FFFFFF' : '#2D6A5A'} />
                                                    {seat}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-[#888]">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-3 h-3 rounded border-2 border-[#ddd] bg-white inline-block" />
                                            Disponible
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-3 h-3 rounded bg-[#2D6A5A] inline-block" />
                                            Sélectionnée
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-3 h-3 rounded bg-[#F3F4F6] border border-[#ddd] inline-block" />
                                            Occupée
                                        </span>
                                    </div>
                                </div>
                                {errors.seat_number && (
                                    <p className="text-red-500 text-xs mt-1">{errors.seat_number}</p>
                                )}
                            </div>
                        )}

                        {equipments.length > 0 && (
                            <div className="mb-8">
                                <label className="block font-medium text-[#2D6A5A] mb-3 text-sm">
                                    Équipements optionnels
                                </label>
                                <div className="flex flex-col gap-3">
                                    {equipments.map(equipment => {
                                        const selected = data.equipments.includes(equipment.id);
                                        return (
                                            <button
                                                key={equipment.id}
                                                type="button"
                                                onClick={() => toggleEquipment(equipment.id)}
                                                className={`flex items-center justify-between p-4 rounded-[10px] border-2 cursor-pointer text-left transition-all duration-200 ${selected ? 'border-[#2D6A5A] bg-[#E0F2FE]' : 'border-[#ddd] bg-white'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {getEquipmentIcon(equipment.name)}
                                                    <span className="text-sm font-medium text-[#1a1a1a]">
                                                        {equipment.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-[#2D6A5A]">
                                                        +{parseFloat(equipment.price).toFixed(2)}€
                                                    </span>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${selected ? 'bg-[#2D6A5A] border-[#2D6A5A]' : 'bg-white border-[#ddd]'}`}>
                                                        {selected && (
                                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="bg-[#E0F2FE] rounded-xl px-6 py-5 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-[#555]">Tarif normal</span>
                                <span className="text-sm text-[#555]">
                                    {type === 'heure' ? `${space.price_par_heure}€/h` : `${space.price_par_demi_journee}€`}
                                </span>
                            </div>

                            {auth.user.abonnement_actif && (
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-[#2D6A5A]">
                                        Réduction abonné ({auth.user.abonnement_actif.plan.tarif_reduit_pourcentage}%)
                                    </span>
                                    <span className="text-sm text-[#2D6A5A]">
                                        -{(type === 'heure' ? space.price_par_heure : space.price_par_demi_journee) * auth.user.abonnement_actif.plan.tarif_reduit_pourcentage / 100}€
                                    </span>
                                </div>
                            )}

                            {equipmentTotal > 0 && (
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-[#555]">Équipements</span>
                                    <span className="text-sm text-[#555]">+{equipmentTotal.toFixed(2)}€</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center border-t border-[rgba(0,0,0,0.08)] pt-3 mt-2">
                                <span className="font-['Montserrat',sans-serif] font-bold text-base text-[#2D6A5A]">
                                    Total estimé
                                </span>
                                <span className="font-['Montserrat',sans-serif] font-extrabold text-xl text-[#2D6A5A]">
                                    {(() => {
                                        let base = 0;
                                        if (type === 'heure') {
                                            const start = data.start_datetime.split('T')[1];
                                            const end = data.end_datetime.split('T')[1];
                                            if (start && end) {
                                                const [sh, sm] = start.split(':').map(Number);
                                                const [eh, em] = end.split(':').map(Number);
                                                const duree = (eh * 60 + em - (sh * 60 + sm)) / 60;
                                                base = duree > 0 ? duree * parseFloat(space.price_par_heure) : 0;
                                            }
                                        } else {
                                            base = parseFloat(space.price_par_demi_journee);
                                        }
                                        const reduction = auth.user.abonnement_actif
                                            ? auth.user.abonnement_actif.plan.tarif_reduit_pourcentage
                                            : 0;
                                        return (base * (1 - reduction / 100) + equipmentTotal).toFixed(2);
                                    })()}€
                                </span>
                            </div>

                            {space.is_open_space && !data.seat_number && (
                                <p className="text-xs text-[#C4714B] font-medium mt-3">
                                    Veuillez sélectionner une place ci-dessus avant de continuer.
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={processing || (space.is_open_space && !data.seat_number)}
                                className={`w-full p-3.5 mt-4 text-white border-none rounded-[10px] text-base font-['Montserrat',sans-serif] font-bold transition-colors duration-200 ${processing || (space.is_open_space && !data.seat_number) ? 'bg-[#aaa] cursor-not-allowed' : 'bg-[#2D6A5A] cursor-pointer hover:bg-[#1a4237]'}`}
                            >
                                {processing ? 'Ajout au panier en cours...' : 'Ajouter au panier'}
                            </button>
                        </div>
                    </div>

                    <div className="w-[420px] shrink-0 sticky top-0 h-screen">
                        {space.image ? (
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                className="w-full h-full object-cover block"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#E0F2FE] flex flex-col items-center justify-center gap-4">
                                <p className="font-['Montserrat',sans-serif] font-bold text-[22px] text-[#2D6A5A]">
                                    {space.name}
                                </p>
                                <p className="text-sm text-[#555]">
                                    {space.capacity} personne{space.capacity > 1 ? 's' : ''} · {space.price_par_heure}€/h
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}