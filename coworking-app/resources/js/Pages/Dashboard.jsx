import { Head, Link, router } from '@inertiajs/react';

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function Dashboard({ auth }) {
    const user = auth.user;
    const role = user.role; // 'admin' | 'manager' | 'member' | 'client'

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

            {/* NAVBAR */}
            <nav style={{
                backgroundColor: '#FFFFFF',
                padding: '14px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                {/* Logo */}
                <img
                    src="/logo.png"
                    alt="Cowork'In"
                    style={{ height: '42px', width: 'auto' }}
                />

                {/* Infos utilisateur + déconnexion */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        color: '#555555',
                    }}>
                        {user.name}
                    </span>

                    {/* Badge rôle */}
                    <span style={{
                        backgroundColor: '#E0F2FE',
                        color: '#2D6A5A',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: '500',
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                    }}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>

                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1.5px solid #2D6A5A',
                            color: '#2D6A5A',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '13px',
                            padding: '6px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Déconnexion
                    </button>
                </div>
            </nav>

            {/* CONTENU PRINCIPAL */}
            <main style={{ padding: '48px 10%' }}>
                {/* Message de bienvenue */}
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
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '300',
                    fontSize: '15px',
                    color: '#888888',
                    marginBottom: '40px',
                }}>
                    {role === 'admin' && 'Tableau de bord administrateur'}
                    {role === 'manager' && 'Tableau de bord gestionnaire'}
                    {role === 'member' && 'Tableau de bord membre'}
                    {role === 'client' && 'Tableau de bord client'}
                </p>
                {/* VUE ADMIN */}
                {role === 'admin' && (
                    <div>
                        {/* Stats globales */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '20px',
                            marginBottom: '40px',
                        }}>
                            {[
                                { label: 'Réservations aujourd\'hui', value: '—', icon: '📅', color: '#E0F2FE' },
                                { label: 'Espaces disponibles', value: '—', icon: '🏢', color: '#FCE7F3' },
                                { label: 'Revenus du mois', value: '—', icon: '💶', color: '#E0F2FE' },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    backgroundColor: stat.color,
                                    borderRadius: '16px',
                                    padding: '28px 24px',
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>
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
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: '#555555',
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Raccourcis admin */}
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
                                { label: 'Gérer les espaces', href: '/spaces', icon: '🏢' },
                                { label: 'Toutes les réservations', href: '/reservations', icon: '📋' },
                                { label: 'Créer un espace', href: '/spaces/create', icon: '➕' },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ fontSize: '28px' }}>{action.icon}</span>
                                    <span style={{
                                        fontFamily: 'Roboto, sans-serif',
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
                {/* VUE MANAGER */}
                {role === 'manager' && (
                    <div>
                        {/* Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            marginBottom: '40px',
                        }}>
                            {[
                                { label: 'Réservations aujourd\'hui', value: '—', icon: '📅', color: '#E0F2FE' },
                                { label: 'Espaces disponibles', value: '—', icon: '🏢', color: '#FCE7F3' },
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    backgroundColor: stat.color,
                                    borderRadius: '16px',
                                    padding: '28px 24px',
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>
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
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '300',
                                        fontSize: '14px',
                                        color: '#555555',
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Raccourcis manager */}
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
                                { label: 'Gérer les espaces', href: '/spaces', icon: '🏢' },
                                { label: 'Voir les réservations', href: '/reservations', icon: '📋' },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ fontSize: '28px' }}>{action.icon}</span>
                                    <span style={{
                                        fontFamily: 'Roboto, sans-serif',
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

                {/* VUE MEMBER */}
                {role === 'member' && (
                    <div>
                        {/* Statut abonnement */}
                        <div style={{
                            backgroundColor: '#E0F2FE',
                            borderRadius: '16px',
                            padding: '28px 24px',
                            marginBottom: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}>
                            <span style={{ fontSize: '40px' }}>⭐</span>
                            <div>
                                <div style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    color: '#2D6A5A',
                                    marginBottom: '4px',
                                }}>
                                    Membre abonné
                                </div>
                                <div style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: '300',
                                    fontSize: '14px',
                                    color: '#555555',
                                }}>
                                    Vous bénéficiez d'un accès prioritaire à tous les espaces.
                                </div>
                            </div>
                        </div>

                        {/* Raccourcis member */}
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
                                { label: 'Réserver un espace', href: '/reservations/create', icon: '📅' },
                                { label: 'Mes réservations', href: '/reservations', icon: '📋' },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ fontSize: '28px' }}>{action.icon}</span>
                                    <span style={{
                                        fontFamily: 'Roboto, sans-serif',
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

                {/* VUE CLIENT */}
                {role === 'client' && (
                    <div>
                        {/* Bannière CTA */}
                        <div style={{
                            backgroundColor: '#2D6A5A',
                            borderRadius: '16px',
                            padding: '32px 28px',
                            marginBottom: '40px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <div style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '700',
                                    fontSize: '20px',
                                    color: '#FFFFFF',
                                    marginBottom: '6px',
                                }}>
                                    Besoin d'un espace ?
                                </div>
                                <div style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: '300',
                                    fontSize: '14px',
                                    color: 'rgba(255,255,255,0.8)',
                                }}>
                                    Réservez un poste, un bureau ou une salle en quelques clics.
                                </div>
                            </div>
                            <Link href="/reservations/create" style={{
                                backgroundColor: '#FFFFFF',
                                color: '#2D6A5A',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '700',
                                fontSize: '14px',
                                padding: '12px 24px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}>
                                Réserver maintenant
                            </Link>
                        </div>

                        {/* Raccourcis client */}
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
                                { label: 'Mes réservations', href: '/reservations', icon: '📋' },
                                { label: 'Consulter les espaces', href: '/spaces', icon: '🏢' },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                }}>
                                    <span style={{ fontSize: '28px' }}>{action.icon}</span>
                                    <span style={{
                                        fontFamily: 'Roboto, sans-serif',
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