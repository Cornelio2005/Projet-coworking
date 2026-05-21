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
            <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif] px-5 py-10">
                <div className="max-w-[700px] mx-auto">
                    <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A] mb-2">
                        Créer un espace
                    </h1>
                    <p className="text-[#666] text-sm mb-8">
                        Remplissez le formulaire ci-dessous pour créer un nouvel espace de travail.
                    </p>

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="mb-6">
                            <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                Nom de l'espace
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Ex: Bureau Zen, Salle Innovation..."
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
                                placeholder="Décrivez l'espace, ses équipements, son ambiance..."
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
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block font-medium text-[#2D6A5A] mb-2 text-sm">
                                    Capacité (personnes)
                                </label>
                                <input
                                    type="number"
                                    value={data.capacity}
                                    onChange={e => setData('capacity', e.target.value)}
                                    placeholder="Ex: 8"
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
                                    placeholder="Ex: 15.00"
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
                                placeholder="Ex: 50.00"
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
                                Photo de l'espace
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
                            <a
                                href={route('spaces.index')}
                                className="flex items-center gap-2 text-[#2D6A5A] text-sm font-medium no-underline"
                            >
                                <ArrowLeft size={16} />
                                Retour aux espaces
                            </a>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`flex items-center gap-2 text-white border-none rounded-lg px-6 py-3 text-sm font-['Montserrat',sans-serif] font-semibold transition-colors duration-200 ${processing ? 'bg-[#aaa] cursor-not-allowed' : 'bg-[#2D6A5A] cursor-pointer hover:bg-[#1a4237]'}`}
                            >
                                <Save size={16} />
                                {processing ? 'Enregistrement...' : 'Créer l\'espace'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}