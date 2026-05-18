import { useForm, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

export default function Create({ space, auth }) {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const [type, setType] = useState('heure');


    const { data, setData, post, processing, errors } = useForm({
        space_id: space.id,
        start_datetime: '',
        end_datetime: '',
        type: 'heure',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    return (
        <>
            <Head title={`Réserver — ${space.name}`} />
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
                    <a href="/spaces" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        color: '#2D6A5A',
                        textDecoration: 'none',
                    }}>
                        <ArrowLeft size={16} />
                        Retour aux espaces
                    </a>
                </nav>

                {/* LAYOUT SPLIT */}
                <div style={{
                    display: 'flex',
                    minHeight: 'calc(100vh - 70px)',
                }}>
                    {/* GAUCHE — Formulaire */}
                    <div style={{
                        flex: 1,
                        padding: '48px',
                        overflowY: 'auto',
                    }}>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '800',
                            fontSize: '26px',
                            color: '#2D6A5A',
                            marginBottom: '8px',
                        }}>
                            Réserver un espace
                        </h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#888',
                            marginBottom: '32px',
                        }}>
                            Choisissez votre créneau pour <strong>{space.name}</strong>.
                        </p>

                        {/* Toggle type de réservation */}
                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '12px',
                                fontSize: '14px'
                            }}>
                                Type de réservation
                            </label>
                            <div style={{
                                display: 'flex',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '10px',
                                padding: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                width: 'fit-content',
                            }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setType('heure');
                                        setData('type', 'heure');
                                    }}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        backgroundColor: type === 'heure' ? '#2D6A5A' : 'transparent',
                                        color: type === 'heure' ? '#FFFFFF' : '#888',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    À l'heure
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setType('demi-journee');
                                        setData('type', 'demi-journee');
                                    }}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        backgroundColor: type === 'demi-journee' ? '#2D6A5A' : 'transparent',
                                        color: type === 'demi-journee' ? '#FFFFFF' : '#888',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    Demi-journée
                                </button>
                            </div>
                        </div>
                        {/* Date */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Date de réservation
                            </label>
                            <input
                                type="date"
                                value={data.start_datetime.split('T')[0] || ''}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => setData('start_datetime', e.target.value + 'T' + (data.start_datetime.split('T')[1] || '08:00'))}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#FFFFFF',
                                }}
                            />
                            {errors.start_datetime && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.start_datetime}
                                </p>
                            )}
                        </div>
                        {/* Heure — uniquement si type === 'heure' */}
                        {type === 'heure' && (
                            <>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2D6A5A',
                                        marginBottom: '8px',
                                        fontSize: '14px'
                                    }}>
                                        Heure de début
                                    </label>
                                    <input
                                        type="time"
                                        value={data.start_datetime.split('T')[1] || '08:00'}
                                        min="07:00"
                                        max="20:00"
                                        onChange={e => setData('start_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            fontSize: '14px',
                                            fontFamily: 'Roboto, sans-serif',
                                            boxSizing: 'border-box',
                                            backgroundColor: '#FFFFFF',
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2D6A5A',
                                        marginBottom: '8px',
                                        fontSize: '14px'
                                    }}>
                                        Heure de fin
                                    </label>
                                    <input
                                        type="time"
                                        value={data.end_datetime.split('T')[1] || '09:00'}
                                        min={data.start_datetime.split('T')[1] || '08:00'}
                                        max="21:00"
                                        onChange={e => setData('end_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            fontSize: '14px',
                                            fontFamily: 'Roboto, sans-serif',
                                            boxSizing: 'border-box',
                                            backgroundColor: '#FFFFFF',
                                        }}
                                    />
                                    {errors.end_datetime && (
                                        <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                            {errors.end_datetime}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}


                        {/* Créneau — uniquement si type === 'demi-journee' */}
                        {type === 'demi-journee' && (
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    Créneau
                                </label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {[
                                        { label: 'Matin', value: '08:00', sublabel: '8h → 12h' },
                                        { label: 'Après-midi', value: '14:00', sublabel: '14h → 18h' },
                                    ].map((creneau) => (
                                        <button
                                            key={creneau.value}
                                            type="button"
                                            onClick={() => setData('start_datetime', (data.start_datetime.split('T')[0] || '') + 'T' + creneau.value)}
                                            style={{
                                                flex: 1,
                                                padding: '14px',
                                                borderRadius: '10px',
                                                border: '2px solid',
                                                borderColor: data.start_datetime.includes(creneau.value) ? '#2D6A5A' : '#ddd',
                                                backgroundColor: data.start_datetime.includes(creneau.value) ? '#E0F2FE' : '#FFFFFF',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <p style={{
                                                fontFamily: 'Montserrat, sans-serif',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                color: '#2D6A5A',
                                                marginBottom: '4px',
                                            }}>
                                                {creneau.label}
                                            </p>
                                            <p style={{ fontSize: '12px', color: '#888' }}>
                                                {creneau.sublabel}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Récapitulatif prix */}
                        <div style={{
                            backgroundColor: '#E0F2FE',
                            borderRadius: '12px',
                            padding: '20px 24px',
                            marginBottom: '24px',
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px',
                            }}>
                                <span style={{ fontSize: '14px', color: '#555' }}>
                                    Tarif normal
                                </span>
                                <span style={{ fontSize: '14px', color: '#555' }}>
                                    {type === 'heure'
                                        ? `${space.price_par_heure}€/h`
                                        : `${space.price_par_demi_journee}€`
                                    }
                                </span>
                            </div>

                            {auth.user.abonnement_actif && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px',
                                }}>
                                    <span style={{ fontSize: '14px', color: '#2D6A5A' }}>
                                        Réduction abonné ({auth.user.abonnement_actif.plan.tarif_reduit_pourcentage}%)
                                    </span>
                                    <span style={{ fontSize: '14px', color: '#2D6A5A' }}>
                                        -{(type === 'heure'
                                            ? space.price_par_heure
                                            : space.price_par_demi_journee
                                        ) * auth.user.abonnement_actif.plan.tarif_reduit_pourcentage / 100}€
                                    </span>
                                </div>

                            )}

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderTop: '1px solid rgba(0,0,0,0.08)',
                                paddingTop: '12px',
                                marginTop: '8px',
                            }}>
                                <span style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '16px',
                                    color: '#2D6A5A',
                                }}>
                                    Total estimé
                                </span>
                                <span style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '800',
                                    fontSize: '20px',
                                    color: '#2D6A5A',
                                }}>
                                    {(() => {
                                        let base = 0;

                                        if (type === 'heure') {
                                            const start = data.start_datetime.split('T')[1];
                                            const end = data.end_datetime.split('T')[1];

                                            // Si les deux heures sont renseignées, on calcule la durée
                                            if (start && end) {
                                                const [sh, sm] = start.split(':').map(Number);
                                                const [eh, em] = end.split(':').map(Number);
                                                const dureeHeures = (eh * 60 + em - (sh * 60 + sm)) / 60;

                                                // Durée négative ou nulle = créneau invalide, on affiche 0
                                                base = dureeHeures > 0 ? dureeHeures * parseFloat(space.price_par_heure) : 0;
                                            }
                                        } else {
                                            base = parseFloat(space.price_par_demi_journee);
                                        }

                                        const reduction = auth.user.abonnement_actif
                                            ? auth.user.abonnement_actif.plan.tarif_reduit_pourcentage
                                            : 0;

                                        return (base * (1 - reduction / 100)).toFixed(2);
                                    })()}€
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: processing ? '#aaa' : '#2D6A5A',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                {processing ? 'Envoi en cours...' : 'Confirmer la réservation'}
                            </button>
                        </div>
                    </div>

                    {/* DROITE — Image espace */}
                    <div style={{
                        width: '420px',
                        flexShrink: 0,
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                    }}>
                        {space.image ? (
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#E0F2FE',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                            }}>
                                <p style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '22px',
                                    color: '#2D6A5A',
                                }}>
                                    {space.name}
                                </p>
                                <p style={{ fontSize: '14px', color: '#555' }}>
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