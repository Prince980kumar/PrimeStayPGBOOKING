import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)' }}>


      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}>
                <Home className="text-white w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                PRIME STAY
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              India's most trusted PG aggregation platform. Premium managed student co-living spaces across all 28 states.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>Explore</h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/search', label: 'All PGs' },
                { to: '/locations', label: '📍 Locations' },
                { to: '/how-it-works', label: '⚡ How It Works' },
                { to: '/blog', label: '📖 Blog' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/list-your-pg', label: '🏠 List Your PG' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors duration-150 text-slate-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular North India */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>North India</h3>
            <ul className="space-y-3 text-sm">
              {[
                { city: 'Phagwara (LPU)', label: 'Near LPU Gate 1 & 2' },
                { city: 'Delhi', label: 'Laxmi Nagar, Dwarka' },
                { city: 'Chandigarh', label: 'Sector 17, Mohali' },
                { city: 'Jaipur', label: 'Malviya Nagar, Jaipur' },
                { city: 'Lucknow', label: 'Hazratganj, Gomti Nagar' },
                { city: 'Dehradun', label: 'Rajpur Road, ISBT' },
              ].map(l => (
                <li key={l.city}>
                  <Link to={`/search?city=${l.city}`} className="hover:text-white transition-colors duration-150 text-slate-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular South & West India */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>South & West</h3>
            <ul className="space-y-3 text-sm">
              {[
                { city: 'Bangalore', label: 'Koramangala, HSR Layout' },
                { city: 'Hyderabad', label: 'Gachibowli, HITEC City' },
                { city: 'Chennai', label: 'OMR Road, Velachery' },
                { city: 'Pune', label: 'Kothrud, Viman Nagar' },
                { city: 'Mumbai', label: 'Andheri, Thane' },
                { city: 'Kochi', label: 'Kakkanad, Edapally' },
              ].map(l => (
                <li key={l.city}>
                  <Link to={`/search?city=${l.city}`} className="hover:text-white transition-colors duration-150 text-slate-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>GT Road, Near LPU Main Gate, Phagwara, Punjab 144411</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+916205509076" className="hover:text-white transition-colors">+91 62055 09076</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                <a href="mailto:princepratap980@gmail.com" className="hover:text-white transition-colors">princepratap980@gmail.com</a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-slate-400 mb-3 font-medium">Get PG tips in your inbox</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow px-3 py-2.5 text-xs text-white rounded-l-xl focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <button className="px-3 py-2.5 text-white text-xs font-bold rounded-r-xl transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p>© {new Date().getFullYear()} Prime Stay PG. All rights reserved. Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline mx-1" /> for Students & Professionals across India.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Sitemap'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
