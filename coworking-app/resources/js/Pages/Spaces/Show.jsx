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
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
        }}>
            <Head title={`${space.name} — Réservations`} />

            {/* NAVBAR */}
            <nav style={{
                backgroundColor: '#FFFFFF',
                padding: '14px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                <Link href="/dashboard">
                    <img src="/logo.png" alt="Cowork'In" style={{ height: '42px', width: 'auto' }} />
                </Link>
                <Link href="/spaces" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    color: '#2D6A5A',
                    textDecoration: 'none',
                }}>
                    <ArrowLeft size={16} />
                    Retour aux espaces
                </Link>
            </nav>

            <main style={{ padding: '48px 10%' }}>

                {/* Fiche espace */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    marginBottom: '32px',
                    display: 'flex',
                }}>
                    {/* Image */}
                    <div style={{ width: '320px', flexShrink: 0 }}>
                        {space.image ? (
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '200px',
                                backgroundColor: '#E0F2FE',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ImageIcon size={48} color="#2D6A5A" opacity={0.3} />
                            </div>
                        )}
                    </div>

                    {/* Infos */}
                    <div style={{ padding: '32px', flex: 1 }}>
                        <span style={{
                            backgroundColor: '#E0F2FE',
                            color: '#2D6A5A',
                            fontSize: '12px',
                            fontWeight: '500',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            marginBottom: '12px',
                            display: 'inline-block',
                        }}>
                            {typeLabels[space.type] || space.type}
                        </span>

                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '800',
                            fontSize: '24px',
                            color: '#2D6A5A',
                            marginBottom: '8px',
                        }}>
                            {space.name}
                        </h1>

                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            marginBottom: '20px',
                        }}>
                            {space.description}
                        </p>

                        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#555' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Users size={14} /> {space.capacity} personne{space.capacity > 1 ? 's' : ''}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Clock size={14} /> {space.price_par_heure}€/h
                            </span>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: space.is_available ? '#065F46' : '#991B1B',
                            }}>
                                {space.is_available
                                    ? <><CheckCircle size={14} /> Disponible</>
                                    : <><XCircle size={14} /> Indisponible</>
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Liste des réservations */}
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '20px',
                    color: '#2D6A5A',
                    marginBottom: '16px',
                }}>
                    Réservations en cours
                </h2>

                {reservations.length === 0 ? (
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '48px',
                        textAlign: 'center',
                        color: '#888',
                    }}>
                        Aucune réservation pour cet espace.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {reservations.map((reservation) => (
                            <div key={reservation.id} style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                padding: '20px 24px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#E0F2FE',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '700',
                                        color: '#2D6A5A',
                                        fontSize: '14px',
                                    }}>
                                        {reservation.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            color: '#2D6A5A',
                                            marginBottom: '2px',
                                        }}>
                                            {reservation.user.name}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#888' }}>
                                            {reservation.user.email}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={13} />
                                        {new Date(reservation.start_time).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                                        {new Date(reservation.start_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        {' → '}
                                        {new Date(reservation.end_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                <div style={{
                                    backgroundColor:
                                        reservation.status === 'confirmed' ? '#D1FAE5' :
                                            reservation.status === 'cancelled' ? '#FEE2E2' : '#FEF9C3',
                                    color:
                                        reservation.status === 'confirmed' ? '#065F46' :
                                            reservation.status === 'cancelled' ? '#991B1B' : '#854D0E',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                }}>
                                    {reservation.status === 'confirmed' ? 'Confirmée' :
                                        reservation.status === 'cancelled' ? 'Annulée' : 'En attente'}
                                </div>

                                <p style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    color: '#2D6A5A',
                                }}>
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