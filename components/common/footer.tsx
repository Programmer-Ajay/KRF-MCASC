import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-400">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400">
              Kartikeya Rindani Event
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              The ultimate celebration of talent, creativity, and innovation.
              Join us for an unforgettable experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
  <li>
    <Link href="/" className="hover:text-cyan-400 transition">
      Home
    </Link>
  </li>
  <li>
    <Link href="/#events" className="hover:text-cyan-400 transition">
      Events
    </Link>
  </li>
  <li>
    <Link href="/#gallery" className="hover:text-cyan-400 transition">
      Gallery
    </Link>
  </li>
  <li>
    <Link href="/about" className="hover:text-cyan-400 transition">
      About
    </Link>
  </li>
</ul>

          </div>

          {/* College Leadership */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              College Leadership
            </h3>  {/*Principal and HOD names */}
            <p className="text-cyan-400 text-sm font-medium">Principal</p>
            <p className="text-sm mb-3">Prof.Dr.Nivedita G. Ekbote</p>

            <p className="text-cyan-400 text-sm font-medium">
              HOD – Computer Science
            </p>
            <p className="text-sm">Prof. Shamkant Deshmukh</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-sm">
              <a
  href="https://www.google.com/maps?q=Modern+College+of+Arts+Science+and+Commerce+Shivajinagar+Pune"
  target="_blank"
  rel="noopener noreferrer"
  className="flex gap-3 hover:text-cyan-400 transition"
>
  <MapPin className="w-6 h-6 text-cyan-400 mt-1 shrink-0" />
  <span>
    Modern College of Arts, Science and Commerce, Shivajinagar,
    Pune – 411005
  </span>
</a>


              <div className="flex gap-3">
                <Phone size={18} className="text-cyan-400" />
                <span>(+9120) 25535468</span>
              </div>

              <a
  href="mailto:hodcompsci@moderncollegepune.edu.in"
  className="group flex gap-3 items-center text-gray-400 hover:text-cyan-400 transition"
>
  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
  <span className="group-hover:text-cyan-400">
    hodcompsci@moderncollegepune.edu.in
  </span>
</a>

              <a
                  href="https://moderncollegepune.edu.in"
                  target="_blank"
                  className="group flex gap-3 items-center text-gray-400 hover:text-cyan-400 transition"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                  <span className="group-hover:text-cyan-400">
                    College Website
                  </span>
                </a>


            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Developed By */}
        <div className="text-center">
          <p className="text-cyan-400 font-semibold mb-4">
            &lt;&gt; Developed By
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {["Ajay Kumawat", "Shweta Avhad", "Krutika Dhake"].map((dev) => (
              <span
                key={dev}
                className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:border-cyan-400 hover:text-cyan-400 transition"
              >
                {dev}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 text-center text-xs text-gray-500">
          © 2025 Kartikeya Rindani Event | Modern College of Arts, Science and
          Commerce (Autonomous), Shivajinagar ,Pune-411005.
        </div>
      </div>
    </footer>
  );
}
