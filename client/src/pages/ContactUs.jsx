import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle, ChevronDown } from 'lucide-react';

const offices = [
  { city: 'Phagwara (HQ)', address: 'Near Gate 1, LPU Campus Road, Phagwara, Punjab 144411', phone: '+91 62055 09076', email: 'princepratap980@gmail.com', hours: 'Mon–Sat: 9AM–8PM' },
  { city: 'Bangalore', address: '3rd Floor, Koramangala 5th Block, Bangalore, Karnataka 560095', phone: '+91 98765 43211', email: 'bangalore@primestay.in', hours: 'Mon–Sat: 9AM–7PM' },
  { city: 'Delhi', address: '2nd Floor, Laxmi Nagar Metro Station Complex, New Delhi 110092', phone: '+91 98765 43212', email: 'delhi@primestay.in', hours: 'Mon–Fri: 10AM–6PM' },
];

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex-grow">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #042040 50%, #0f1f3a 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(16,185,129,0.12) 0%, transparent 55%), radial-gradient(circle at 75% 30%, rgba(14,165,233,0.12) 0%, transparent 55%)' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">We're here to help</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get in Touch
            <br />
            <span style={{ background: 'linear-gradient(90deg, #34d399, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We Reply in Minutes
            </span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Have a question about a PG, want to list your property, or just need help? Our team is available 7 days a week.
          </p>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {[
              { icon: <Phone className="w-6 h-6" />, label: 'Call Us', value: '+91 62055 09076', color: '#10b981', href: 'tel:+916205509076' },
              { icon: <Mail className="w-6 h-6" />, label: 'Email Us', value: 'princepratap980@gmail.com', color: '#0ea5e9', href: 'mailto:princepratap980@gmail.com' },
              { icon: <MessageCircle className="w-6 h-6" />, label: 'WhatsApp', value: '+91 62055 09076', color: '#22c55e', href: 'https://wa.me/916205509076' },
            ].map((c, i) => (
              <a key={i} href={c.href} className="flex flex-col items-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: `${c.color}20` }}>
                  <span style={{ color: c.color }}>{c.icon}</span>
                </div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{c.label}</span>
                <span className="text-white font-bold text-sm">{c.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Info */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Send Us a Message</h2>
            <p className="text-slate-500 mb-8">Fill out the form and we'll get back to you within 2 hours.</p>

            {submitted ? (
              <div className="text-center py-16 px-8 rounded-3xl" style={{ background: '#f0fdf4', border: '2px solid #bbf7d0' }}>
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Message Sent! 🎉</h3>
                <p className="text-slate-600 mb-6">Thank you, {form.name}! We'll reply to {form.email} within 2 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' }); }}
                  className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inquiry Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'general', label: '💬 General' },
                      { val: 'booking', label: '🏠 Booking' },
                      { val: 'listing', label: '📋 List PG' },
                    ].map(t => (
                      <button type="button" key={t.val}
                        onClick={() => setForm({ ...form, type: t.val })}
                        className="py-2.5 rounded-xl text-xs font-bold border transition-all"
                        style={form.type === t.val
                          ? { background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(14,165,233,0.3)' }
                          : { background: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' }
                        }>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { field: 'name', label: 'Full Name', placeholder: 'Rahul Kumar', type: 'text', required: true },
                    { field: 'email', label: 'Email Address', placeholder: 'rahul@gmail.com', type: 'email', required: true },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        value={form[f.field]}
                        onChange={e => setForm({ ...form, [f.field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  ))}
                </div>

                {/* Phone & Subject */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                      style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your requirement, preferred location, budget, move-in date..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none"
                    style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                    onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #10b981)', boxShadow: '0 8px 30px rgba(2,132,199,0.35)' }}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Our Offices</h2>
              <p className="text-slate-500 mb-8">Visit us at any of our offices across India.</p>
            </div>

            {offices.map((o, i) => (
              <div key={i} className="p-6 rounded-2xl transition-all hover:shadow-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-slate-900 text-lg mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>📍 {o.city}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <span>{o.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <a href={`tel:${o.phone}`} className="font-semibold hover:text-sky-600 transition-colors">{o.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4 text-violet-500 flex-shrink-0" />
                    <a href={`mailto:${o.email}`} className="font-semibold hover:text-sky-600 transition-colors">{o.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{o.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="font-bold text-white text-lg mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Follow Us</h3>
              <div className="flex gap-3">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
