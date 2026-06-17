import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Eye, Award, Heart, Globe, ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Arjun Sharma',
    role: 'Founder & CEO',
    bio: 'Ex-IIT Delhi. Built PG aggregation platforms serving 1M+ students across India.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    linkedin: '#', twitter: '#'
  },
  {
    name: 'Priya Nair',
    role: 'Co-Founder & COO',
    bio: 'MBA from IIM Bangalore. 10+ years in PropTech and real estate management.',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=300&q=80',
    linkedin: '#', twitter: '#'
  },
  {
    name: 'Rahul Mehta',
    role: 'CTO',
    bio: 'Full-stack engineer with deep expertise in scalable housing platforms.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    linkedin: '#', twitter: '#'
  },
  {
    name: 'Sneha Reddy',
    role: 'Head of Operations',
    bio: 'Managed 200+ PG properties across Hyderabad, Bangalore and Chennai.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    linkedin: '#', instagram: '#'
  },
];

const milestones = [
  { year: '2020', title: 'Founded', desc: 'Started with 5 PGs in Phagwara near LPU campus.' },
  { year: '2021', title: 'Scaled to 3 Cities', desc: 'Expanded to Bangalore and Delhi with 50+ properties.' },
  { year: '2022', title: 'Series A Funding', desc: 'Raised ₹12 Cr to build our tech platform and national ops team.' },
  { year: '2023', title: '200+ Properties', desc: 'Crossed 200 verified PG listings across 15 major cities.' },
  { year: '2024', title: 'Pan-India Launch', desc: 'Now present in all 28 states with 1,000+ partner properties.' },
  { year: '2025', title: '50K+ Happy Tenants', desc: 'Achieved 4.8⭐ average rating across all verified properties.' },
];

const values = [
  { icon: <Heart className="w-8 h-8" />, title: 'Tenant-First', desc: 'Every decision we make puts the comfort and safety of our tenants first.', color: '#ef4444' },
  { icon: <Eye className="w-8 h-8" />, title: 'Transparency', desc: 'No hidden charges. What you see on the listing is what you pay.', color: '#0ea5e9' },
  { icon: <Target className="w-8 h-8" />, title: 'Excellence', desc: 'We set and maintain the highest quality standards in student housing.', color: '#8b5cf6' },
  { icon: <Globe className="w-8 h-8" />, title: 'Accessibility', desc: 'Premium living should be accessible to every student, not just the privileged.', color: '#10b981' },
];

const AboutUs = () => (
  <div className="flex-grow">
    {/* Hero */}
    <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.2) 0%, transparent 60%)' }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)' }}>
          <Users className="w-4 h-4 text-violet-400" />
          <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">Our Story</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-8 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          We're Reimagining
          <br />
          <span style={{ background: 'linear-gradient(90deg, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Student Living
          </span>
          <br />
          in India
        </h1>
        <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
          Born from the frustration of finding decent, affordable accommodation near LPU Phagwara, Prime Stay is India's most trusted PG aggregation platform.
        </p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: '#faf5ff', border: '1px solid #e9d5ff' }}>
            <Target className="w-4 h-4 text-violet-600" />
            <span className="text-violet-700 text-xs font-bold uppercase tracking-wider">Our Mission</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Making premium living accessible to every student
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-6">
            We started with a simple belief: every student deserves a safe, comfortable, and affordable place to call home. No more shady landlords, no more hidden fees, no more compromising on quality.
          </p>
          <p className="text-slate-500 text-lg leading-relaxed">
            Today, Prime Stay operates across 28 Indian states, partnering with verified property owners to deliver a world-class student housing experience.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team working" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(236,72,153,0.2))' }} />
          <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <p className="text-white font-bold text-lg">"Where students thrive, India prospers."</p>
            <p className="text-white/70 text-sm mt-1">— Arjun Sharma, Founder</p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 px-4" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Our Core Values</h2>
          <p className="text-slate-500 text-lg">Principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ border: '1px solid #f1f5f9' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${v.color}15` }}>
                <span style={{ color: v.color }}>{v.icon}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Our Journey</h2>
          <p className="text-slate-400 text-lg">From 5 PGs to Pan-India in 5 years</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, #8b5cf6, #ec4899, #0ea5e9)' }} />
          
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-violet-400 bg-slate-900 transform md:-translate-x-1/2 mt-2" />
                
                {/* Content */}
                <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                    <span className="text-violet-400 font-extrabold text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.year}</span>
                    <h3 className="text-white font-bold text-lg mt-1 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{m.title}</h3>
                    <p className="text-slate-400 text-sm">{m.desc}</p>
                  </div>
                </div>
                <div className="md:w-5/12 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Meet the Team</h2>
          <p className="text-slate-500 text-lg">The passionate people behind Prime Stay</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((t, i) => (
            <div key={i} className="group text-center rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ border: '1px solid #f1f5f9' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3" style={{ background: 'rgba(139,92,246,0.8)' }}>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.name}</h3>
                <p className="text-violet-600 text-xs font-bold uppercase tracking-wider mb-3">{t.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <Award className="w-12 h-12 text-white/80 mx-auto mb-6" />
        <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Join the Prime Stay Family</h2>
        <p className="text-purple-100 text-lg mb-10">Be part of 50,000+ students who've found their perfect home with us.</p>
        <Link to="/search" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold bg-white text-purple-700 text-lg transition-all hover:scale-105 hover:shadow-2xl">
          Find My PG <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  </div>
);

export default AboutUs;
