import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { UserPlus } from 'lucide-react';

export default function Register() {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Inscription — Cowork'In" />
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#F5F0EA',
                fontFamily: 'Roboto, sans-serif',
                display: 'flex',
            }}>
                {/* GAUCHE — Branding */}
                <div style={{
                    width: '420px',
                    flexShrink: 0,
                    backgroundColor: '#2D6A5A',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px',
                    gap: '24px',
                }}>
                    <img
                        src="/logo.png"
                        alt="Cowork'In"
                        style={{ height: '56px', filter: 'brightness(0) invert(1)' }}
                    />
                    <h2 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '26px',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: '1.3',
                        margin: 0,
                    }}>
                        Rejoignez<br />Cowork'In
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        margin: 0,
                    }}>
                        Réservez vos espaces de travail, gérez vos abonnements et accédez à nos locaux en toute simplicité.
                    </p>
                </div>

                {/* DROITE — Formulaire */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px',
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '460px',
                    }}>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '800',
                            fontSize: '24px',
                            color: '#2D6A5A',
                            marginBottom: '8px',
                        }}>
                            Créer un compte
                        </h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#888',
                            marginBottom: '32px',
                        }}>
                            Déjà inscrit ?{' '}
                            <Link
                                href={route('login')}
                                style={{ color: '#2D6A5A', fontWeight: '500', textDecoration: 'none' }}
                            >
                                Se connecter
                            </Link>
                        </p>

                        <form onSubmit={submit}>

                            {/* NOM */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                }}>
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    placeholder="Jean Dupont"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: errors.name ? '1px solid #EF4444' : '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                    }}
                                />
                                {errors.name && (
                                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                }}>
                                    Adresse e-mail
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoComplete="username"
                                    required
                                    placeholder="jean@exemple.fr"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: errors.email ? '1px solid #EF4444' : '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                    }}
                                />
                                {errors.email && (
                                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* MOT DE PASSE */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                }}>
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: errors.password ? '1px solid #EF4444' : '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                    }}
                                />
                                {errors.password && (
                                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* CONFIRMATION MOT DE PASSE */}
                            <div style={{ marginBottom: '32px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                }}>
                                    Confirmer le mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: errors.password_confirmation ? '1px solid #EF4444' : '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#FFFFFF',
                                        outline: 'none',
                                    }}
                                />
                                {errors.password_confirmation && (
                                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            {/* BOUTON */}
                            <button
                                type="submit"
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                <UserPlus size={18} />
                                {processing ? 'Création en cours...' : 'Créer mon compte'}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}