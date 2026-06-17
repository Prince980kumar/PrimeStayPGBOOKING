import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Shield, Star, IndianRupee, Users, CheckCircle, Upload, MapPin, Phone, Camera, ChevronRight, Zap } from 'lucide-react';

const benefits = [
  { icon: <IndianRupee className="w-7 h-7" />, title: 'Earn More, Guaranteed', desc: 'Our verified listings get 3x more inquiries than unverified ones. Fill vacancies faster.', color: '#10b981' },
  { icon: <Users className="w-7 h-7" />, title: '50,000+ Active Tenants', desc: 'Reach thousands of pre-vetted students and professionals actively searching near you.', color: '#0ea5e9' },
  { icon: <Shield className="w-7 h-7" />, title: 'Verified & Trusted', desc: 'Our team verifies each listing. Tenants trust the Prime Stay badge, so they book faster.', color: '#8b5cf6' },
  { icon: <Star className="w-7 h-7" />, title: 'Free Premium Listing', desc: 'Your first 30 days are completely free. No commission on the first booking. Zero risk.', color: '#f59e0b' },
  { icon: <TrendingUp className="w-7 h-7" />, title: 'Smart Analytics Dashboard', desc: 'Track views, inquiries, and occupancy rate in real-time with our landlord dashboard.', color: '#ef4444' },
  { icon: <Zap className="w-7 h-7" />, title: 'Instant Notifications', desc: 'Get WhatsApp & SMS alerts for every inquiry. Never miss a potential tenant.', color: '#ec4899' },
];

const steps = [
  { num: 1, title: 'Submit Your Details', desc: 'Fill the form below with your property address, available rooms, and photos.' },
  { num: 2, title: 'Verification Visit', desc: 'Our team schedules a free physical verification of your property within 24 hours.' },
  { num: 3, title: 'Go Live', desc: 'Your property goes live on Prime Stay. Thousands of tenants can now discover it.' },
  { num: 4, title: 'Manage & Earn', desc: 'Accept bookings, track payments, and grow your rental income from your dashboard.' },
];

