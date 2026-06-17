import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ChevronRight, Building2, Users, Star, TrendingUp } from 'lucide-react';

const INDIA_STATES = [
  { state: 'Andhra Pradesh', cities: ['Vijayawada', 'Visakhapatnam', 'Tirupati', 'Guntur'], img: 'https://images.unsplash.com/photo-1599030781459-88c3a33c0a96?auto=format&fit=crop&w=600&q=80', color: 'from-orange-500 to-red-600', pgCount: 42, popular: true },
  { state: 'Arunachal Pradesh', cities: ['Itanagar', 'Naharlagun', 'Pasighat'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', color: 'from-green-500 to-teal-600', pgCount: 8 },
  { state: 'Assam', cities: ['Guwahati', 'Silchar', 'Jorhat', 'Dibrugarh'], img: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=600&q=80', color: 'from-emerald-500 to-green-700', pgCount: 19 },
  { state: 'Bihar', cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', color: 'from-yellow-500 to-orange-600', pgCount: 31 },
  { state: 'Chhattisgarh', cities: ['Raipur', 'Bhilai', 'Durg', 'Bilaspur'], img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80', color: 'from-lime-500 to-green-600', pgCount: 14 },
  { state: 'Goa', cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'], img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', color: 'from-cyan-500 to-blue-600', pgCount: 27, popular: true },
  { state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'], img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80', color: 'from-blue-500 to-indigo-600', pgCount: 58, popular: true },
  { state: 'Haryana', cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'], img: 'https://images.unsplash.com/photo-1625649043396-88e05a7ff459?auto=format&fit=crop&w=600&q=80', color: 'from-violet-500 to-purple-700', pgCount: 46, popular: true },
  { state: 'Himachal Pradesh', cities: ['Shimla', 'Manali', 'Dharamshala', 'Solan'], img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80', color: 'from-blue-400 to-cyan-600', pgCount: 21 },
  { state: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'], img: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?auto=format&fit=crop&w=600&q=80', color: 'from-green-600 to-emerald-700', pgCount: 16 },
  { state: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'], img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80', color: 'from-red-500 to-rose-600', pgCount: 89, popular: true },
  { state: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'], img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', color: 'from-teal-500 to-cyan-600', pgCount: 35, popular: true },
  { state: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'], img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80', color: 'from-amber-500 to-yellow-600', pgCount: 43 },
  { state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'], img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=600&q=80', color: 'from-orange-500 to-amber-600', pgCount: 112, popular: true },
  { state: 'Manipur', cities: ['Imphal', 'Bishnupur', 'Churachandpur'], img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80', color: 'from-pink-500 to-rose-600', pgCount: 6 },
  { state: 'Meghalaya', cities: ['Shillong', 'Tura', 'Jowai'], img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80', color: 'from-green-400 to-teal-500', pgCount: 11 },
  { state: 'Mizoram', cities: ['Aizawl', 'Lunglei', 'Champhai'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', color: 'from-indigo-400 to-violet-500', pgCount: 5 },
  { state: 'Nagaland', cities: ['Kohima', 'Dimapur', 'Mokokchung'], img: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80', color: 'from-emerald-400 to-green-600', pgCount: 7 },
  { state: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'], img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80', color: 'from-blue-500 to-sky-600', pgCount: 28 },
  { state: 'Punjab', cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Phagwara'], img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80', color: 'from-yellow-400 to-amber-500', pgCount: 67, popular: true },
  { state: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'], img: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=600&q=80', color: 'from-orange-400 to-rose-500', pgCount: 54, popular: true },
  { state: 'Sikkim', cities: ['Gangtok', 'Namchi', 'Gyalshing'], img: 'https://images.unsplash.com/photo-1605649043396-88e05a7ff459?auto=format&fit=crop&w=600&q=80', color: 'from-sky-400 to-blue-500', pgCount: 9 },
  { state: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'], img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80', color: 'from-rose-500 to-pink-600', pgCount: 76, popular: true },
  { state: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'], img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=600&q=80', color: 'from-fuchsia-500 to-purple-600', pgCount: 63, popular: true },
  { state: 'Tripura', cities: ['Agartala', 'Udaipur', 'Dhalaí'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', color: 'from-lime-400 to-green-500', pgCount: 5 },
  { state: 'Uttar Pradesh', cities: ['Lucknow', 'Noida', 'Agra', 'Varanasi'], img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80', color: 'from-indigo-500 to-blue-600', pgCount: 95, popular: true },
  { state: 'Uttarakhand', cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', color: 'from-green-500 to-teal-600', pgCount: 24 },
  { state: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'], img: 'https://images.unsplash.com/photo-1574236170880-fda0e15e8f3a?auto=format&fit=crop&w=600&q=80', color: 'from-blue-600 to-indigo-700', pgCount: 52, popular: true },
];

const UTs = [
  { state: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Noida Border', 'Rohini'], img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80', color: 'from-red-600 to-rose-700', pgCount: 135, popular: true },
  { state: 'Chandigarh', cities: ['Sector 17', 'Mohali', 'Panchkula'], img: 'https://images.unsplash.com/photo-1625649043396-88e05a7ff459?auto=format&fit=crop&w=600&q=80', color: 'from-sky-500 to-blue-600', pgCount: 33 },
  { state: 'Puducherry', cities: ['Pondicherry', 'Karaikal', 'Yanam'], img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', color: 'from-teal-500 to-cyan-600', pgCount: 18 },
];

const ALL_LOCATIONS = [...INDIA_STATES, ...UTs];

const Locations = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'popular'

  const filtered = ALL_LOCATIONS.filter(loc => {
    const matchSearch =
      loc.state.toLowerCase().includes(search.toLowerCase()) ||
      loc.cities.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'all' || (filter === 'popular' && loc.popular);
    return matchSearch && matchFilter;
  });

  const totalPGs = ALL_LOCATIONS.reduce((sum, l) => sum + l.pgCount, 0);
  const totalStates = ALL_LOCATIONS.length;

  return (
    <div className="flex-grow" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c1a3a 40%, #0a2540 100%)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-20 px-4">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 60%)'
        }} />
        
        {/* Animated orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #38bdf8, transparent)', animation: 'pulse 4s infinite' }} />
        <div className="absolute bottom-5 right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', animation: 'pulse 6s infinite' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.3)' }}>
            <MapPin className="w-4 h-4 text-sky-400" />
            <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">India-Wide Coverage</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="text-white">Find PGs Across</span>
            <br />
            <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              All of India
            </span>
          </h1>
          
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From the snow-capped peaks of Himachal to the beaches of Goa — discover premium PG accommodations in every state.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { label: 'States & UTs', value: totalStates + '+', icon: <MapPin className="w-5 h-5" /> },
              { label: 'PG Listings', value: totalPGs + '+', icon: <Building2 className="w-5 h-5" /> },
              { label: 'Cities Covered', value: '200+', icon: <Star className="w-5 h-5" /> },
              { label: 'Happy Tenants', value: '50K+', icon: <Users className="w-5 h-5" /> },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-sky-400 mb-2">{s.icon}</div>
                <span className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</span>
                <span className="text-slate-400 text-xs mt-1 font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search state or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'popular'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-5 py-3 rounded-2xl text-sm font-bold capitalize transition-all"
                  style={filter === f
                    ? { background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: 'white', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }
                    : { background: 'rgba(255,255,255,0.08)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {f === 'popular' ? '🔥 Popular' : 'All States'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* State Circles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {filter === 'popular' ? '🔥 Popular Destinations' : `🗺️ All States & UTs`}
              <span className="ml-3 text-base text-slate-400 font-medium">({filtered.length} found)</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-8">
            {filtered.map((loc) => (
              <Link
                key={loc.state}
                to={`/search?city=${loc.cities[0]}&state=${loc.state}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl ${loc.popular ? `bg-gradient-to-tr ${loc.color}` : 'bg-slate-600 group-hover:bg-gradient-to-tr ' + loc.color}`}
                  style={loc.popular ? { boxShadow: '0 0 18px rgba(14,165,233,0.35)' } : {}}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-800 bg-slate-800 relative">
                    <img
                      src={loc.img}
                      alt={loc.state}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* PG Count Badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap z-10"
                    style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 2px 8px rgba(14,165,233,0.4)' }}>
                    {loc.pgCount}+
                  </div>

                  {/* Hot badge */}
                  {loc.popular && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-10"
                      style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                      🔥
                    </div>
                  )}
                </div>

                {/* State Name */}
                <h3 className="mt-4 text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors leading-tight px-1">
                  {loc.state}
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-full px-1">
                  {loc.cities[0]}
                </p>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-400 text-lg">No locations found for "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-4 px-6 py-2 rounded-xl text-sm font-bold text-sky-400" style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.15))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
          <TrendingUp className="w-12 h-12 text-sky-400 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Can't find your city?</h2>
          <p className="text-slate-400 mb-8">We're expanding rapidly. List your property or request us to expand in your area.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 8px 30px rgba(14,165,233,0.4)' }}>
              Request a City
            </Link>
            <Link to="/search" className="px-8 py-4 rounded-2xl font-bold text-slate-300 transition-all hover:text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Browse All PGs
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Locations;
