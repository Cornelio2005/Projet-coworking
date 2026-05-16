import { useForm, Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function Edit({ space }) {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@300;400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: space.name || '',
        description: space.description || '',
        type: space.type || 'bureau_individuel',
        capacity: space.capacity || '',
        price_par_heure: space.price_par_heure || '',
        price_par_demi_journee: space.price_par_demi_journee || '',
        is_available: space.is_available ?? true,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('spaces.update', space.id), {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        if (window.confirm('Supprimer cet espace ? Cette action est irréversible.')) {
            post(route('spaces.destroy', space.id), {
                data: { _method: 'DELETE' },
            });
        }
    };

    return (
        <div>
            <Head title={`Modifier — ${space.name}`} />
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
                        Modifier l'espace
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '32px'
                    }}>
                        Modifiez les informations de l'espace <strong>{space.name}</strong>.
                    </p>

                    {/* Image actuelle */}
                    {space.image && (
                        <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                            />
                            <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                                Image actuelle — uploadez une nouvelle image pour la remplacer.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '32px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}>

                        {/* Nom */}
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
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>
                            )}
                        </div>

                        {/* Description */}
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
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.description}</p>
                            )}
                        </div>

                        {/* Type */}
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
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.type}</p>
                            )}
                        </div>

                        {/* Capacité + Prix heure */}
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
                                    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.capacity}</p>
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
                                    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.price_par_heure}</p>
                                )}
                            </div>
                        </div>

                        {/* Prix demi-journée */}
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
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.price_par_demi_journee}</p>
                            )}
                        </div>

                        {/* Disponibilité */}
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

                        {/* Image */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '500',
                                color: '#2D6A5A',
                                marginBottom: '8px',
                                fontSize: '14px'
                            }}>
                                Nouvelle photo (optionnel)
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
                                <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.image}</p>
                            )}
                        </div>

                        {/* Boutons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>

                            <a href={route('spaces.index')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#2D6A5A',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}>
                                <ArrowLeft size={16} />
                                Retour aux espaces
                            </a>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#FEE2E2',
                                        color: '#991B1B',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px 20px',
                                        fontSize: '14px',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Trash2 size={16} />
                                    Supprimer
                                </button>

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
                                    {processing ? 'Enregistrement...' : 'Sauvegarder'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}