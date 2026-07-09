import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, QrCode, CheckCircle, Clock, XCircle, User, MapPin, Calendar, Download, Pencil, Search, Filter } from 'lucide-react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
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

function getStatutStyle(statut) {
    switch (statut) {
        case 'confirmed': return { bg: '#DCFCE7', color: '#166534', label: 'Confirmée' };
        case 'pending': return { bg: '#FEF9C3', color: '#854D0E', label: 'En attente' };
        case 'cancelled': return { bg: '#FEE2E2', color: '#991B1B', label: 'Annulée' };
        default: return { bg: '#F3F4F6', color: '#374151', label: statut };
    }
}

// ─────────────────────────────────────────────
// COMPOSANT — FILTRES ADMIN/MANAGER
// ─────────────────────────────────────────────

function FilterBar({ filters, onFilter }) {
    // État local des champs — initialisé avec les filtres actifs
    // reçus depuis Laravel (pour conserver les filtres au rechargement)
    const [form, setForm] = useState({
        search: filters.search || '',
        status: filters.status || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        // On ne garde que les filtres non vides
        // pour ne pas envoyer des paramètres vides à Laravel
        const activeFilters = Object.fromEntries(
            Object.entries(form).filter(([_, v]) => v !== '')
        );

        router.get(route('reservations.index'), activeFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        const empty = { search: '', status: '', date_from: '', date_to: '' };
        setForm(empty);
        router.get(route('reservations.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    // Nombre de filtres actifs pour afficher un badge
    const activeCount = Object.values(form).filter(v => v !== '').length;

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: '24px',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
            }}>
                <Filter size={16} color="#2D6A5A" />
                <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#2D6A5A',
                }}>
                    Filtres
                </span>
                {activeCount > 0 && (
                    // Badge indiquant le nombre de filtres actifs
                    <span style={{
                        backgroundColor: '#C4714B',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '20px',
                    }}>
                        {activeCount} actif{activeCount > 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
            }}>
                {/* RECHERCHE PAR NOM / EMAIL */}
                <div>
                    <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                        Nom ou email utilisateur
                    </label>
                    <div style={{ position: 'relative' }}>
                        <Search size={14} color="#aaa" style={{
                            position: 'absolute', left: '10px', top: '50%',
                            transform: 'translateY(-50%)'
                        }} />
                        <input
                            type="text"
                            value={form.search}
                            placeholder="Rechercher..."
                            onChange={e => handleChange('search', e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            style={{
                                width: '100%',
                                padding: '8px 12px 8px 32px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '13px',
                                boxSizing: 'border-box',
                                backgroundColor: '#FAFAFA',
                            }}
                        />
                    </div>
                </div>

                {/* FILTRE PAR STATUT */}
                <div>
                    <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                        Statut
                    </label>
                    <select
                        value={form.status}
                        onChange={e => handleChange('status', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            backgroundColor: '#FAFAFA',
                            color: form.status ? '#1a1a1a' : '#aaa',
                        }}
                    >
                        <option value="">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="cancelled">Annulée</option>
                    </select>
                </div>

                {/* FILTRE DATE DE DÉBUT */}
                <div>
                    <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                        Date de début (à partir du)
                    </label>
                    <input
                        type="date"
                        value={form.date_from}
                        onChange={e => handleChange('date_from', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            backgroundColor: '#FAFAFA',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                {/* FILTRE DATE DE FIN */}
                <div>
                    <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                        Date de fin (jusqu'au)
                    </label>
                    <input
                        type="date"
                        value={form.date_to}
                        onChange={e => handleChange('date_to', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            backgroundColor: '#FAFAFA',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
            </div>

            {/* BOUTONS FILTRER / RÉINITIALISER */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#2D6A5A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '700',
                        cursor: 'pointer',
                    }}
                >
                    Filtrer
                </button>
                {activeCount > 0 && (
                    <button
                        onClick={handleReset}
                        style={{
                            padding: '8px 20px',
                            backgroundColor: '#FFFFFF',
                            color: '#888',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}
                    >
                        Réinitialiser
                    </button>
                )}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// COMPOSANT — FILTRES CLIENT/MEMBER (frontend)
// ─────────────────────────────────────────────

function ClientFilterBar({ onFilter }) {
    // Pour les clients, on filtre côté React sans requête serveur
    const [status, setStatus] = useState('');
    const [dateFrom, setDateFrom] = useState('');

    const handleChange = (key, value) => {
        const next = {
            status: key === 'status' ? value : status,
            date_from: key === 'dateFrom' ? value : dateFrom,
        };
        if (key === 'status') setStatus(value);
        if (key === 'dateFrom') setDateFrom(value);
        // On remonte les filtres au parent via le callback
        onFilter(next);
    };

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '16px 24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
        }}>
            <div>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                    Statut
                </label>
                <select
                    value={status}
                    onChange={e => handleChange('status', e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '13px',
                        backgroundColor: '#FAFAFA',
                    }}
                >
                    <option value="">Tous</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="cancelled">Annulée</option>
                </select>
            </div>

            <div>
                <label style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>
                    À partir du
                </label>
                <input
                    type="date"
                    value={dateFrom}
                    onChange={e => handleChange('dateFrom', e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        fontSize: '13px',
                        backgroundColor: '#FAFAFA',
                    }}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// COMPOSANT — MODALE QR CODE
// ─────────────────────────────────────────────

function QrModal({ reservation, onClose }) {
    const qrValue = `${window.location.origin}/access/${reservation.qr_token}`;

    const downloadQR = () => {
        // On récupère le canvas caché, on le convertit en PNG
        // et on déclenche le téléchargement
        const canvas = document.getElementById('qr-canvas');
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-reservation-${reservation.id}.png`;
        a.click();
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', zIndex: 1000, padding: '24px',
            }}
        >
            <div onClick={e => e.stopPropagation()} style={{
                backgroundColor: '#FFFFFF', borderRadius: '16px',
                padding: '40px', maxWidth: '380px', width: '100%',
                textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: '20px', color: '#2D6A5A', marginBottom: '4px' }}>
                    Votre accès
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '28px' }}>
                    Présentez ce QR code à l'entrée de l'espace.
                </p>

                <div style={{
                    display: 'inline-block', padding: '16px',
                    backgroundColor: '#FFFFFF', borderRadius: '12px',
                    border: '2px solid #E0F2FE', marginBottom: '24px',
                }}>
                    <QRCodeSVG value={qrValue} size={200} fgColor="#2D6A5A" bgColor="#FFFFFF" level="M" />
                </div>

                {/* Canvas caché — sert uniquement à générer le PNG téléchargeable */}
                <QRCodeCanvas
                    id="qr-canvas"
                    value={qrValue}
                    size={200}
                    fgColor="#2D6A5A"
                    bgColor="#FFFFFF"
                    level="M"
                    style={{ display: 'none' }}
                />

                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '15px', color: '#1a1a1a', marginBottom: '4px' }}>
                    {reservation.space.name}
                </p>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
                    {formatDate(reservation.start_time)} · {formatHeure(reservation.start_time)} → {formatHeure(reservation.end_time)}
                </p>

                <button onClick={onClose} style={{
                    width: '100%', padding: '12px', backgroundColor: '#2D6A5A',
                    color: '#FFFFFF', border: 'none', borderRadius: '10px',
                    fontSize: '14px', fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700', cursor: 'pointer', marginBottom: '8px',
                }}>
                    Fermer
                </button>

                <button onClick={downloadQR} style={{
                    width: '100%', padding: '12px', backgroundColor: '#E0F2FE',
                    color: '#2D6A5A', border: '1px solid #93C5FD', borderRadius: '10px',
                    fontSize: '14px', fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700', cursor: 'pointer',
                }}>
                    Télécharger le QR code
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
            backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex',
            gap: '20px', alignItems: 'flex-start',
        }}>
            {/* IMAGE ESPACE */}
            <div style={{
                width: '80px', height: '80px', borderRadius: '10px',
                overflow: 'hidden', flexShrink: 0, backgroundColor: '#E0F2FE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {reservation.space.image ? (
                    <img src={`/storage/${reservation.space.image}`} alt={reservation.space.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <MapPin size={24} color="#2D6A5A" />
                )}
            </div>

            {/* INFOS */}
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '8px',
                    flexWrap: 'wrap', gap: '8px',
                }}>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '16px', color: '#1a1a1a', margin: 0 }}>
                        {reservation.space.name}
                    </h3>
                    <span style={{
                        backgroundColor: statut.bg, color: statut.color,
                        fontSize: '12px', fontWeight: '600',
                        padding: '4px 12px', borderRadius: '20px',
                    }}>
                        {statut.label}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                    <Calendar size={13} color="#2D6A5A" />
                    {formatDate(reservation.start_time)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                    <Clock size={13} color="#2D6A5A" />
                    {formatHeure(reservation.start_time)} → {formatHeure(reservation.end_time)}
                    &nbsp;·&nbsp;
                    {reservation.type === 'heure' ? 'À l\'heure' : 'Demi-journée'}
                </div>

                {isAdminOrManager && reservation.user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888', marginBottom: '8px' }}>
                        <User size={13} color="#888" />
                        {reservation.user.name} — {reservation.user.email}
                    </div>
                )}

                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginTop: '12px',
                    flexWrap: 'wrap', gap: '10px',
                }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: '18px', color: '#2D6A5A' }}>
                        {parseFloat(reservation.total_price).toFixed(2)}€
                    </span>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {!isAdminOrManager && reservation.status === 'confirmed' && (
                            <button onClick={onShowQr} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', backgroundColor: '#2D6A5A',
                                color: '#FFFFFF', border: 'none', borderRadius: '8px',
                                fontSize: '13px', cursor: 'pointer',
                            }}>
                                <QrCode size={15} />
                                Afficher mon accès
                            </button>
                        )}

                        {isAdminOrManager && reservation.status === 'pending' && (
                            <button onClick={handleConfirm} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', backgroundColor: '#2D6A5A',
                                color: '#FFFFFF', border: 'none', borderRadius: '8px',
                                fontSize: '13px', cursor: 'pointer',
                            }}>
                                <CheckCircle size={15} />
                                Confirmer
                            </button>
                        )}

                        {!isAdminOrManager && reservation.status === 'confirmed' && (
                            <a href={route('reservations.invoice', reservation.id)} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', backgroundColor: '#F5F0EA',
                                color: '#2D6A5A', border: '1px solid #ddd',
                                borderRadius: '8px', fontSize: '13px',
                                textDecoration: 'none', cursor: 'pointer',
                            }}>
                                <Download size={15} />
                                Facture PDF
                            </a>
                        )}

                        {!isAdminOrManager && reservation.status === 'pending' && (
                            <button onClick={() => router.get(route('reservations.edit', reservation.id))} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', backgroundColor: '#E0F2FE',
                                color: '#2D6A5A', border: '1px solid #93C5FD',
                                borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                            }}>
                                <Pencil size={15} />
                                Modifier
                            </button>
                        )}

                        {reservation.status === 'pending' && (
                            <button onClick={handleCancel} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', backgroundColor: '#FEF2F2',
                                color: '#B91C1C', border: '1px solid #FECACA',
                                borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                            }}>
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

export default function Index({ reservations, auth, filters = {} }) {
    const [selectedReservation, setSelectedReservation] = useState(null);

    // Filtres frontend pour client/member
    const [clientFilters, setClientFilters] = useState({ status: '', date_from: '' });

    const isAdminOrManager = auth.user.role === 'admin' || auth.user.role === 'manager';

    // Pour client/member : on filtre les réservations côté React
    const displayedReservations = isAdminOrManager
        ? reservations
        : reservations.filter(r => {
            const matchStatus = clientFilters.status === '' || r.status === clientFilters.status;
            const matchDate = clientFilters.date_from === '' ||
                new Date(r.start_time) >= new Date(clientFilters.date_from);
            return matchStatus && matchDate;
        });

    return (
        <>
            <Head title="Réservations" />
            <div style={{ minHeight: '100vh', backgroundColor: '#F5F0EA', fontFamily: 'Roboto, sans-serif' }}>

                {/* NAVBAR */}
                <nav style={{
                    backgroundColor: '#FFFFFF', padding: '14px 48px',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                    <img src="/logo.png" alt="Cowork'In" style={{ height: '42px' }} />
                    <a href="/dashboard" style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        fontSize: '14px', color: '#2D6A5A', textDecoration: 'none',
                    }}>
                        <ArrowLeft size={16} />
                        Tableau de bord
                    </a>
                </nav>

                {/* CONTENU */}
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif', fontWeight: '800',
                        fontSize: '26px', color: '#2D6A5A', marginBottom: '8px',
                    }}>
                        {isAdminOrManager ? 'Toutes les réservations' : 'Mes réservations'}
                    </h1>
                    <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>
                        {displayedReservations.length} réservation{displayedReservations.length > 1 ? 's' : ''}
                    </p>

                    {/* FILTRES — admin/manager : backend | client/member : frontend */}
                    {isAdminOrManager
                        ? <FilterBar filters={filters} />
                        : <ClientFilterBar onFilter={setClientFilters} />
                    }

                    {displayedReservations.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '64px 0', color: '#aaa', fontSize: '15px' }}>
                            Aucune réservation ne correspond à vos filtres.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {displayedReservations.map(reservation => (
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