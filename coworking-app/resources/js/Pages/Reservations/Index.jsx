import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, QrCode, CheckCircle, Clock, XCircle, User, MapPin, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// ─────────────────────────────────────────────
// UTILITAIRES
// ─────────────────────────────────────────────

// Formate une date ISO en "lundi 12 mai 2025 · 09h00"
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function formatHeure(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// Retourne couleur de fond + texte selon le statut
function getStatutStyle(statut) {
    switch (statut) {
        case 'confirmed':
            return { bg: '#DCFCE7', color: '#166534', label: 'Confirmée' };
        case 'pending':
            return { bg: '#FEF9C3', color: '#854D0E', label: 'En attente' };
        case 'cancelled':
            return { bg: '#FEE2E2', color: '#991B1B', label: 'Annulée' };
        default:
            return { bg: '#F3F4F6', color: '#374151', label: statut };
    }
}

// ─────────────────────────────────────────────
// COMPOSANT — MODALE QR CODE
// ─────────────────────────────────────────────

function QrModal({ reservation, onClose }) {
    // L'URL encodée dans le QR code — utilisée par
    // le système de contrôle d'accès pour vérifier
    // la validité de la réservation au moment du scan.
    const qrValue = `${window.location.origin}/access/${reservation.qr_token}`;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '24px',
            }}
        >
            {/* On stoppe la propagation pour ne pas fermer
                la modale quand on clique à l'intérieur */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '40px',
                    maxWidth: '380px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                }}
            >
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    color: '#2D6A5A',
                    marginBottom: '4px',
                }}>
                    Votre accès
                </h2>
                <p style={{
                    fontSize: '13px',
                    color: '#888',
                    marginBottom: '28px',
                }}>
                    Présentez ce QR code à l'entrée de l'espace.
                </p>

                {/* QR CODE */}
                <div style={{
                    display: 'inline-block',
                    padding: '16px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '2px solid #E0F2FE',
                    marginBottom: '24px',
                }}>
                    <QRCodeSVG
                        value={qrValue}
                        size={200}
                        // fgColor → couleur des modules (carrés) du QR code
                        fgColor="#2D6A5A"
                        bgColor="#FFFFFF"
                        level="M"
                    // level="M" → correction d'erreur moyenne (15%)
                    // permet de scanner même si le code est légèrement abîmé
                    />
                </div>

                {/* INFOS RÉSERVATION */}
                <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '15px',
                    color: '#1a1a1a',
                    marginBottom: '4px',
                }}>
                    {reservation.space.name}
                </p>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
                    {formatDate(reservation.start_time)} · {formatHeure(reservation.start_time)} → {formatHeure(reservation.end_time)}
                </p>

                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#2D6A5A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '700',
                        cursor: 'pointer',
                    }}
                >
                    Fermer
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// COMPOSANT — CARTE RÉSERVATION
// ─────────────────────────────────────────────

