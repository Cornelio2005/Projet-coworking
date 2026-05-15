import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function Login({ status, canResetPassword }) {
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
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F5F0EA',
            fontFamily: 'Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Head title="Connexion — Cowork'In" />

            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '48px 40px',
                width: '100%',
                maxWidth: '440px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <img
                        src="/Cowork'In Circular Logo.png"
                        alt="Cowork'In"
                        style={{ height: '56px', width: 'auto', margin: '0 auto' }}
                    />
                </div>

                {/* Titre */}
                <h1 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '800',
                    fontSize: '24px',
                    color: '#2D6A5A',
                    marginBottom: '8px',
                    textAlign: 'center',
                }}>
                    Connectez-vous
                </h1>

                {/* Message de statut (ex: mot de passe réinitialisé) */}
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
                    {/* Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#333333',
                            marginBottom: '6px',
                        }}>
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="username"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1.5px solid #E5E5E5',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#333333',
                            }}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Mot de passe */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '14px',
                            color: '#333333',
                            marginBottom: '6px',
                        }}>
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="current-password"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1.5px solid #E5E5E5',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#333333',
                            }}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Se souvenir + Mot de passe oublié */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '28px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            color: '#666666',
                            cursor: 'pointer',
                        }}>
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Se souvenir de moi
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                style={{
                                    fontSize: '13px',
                                    color: '#2D6A5A',
                                    textDecoration: 'underline',
                                    fontFamily: 'Roboto, sans-serif',
                                }}
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    {/* Bouton connexion */}
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            backgroundColor: processing ? '#88B8AF' : '#2D6A5A',
                            color: '#FFFFFF',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: '500',
                            fontSize: '15px',
                            padding: '12px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            marginBottom: '20px',
                        }}
                    >
                        {processing ? 'Connexion...' : 'Se connecter'}
                    </button>

                    {/* Lien inscription */}
                    <p style={{
                        textAlign: 'center',
                        fontSize: '13px',
                        color: '#888888',
                        fontFamily: 'Roboto, sans-serif',
                    }}>
                        Pas encore de compte ?{' '}
                        <Link
                            href={route('register')}
                            style={{ color: '#2D6A5A', fontWeight: '500', textDecoration: 'underline' }}
                        >
                            S'inscrire
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}