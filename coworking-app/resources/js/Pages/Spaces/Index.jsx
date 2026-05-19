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
    'bureau_individuel': '#E0F2FE',
    'bureau_partage': '#E0F2FE',
    'salle_reunion': '#FCE7F3',
    'espace_detente': '#F5F0EA',
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
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
        }}>
            <Head title="Espaces — Cowork'In" />

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
                <Link href="/dashboard" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    color: '#2D6A5A',
                    textDecoration: 'none',
                }}>
                    <ArrowLeft size={16} />
                    Retour au dashboard
                </Link>
            </nav>

            <main style={{ padding: '48px 10%' }}>

                {/* HEADER */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px',
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '800',
                            fontSize: '28px',
                            color: '#2D6A5A',
                            marginBottom: '4px',
                        }}>
                            Nos espaces
                        </h1>
                        <p style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '300',
                            fontSize: '14px',
                            color: '#888888',
                        }}>
                            {spaces.length} espace{spaces.length > 1 ? 's' : ''} trouvé{spaces.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    {canManage && (
                        <Link href="/spaces/create" style={{
                            backgroundColor: '#2D6A5A',
                            color: '#FFFFFF',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '14px',
                            padding: '10px 22px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <Plus size={16} />
                            Nouvel espace
                        </Link>
                    )}
                </div>

                {/* BARRE DE FILTRES */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '20px 24px',
                    marginBottom: '32px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                }}>
                    {/* FILTRE TYPE */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#2D6A5A',
                            marginBottom: '6px',
                        }}>
                            Type d'espace
                        </label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                fontFamily: 'Roboto, sans-serif',
                                backgroundColor: '#FFFFFF',
                                color: type ? '#1a1a1a' : '#aaa',
                                boxSizing: 'border-box',
                            }}
                        >
                            <option value="">Tous les types</option>
                            {Object.entries(typeLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* FILTRE CAPACITÉ */}
                    <div style={{ flex: 1, minWidth: '140px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#2D6A5A',
                            marginBottom: '6px',
                        }}>
                            Capacité minimum
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={capaciteMin}
                            onChange={e => setCapaciteMin(e.target.value)}
                            placeholder="Ex : 4"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                fontFamily: 'Roboto, sans-serif',
                                backgroundColor: '#FFFFFF',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    {/* FILTRE DATE */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#2D6A5A',
                            marginBottom: '6px',
                        }}>
                            Disponible le
                        </label>
                        <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                fontFamily: 'Roboto, sans-serif',
                                backgroundColor: '#FFFFFF',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    {/* BOUTONS */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleFilter}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2D6A5A',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <Search size={15} />
                            Rechercher
                        </button>

                        {hasActiveFilters && (
                            <button
                                onClick={handleReset}
                                style={{
                                    padding: '10px 16px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#888',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                <X size={15} />
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </div>

                {/* GRILLE DES ESPACES */}
                {spaces.length === 0 ? (
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '64px 48px',
                        textAlign: 'center',
                        color: '#888888',
                    }}>
                        <p style={{ fontSize: '15px', marginBottom: '12px' }}>
                            Aucun espace ne correspond à vos critères.
                        </p>
                        <button
                            onClick={handleReset}
                            style={{
                                backgroundColor: '#2D6A5A',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                fontFamily: 'Roboto, sans-serif',
                            }}
                        >
                            Voir tous les espaces
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                    }}>
                        {spaces.map((space) => (
                            <div key={space.id} style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            }}>
                                {/* IMAGE */}
                                <div style={{ position: 'relative' }}>
                                    {space.image ? (
                                        <img
                                            src={`/storage/${space.image}`}
                                            alt={space.name}
                                            style={{
                                                width: '100%',
                                                height: '180px',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '180px',
                                            backgroundColor: typeColors[space.type] || '#E0F2FE',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <ImageIcon size={32} color="#2D6A5A" opacity={0.3} />
                                        </div>
                                    )}

                                    {/* BADGE TYPE sur l'image */}
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: '#2D6A5A',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '500',
                                        fontSize: '11px',
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                    }}>
                                        {typeLabels[space.type] || space.type}
                                    </span>

                                    {/* BADGE DISPONIBILITÉ sur l'image */}
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: space.is_available ? '#DCFCE7' : '#FEE2E2',
                                        color: space.is_available ? '#166534' : '#991B1B',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '600',
                                        fontSize: '11px',
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}>
                                        {space.is_available
                                            ? <><CheckCircle size={11} /> Disponible</>
                                            : <><XCircle size={11} /> Indisponible</>
                                        }
                                    </span>
                                </div>

                                {/* INFOS */}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '700',
                                        fontSize: '17px',
                                        color: '#2D6A5A',
                                        marginBottom: '8px',
                                    }}>
                                        {space.name}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '300',
                                        fontSize: '13px',
                                        color: '#666666',
                                        lineHeight: '1.5',
                                        marginBottom: '16px',
                                        minHeight: '40px',
                                    }}>
                                        {space.description}
                                    </p>

                                    {/* CAPACITÉ + PRIX */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '16px',
                                        fontSize: '13px',
                                        color: '#555555',
                                    }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Users size={14} color="#555555" />
                                            {space.capacity} personne{space.capacity > 1 ? 's' : ''}
                                        </span>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={14} color="#555555" />
                                                {space.price_par_heure}€/h
                                            </span>
                                            {space.price_par_demi_journee && (
                                                <span style={{ fontSize: '12px', color: '#888' }}>
                                                    {space.price_par_demi_journee}€ / demi-journée
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {!canManage && space.is_available && (
                                            <Link
                                                href={`/reservations/create?space_id=${space.id}`}
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: '#2D6A5A',
                                                    color: '#FFFFFF',
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: '500',
                                                    fontSize: '13px',
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Réserver
                                            </Link>
                                        )}

                                        {canManage && (
                                            <Link
                                                href={`/spaces/${space.id}`}
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: '#E0F2FE',
                                                    color: '#2D6A5A',
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: '500',
                                                    fontSize: '13px',
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Voir les réservations
                                            </Link>
                                        )}

                                        {canManage && (
                                            <Link
                                                href={`/spaces/${space.id}/edit`}
                                                style={{
                                                    backgroundColor: '#F5F0EA',
                                                    color: '#2D6A5A',
                                                    padding: '10px 14px',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
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