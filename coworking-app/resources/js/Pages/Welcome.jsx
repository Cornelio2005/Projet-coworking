import { Link } from '@inertiajs/react';
import { CalendarDays, Building2, Euro, ClipboardList, Plus, Star, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function Welcome({ canLogin, canRegister }) {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
        }}>

            {/* NAVBAR */}
            <nav style={{
                backgroundColor: '#FFFFFF',
                padding: '16px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                {/* Logo image */}
                <img
                    src="/Cowork'In Circular Logo.png"
                    alt="Cowork'In"
                    style={{
                        height: '48px',
                        width: 'auto',
                    }}
                />

                {/* Boutons de droite */}
                {canLogin && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link
                            href="/login"
                            style={{
                                padding: '8px 20px',
                                border: '2px solid #e687c0ff',
                                borderRadius: '8px',
                                color: '#e687c0ff',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '500',
                                textDecoration: 'none',
                                fontSize: '14px',
                            }}
                        >
                            Se connecter
                        </Link>

                        {canRegister && (
                            <Link
                                href="/register"
                                style={{
                                    padding: '8px 20px',
                                    backgroundColor: '#e687c0ff',
                                    borderRadius: '8px',
                                    color: '#FFFFFF',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                }}
                            >
                                S'inscrire
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            {/* Hero */}
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                padding: '96px 24px 80px',
                borderColor: '#e687c0ff'


            }}>
                {/* Titre principal */}
                <h1 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '52px',
                    color: 'black',
                    lineHeight: '1.15',
                    maxWidth: '700px',
                    marginBottom: '20px',
                }}>
                    Votre espace de travail,<br />quand vous voulez.
                </h1>
                {/* Sous-titre */}
                <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '300',
                    fontSize: '18px',
                    color: '#555555',
                    maxWidth: '520px',
                    lineHeight: '1.7',
                    marginBottom: '40px',
                }}>
                    Réservez en quelques clics, accédez facilement et profitez de tous les services.
                </p>
                {/* Boutons CTA */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link
                        href="/register"
                        style={{
                            backgroundColor: '#e687c0ff',
                            color: '#FFFFFF',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '16px',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                        }}>
                        Réserver un espace
                    </Link>

                    <Link
                        href="#espaces"
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#e687c0ff',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '16px',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            border: '2px solid #e687c0ff',
                        }}>
                        Découvrir nos espaces
                    </Link>
                </div>
            </section>
            {/* GALERIE */}
            <section id="espaces" style={{
                padding: '64px 10%',
                backgroundColor: '#f8f8f8ff',
            }}>
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '32px',
                    color: '#e687c0ff',
                    marginBottom: '32px',
                }}>
                    Nos espaces
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                }}>
                    {[
                        {
                            url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                            label: 'Open space',
                        },
                        {
                            url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
                            label: 'Bureau privé',
                        },
                        {
                            url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80',
                            label: 'Salle de conférence',
                        },
                        {
                            url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80',
                            label: 'Espace détente',
                        },
                    ].map((photo, index) => (
                        <div key={index} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                            <img
                                src={photo.url}
                                alt={photo.label}
                                style={{
                                    width: '100%',
                                    height: '240px',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                            <span style={{
                                position: 'absolute',
                                bottom: '12px',
                                left: '12px',
                                backgroundColor: 'rgba(255,255,255,0.85)',
                                color: '#2D6A5A',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '500',
                                fontSize: '13px',
                                padding: '4px 12px',
                                borderRadius: '999px',
                            }}>
                                {photo.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section style={{
                padding: '64px 10%',
                backgroundColor: '#FFFFFF',
            }}>
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '700',
                    fontSize: '32px',
                    color: '#2D6A5A',
                    marginBottom: '40px',
                }}>
                    Pourquoi Cowork'In ?
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                }}>
                    {[
                        {
                            icon: <CalendarDays size={24} color="#2D6A5A" />,
                            title: 'Réservation simple',
                            desc: 'Réservez un poste ou une salle en quelques clics, par heure ou demi-journée.',
                            color: '#E0F2FE',
                        },
                        {
                            icon: <CheckCircle size={24} color="#2D6A5A" />,
                            title: 'Disponibilités en temps réel',
                            desc: 'Consultez instantanément les créneaux libres et évitez les doublons.',
                            color: '#FCE7F3',
                        },
                        {
                            icon: <Euro size={24} color="#2D6A5A" />,
                            title: 'Facturation automatique',
                            desc: 'Recevez votre facture PDF par e-mail dès que votre réservation est confirmée.',
                            color: '#E0F2FE',
                        },
                    ].map((card, index) => (
                        <div key={index} style={{
                            backgroundColor: card.color,
                            borderRadius: '16px',
                            padding: '32px 24px',
                        }}>
                            <div style={{
                                fontSize: '36px',
                                marginBottom: '16px',
                            }}>
                                {card.icon}
                            </div>
                            <h3 style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '700',
                                fontSize: '18px',
                                color: '#2D6A5A',
                                marginBottom: '10px',
                            }}>
                                {card.title}
                            </h3>
                            <p style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '300',
                                fontSize: '15px',
                                color: '#444444',
                                lineHeight: '1.6',
                            }}>
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {/* CTA FINAL */}
            <section style={{
                backgroundColor: '#f392c9ff',
                padding: '80px 10%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '36px',
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    maxWidth: '600px',
                    lineHeight: '1.2',
                }}>
                    Prêt à rejoindre Cowork'In ?
                </h2>

                <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '300',
                    fontSize: '17px',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '36px',
                    maxWidth: '460px',
                    lineHeight: '1.7',
                }}>
                    Créez votre compte gratuitement et réservez votre premier espace dès aujourd'hui.
                </p>

                <Link
                    href="/register"
                    style={{
                        backgroundColor: '#FFFFFF',
                        color: '#2D6A5A',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: '700',
                        fontSize: '16px',
                        padding: '14px 36px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                    }}
                >
                    Créer mon compte
                </Link>
            </section>
            {/* FOOTER */}
            <footer style={{
                backgroundColor: '#FFFFFF',
                padding: '24px 10%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #E5E5E5',
            }}>
                <img
                    src="/Cowork'In Circular Logo.png"
                    alt="Cowork'In"
                    style={{
                        height: '36px',
                        width: 'auto',
                    }}
                />

                <p style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: '300',
                    fontSize: '13px',
                    color: '#888888',
                    margin: '0',
                }}>
                    © 2026 Groupe 6 Projet Annuel— Tous droits réservés
                </p>
            </footer>

        </div>





    );
}