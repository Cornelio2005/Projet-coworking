import { Head, useForm } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';

export default function ResetPassword({ token, email }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Réinitialisation — Cowork'In" />
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#F5F0EA',
                fontFamily: 'Roboto, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
            }}>
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '48px 40px',
                    width: '100%',
                    maxWidth: '460px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <img src="/logo.png" alt="Cowork'In" style={{ height: '48px' }} />
                    </div>

                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '22px',
                        color: '#2D6A5A',
                        marginBottom: '8px',
                        textAlign: 'center',
                    }}>
                        Nouveau mot de passe
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#888',
                        textAlign: 'center',
                        marginBottom: '32px',
                    }}>
                        Choisissez un nouveau mot de passe sécurisé.
                    </p>

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

                        {/* NOUVEAU MOT DE PASSE */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                            }}>
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                autoComplete="new-password"
                                autoFocus
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

                        {/* CONFIRMATION */}
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
                            }}
                        >
                            <KeyRound size={18} />
                            {processing ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}