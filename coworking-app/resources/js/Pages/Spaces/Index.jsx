import { Head, Link, usePage } from '@inertiajs/react';
import { Users, Clock, CheckCircle, XCircle, Pencil, Plus, ArrowLeft, ImageIcon } from 'lucide-react';

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

export default function Index({ spaces }) {
    const { auth } = usePage().props;
    const role = auth.user.role;
    const canManage = role === 'admin' || role === 'manager';

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

            {/* CONTENU */}
            <main style={{ padding: '48px 10%' }}>

                {/* En-tête */}
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
                            {spaces.length} espace{spaces.length > 1 ? 's' : ''} disponible{spaces.length > 1 ? 's' : ''}
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

                {/* Grille des espaces */}
                {spaces.length === 0 ? (
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '48px',
                        textAlign: 'center',
                        color: '#888888',
                        fontFamily: 'Roboto, sans-serif',
                    }}>
                        Aucun espace disponible pour le moment.
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
                                {/* Badge type */}
                                <div style={{
                                    backgroundColor: typeColors[space.type] || '#E0F2FE',
                                    padding: '20px 20px 16px',
                                }}>
                                    <span style={{
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        color: '#2D6A5A',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '500',
                                        fontSize: '12px',
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                    }}>
                                        {typeLabels[space.type] || space.type}
                                    </span>
                                </div>
                                {/* Image */}
                                {space.image ? (
                                    <img
                                        src={`/storage/${space.image}`}
                                        alt={space.name}
                                        style={{
                                            width: '100%',
                                            height: '160px',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '160px',
                                        backgroundColor: '#E0F2FE',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <ImageIcon size={32} color="#2D6A5A" opacity={0.3} />
                                    </div>
                                )}

                                {/* Infos */}
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

                                    {/* Capacité + Prix */}
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
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} color="#555555" />
                                            {space.price_par_heure}€/h
                                        </span>
                                    </div>

                                    {/* Disponibilité */}
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backgroundColor: space.is_available ? '#D1FAE5' : '#FEE2E2',
                                        color: space.is_available ? '#065F46' : '#991B1B',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                        marginBottom: '16px',
                                    }}>
                                        {space.is_available
                                            ? <><CheckCircle size={12} /> Disponible</>
                                            : <><XCircle size={12} /> Indisponible</>
                                        }
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
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