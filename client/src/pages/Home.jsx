import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { Search, MapPin, Sparkles, ShieldCheck, HeartHandshake, ShieldAlert, BadgeCheck, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    city: '',
    gender: '',
    search: '',
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Lakshadweep', 'Puducherry'
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1e52416451?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/properties`);
        const data = await res.json();
        if (data.success) {
          // Filter featured properties or take first 3 if none marked featured
          const featured = data.data.filter(p => p.isFeatured).slice(0, 3);
          setFeaturedProperties(featured.length > 0 ? featured : data.data.slice(0, 3));
        }

        // Fetch reviews
        const revRes = await fetch(`${API_URL}/reviews`);
        const revData = await revRes.json();
        if (revData.success) {
          setReviews(revData.data);
        }
      } catch (err) {
        console.error('Error fetching data on home mount:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.city) query.append('city', searchParams.city);
    if (searchParams.gender) query.append('gender', searchParams.gender);
    if (searchParams.search) query.append('search', searchParams.search);
    navigate(`/search?${query.toString()}`);
  };

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center">
        {/* Dynamic Background Image */}
        {bgImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === bgIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img} alt="PG Background" className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 pointer-events-none"></div>

        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-bold text-primary-200 tracking-wide uppercase">Your Home Away From Home</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white mb-6 leading-tight">
            Premium Student & Professional <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent">
              PGs & Co-Living Spaces
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Fully managed, modern accommodations near LPU Phagwara and Bangalore IT Hubs. Just pack your bags and move in!
          </p>

          {/* Search Card */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/40 text-slate-800 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3.5"
          >
            {/* City Selector */}
            <div className="sm:col-span-3 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Location</label>
              <select
                value={searchParams.city}
                onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                <option value="">Any State / Location</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Gender Preference */}
            <div className="sm:col-span-3 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Gender Preference</label>
              <select
                value={searchParams.gender}
                onChange={(e) => setSearchParams({ ...searchParams, gender: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                <option value="">Any Gender</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="unisex">Coliving</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div className="sm:col-span-4 text-left">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Search Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Near main gate, AC, Food..."
                  value={searchParams.search}
                  onChange={(e) => setSearchParams({ ...searchParams, search: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 active:scale-95 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-150 flex items-center justify-center space-x-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>



      {/* Quick Location Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>Explore Top Cities</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">Popular Destinations</h2>
              <p className="text-slate-500 text-base sm:text-lg mt-4 font-medium leading-relaxed">From bustling tech hubs to serene campus towns, discover premium student and professional housing across India.</p>
            </div>
            <Link to="/locations" className="group shrink-0 inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-sky-700 bg-sky-50 border border-sky-200 transition-all hover:bg-sky-100 hover:scale-105 hover:shadow-lg hover:shadow-sky-100">
              Explore All States 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Circular Locations Layout */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8 lg:gap-12 mt-8">
            
            {/* LPU Phagwara */}
            <Link to="/search?city=Phagwara" className="group flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-gradient-to-tr from-sky-400 to-primary-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80" alt="Phagwara" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                {/* Popular Badge */}
                <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-amber-300 z-10 animate-pulse">
                  🔥 Top
                </div>
              </div>
              <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary-600 transition-colors">Phagwara</h3>
              <p className="text-xs text-slate-500 mt-0.5">LPU Hub</p>
            </Link>

            {/* Bangalore */}
            <Link to="/search?city=Bangalore" className="group flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-slate-200 group-hover:bg-gradient-to-tr from-sky-400 to-primary-500 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80" alt="Bangalore" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary-600 transition-colors">Bangalore</h3>
              <p className="text-xs text-slate-500 mt-0.5">IT Capital</p>
            </Link>

            {/* Delhi NCR */}
            <Link to="/search?city=Delhi" className="group flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-slate-200 group-hover:bg-gradient-to-tr from-sky-400 to-primary-500 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80" alt="Delhi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary-600 transition-colors">Delhi NCR</h3>
              <p className="text-xs text-slate-500 mt-0.5">Corporate Hub</p>
            </Link>

            {/* Hyderabad */}
            <Link to="/search?city=Hyderabad" className="group flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-slate-200 group-hover:bg-gradient-to-tr from-sky-400 to-primary-500 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=400&q=80" alt="Hyderabad" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary-600 transition-colors">Hyderabad</h3>
              <p className="text-xs text-slate-500 mt-0.5">Cyber City</p>
            </Link>
            
            {/* Mumbai */}
            <Link to="/search?city=Mumbai" className="group flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full p-1 bg-slate-200 group-hover:bg-gradient-to-tr from-sky-400 to-primary-500 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img src="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=400&q=80" alt="Mumbai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary-600 transition-colors">Mumbai</h3>
              <p className="text-xs text-slate-500 mt-0.5">City of Dreams</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Book Your Stay Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Fast Booking</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 mb-4 leading-tight">
                Reserve Your Premium PG Today!
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Fill out the quick booking inquiry form below. Our team will get back to you within 30 minutes with the best available options that match your preferences and budget.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, text: '100% Verified Properties' },
                  { icon: <BadgeCheck className="w-5 h-5 text-blue-500" />, text: 'Zero Brokerage Fees' },
                  { icon: <HeartHandshake className="w-5 h-5 text-rose-500" />, text: 'Premium Amenities & Food' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-slate-700 font-semibold">
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 w-full">
              <form className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Booking Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Preferred City</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500" required>
                      <option value="">Select City / State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Move-in Date</label>
                    <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 text-slate-600" required />
                  </div>
                </div>
                <button type="button" onClick={() => alert('Booking request submitted! We will contact you shortly.')} className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all active:scale-[0.98]">
                  Request to Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800">Featured Accommodations</h2>
              <p className="text-slate-500 text-sm mt-1">Our highest rated properties with the best facilities</p>
            </div>
            <Link
              to="/search"
              className="text-primary-600 hover:text-primary-700 font-bold text-sm flex items-center space-x-1"
            >
              <span>See all properties</span>
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-50 border border-slate-100 rounded-2xl aspect-[3/4] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Facilities / Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 mb-2">
            Why Stay at Prime Stay?
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-12">
            We offer fully managed amenities and highly secure, premium stays so you can focus entirely on studies or career.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {/* Box 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base mb-2">Zero Brokerage</h3>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Book directly online via our platform. Absolutely zero broker commissions or hidden fees.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base mb-2">3-Tier Security</h3>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                24/7 CCTV surveillance, biometric access gates, and resident wardens for peace of mind.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base mb-2">Home-Style Food</h3>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Delicious North & South Indian meals prepared daily with organic ingredients in sterile kitchens.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base mb-2">Managed Maintenance</h3>
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Raise requests inside the portal. Housekeeping, plumbing, and WiFi repair done in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings / Testimonials Section with Marquee */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800">Loved by Students & Professionals</h2>
            <p className="text-slate-500 text-sm mt-2">Hear directly from the residents living in our PG properties</p>
          </div>

          <div className="marquee-container bg-slate-50/50 rounded-3xl p-6 border border-slate-100/60">
            <div className="marquee-content">
              {(reviews.length > 0 ? [...reviews, ...reviews] : [
                { name: 'Aman Singh', role: 'LPU Student', text: 'Best PG near LPU gate! The food is amazing and WiFi is super fast. Rooms are clean and the staff is very helpful.', rating: 5 },
                { name: 'Neha Sharma', role: 'IT Professional', text: 'Highly secure and clean coliving space in Koramangala. The facilities are top-notch and the community is wonderful.', rating: 5 },
                { name: 'Rahul Verma', role: 'Student', text: 'Zero brokerage saved me a lot of money. Rooms are exactly as shown in pictures. Very transparent process.', rating: 4 },
                { name: 'Priya Desai', role: 'Software Engineer', text: 'The community events here make weekends so fun. Feels like a second family. Highly recommend Prime Stay!', rating: 5 },
                { name: 'Karan Patel', role: 'Fresher', text: 'Housekeeping is top-notch. Never had to worry about cleaning my room. The mess food is also delicious.', rating: 5 },
                { name: 'Divya Menon', role: 'MBA Student', text: 'Found my PG in under 10 minutes! The verified listings gave me confidence. No hidden charges, no surprises.', rating: 5 },
                // duplicate for marquee effect
                { name: 'Aman Singh', role: 'LPU Student', text: 'Best PG near LPU gate! The food is amazing and WiFi is super fast. Rooms are clean and the staff is very helpful.', rating: 5 },
                { name: 'Neha Sharma', role: 'IT Professional', text: 'Highly secure and clean coliving space in Koramangala. The facilities are top-notch and the community is wonderful.', rating: 5 },
                { name: 'Rahul Verma', role: 'Student', text: 'Zero brokerage saved me a lot of money. Rooms are exactly as shown in pictures. Very transparent process.', rating: 4 }
              ]).map((review, idx) => (
                <div key={idx} className="w-[350px] shrink-0 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />)}
                  </div>
                  {review.property && (
                    <div className="text-[10px] font-bold text-primary-500 uppercase mb-2 tracking-wider">
                      PG: {review.property.title}
                    </div>
                  )}
                  <p className="text-slate-700 text-xs italic mb-5 leading-relaxed line-clamp-3">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 shadow-sm flex items-center justify-center font-bold text-slate-650 text-xs border border-slate-200">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                      <p className="text-slate-500 text-xs">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
