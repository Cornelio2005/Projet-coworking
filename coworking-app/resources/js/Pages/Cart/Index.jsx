import { Head, Link, router } from '@inertiajs/react';
import { ShoppingCart, Trash2, CalendarDays, MapPin, Armchair, ArrowLeft, CheckCircle } from 'lucide-react';

export default function CartIndex({ cart, total, auth }) {

    const handleRemove = (id) => {
        router.delete(route('cart.remove', { id }));
    };

    const handleCheckout = () => {
        router.post(route('cart.checkout'));
    };

    return (
        <div className="min-h-screen bg-[#F5F0EA] font-['Roboto',sans-serif]">
            <Head title="Mon panier — Cowork'In" />

            <nav className="bg-white px-12 py-3.5 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <img src="/logo.png" alt="Cowork'In" className="h-[42px]" />
                <Link href="/spaces" className="flex items-center gap-1.5 text-sm text-[#2D6A5A] no-underline">
                    <ArrowLeft size={16} />
                    Continuer à réserver
                </Link>
            </nav>

            <main className="py-12 px-[10%]">

                <div className="flex items-center gap-3 mb-8">
                    <ShoppingCart size={28} color="#2D6A5A" />
                    <h1 className="font-['Montserrat',sans-serif] font-extrabold text-[26px] text-[#2D6A5A]">
                        Mon panier
                    </h1>
                    <span className="bg-[#2D6A5A] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {cart.length} espace{cart.length > 1 ? 's' : ''}
                    </span>
                </div>

                {cart.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                        <ShoppingCart size={48} color="#ccc" className="mx-auto mb-4" />
                        <p className="font-['Montserrat',sans-serif] font-bold text-lg text-[#888] mb-2">
                            Votre panier est vide
                        </p>
                        <p className="text-sm text-[#aaa] mb-6">
                            Ajoutez des espaces depuis la liste des espaces disponibles.
                        </p>
                        <Link href="/spaces" className="bg-[#2D6A5A] text-white font-['Montserrat',sans-serif] font-bold text-sm px-6 py-3 rounded-[10px] no-underline">
                            Voir les espaces
                        </Link>
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-between gap-6">

                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} color="#2D6A5A" />
                                        <span className="font-['Montserrat',sans-serif] font-bold text-[15px] text-[#2D6A5A]">
                                            {item.space_name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16} color="#888" />
                                        <span className="text-sm text-[#555]">
                                            {new Date(item.start_time).toLocaleString('fr-FR')} → {new Date(item.end_time).toLocaleString('fr-FR')}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="bg-[#E0F2FE] text-[#2D6A5A] text-xs font-medium px-2.5 py-1 rounded-full w-fit">
                                            {item.type === 'heure' ? 'À l\'heure' : 'Demi-journée'}
                                        </span>

                                        {/* Badge place — uniquement si l'item vient d'un open space */}
                                        {item.seat_number && (
                                            <span className="flex items-center gap-1 bg-[#FCE7F3] text-[#C4714B] text-xs font-medium px-2.5 py-1 rounded-full w-fit">
                                                <Armchair size={12} />
                                                Place n°{item.seat_number}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="font-['Montserrat',sans-serif] font-extrabold text-xl text-[#2D6A5A]">
                                        {item.total_price}€
                                    </span>

                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="bg-[#FEE2E2] border-none p-2.5 rounded-lg cursor-pointer"
                                    >
                                        <Trash2 size={18} color="#C4714B" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)] max-w-md ml-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-['Montserrat',sans-serif] font-bold text-lg text-[#333]">
                                Total
                            </span>
                            <span className="font-['Montserrat',sans-serif] font-extrabold text-[28px] text-[#2D6A5A]">
                                {total}€
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#2D6A5A] text-white font-['Montserrat',sans-serif] font-bold text-base py-4 rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={20} />
                            Valider la commande
                        </button>

                        <p className="text-xs text-[#aaa] text-center mt-3">
                            Vos réservations seront en attente de confirmation par un gestionnaire.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}