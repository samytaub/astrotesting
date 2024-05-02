import { IoLogoWhatsapp } from "react-icons/io";

export function WhatsAppIconCall() {
    const handleClick = () => {
        // Abre WhatsApp en una nueva pestaña del navegador
        window.open('https://wa.me/584143247377', '_blank');
    };
    return (
        <div onClick={handleClick} className="absolute right-8 bottom-20 z-50 cursor-pointer ">
            <IoLogoWhatsapp className="text-green-600 h-12 w-12" />
        </div>
    )
}

