import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Building2, Euro, ClipboardList, Plus, Star, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

export default function Dashboard({ auth }) {
    const user = auth.user;
    const role = user.role;

    // Hover state pour les cartes d'actions rapides
    // On stocke l'index de la carte survolée
    const [hoveredAction, setHoveredAction] = useState(null);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
        }}>
            <Head title="Dashboard — Cowork'In" />

            {/* ─────────────────────────────────────────
                NAVBAR
            ───────────────────────────────────────── */}
            <nav style={{
                backgroundColor: '#FFFFFF',
                padding: '14px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                <img src="/logo.png" alt="Cowork'In" style={{ height: '42px', width: 'auto' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '14px', color: '#555555' }}>
                        {user.name}
                    </span>

                    {/* Badge membre — affiché uniquement si role === member */}
                    {role === 'member' && (
                        <span style={{
                            backgroundColor: '#2D6A5A',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: '700',
                            fontFamily: 'Montserrat, sans-serif',
                            padding: '4px 12px',
                            borderRadius: '999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <Star size={10} />
                            Abonné Cowork'In
                        </span>
                    )}

                    {/* Badge rôle standard */}
                    {role !== 'member' && (
                        <span style={{
                            backgroundColor: '#E0F2FE',
                            color: '#2D6A5A',
                            fontWeight: '500',
                            fontSize: '12px',
                            padding: '4px 10px',
                            borderRadius: '999px',
                        }}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                    )}

                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1.5px solid #2D6A5A',
                            color: '#2D6A5A',
                            fontWeight: '500',
                            fontSize: '13px',
                            padding: '6px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <LogOut size={14} />
                        Déconnexion
                    </button>
                </div>
            </nav>

            {/* ─────────────────────────────────────────
                CONTENU PRINCIPAL
            ───────────────────────────────────────── */}
            <main style={{ padding: '48px 10%' }}>

                {/* Message d'accueil personnalisé */}
                <h1 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '28px',
                    color: '#2D6A5A',
                    marginBottom: '8px',
                }}>
                    Bonjour, {user.name}
                </h1>
                <p style={{
                    fontWeight: '300',
                    fontSize: '15px',
                    color: '#888888',
                    marginBottom: '40px',
                }}>
                    {role === 'admin' && 'Tableau de bord administrateur'}
                    {role === 'manager' && 'Tableau de bord gestionnaire'}
                    {role === 'member' && 'Votre abonnement est actif. Vos réservations en open-space sont incluses.'}
                    {role === 'client' && 'Bienvenue sur votre espace personnel.'}
                </p>

                {/* ─────────────────────────────────────────
                    VUE ADMIN
                ───────────────────────────────────────── */}
                {role === 'admin' && (
                    <div>
                        {/* STATISTIQUES */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '20px',
                            marginBottom: '40px',
                        }}>
                            {[
                                {
                                    label: "Réservations aujourd'hui",
                                    value: '14',
                                    icon: <CalendarDays size={28} color="#2D6A5A" />,
                                    // Vert très clair — doux et lisible
                                    color: '#DCFCE7',
                                },
                                {
                                    label: 'Espaces disponibles',
                                    value: '8',
                                    icon: <Building2 size={28} color="#2D6A5A" />,
                                    // Ambre doux — chaud et élégant
                                    color: '#FEF3C7',
                                },
                                {
                                    label: 'Revenus du mois',
                                    value: '2 450€',
                                    icon: <Euro size={28} color="#2D6A5A" />,
                                    // Beige crème — sobre et raffiné
                                    color: '#F5F0EA',
                                },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    backgroundColor: stat.color,
                                    borderRadius: '16px',
                                    padding: '28px 24px',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{ marginBottom: '12px' }}>{stat.icon}</div>
                                    <div style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '800',
                                        fontSize: '28px',
                                        color: '#2D6A5A',
                                        marginBottom: '6px',
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: '#555555',
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            fontSize: '20px',
                            color: '#2D6A5A',
                            marginBottom: '20px',
                        }}>
                            Actions rapides
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px',
                        }}>
                            {[
                                { label: 'Gérer les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                                { label: 'Toutes les réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Créer un espace', href: '/spaces/create', icon: <Plus size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`admin-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textDecoration: 'none',
                                        // Transition sur border et shadow
                                        border: hoveredAction === `admin-${i}`
                                            ? '1.5px solid #2D6A5A'
                                            : '1.5px solid transparent',
                                        boxShadow: hoveredAction === `admin-${i}`
                                            ? '0 4px 16px rgba(45,106,90,0.12)'
                                            : '0 2px 8px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {action.icon}
                                    <span style={{
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        color: '#2D6A5A',
                                    }}>
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE MANAGER
                ───────────────────────────────────────── */}
                {role === 'manager' && (
                    <div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            marginBottom: '40px',
                        }}>
                            {[
                                {
                                    label: "Réservations aujourd'hui",
                                    value: '14',
                                    icon: <CalendarDays size={28} color="#2D6A5A" />,
                                    color: '#DCFCE7',
                                },
                                {
                                    label: 'Espaces disponibles',
                                    value: '8',
                                    icon: <Building2 size={28} color="#2D6A5A" />,
                                    color: '#FEF3C7',
                                },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    backgroundColor: stat.color,
                                    borderRadius: '16px',
                                    padding: '28px 24px',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{ marginBottom: '12px' }}>{stat.icon}</div>
                                    <div style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '800',
                                        fontSize: '28px',
                                        color: '#2D6A5A',
                                        marginBottom: '6px',
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: '#555555',
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            fontSize: '20px',
                            color: '#2D6A5A',
                            marginBottom: '20px',
                        }}>
                            Actions rapides
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                        }}>
                            {[
                                { label: 'Gérer les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                                { label: 'Voir les réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`manager-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textDecoration: 'none',
                                        border: hoveredAction === `manager-${i}`
                                            ? '1.5px solid #2D6A5A'
                                            : '1.5px solid transparent',
                                        boxShadow: hoveredAction === `manager-${i}`
                                            ? '0 4px 16px rgba(45,106,90,0.12)'
                                            : '0 2px 8px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {action.icon}
                                    <span style={{
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        color: '#2D6A5A',
                                    }}>
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE MEMBER
                ───────────────────────────────────────── */}
                {role === 'member' && (
                    <div>
                        {/* Bloc abonnement actif */}
                        <div style={{
                            backgroundColor: '#2D6A5A',
                            borderRadius: '16px',
                            padding: '32px 28px',
                            marginBottom: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '20px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    borderRadius: '12px',
                                    padding: '14px',
                                }}>
                                    <Star size={32} color="#FFFFFF" />
                                </div>
                                <div>
                                    <div style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '800',
                                        fontSize: '18px',
                                        color: '#FFFFFF',
                                        marginBottom: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}>
                                        Abonné Cowork'In
                                        <span style={{
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            padding: '3px 10px',
                                            borderRadius: '999px',
                                        }}>
                                            Actif
                                        </span>
                                    </div>
                                    <div style={{
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: 'rgba(255,255,255,0.8)',
                                    }}>
                                        Vos réservations en open-space sont incluses — accès illimité.
                                    </div>
                                </div>
                            </div>
                            <Link href="/abonnements" style={{
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                color: '#FFFFFF',
                                fontWeight: '600',
                                fontSize: '13px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                border: '1px solid rgba(255,255,255,0.3)',
                            }}>
                                Mon abonnement
                            </Link>
                        </div>

                        <h2 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            fontSize: '20px',
                            color: '#2D6A5A',
                            marginBottom: '20px',
                        }}>
                            Actions rapides
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px',
                        }}>
                            {[
                                { label: 'Réserver un espace', href: '/spaces', icon: <CalendarDays size={24} color="#2D6A5A" /> },
                                { label: 'Mes réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Mon abonnement', href: '/abonnements', icon: <Star size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`member-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textDecoration: 'none',
                                        border: hoveredAction === `member-${i}`
                                            ? '1.5px solid #2D6A5A'
                                            : '1.5px solid transparent',
                                        boxShadow: hoveredAction === `member-${i}`
                                            ? '0 4px 16px rgba(45,106,90,0.12)'
                                            : '0 2px 8px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {action.icon}
                                    <span style={{
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        color: '#2D6A5A',
                                    }}>
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─────────────────────────────────────────
                    VUE CLIENT
                ───────────────────────────────────────── */}
                {role === 'client' && (
                    <div>
                        {/* DEUX CARTES CÔTE À CÔTE */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            marginBottom: '40px',
                        }}>
                            {/* CARTE RÉSERVATION */}
                            <div style={{
                                backgroundColor: '#2D6A5A',
                                borderRadius: '16px',
                                padding: '36px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '24px',
                            }}>
                                <div>
                                    <div style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '800',
                                        fontSize: '22px',
                                        color: '#FFFFFF',
                                        marginBottom: '8px',
                                    }}>
                                        Besoin d'un espace ?
                                    </div>
                                    <div style={{
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: 'rgba(255,255,255,0.8)',
                                        lineHeight: '1.6',
                                    }}>
                                        Réservez un poste, un bureau ou une salle en quelques clics.
                                    </div>
                                </div>
                                <Link href="/spaces" style={{
                                    backgroundColor: '#FFFFFF',
                                    color: '#2D6A5A',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    alignSelf: 'flex-start',
                                }}>
                                    Voir les espaces
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* CARTE ABONNEMENT — terracotta doux */}
                            <div style={{
                                backgroundColor: '#FDF6F0',
                                borderRadius: '16px',
                                padding: '36px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '24px',
                                border: '1.5px solid #F2D5C4',
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '8px',
                                    }}>
                                        <Star size={18} color="#C4714B" />
                                        <span style={{
                                            backgroundColor: '#C4714B',
                                            color: '#FFFFFF',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            fontFamily: 'Montserrat, sans-serif',
                                            padding: '3px 10px',
                                            borderRadius: '999px',
                                        }}>
                                            Offre membre
                                        </span>
                                    </div>
                                    <div style={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '800',
                                        fontSize: '22px',
                                        color: '#7C2D12',
                                        marginBottom: '8px',
                                    }}>
                                        Passez à la vitesse supérieure
                                    </div>
                                    <div style={{
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        color: '#92400E',
                                        lineHeight: '1.6',
                                    }}>
                                        Économisez jusqu'à <strong>-30%</strong> sur vos réservations grâce à nos abonnements membres.
                                    </div>
                                </div>
                                <Link href="/abonnements" style={{
                                    backgroundColor: '#C4714B',
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    alignSelf: 'flex-start',
                                }}>
                                    Découvrir les offres
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        <h2 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            fontSize: '20px',
                            color: '#2D6A5A',
                            marginBottom: '20px',
                        }}>
                            Actions rapides
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                        }}>
                            {[
                                { label: 'Mes réservations', href: '/reservations', icon: <ClipboardList size={24} color="#2D6A5A" /> },
                                { label: 'Consulter les espaces', href: '/spaces', icon: <Building2 size={24} color="#2D6A5A" /> },
                            ].map((action, i) => (
                                <Link
                                    key={i}
                                    href={action.href}
                                    onMouseEnter={() => setHoveredAction(`client-${i}`)}
                                    onMouseLeave={() => setHoveredAction(null)}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textDecoration: 'none',
                                        border: hoveredAction === `client-${i}`
                                            ? '1.5px solid #2D6A5A'
                                            : '1.5px solid transparent',
                                        boxShadow: hoveredAction === `client-${i}`
                                            ? '0 4px 16px rgba(45,106,90,0.12)'
                                            : '0 2px 8px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {action.icon}
                                    <span style={{
                                        fontWeight: '500',
                                        fontSize: '15px',
                                        color: '#2D6A5A',
                                    }}>
                                        {action.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}