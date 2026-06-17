import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home, MapPin, Star, Award, Heart, Zap, Shield, Coffee, Wifi, Wind, ChefHat, Dumbbell } from 'lucide-react';

const faqs = [
  { q: 'What is included in a Prime Stay PG?', a: 'All our PGs come with furnished rooms, WiFi, housekeeping, power backup, and 24/7 security. Meal plans and additional amenities vary by property.' },
  { q: 'How do I book a PG on Prime Stay?', a: 'Simply browse by location, choose your preferred property, and click "Book Now." You can schedule a visit or book directly online with zero brokerage.' },
  { q: 'Are there any hidden charges?', a: 'Absolutely not. We believe in complete transparency. You pay the monthly rent and security deposit. No broker fees, no hidden service charges.' },
  { q: 'Can I visit the PG before booking?', a: 'Yes! We encourage physical visits. You can schedule a free site visit through our platform at your convenient time.' },
  { q: 'What if I face issues after moving in?', a: 'We have a 24/7 support system. Raise a maintenance request through the app and our team will resolve it within 24 hours, guaranteed.' },
  { q: 'Is food available at all properties?', a: 'Most of our properties offer mess/food plans at an additional cost. Properties with food service are clearly marked in the listing.' },
];

const timeline = [
  { step: 1, title: 'Browse Locations', desc: 'Search PGs across India by state, city, gender preference, and budget.', icon: <MapPin className="w-6 h-6" />, color: '#0ea5e9' },
  { step: 2, title: 'Shortlist & Compare', desc: 'Compare amenities, pricing, and reviews side by side.', icon: <Star className="w-6 h-6" />, color: '#8b5cf6' },
  { step: 3, title: 'Schedule a Visit', desc: 'Book a free site visit at your convenient time slot.', icon: <Home className="w-6 h-6" />, color: '#10b981' },
  { step: 4, title: 'Book & Move In', desc: 'Pay the deposit online, get the keys, and settle in comfortably!', icon: <Award className="w-6 h-6" />, color: '#f59e0b' },
];

const amenities = [
  { icon: <Wifi className="w-7 h-7" />, name: 'High-Speed WiFi', desc: '100 Mbps broadband in all rooms' },
  { icon: <Wind className="w-7 h-7" />, name: 'Air Conditioning', desc: 'AC in all premium rooms' },
  { icon: <ChefHat className="w-7 h-7" />, name: 'Home Cooked Food', desc: 'Nutritious meals thrice a day' },
  { icon: <Dumbbell className="w-7 h-7" />, name: 'Fitness Center', desc: 'Fully equipped gym on premises' },
  { icon: <Shield className="w-7 h-7" />, name: '24/7 Security', desc: 'CCTV, biometric & wardens' },
  { icon: <Coffee className="w-7 h-7" />, name: 'Common Lounge', desc: 'Relax, study, or network' },
  { icon: <Zap className="w-7 h-7" />, name: 'Power Backup', desc: 'Uninterrupted 24/7 supply' },
  { icon: <Heart className="w-7 h-7" />, name: 'Housekeeping', desc: 'Daily cleaning of rooms' },
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex-grow" style={{ background: '#f0f9ff' }}>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #0c2340 60%, #0a1628 100%)'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(56,189,248,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.12) 0%, transparent 50%)' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)' }}>
            <Zap className="w-4 h-4 text-sky-400" />
            <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">Simple. Transparent. Fast.</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How Prime Stay
            <br />
            <span style={{ background: 'linear-gradient(90deg, #38bdf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Works for You
            </span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We've made finding and booking a PG as simple as ordering food online. Here's everything you need to know.
          </p>
        </div>
      </section>

      {/* Booking Process Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>4 Easy Steps to Your New Home</h2>
            <p className="text-slate-500 text-lg">Book your perfect PG in under 10 minutes</p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-violet-200 to-emerald-200 mx-24" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-xl"
                    style={{ background: `${item.color}20`, border: `2px solid ${item.color}40`, zIndex: 10 }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${item.color}30` }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-md"
                      style={{ background: item.color }}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/search" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)', boxShadow: '0 8px 30px rgba(2,132,199,0.35)' }}>
              Start Searching Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Showcase */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0f172a, #0c2340)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Premium Amenities Included</h2>
            <p className="text-slate-400 text-lg">Everything you need, all in one place</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {amenities.map((a, i) => (
              <div key={i} className="p-6 rounded-2xl text-center group transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.1)'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all" style={{ background: 'rgba(14,165,233,0.15)' }}>
                  <span className="text-sky-400">{a.icon}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{a.name}</h3>
                <p className="text-slate-500 text-xs">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Frequently Asked Questions</h2>
            <p className="text-slate-500 text-lg">Got questions? We have answers.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300" style={{ border: '1px solid #e2e8f0' }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: openFaq === i ? '#f0f9ff' : 'white' }}
                >
                  <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed" style={{ background: '#f0f9ff', borderTop: '1px solid #e0f2fe' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Ready to Find Your Perfect PG?</h2>
          <p className="text-blue-100 text-xl mb-10">Join 50,000+ students and professionals who trust Prime Stay.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="px-10 py-4 rounded-2xl font-bold bg-white text-sky-700 text-lg transition-all hover:scale-105 hover:shadow-xl">
              Explore PGs Now
            </Link>
            <Link to="/contact" className="px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)' }}>
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
