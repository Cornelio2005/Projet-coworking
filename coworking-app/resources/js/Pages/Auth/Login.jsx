import { useState } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {

    const [hoverBtn, setHoverBtn] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion — Cowork'In" />
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
                        Bon retour<br />parmi nous
                    </h2>
                    <p style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center',
                        lineHeight: '1.6',
                        margin: 0,
                    }}>
                        Connectez-vous pour accéder à vos réservations et à votre espace personnel.
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
                    <div style={{ width: '100%', maxWidth: '460px' }}>
                        <h1 style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '800',
                            fontSize: '24px',
                            color: '#2D6A5A',
                            marginBottom: '8px',
                        }}>
                            Se connecter
                        </h1>
                        <p style={{
                            fontSize: '14px',
                            color: '#888',
                            marginBottom: '32px',
                        }}>
                            Pas encore de compte ?{' '}
                            <Link
                                href={route('register')}
                                style={{ color: '#2D6A5A', fontWeight: '500', textDecoration: 'none' }}
                            >
                                S'inscrire
                            </Link>
                        </p>

                        {/* Message statut */}
                        {status && (
                            <div style={{
                                backgroundColor: '#E0F2FE',
                                color: '#2D6A5A',
                                borderRadius: '8px',
                                padding: '10px 16px',
                                fontSize: '13px',
                                marginBottom: '20px',
                            }}>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>

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
                                    autoFocus
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
                                <InputError message={errors.email} />
                            </div>

                            {/* MOT DE PASSE */}
                            <div style={{ marginBottom: '16px' }}>
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
                                    autoComplete="current-password"
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
                                <InputError message={errors.password} />
                            </div>

                            {/* SE SOUVENIR + MOT DE PASSE OUBLIÉ */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '32px',
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                    color: '#666',
                                    cursor: 'pointer',
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                    />
                                    Se souvenir de moi
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        style={{
                                            fontSize: '13px',
                                            color: '#2D6A5A',
                                            textDecoration: 'none',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>

                            {/* BOUTON */}
                            <button
                                type="submit"
                                disabled={processing}
                                onMouseEnter={() => setHoverBtn(true)}
                                onMouseLeave={() => setHoverBtn(false)}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: processing ? '#aaa' : hoverBtn ? '#245a4c' : '#2D6A5A',
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
                                    boxShadow: hoverBtn && !processing ? '0 4px 16px rgba(45,106,90,0.3)' : 'none',
                                }}
                            >
                                <LogIn size={18} />
                                {processing ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}