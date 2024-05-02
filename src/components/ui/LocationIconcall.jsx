import { MapPin } from 'lucide-react';

export function LocationIconCall() {
    const handleClick = () => {
        // Abre WhatsApp en una nueva pestaña del navegador
        window.open('https://wa.me/584143247377', '_blank');
    };
    return (
        <div onClick={handleClick} className="absolute right-8 bottom-4 z-50 cursor-pointer ">
            <MapPin className="text-purple-600 h-12 w-12 " />
        </div>
    )
}