const testimonials = [
  { name: 'Suresh Kumar', location: 'Phagwara, Punjab', quote: 'Filled all 12 rooms within 3 days of listing. Never had such quick results before!', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Meena Devi', location: 'Koramangala, Bangalore', quote: 'The verified badge makes tenants book without even visiting. My occupancy is 100%!', rating: 5, img: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=100&q=80' },
  { name: 'Rajesh Patel', location: 'Andheri, Mumbai', quote: 'Best decision I made. The analytics dashboard helps me price rooms competitively.', rating: 5, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' },
];

const ListYourPG = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', pgName: '', city: '', state: '', address: '', rooms: '', price: '', type: 'boys', amenities: [], description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const amenitiesList = ['WiFi', 'AC', 'Food', 'Gym', 'Laundry', 'Power Backup', 'Parking', 'CCTV', 'Hot Water', 'Housekeeping'];

  const toggleAmenity = (a) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a) ? prev.amenities.filter(x => x !== a) : [...prev.amenities, a]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const indianStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry'];

  return (
    <div className="flex-grow">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a0a2e 50%, #0a1f3a 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.2) 0%, transparent 50%)' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Property Owners & Landlords</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              List Your PG.
              <br />
              <span style={{ background: 'linear-gradient(90deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Fill it in Days.
              </span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Join 5,000+ property owners who trust Prime Stay to fill their vacancies with quality, verified tenants.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '5,000+', label: 'Landlords Listed' },
              { val: '3 Days', label: 'Avg. Vacancy Fill Time' },
              { val: '₹0', label: 'Listing Cost (30 days)' },
              { val: '100%', label: 'Avg. Occupancy Rate' },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <div className="text-3xl font-extrabold mb-1" style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(90deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                <div className="text-slate-400 text-xs font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Why Choose Prime Stay?</h2>
            <p className="text-slate-500 text-lg">Everything you need to maximize your rental income</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${b.color}15` }}>
                  <span style={{ color: b.color }}>{b.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0f172a, #1a0a2e)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>List in 4 Simple Steps</h2>
            <p className="text-slate-400 text-lg">From submission to your first booking in 48 hours</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', fontFamily: 'Outfit, sans-serif' }}>
                  {s.num}
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-slate-600 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing Form */}
      <section className="py-20 px-4 bg-white" id="list-form">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Submit Your Property</h2>
            <p className="text-slate-500 text-lg">Fill in the details and our team will contact you within 24 hours</p>
          </div>

          {submitted ? (
            <div className="text-center py-20 px-8 rounded-3xl" style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', border: '2px solid #bbf7d0' }}>
              <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Property Submitted! 🎉</h3>
              <p className="text-slate-600 text-lg mb-4">Thank you, {form.name}! Our verification team will call you at <strong>{form.phone}</strong> within 24 hours.</p>
              <p className="text-slate-500 text-sm mb-8">Meanwhile, check your email at <strong>{form.email}</strong> for confirmation and next steps.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', pgName: '', city: '', state: '', address: '', rooms: '', price: '', type: 'boys', amenities: [], description: '' }); }}
                className="px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)' }}>
                Submit Another Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Owner Info */}
              <div className="p-8 rounded-3xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <Users className="w-5 h-5 text-indigo-500" />
                  Owner Information
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { field: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text', req: true },
                    { field: 'email', label: 'Email', placeholder: 'owner@email.com', type: 'email', req: true },
                    { field: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', req: true },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        required={f.req}
                        placeholder={f.placeholder}
                        value={form[f.field]}
                        onChange={e => setForm({ ...form, [f.field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                        style={{ border: '1.5px solid #e2e8f0' }}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Info */}
              <div className="p-8 rounded-3xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <Building2 className="w-5 h-5 text-indigo-500" />
                  Property Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PG Name</label>
                    <input
                      type="text" required
                      placeholder="e.g. Sunrise Boys PG"
                      value={form.pgName}
                      onChange={e => setForm({ ...form, pgName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                      style={{ border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">PG Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['boys', 'girls', 'unisex'].map(t => (
                        <button type="button" key={t}
                          onClick={() => setForm({ ...form, type: t })}
                          className="py-3 rounded-xl text-xs font-bold capitalize transition-all"
                          style={form.type === t
                            ? { background: 'linear-gradient(135deg, #6366f1, #ec4899)', color: 'white', boxShadow: '0 4px 15px rgba(99,102,241,0.35)' }
                            : { background: 'white', color: '#64748b', border: '1.5px solid #e2e8f0' }
                          }>
                          {t === 'unisex' ? 'Coliving' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">State</label>
                    <select
                      value={form.state}
                      onChange={e => setForm({ ...form, state: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 focus:outline-none transition-all bg-white"
                      style={{ border: '1.5px solid #e2e8f0' }}
                    >
                      <option value="">Select State</option>
                      {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City</label>
                    <input
                      type="text" required
                      placeholder="e.g. Phagwara"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                      style={{ border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Complete Address</label>
                  <input
                    type="text" required
                    placeholder="Street address, landmark..."
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                    style={{ border: '1.5px solid #e2e8f0' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Number of Rooms</label>
                    <input
                      type="number" min="1" required
                      placeholder="e.g. 12"
                      value={form.rooms}
                      onChange={e => setForm({ ...form, rooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                      style={{ border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Starting Price (₹/month)</label>
                    <input
                      type="number" min="1000" required
                      placeholder="e.g. 7000"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all bg-white"
                      style={{ border: '1.5px solid #e2e8f0' }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="p-8 rounded-3xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <Star className="w-5 h-5 text-indigo-500" />
                  Available Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {amenitiesList.map(a => (
                    <button type="button" key={a}
                      onClick={() => toggleAmenity(a)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all"
                      style={form.amenities.includes(a)
                        ? { background: 'linear-gradient(135deg, #6366f1, #ec4899)', color: 'white', boxShadow: '0 4px 10px rgba(99,102,241,0.3)' }
                        : { background: 'white', color: '#64748b', border: '1.5px solid #e2e8f0' }
                      }>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Photos */}
              <div className="p-8 rounded-3xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <Camera className="w-5 h-5 text-indigo-500" />
                  Description & Photos
                </h3>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Property Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your PG — location advantages, nearby landmarks, special features, house rules..."
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all resize-none bg-white"
                    style={{ border: '1.5px solid #e2e8f0' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-indigo-50" style={{ borderColor: '#c7d2fe' }}>
                  <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-semibold text-sm mb-1">Upload property photos</p>
                  <p className="text-slate-400 text-xs">Drag & drop or click to browse • Max 20 photos • JPG, PNG</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-2xl font-extrabold text-white text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', boxShadow: '0 10px 40px rgba(99,102,241,0.4)', fontFamily: 'Outfit, sans-serif' }}
              >
                {loading ? (
                  <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Building2 className="w-6 h-6" />
                    Submit My PG for Listing
                  </>
                )}
              </button>

              <p className="text-center text-slate-400 text-xs">
                By submitting, you agree to our <Link to="/terms" className="text-indigo-500 font-semibold hover:underline">Terms of Service</Link> and consent to our verification process.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>What Landlords Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl" style={{ border: '1px solid #f1f5f9' }}>
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListYourPG;
