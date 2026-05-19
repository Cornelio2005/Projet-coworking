import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ArrowLeft, Check, Zap, Building2, Briefcase } from 'lucide-react';

// Icône selon le nom du plan
function getPlanIcon(name) {
    switch (name) {
        case 'Flex': return <Zap size={28} color="#2D6A5A" />;
        case 'Dédié': return <Briefcase size={28} color="#2D6A5A" />;
        case 'Entreprise': return <Building2 size={28} color="#2D6A5A" />;
        default: return <Zap size={28} color="#2D6A5A" />;
    }
}

// Carte d'un plan
function PlanCard({ plan, isActif, onSouscrire }) {
    return (
        <div style={{
            backgroundColor: isActif ? '#F0FDF4' : '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: isActif
                ? '0 0 0 2px #2D6A5A'
                : '0 2px 12px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
            minWidth: '240px',
            position: 'relative',
        }}>
            {/* Badge "Votre plan" si abonnement actif */}
            {isActif && (
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#2D6A5A',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    fontFamily: 'Montserrat, sans-serif',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                }}>
                    Votre plan actuel
                </div>
            )}

            {/* Icône + Nom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {getPlanIcon(plan.name)}
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '20px',
                    color: '#2D6A5A',
                    margin: 0,
                }}>
                    {plan.name}
                </h2>
            </div>

            {/* Prix */}
            <div>
                <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '36px',
                    color: '#1a1a1a',
                }}>
                    {plan.prix_mensuel}€
                </span>
                <span style={{ fontSize: '14px', color: '#888' }}> / mois</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '14px', color: '#555', margin: 0, lineHeight: '1.5' }}>
                {plan.description}
            </p>

            {/* Caractéristiques */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
                    <Check size={15} color="#2D6A5A" />
                    {plan.quota_heures
                        ? `${plan.quota_heures}h incluses / mois`
                        : 'Heures illimitées'
                    }
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
                    <Check size={15} color="#2D6A5A" />
                    {plan.tarif_reduit_pourcentage}% de réduction sur les réservations
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#333' }}>
                    <Check size={15} color="#2D6A5A" />
                    {plan.acces_salles_reunion
                        ? 'Accès salles de réunion inclus'
                        : 'Accès open space uniquement'
                    }
                </li>
            </ul>

            {/* Bouton */}
            <button
                onClick={() => !isActif && onSouscrire(plan.id)}
                disabled={isActif}
                style={{
                    marginTop: 'auto',
                    padding: '12px',
                    backgroundColor: isActif ? '#E5E7EB' : '#2D6A5A',
                    color: isActif ? '#9CA3AF' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    cursor: isActif ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                }}
            >
                {isActif ? 'Plan actuel' : 'Souscrire'}
            </button>
        </div>
    );
}

export default function Index({ plans, abonnementActif, auth }) {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const handleSouscrire = (planId) => {
        if (!confirm('Confirmer la souscription à ce plan ?')) return;
        router.post(route('abonnements.store'), { plan_id: planId });
    };

    return (
        <>
            <Head title="Abonnements — Cowork'In" />
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
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '26px',
                        color: '#2D6A5A',
                        marginBottom: '8px',
                        textAlign: 'center',
                    }}>
                        Nos abonnements
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#888',
                        marginBottom: '48px',
                        textAlign: 'center',
                    }}>
                        Choisissez le plan adapté à vos besoins et bénéficiez de réductions sur vos réservations.
                    </p>

                    {/* ABONNEMENT ACTIF — infos si déjà abonné */}
                    {abonnementActif && (
                        <div style={{
                            backgroundColor: '#E0F2FE',
                            borderRadius: '12px',
                            padding: '16px 24px',
                            marginBottom: '32px',
                            fontSize: '14px',
                            color: '#2D6A5A',
                            textAlign: 'center',
                        }}>
                            Abonnement <strong>{abonnementActif.plan.name}</strong> actif
                            jusqu'au <strong>
                                {new Date(abonnementActif.date_fin).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </strong>
                        </div>
                    )}

                    {/* CARTES DES PLANS */}
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        flexWrap: 'wrap',
                        alignItems: 'stretch',
                    }}>
                        {plans.map(plan => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                isActif={abonnementActif?.plan_id === plan.id}
                                onSouscrire={handleSouscrire}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}