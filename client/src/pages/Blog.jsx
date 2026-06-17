import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, User, ArrowRight, Search, TrendingUp, ChevronRight, Tag, Star, MapPin, ShieldCheck, Wifi, UtensilsCrossed, Zap } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: '10 Things to Check Before Booking a PG Near LPU',
    excerpt: "Moving to Phagwara for LPU? Here's the ultimate checklist every student must use before signing any PG rental agreement — from WiFi speed tests to kitchen hygiene inspections.",
    body: 'When moving near LPU, always verify: 1) Proximity to the campus gate, 2) WiFi speed (minimum 50 Mbps), 3) Mess food quality, 4) Security (CCTV & guards), 5) Water & power backup, 6) Room lock quality, 7) Lease agreement terms, 8) Deposit refund policy, 9) Cleanliness standards, 10) Peer reviews on platforms like Prime Stay.',
    category: 'Student Tips',
    author: 'Priya Nair',
    authorImg: 'https://i.pravatar.cc/100?img=47',
    date: 'June 10, 2025',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    tag: 'LPU',
    featured: true,
    rating: 4.9,
    views: '12.4k',
  },
  {
    id: 2,
    title: 'Bangalore PG vs Flat: What\'s Better for IT Professionals?',
    excerpt: 'Weighing the pros and cons of PG accommodation vs renting an apartment in Koramangala, HSR Layout, and Whitefield — with real rent data from 2025.',
    body: 'PGs in Bangalore offer all-inclusive pricing (rent + food + WiFi + cleaning), making them ideal for IT freshers who want zero hassle. Flats offer privacy but require managing bills, groceries, and maintenance separately. For professionals earning ₹4–8 LPA, PGs in HSR at ₹12,000–18,000/month offer far better value.',
    category: 'City Guides',
    author: 'Arjun Sharma',
    authorImg: 'https://i.pravatar.cc/100?img=12',
    date: 'June 5, 2025',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80',
    tag: 'Bangalore',
    featured: true,
    rating: 4.8,
    views: '9.1k',
  },
  {
    id: 3,
    title: 'How to Save Money on Rent in Delhi NCR in 2025',
    excerpt: 'Rising rents in Delhi NCR got you worried? These 8 practical strategies — including PG room sharing, meal plans, and off-peak booking — will cut your costs by 30%.',
    body: 'Tips include: booking double-occupancy rooms (saves 35%), choosing PGs 1 km from metro stations instead of walking distance (saves 20%), opting for meal-included PGs, and using platforms like Prime Stay to compare verified listings without broker fees.',
    category: 'Finance',
    author: 'Rahul Mehta',
    authorImg: 'https://i.pravatar.cc/100?img=33',
    date: 'May 28, 2025',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80',
    tag: 'Delhi',
    rating: 4.7,
    views: '7.6k',
  },
  {
    id: 4,
    title: 'PG Safety Guide: Red Flags Every Tenant Must Know',
    excerpt: 'From hidden cameras to unregistered buildings — here\'s how to spot unsafe PGs and protect yourself. Plus a checklist your parents will thank you for.',
    body: 'Red flags include: no police verification form, broken locks on bathrooms, no CCTV in common areas, absence of fire extinguishers, overcrowded rooms exceeding legal limits, and landlords who refuse to give a written agreement. Always insist on a registered rental deed.',
    category: 'Safety',
    author: 'Sneha Reddy',
    authorImg: 'https://i.pravatar.cc/100?img=25',
    date: 'May 20, 2025',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
    tag: 'Safety',
    rating: 4.9,
    views: '15.2k',
  },
  {
    id: 5,
    title: 'Top 5 PG-Friendly Locations in Hyderabad for Tech Workers',
    excerpt: 'Gachibowli, HITEC City, Kondapur, Madhapur, and Nanakramguda — we rank the best PG zones with average rent, commute time, and amenities data.',
    body: 'Gachibowli leads with proximity to major IT parks and PG rents of ₹10,000–15,000. HITEC City follows closely. Kondapur offers the best food scene. Madhapur suits those who value nightlife & restaurants. Nanakramguda is quieter and budget-friendly at ₹8,000–12,000.',
    category: 'City Guides',
    author: 'Arjun Sharma',
    authorImg: 'https://i.pravatar.cc/100?img=12',
    date: 'May 12, 2025',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=900&q=80',
    tag: 'Hyderabad',
    rating: 4.6,
    views: '6.8k',
  },
  {
    id: 6,
    title: 'Understanding PG Rental Agreements: A Legal Guide for Students',
    excerpt: 'What clauses to watch out for, your rights as a tenant, the difference between a license and a lease, and how to negotiate fair terms with PG owners.',
    body: 'Key clauses: lock-in period (typically 3–6 months), notice period (usually 1 month), deposit refund timeline (must be within 30 days), maintenance responsibility, and subletting restrictions. Always get agreements notarized for properties above ₹5,000/month.',
    category: 'Legal',
    author: 'Priya Nair',
    authorImg: 'https://i.pravatar.cc/100?img=47',
    date: 'April 30, 2025',
    readTime: '9 min read',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    tag: 'Legal',
    rating: 4.8,
    views: '11.3k',
  },
  {
    id: 7,
    title: 'What Makes a Great PG? The 7 Amenities You Should Never Compromise On',
    excerpt: 'Not all PGs are created equal. From high-speed internet to RO water — here are the 7 must-have amenities that separate premium PGs from ordinary ones.',
    body: 'Must-haves: 1) 50+ Mbps fiber WiFi, 2) 24/7 hot water, 3) RO filtered drinking water, 4) Power backup (inverter/generator), 5) CCTV + security guard, 6) Clean attached/common bathroom with regular cleaning, 7) Nutritious mess food with breakfast, lunch & dinner.',
    category: 'Student Tips',
    author: 'Divya Menon',
    authorImg: 'https://i.pravatar.cc/100?img=44',
    date: 'April 18, 2025',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
    tag: 'Amenities',
    rating: 4.7,
    views: '8.9k',
  },
  {
    id: 8,
    title: 'Mumbai PG Life: Surviving the City on a Budget',
    excerpt: 'Mumbai is the most expensive city for PGs in India. But with the right strategy — shared rooms, Virar-to-Dadar commute hacks, and tiffin services — you can thrive for under ₹15,000/month.',
    body: 'Areas like Andheri East, Ghatkopar, and Mulund offer PGs starting ₹8,000/month with shared rooms. Avoid South Mumbai unless your office is there. Opt for PGs near metro/local train stations. Combine PG rent with tiffin services for ₹2,000/month instead of paying ₹6,000 for mess.',
    category: 'City Guides',
    author: 'Rahul Mehta',
    authorImg: 'https://i.pravatar.cc/100?img=33',
    date: 'April 5, 2025',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=80',
    tag: 'Mumbai',
    rating: 4.5,
    views: '5.4k',
  },
];

