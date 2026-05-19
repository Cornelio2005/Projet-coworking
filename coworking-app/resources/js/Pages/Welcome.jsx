import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { CalendarDays, CheckCircle, Euro, QrCode, Star, ArrowRight, Zap, Briefcase, Building2 } from 'lucide-react';

export default function Welcome({ canLogin, canRegister }) {

    // États hover pour les micro-interactions sur les boutons
    const [hoverCta1, setHoverCta1] = useState(false);
    const [hoverCta2, setHoverCta2] = useState(false);
    const [hoverLogin, setHoverLogin] = useState(false);
    const [hoverRegister, setHoverRegister] = useState(false);
    const [hoverFinal, setHoverFinal] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
        }}>

            {/* ─────────────────────────────────────────
                NAVBAR
            ───────────────────────────────────────── */}
            <nav style={{
                backgroundColor: '#FFFFFF',
                padding: '16px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <img
                    src="/logo.png"
                    alt="Cowork'In"
                    style={{ height: '42px', width: 'auto' }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <a href="#espaces" style={{
                        fontSize: '14px',
                        color: '#555',
                        textDecoration: 'none',
                        fontWeight: '500',
                    }}>
                        Nos espaces
                    </a>
                    <a href="#formules" style={{
                        fontSize: '14px',
                        color: '#555',
                        textDecoration: 'none',
                        fontWeight: '500',
                    }}>
                        Formules
                    </a>

                    {canLogin && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link
                                href="/login"
                                onMouseEnter={() => setHoverLogin(true)}
                                onMouseLeave={() => setHoverLogin(false)}
                                style={{
                                    padding: '8px 20px',
                                    border: '2px solid #2D6A5A',
                                    borderRadius: '8px',
                                    color: '#2D6A5A',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                    backgroundColor: hoverLogin ? '#2D6A5A' : 'transparent',
                                    ...(hoverLogin && { color: '#FFFFFF' }),
                                }}
                            >
                                Se connecter
                            </Link>

                            {canRegister && (
                                <Link
                                    href="/register"
                                    onMouseEnter={() => setHoverRegister(true)}
                                    onMouseLeave={() => setHoverRegister(false)}
                                    style={{
                                        padding: '8px 20px',
                                        backgroundColor: hoverRegister ? '#245a4c' : '#2D6A5A',
                                        borderRadius: '8px',
                                        color: '#FFFFFF',
                                        fontWeight: '500',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        transition: 'all 0.2s ease',
                                        boxShadow: hoverRegister ? '0 4px 16px rgba(45,106,90,0.35)' : 'none',
                                    }}
                                >
                                    S'inscrire
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* ─────────────────────────────────────────
                HERO
            ───────────────────────────────────────── */}
            <section style={{
                padding: '96px 10% 80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}>
                {/* Badge */}
                <div style={{
                    backgroundColor: '#E0F2FE',
                    color: '#2D6A5A',
                    fontSize: '13px',
                    fontWeight: '600',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    marginBottom: '24px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <CheckCircle size={13} />
                    Espaces disponibles dès maintenant
                </div>

                <h1 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '56px',
                    color: '#1a1a1a',
                    lineHeight: '1.1',
                    maxWidth: '680px',
                    marginBottom: '24px',
                }}>
                    Votre espace de travail,{' '}
                    <span style={{ color: '#2D6A5A' }}>quand vous voulez.</span>
                </h1>

                <p style={{
                    fontWeight: '300',
                    fontSize: '18px',
                    color: '#555555',
                    maxWidth: '500px',
                    lineHeight: '1.7',
                    marginBottom: '40px',
                }}>
                    Réservez un poste, un bureau ou une salle en quelques clics. Accédez facilement et profitez de tous nos services.
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Link
                        href="/register"
                        onMouseEnter={() => setHoverCta1(true)}
                        onMouseLeave={() => setHoverCta1(false)}
                        style={{
                            backgroundColor: hoverCta1 ? '#245a4c' : '#2D6A5A',
                            color: '#FFFFFF',
                            fontWeight: '600',
                            fontSize: '15px',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                            boxShadow: hoverCta1 ? '0 6px 20px rgba(45,106,90,0.35)' : 'none',
                        }}
                    >
                        Réserver un espace
                        <ArrowRight size={16} />
                    </Link>


                    <a href="#espaces"
                        onMouseEnter={() => setHoverCta2(true)}
                        onMouseLeave={() => setHoverCta2(false)}
                        style={{
                            backgroundColor: hoverCta2 ? '#EAE5DF' : '#FFFFFF',
                            color: '#2D6A5A',
                            fontWeight: '600',
                            fontSize: '15px',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            border: '2px solid #2D6A5A',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Découvrir nos espaces
                    </a>
                </div>

                {/* Chiffres clés */}
                <div style={{
                    display: 'flex',
                    gap: '48px',
                    marginTop: '64px',
                    flexWrap: 'wrap',
                }}>
                    {[
                        { value: '4', label: 'Types d\'espaces' },
                        { value: '3', label: 'Formules d\'abonnement' },
                        { value: '100%', label: 'En ligne, 24h/24' },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '32px',
                                color: '#2D6A5A',
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#888',
                                fontWeight: '400',
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                GALERIE DES ESPACES
            ───────────────────────────────────────── */}
            <section id="espaces" style={{
                padding: '80px 10%',
                backgroundColor: '#FFFFFF',
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '34px',
                        color: '#1a1a1a',
                        marginBottom: '8px',
                    }}>
                        Nos espaces
                    </h2>
                    <p style={{ fontSize: '15px', color: '#888', fontWeight: '300' }}>
                        Des environnements pensés pour votre productivité.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                }}>
                    {[
                        { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', label: 'Open space' },
                        { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', label: 'Bureau privé' },
                        { url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80', label: 'Salle de conférence' },
                        { url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80', label: 'Espace détente' },
                    ].map((photo, index) => (
                        <div key={index} style={{
                            position: 'relative',
                            borderRadius: '14px',
                            overflow: 'hidden',
                        }}>
                            <img
                                src={photo.url}
                                alt={photo.label}
                                style={{
                                    width: '100%',
                                    height: '260px',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                            {/* Dégradé bas */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '80px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.45))',
                            }} />
                            <span style={{
                                position: 'absolute',
                                bottom: '16px',
                                left: '16px',
                                color: '#FFFFFF',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '700',
                                fontSize: '15px',
                            }}>
                                {photo.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                FORMULES & ABONNEMENTS
            ───────────────────────────────────────── */}
            <section id="formules" style={{
                padding: '80px 10%',
                backgroundColor: '#F5F0EA',
            }}>
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '34px',
                        color: '#1a1a1a',
                        marginBottom: '8px',
                    }}>
                        Nos formules
                    </h2>
                    <p style={{ fontSize: '15px', color: '#888', fontWeight: '300' }}>
                        Une offre adaptée à chaque usage, de l'occasionnel au résidentiel.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    alignItems: 'stretch',
                }}>
                    {/* CARTE 1 — À la carte */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '36px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}>
                        <Zap size={28} color="#2D6A5A" />
                        <div>
                            <h3 style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '20px',
                                color: '#1a1a1a',
                                marginBottom: '4px',
                            }}>
                                À la carte
                            </h3>
                            <p style={{ fontSize: '13px', color: '#888', fontWeight: '300' }}>
                                Pour un usage occasionnel
                            </p>
                        </div>
                        <div>
                            <span style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '32px',
                                color: '#2D6A5A',
                            }}>
                                dès 5€
                            </span>
                            <span style={{ fontSize: '14px', color: '#888' }}> / heure</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                'Accès open space à l\'heure',
                                'Réservation en ligne 24h/24',
                                'Annulation flexible',
                                'Badge QR Code à l\'entrée',
                            ].map((item, i) => (
                                <li key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    color: '#444',
                                }}>
                                    <CheckCircle size={14} color="#2D6A5A" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" style={{
                            marginTop: 'auto',
                            padding: '12px',
                            backgroundColor: '#F5F0EA',
                            color: '#2D6A5A',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                        }}>
                            Commencer
                        </Link>
                    </div>

                    {/* CARTE 2 — Abonnement (mise en avant) */}
                    <div style={{
                        backgroundColor: '#2D6A5A',
                        borderRadius: '16px',
                        padding: '36px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        boxShadow: '0 8px 32px rgba(45,106,90,0.3)',
                        position: 'relative',
                    }}>
                        {/* Badge populaire */}
                        <div style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#C4714B',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: '700',
                            fontFamily: 'Montserrat, sans-serif',
                            padding: '4px 14px',
                            borderRadius: '999px',
                            whiteSpace: 'nowrap',
                        }}>
                            Le plus populaire
                        </div>

                        <Star size={28} color="#FFFFFF" />
                        <div>
                            <h3 style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '20px',
                                color: '#FFFFFF',
                                marginBottom: '4px',
                            }}>
                                Membre
                            </h3>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: '300' }}>
                                Pour un usage régulier
                            </p>
                        </div>
                        <div>
                            <span style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '32px',
                                color: '#FFFFFF',
                            }}>
                                dès 150€
                            </span>
                            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}> / mois</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                'Accès illimité aux open spaces',
                                'Badge QR Code instantané',
                                'Jusqu\'à -30% sur les réservations',
                                'Accès salles de réunion inclus',
                                'Wi-Fi dédié membres',
                            ].map((item, i) => (
                                <li key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    color: 'rgba(255,255,255,0.9)',
                                }}>
                                    <CheckCircle size={14} color="#FFFFFF" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" style={{
                            marginTop: 'auto',
                            padding: '12px',
                            backgroundColor: '#FFFFFF',
                            color: '#2D6A5A',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',
                        }}>
                            S'abonner
                        </Link>
                    </div>

                    {/* CARTE 3 — Bureaux privés */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '36px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}>
                        <Building2 size={28} color="#2D6A5A" />
                        <div>
                            <h3 style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '20px',
                                color: '#1a1a1a',
                                marginBottom: '4px',
                            }}>
                                Bureaux privés
                            </h3>
                            <p style={{ fontSize: '13px', color: '#888', fontWeight: '300' }}>
                                Pour les équipes résidentes
                            </p>
                        </div>
                        <div>
                            <span style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                fontSize: '32px',
                                color: '#2D6A5A',
                            }}>
                                Sur devis
                            </span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                'Bureau fermé et sécurisé',
                                'Tout équipé (mobilier, écrans)',
                                'Accès 24h/24 et 7j/7',
                                'Gestion multi-utilisateurs',
                            ].map((item, i) => (
                                <li key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    color: '#444',
                                }}>
                                    <CheckCircle size={14} color="#2D6A5A" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link href="/register" style={{
                            marginTop: 'auto',
                            padding: '12px',
                            backgroundColor: '#F5F0EA',
                            color: '#2D6A5A',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '700',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',
                        }}>
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────
                POURQUOI COWORK'IN
            ───────────────────────────────────────── */}
            <section style={{
                padding: '80px 10%',
                backgroundColor: '#FFFFFF',
            }}>
                <h2 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '34px',
                    color: '#1a1a1a',
                    marginBottom: '40px',
                    textAlign: 'center',
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
                            icon: <QrCode size={24} color="#2D6A5A" />,
                            title: 'Accès QR Code',
                            desc: 'Votre badge d\'accès numérique généré instantanément après confirmation.',
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
                            <div style={{ marginBottom: '16px' }}>{card.icon}</div>
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

            {/* ─────────────────────────────────────────
                CTA FINAL
            ───────────────────────────────────────── */}
            <section style={{
                backgroundColor: '#2D6A5A',
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
                    onMouseEnter={() => setHoverFinal(true)}
                    onMouseLeave={() => setHoverFinal(false)}
                    style={{
                        backgroundColor: hoverFinal ? '#F0EBE3' : '#FFFFFF',
                        color: '#2D6A5A',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '700',
                        fontSize: '16px',
                        padding: '16px 40px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        boxShadow: hoverFinal ? '0 6px 20px rgba(0,0,0,0.2)' : 'none',
                    }}
                >
                    Créer mon compte
                    <ArrowRight size={16} />
                </Link>
            </section>

            {/* ─────────────────────────────────────────
                FOOTER
            ───────────────────────────────────────── */}
            <footer style={{
                backgroundColor: '#FFFFFF',
                padding: '24px 10%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #E5E5E5',
            }}>
                <img
                    src="/logo.png"
                    alt="Cowork'In"
                    style={{ height: '36px', width: 'auto' }}
                />
                <p style={{
                    fontWeight: '300',
                    fontSize: '13px',
                    color: '#888888',
                    margin: 0,
                }}>
                    © 2026 Groupe 6 — Projet Annuel ESGI Lyon — Tous droits réservés
                </p>
            </footer>

        </div>
    );
}