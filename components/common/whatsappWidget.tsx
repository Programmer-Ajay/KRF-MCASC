import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWidget() {
  return (
    <Link
      href="https://chat.whatsapp.com/KH6gM0tte9XBQvLcgLPgzs"
      // 'fixed' makes it float, 'z-50' ensures it is on top of everything
      className="fixed bottom-6 right-2 z-50 group flex items-center justify-center"
    >
      {/* Tooltip Text (Hidden by default, shows on hover) */}
      <span className="absolute right-16 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 bg-white text-black text-sm font-medium px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
        Chat with Support
      </span>

      {/* The Button Circle */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-[#20bd5a]">
        <FaWhatsapp size={28} className="fill-white" />
      </div>
      
      {/* Optional: Ping Animation Ring to grab attention */}
      <span className="absolute -z-10 h-8 w-8 animate-ping rounded-full bg-[#25D366] opacity-75"></span>
    </Link>
  );
}