function ReservationCard({ reservation, isAdminOrManager, onShowQr }) {
    const statut = getStatutStyle(reservation.status);

    const handleCancel = () => {
        if (!confirm('Confirmer l\'annulation de cette réservation ?')) return;
        router.patch(route('reservations.cancel', reservation.id));
    };

    const handleConfirm = () => {
        router.patch(route('reservations.confirm', reservation.id));
    };

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
        }}>
            {/* IMAGE ESPACE */}
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {reservation.space.image ? (
                    <img
                        src={`/storage/${reservation.space.image}`}
                        alt={reservation.space.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <MapPin size={24} color="#2D6A5A" />
                )}
            </div>

            {/* INFOS */}
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                    gap: '8px',
                }}>
                    <h3 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '700',
                        fontSize: '16px',
                        color: '#1a1a1a',
                        margin: 0,
                    }}>
                        {reservation.space.name}
                    </h3>

                    {/* BADGE STATUT */}
                    <span style={{
                        backgroundColor: statut.bg,
                        color: statut.color,
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 12px',
                        borderRadius: '20px',
                    }}>
                        {statut.label}
                    </span>
                </div>

                {/* DATE & HEURES */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#555',
                    marginBottom: '4px',
                }}>
                    <Calendar size={13} color="#2D6A5A" />
                    {formatDate(reservation.start_time)}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#555',
                    marginBottom: '8px',
                }}>
                    <Clock size={13} color="#2D6A5A" />
                    {formatHeure(reservation.start_time)} → {formatHeure(reservation.end_time)}
                    &nbsp;·&nbsp;
                    {reservation.type === 'heure' ? 'À l\'heure' : 'Demi-journée'}
                </div>

                {/* NOM UTILISATEUR (admin/manager uniquement) */}
                {isAdminOrManager && reservation.user && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: '#888',
                        marginBottom: '8px',
                    }}>
                        <User size={13} color="#888" />
                        {reservation.user.name} — {reservation.user.email}
                    </div>
                )}

                {/* PRIX + ACTIONS */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}>
                    <span style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '18px',
                        color: '#2D6A5A',
                    }}>
                        {parseFloat(reservation.total_price).toFixed(2)}€
                    </span>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

                        {/* BOUTON QR CODE — client/member, statut confirmed uniquement */}
                        {!isAdminOrManager && reservation.status === 'confirmed' && (
                            <button
                                onClick={onShowQr}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 16px',
                                    backgroundColor: '#2D6A5A',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                <QrCode size={15} />
                                Afficher mon accès
                            </button>
                        )}

                        {/* BOUTON CONFIRMER — admin/manager, statut pending uniquement */}
                        {isAdminOrManager && reservation.status === 'pending' && (
                            <button
                                onClick={handleConfirm} className="display-flex align-items-center gap-6px padding-8px 16px background-color-2D6A5A color-FFFFFF border-none border-radius-8px font-size-13px font-family-Roboto, sans-serif font-weight-500 cursor-pointer"
                            >
                                <CheckCircle size={15} />
                                Confirmer
                            </button>
                        )}

                        {/* BOUTON ANNULER — tous, statut pending uniquement */}
                        {reservation.status === 'pending' && (
                            <button
                                onClick={handleCancel}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 16px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#991B1B',
                                    border: '1px solid #FCA5A5',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                <XCircle size={15} />
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────

export default function Index({ reservations, auth }) {

    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const isAdminOrManager = auth.user.role === 'admin' || auth.user.role === 'manager';

    return (
        <>
            <Head title="Réservations" />
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#F5F0EA',
                fontFamily: 'Roboto, sans-serif',
            }}>
                {/* NAVBAR */}
                <nav style={{
                    backgroundColor: '#FFFFFF',
                    padding: '14px 48px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <img src="/logo.png" alt="Cowork'In" style={{ height: '42px' }} />
                    <a href="/dashboard" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        color: '#2D6A5A',
                        textDecoration: 'none',
                    }}>
                        <ArrowLeft size={16} />
                        Tableau de bord
                    </a>
                </nav>

                {/* CONTENU */}
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '26px',
                        color: '#2D6A5A',
                        marginBottom: '8px',
                    }}>
                        {isAdminOrManager ? 'Toutes les réservations' : 'Mes réservations'}
                    </h1>
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>
                        {reservations.length} réservation{reservations.length > 1 ? 's' : ''}
                    </p>

                    {reservations.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '64px 0',
                            color: '#aaa',
                            fontSize: '15px',
                        }}>
                            Aucune réservation pour le moment.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {reservations.map(reservation => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    isAdminOrManager={isAdminOrManager}
                                    onShowQr={() => setSelectedReservation(reservation)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* MODALE QR CODE */}
                {selectedReservation && (
                    <QrModal
                        reservation={selectedReservation}
                        onClose={() => setSelectedReservation(null)}
                    />
                )}
            </div>
        </>
    );
}