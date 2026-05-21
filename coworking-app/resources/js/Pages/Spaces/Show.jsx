import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Users, Clock, Calendar, CheckCircle, XCircle, ImageIcon } from 'lucide-react';

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

export default function Show({ space, reservations }) {

    return (
        <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">
            <Head title={`${space.name} — Réservations`} />

            {/* NAVBAR */}
            <nav className="bg-white px-12 py-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <Link href="/dashboard">
                    <img src="/logo.png" alt="Cowork'In" className="h-[42px] w-auto" />
                </Link>
                <Link href="/spaces" className="flex items-center gap-1.5 text-sm text-[#2D6A5A] no-underline">
                    <ArrowLeft size={16} />
                    Retour aux espaces
                </Link>
            </nav>

            <main className="px-[10%] py-12">

                {/* Fiche espace */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] mb-8 flex">
                    {/* Image */}
                    <div className="w-[320px] shrink-0">
                        {space.image ? (
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                className="w-full h-full object-cover block"
                            />
                        ) : (
                            <div className="w-full h-full min-h-[200px] bg-[#E0F2FE] flex items-center justify-center">
                                <ImageIcon size={48} color="#2D6A5A" opacity={0.3} />
                            </div>
                        )}
                    </div>

                    {/* Infos */}
                    <div className="p-8 flex-1">
                        <span className="bg-[#E0F2FE] text-[#2D6A5A] text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block">
                            {typeLabels[space.type] || space.type}
                        </span>

                        <h1 className="font-['Montserrat',sans-serif] font-extrabold text-2xl text-[#2D6A5A] mb-2">
                            {space.name}
                        </h1>

                        <p className="text-sm text-[#666] leading-relaxed mb-5">
                            {space.description}
                        </p>

                        <div className="flex gap-6 text-sm text-[#555]">
                            <span className="flex items-center gap-1.5">
                                <Users size={14} /> {space.capacity} personne{space.capacity > 1 ? 's' : ''}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} /> {space.price_par_heure}€/h
                            </span>
                            <span className={`flex items-center gap-1.5 ${space.is_available ? 'text-[#065F46]' : 'text-[#991B1B]'}`}>
                                {space.is_available
                                    ? <><CheckCircle size={14} /> Disponible</>
                                    : <><XCircle size={14} /> Indisponible</>
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Liste des réservations */}
                <h2 className="font-['Montserrat',sans-serif] font-bold text-xl text-[#2D6A5A] mb-4">
                    Réservations en cours
                </h2>

                {reservations.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center text-[#888]">
                        Aucune réservation pour cet espace.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {reservations.map((reservation) => (
                            <div key={reservation.id} className="bg-white rounded-xl py-5 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center font-['Montserrat',sans-serif] font-bold text-[#2D6A5A] text-sm">
                                        {reservation.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#2D6A5A] mb-0.5">
                                            {reservation.user.name}
                                        </p>
                                        <p className="text-xs text-[#888]">
                                            {reservation.user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-[13px] text-[#555] flex items-center gap-1.5 justify-center">
                                        <Calendar size={13} />
                                        {new Date(reservation.start_time).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-xs text-[#888] mt-1">
                                        {new Date(reservation.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        {' → '}
                                        {new Date(reservation.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                                    reservation.status === 'confirmed' ? 'bg-[#D1FAE5] text-[#065F46]' :
                                        reservation.status === 'cancelled' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF9C3] text-[#854D0E]'
                                }`}>
                                    {reservation.status === 'confirmed' ? 'Confirmée' :
                                        reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                                </div>

                                <p className="font-['Montserrat',sans-serif] font-bold text-[15px] text-[#2D6A5A]">
                                    {reservation.total_price}€
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}