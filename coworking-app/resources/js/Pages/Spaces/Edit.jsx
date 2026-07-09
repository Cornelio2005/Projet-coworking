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

    const { data, setData, post, delete: destroy, processing, errors } = useForm({
        _method: 'PUT',
        name: space.name || '',
        description: space.description || '',
        type: space.type || 'bureau_individuel',
        capacity: space.capacity || '',
        price_par_heure: space.price_par_heure || '',
        price_par_demi_journee: space.price_par_demi_journee || '',
        is_available: space.is_available ?? true,
        is_open_space: space.is_open_space ?? false,
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
            destroy(route('spaces.destroy', space.id));
        }
    };

    return (
        <div>
            <Head title={`Modifier — ${space.name}`} />
            <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif] px-5 py-10">
                <div className="max-w-[700px] mx-auto">
                    <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-2">
                        Modifier l'espace
                    </h1>
                    <p className="text-[#666] text-sm mb-8">
                        Modifiez les informations de l'espace <strong>{space.name}</strong>.
                    </p>

                    {space.image && (
                        <div className="mb-6 rounded-xl overflow-hidden">
                            <img
                                src={`/storage/${space.image}`}
                                alt={space.name}
                                className="w-full h-[200px] object-cover block"
                            />
                            <p className="text-xs text-[#888] mt-1.5">
                                Image actuelle — uploadez une nouvelle image pour la remplacer.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Nom de l'espace
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border resize-y"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Type d'espace
                            </label>
                            <select
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border bg-white"
                            >
                                <option value="bureau_individuel">Bureau individuel</option>
                                <option value="bureau_partage">Bureau partagé</option>
                                <option value="salle_reunion">Salle de réunion</option>
                                <option value="espace_detente">Espace détente</option>
                            </select>
                            {errors.type && (
                                <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                            )}
                        </div>

                        {/* OPEN SPACE */}
                        <div className="flex items-center gap-3 mb-6 bg-[#E0F2FE] px-4 py-3.5 rounded-lg">
                            <input
                                type="checkbox"
                                id="is_open_space"
                                checked={data.is_open_space}
                                onChange={e => setData('is_open_space', e.target.checked)}
                                className="w-[18px] h-[18px] accent-[#2D6A5A] cursor-pointer"
                            />
                            <label htmlFor="is_open_space" className="font-medium text-[#2D6A5A] text-sm cursor-pointer">
                                Open space — les utilisateurs choisissent une place précise (basée sur la capacité)
                            </label>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                    Capacité (personnes)
                                </label>
                                <input
                                    type="number"
                                    value={data.capacity}
                                    onChange={e => setData('capacity', e.target.value)}
                                    min="1"
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border"
                                />
                                {errors.capacity && (
                                    <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                    Prix par heure (€)
                                </label>
                                <input
                                    type="number"
                                    value={data.price_par_heure}
                                    onChange={e => setData('price_par_heure', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border"
                                />
                                {errors.price_par_heure && (
                                    <p className="text-red-500 text-xs mt-1">{errors.price_par_heure}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Prix par demi-journée (€)
                            </label>
                            <input
                                type="number"
                                value={data.price_par_demi_journee}
                                onChange={e => setData('price_par_demi_journee', e.target.value)}
                                min="0"
                                step="0.01"
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border"
                            />
                            {errors.price_par_demi_journee && (
                                <p className="text-red-500 text-xs mt-1">{errors.price_par_demi_journee}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <input
                                type="checkbox"
                                id="is_available"
                                checked={data.is_available}
                                onChange={e => setData('is_available', e.target.checked)}
                                className="w-[18px] h-[18px] accent-[#2D6A5A] cursor-pointer"
                            />
                            <label htmlFor="is_available" className="font-medium text-[#2D6A5A] text-sm cursor-pointer">
                                Espace disponible à la réservation
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Nouvelle photo (optionnel)
                            </label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={e => setData('image', e.target.files[0])}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-[#ddd] text-sm font-['Roboto',sans-serif] box-border bg-white cursor-pointer"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center mt-8">

                            <a href={route('spaces.index')}
                                className="flex items-center gap-2 text-[#2D6A5A] text-sm font-medium no-underline"
                            >
                                <ArrowLeft size={16} />
                                Retour aux espaces
                            </a>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 bg-[#FEE2E2] text-[#991B1B] border-none rounded-lg px-5 py-3 text-sm font-['Montserrat',sans-serif] font-semibold cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                    Supprimer
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`flex items-center gap-2 text-white border-none rounded-lg px-6 py-3 text-sm font-['Montserrat',sans-serif] font-semibold transition-colors duration-200 ${processing ? 'bg-[#aaa] cursor-not-allowed' : 'bg-[#2D6A5A] cursor-pointer hover:bg-[#1a4237]'}`}
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