const categories = ['All', 'Student Tips', 'City Guides', 'Finance', 'Safety', 'Legal'];

const categoryColors = {
  'Student Tips': { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
  'City Guides': { bg: '#d1fae5', color: '#065f46', dot: '#10b981' },
  'Finance': { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
  'Safety': { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
  'Legal': { bg: '#ede9fe', color: '#5b21b6', dot: '#8b5cf6' },
};

const stats = [
  { icon: <BookOpen className="w-5 h-5" />, value: '50+', label: 'Expert Articles', color: '#0ea5e9' },
  { icon: <MapPin className="w-5 h-5" />, value: '20+', label: 'Cities Covered', color: '#8b5cf6' },
  { icon: <Star className="w-5 h-5" />, value: '4.8★', label: 'Avg. Article Rating', color: '#f59e0b' },
  { icon: <Zap className="w-5 h-5" />, value: '100k+', label: 'Monthly Readers', color: '#10b981' },
];

const quickTips = [
  { icon: <Wifi className="w-5 h-5 text-sky-500" />, title: 'Always Test WiFi', tip: 'Run a speed test before paying any deposit. Minimum 30 Mbps for smooth streaming & calls.' },
  { icon: <UtensilsCrossed className="w-5 h-5 text-emerald-500" />, title: 'Try the Mess Food', tip: 'Eat one meal at the PG before committing. Good mess food makes student life 10x better.' },
  { icon: <ShieldCheck className="w-5 h-5 text-violet-500" />, title: 'Verify the Owner', tip: 'Ask for police verification documents. Legit PG owners always have them ready.' },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = posts.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured || activeCategory !== 'All' || search);

  return (
    <div className="flex-grow" style={{ background: '#f8fafc' }}>

      {/* Hero */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0a1f3a 60%, #0f172a 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(245,158,11,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(139,92,246,0.1) 0%, transparent 40%)' }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">PG Knowledge Hub</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Smart Renting,
            <br />
            <span style={{ background: 'linear-gradient(90deg, #fbbf24, #f87171, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Better Living
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert guides, city breakdowns, and real tenant stories to help you find, book, and thrive in your perfect PG — across India.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-12">
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, cities, tips..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: s.color }}>{s.icon}</span>
                <span className="text-white font-extrabold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</span>
                <span className="text-slate-400 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Banner */}
      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">💡 Quick PG Tips</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {quickTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{tip.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-40 py-4 px-4 border-b border-slate-200" style={{ background: 'rgba(248,250,252,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-5 py-2 rounded-xl text-sm font-bold transition-all"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg, #0284c7, #7c3aed)', color: 'white', boxShadow: '0 4px 15px rgba(2,132,199,0.3)' }
                : { background: 'white', color: '#64748b', border: '1px solid #e2e8f0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === 'All' && !search && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <TrendingUp className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Featured Articles</h2>
              <span className="ml-auto text-sm text-slate-400 font-medium">Editor's picks</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featured.map(post => {
                const cc = categoryColors[post.category] || { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' };
                return (
                  <article key={post.id} className="group rounded-3xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ border: '1px solid #f1f5f9' }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                      <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: cc.bg, color: cc.color }}>
                        {post.category}
                      </span>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs font-bold">{post.rating}</span>
                        <span className="text-slate-300 text-xs">· {post.views} views</span>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-extrabold text-slate-900 text-xl mb-3 leading-tight group-hover:text-sky-600 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>{post.title}</h3>
                      <p className="text-slate-500 text-sm mb-5 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={post.authorImg} alt={post.author} className="w-9 h-9 rounded-full object-cover border-2 border-slate-100" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{post.author}</p>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{post.readTime} · {post.date}</span>
                            </div>
                          </div>
                        </div>
                        <Link to={`/blog/${post.id}`} className="flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 group-hover:gap-2.5 transition-all bg-sky-50 px-4 py-2 rounded-xl hover:bg-sky-100">
                          Read <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-10 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {activeCategory === 'All' && !search && (
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="w-6 h-6 text-slate-400" />
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>More Articles</h2>
            </div>
          )}
          {(activeCategory !== 'All' || search) ? (
            <p className="text-slate-500 mb-8 text-sm">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(activeCategory === 'All' && !search ? regular : filtered).map(post => {
              const cc = categoryColors[post.category] || { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' };
              return (
                <article key={post.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col" style={{ border: '1px solid #f1f5f9' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: cc.bg, color: cc.color }}>
                      {post.category}
                    </span>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-white text-xs font-semibold">{post.rating}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{post.title}</h3>
                    <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                      <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover border border-slate-100" />
                      <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                      <span className="text-slate-300 text-xs ml-auto">{post.views} views</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs">{post.readTime}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-xs font-bold text-sky-600 flex items-center gap-1 hover:gap-2 transition-all bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {(activeCategory === 'All' && !search ? regular : filtered).length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-slate-500 text-lg">No articles found for "{search}"</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-xs font-bold uppercase tracking-widest">Stay Updated</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get PG Tips Delivered Weekly
          </h2>
          <p className="text-slate-400 mb-8">
            Join 50,000+ students and professionals who receive our curated housing guides, rent alerts, and city-specific tips every Sunday.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow px-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <button className="px-6 py-3.5 rounded-xl text-sm font-bold text-white whitespace-nowrap transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}>
              Subscribe →
            </button>
          </div>
          <p className="text-slate-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
