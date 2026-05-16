import { useForm, Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';


export default function Create() {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        type: 'bureau_individuel',
        capacity: '',
        price_par_heure: '',
        price_par_demi_journee: '',
        is_available: true,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", data);
        post(route('spaces.store'), {
            forceFormData: true,
        });
    };

    return (
        <div>
            <Head title="Créer un espace" />
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#F5F0EA',
                fontFamily: 'Roboto, sans-serif',
                padding: '40px 20px'
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h1 style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '800',
                        fontSize: '28px',
                        color: '#2D6A5A',
                        marginBottom: '8px',
                    }}>
                        Créer un espace
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '32px'
                    }}>Remplissez le formulaire ci-dessous pour créer un nouvel espace de travail.</p>

                    <form onSubmit={handleSubmit} style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Nom de l'espace
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Ex: Bureau Zen, Salle Innovation..."
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.name && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Décrivez l'espace, ses équipements, son ambiance..."
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box',
                                    resize: 'vertical'
                                }}
                            />
                            {errors.description && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Type d'espace
                            </label>
                            <select
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#FFFFFF'
                                }}
                            >
                                <option value="bureau_individuel">Bureau individuel</option>
                                <option value="bureau_partage">Bureau partagé</option>
                                <option value="salle_reunion">Salle de réunion</option>
                                <option value="espace_detente">Espace détente</option>
                            </select>
                            {errors.type && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.type}
                                </p>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    Capacité (personnes)
                                </label>
                                <input
                                    type="number"
                                    value={data.capacity}
                                    onChange={e => setData('capacity', e.target.value)}
                                    placeholder="Ex: 8"
                                    min="1"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                {errors.capacity && (
                                    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.capacity}
                                    </p>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: '#2D6A5A',
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    Prix par heure (€)
                                </label>
                                <input
                                    type="number"
                                    value={data.price_par_heure}
                                    onChange={e => setData('price_par_heure', e.target.value)}
                                    placeholder="Ex: 15.00"
                                    min="0"
                                    step="0.01"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: '14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                {errors.price_par_heure && (
                                    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                        {errors.price_par_heure}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Prix par demi-journée (€)
                            </label>
                            <input
                                type="number"
                                value={data.price_par_demi_journee}
                                onChange={e => setData('price_par_demi_journee', e.target.value)}
                                placeholder="Ex: 50.00"
                                min="0"
                                step="0.01"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.price_par_demi_journee && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.price_par_demi_journee}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                                type="checkbox"
                                id="is_available"
                                checked={data.is_available}
                                onChange={e => setData('is_available', e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: '#2D6A5A', cursor: 'pointer' }}
                            />
                            <label htmlFor="is_available" style={{
                                fontWeight: '500',
                                color: '#2D6A5A',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}>
                                Espace disponible à la réservation
                            </label>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Photo de l'espace
                            </label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={e => setData('image', e.target.files[0])}
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    fontFamily: 'Roboto, sans-serif',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            />
                            {errors.image && (
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                            <a
                                href={route('spaces.index')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#2D6A5A',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                <ArrowLeft size={16} />
                                Retour aux espaces
                            </a>

                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: processing ? '#aaa' : '#2D6A5A',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '600',
                                    cursor: processing ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <Save size={16} />
                                {processing ? 'Enregistrement...' : 'Créer l\'espace'}
                            </button>
                        </div>




                    </form>
                </div>

            </div >
        </div >
    );
}