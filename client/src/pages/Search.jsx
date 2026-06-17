import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { SlidersHorizontal, Search as SearchIcon, RotateCcw, X } from 'lucide-react';

const Search = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse initial query params from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      city: params.get('city') || '',
      gender: params.get('gender') || '',
      search: params.get('search') || '',
      sharing: '',
      priceMax: 20000,
      amenities: []
    };
  };

  const [filters, setFilters] = useState(getQueryParams);

  // Sync with URL params if they change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      city: new URLSearchParams(location.search).get('city') || prev.city,
      gender: new URLSearchParams(location.search).get('gender') || prev.gender,
      search: new URLSearchParams(location.search).get('search') || prev.search,
    }));
  }, [location.search]);

  // Fetch properties on filter changes
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (filters.city) query.append('city', filters.city);
        if (filters.gender) query.append('gender', filters.gender);
        if (filters.search) query.append('search', filters.search);
        if (filters.sharing) query.append('sharing', filters.sharing);
        if (filters.priceMax) query.append('priceMax', filters.priceMax);
        
        if (filters.amenities.length > 0) {
          filters.amenities.forEach(amenity => {
            query.append('amenity', amenity);
          });
        }

        const res = await fetch(`${API_URL}/properties?${query.toString()}`);
        const data = await res.json();
        
        if (data.success) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error('Error fetching filtered properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleAmenityChange = (amenity) => {
    setFilters(prev => {
      const isSelected = prev.amenities.includes(amenity);
      const newAmenities = isSelected
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      gender: '',
      search: '',
      sharing: '',
      priceMax: 20000,
      amenities: []
    });
  };

  const amenitiesList = ['WiFi', 'AC', 'Food', 'Gym', 'Laundry', 'Power Backup', 'Biometric Access', 'Housekeeping'];

  const filterSidebar = (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-display font-extrabold text-slate-800 text-lg flex items-center space-x-1.5">
          <SlidersHorizontal className="w-4 h-4 text-primary-500" />
          <span>Filters</span>
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</label>
        <select
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
        >
          <option value="">All Locations</option>
          <option value="Phagwara">Phagwara (LPU)</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Room Type / Rules</label>
        <div className="grid grid-cols-3 gap-2">
          {['boys', 'girls', 'unisex'].map((g) => (
            <button
              key={g}
              onClick={() => setFilters({ ...filters, gender: filters.gender === g ? '' : g })}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                filters.gender === g
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {g === 'unisex' ? 'Coliving' : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sharing Occupancy */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Occupancy</label>
        <select
          value={filters.sharing}
          onChange={(e) => setFilters({ ...filters, sharing: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
        >
          <option value="">All Occupancies</option>
          <option value="single">Single Sharing</option>
          <option value="double">Double Sharing</option>
          <option value="triple">Triple Sharing</option>
        </select>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
          <span className="text-sm font-extrabold text-primary-600">₹{filters.priceMax.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="4000"
          max="20000"
          step="500"
          value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
          <span>₹4,000</span>
          <span>₹20,000</span>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amenities</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-650 group-hover:text-slate-800 transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
      {/* Top Search Bar & Counter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center space-x-3 w-full sm:max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by PG name, location..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold placeholder-slate-450 focus:outline-none focus:border-primary-500"
            />
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <span className="text-sm text-slate-500 font-medium">
            Found <span className="font-extrabold text-slate-800">{properties.length}</span> properties
          </span>
          
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="sm:hidden flex items-center space-x-1 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-20">
          {filterSidebar}
        </aside>

        {/* Listings Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 4, 5].map((n) => (
                <div key={n} className="bg-slate-50 border border-slate-100 rounded-2xl aspect-[3/4] animate-pulse"></div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto mt-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display font-extrabold text-slate-800 text-lg mb-2">No matching properties found</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We couldn't find any PGs that match your search filters. Try adjusting your price range or selected amenities.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-primary-600 active:scale-95 transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
            <div className="flex justify-between items-center mb-6">
              <span className="font-display font-extrabold text-slate-800 text-lg">Filters</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow">
              {filterSidebar}
            </div>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 bg-primary-600 text-white font-bold rounded-xl text-center shadow-lg shadow-primary-500/10"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
