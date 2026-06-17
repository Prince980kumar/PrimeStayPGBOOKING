import React, { useState, useEffect } from 'react';
import { useAuth, API_URL } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Shield, Building, Plus, Trash2, Check, X, FileText, User, Users, MapPin, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'properties' | 'addProperty'
  const [userBookings, setUserBookings] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminProperties, setAdminProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for Add Property
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    address: '',
    city: 'Phagwara (LPU)',
    gender: 'boys',
    sharingOptions: [
      { type: 'single', price: 10000, available: 5 },
      { type: 'double', price: 7000, available: 5 },
      { type: 'triple', price: 5000, available: 5 }
    ],
    amenities: ['WiFi', 'Food', 'Power Backup', 'CCTV Security'],
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'],
    rules: ['No loud music', 'Gate closes at 10 PM']
  });

  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Load Dashboard Data
  const loadDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      if (user.role === 'admin') {
        // Admin: Load all bookings & all properties
        const [bookingsRes, propsRes] = await Promise.all([
          fetch(`${API_URL}/bookings`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/properties`)
        ]);
        
        const bookingsData = await bookingsRes.json();
        const propsData = await propsRes.json();
        
        if (bookingsData.success) setAdminBookings(bookingsData.data);
        if (propsData.success) setAdminProperties(propsData.data);
      } else {
        // Regular User: Load user bookings
        const res = await fetch(`${API_URL}/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setUserBookings(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  // Admin booking status updates
  const handleUpdateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        loadDashboardData(); // Reload list
      } else {
        alert(data.message || 'Failed to update booking status.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  // Admin delete property
  const handleDeleteProperty = async (propId) => {
    if (!window.confirm('Are you sure you want to delete this property? This action is permanent.')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/properties/${propId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        loadDashboardData();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting property');
    }
  };

  // Add property form change handler
  const handleFormChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (index, val) => {
    const opts = [...newProperty.sharingOptions];
    opts[index].price = Number(val);
    setNewProperty({ ...newProperty, sharingOptions: opts });
  };

  const handleAmenityToggle = (amenity) => {
    const ams = newProperty.amenities.includes(amenity)
      ? newProperty.amenities.filter(a => a !== amenity)
      : [...newProperty.amenities, amenity];
    setNewProperty({ ...newProperty, amenities: ams });
  };

  // Submit new property
  const handleAddPropertySubmit = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProperty)
      });
      const data = await res.json();
      if (data.success) {
        setFormMsg({ type: 'success', text: 'Property added successfully!' });
        // Reset form
        setNewProperty({
          title: '',
          description: '',
          address: '',
          city: 'Phagwara (LPU)',
          gender: 'boys',
          sharingOptions: [
            { type: 'single', price: 10000, available: 5 },
            { type: 'double', price: 7000, available: 5 },
            { type: 'triple', price: 5000, available: 5 }
          ],
          amenities: ['WiFi', 'Food', 'Power Backup', 'CCTV Security'],
          images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'],
          rules: ['No loud music', 'Gate closes at 10 PM']
        });
        loadDashboardData();
        setActiveTab('properties');
      } else {
        setFormMsg({ type: 'error', text: data.message || 'Failed to add property.' });
      }
    } catch (err) {
      setFormMsg({ type: 'error', text: 'Server connection failed.' });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center flex-grow">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-semibold text-sm">Accessing stay information...</p>
      </div>
    );
  }

  const allAmenities = ['WiFi', 'AC', 'Food', 'Gym', 'Laundry', 'Power Backup', 'Biometric Access', 'Housekeeping'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-650/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div>
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/5 mb-3 backdrop-blur-md">
            {user.role === 'admin' ? (
              <Shield className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-primary-400" />
            )}
            <span className="capitalize">{user.role === 'admin' ? 'Owner Portal' : 'Student Tenant Account'}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">{user.name}</h1>
          <p className="text-slate-350 text-sm mt-1">{user.email} • {user.phone}</p>
        </div>
        
        {user.role === 'admin' && (
          <div className="flex space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="text-center px-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">PGs</span>
              <span className="text-2xl font-extrabold text-white">{adminProperties.length}</span>
            </div>
            <div className="w-px bg-white/10 h-10"></div>
            <div className="text-center px-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bookings</span>
              <span className="text-2xl font-extrabold text-primary-400">{adminBookings.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Admin specific Navigation tabs */}
      {user.role === 'admin' && (
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 shrink-0 transition-colors ${
              activeTab === 'bookings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manage Bookings
          </button>
          
          <button
            onClick={() => setActiveTab('properties')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 shrink-0 transition-colors ${
              activeTab === 'properties'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My PG Properties
          </button>
          
          <button
            onClick={() => setActiveTab('addProperty')}
            className={`py-3.5 px-6 font-bold text-sm border-b-2 shrink-0 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'addProperty'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New PG</span>
          </button>
        </div>
      )}

      {/* Dashboard Panels */}

      {/* Normal User Dashboard */}
      {user.role !== 'admin' && (
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 mb-6">Your Booked PGs</h2>
          
          {userBookings.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto">
              <div className="text-4xl mb-4">🧳</div>
              <h3 className="font-display font-extrabold text-slate-850 text-lg mb-2">No bookings placed yet</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                You haven't booked a Prime Stay room yet. Find premium, student-friendly rooms near campus or city hubs.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-primary-600 active:scale-95 transition-all"
              >
                Find rooms
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 relative">
                  
                  {/* PG Image */}
                  <div className="w-full md:w-48 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={booking.property?.images[0]}
                      alt="PG thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking content */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display font-extrabold text-slate-800 text-lg sm:text-xl">
                          {booking.property?.title}
                        </h3>
                        
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-150'
                            : booking.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border-rose-150'
                              : 'bg-amber-50 text-amber-700 border-amber-150'
                        }`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-slate-400 text-xs font-semibold mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{booking.property?.address}, {booking.property?.city}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Occupancy type</span>
                          <span className="font-bold text-slate-800 capitalize">{booking.roomType} Sharing</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Check-in date</span>
                          <span className="font-bold text-slate-800">{new Date(booking.startDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Duration</span>
                          <span className="font-bold text-slate-800">{booking.durationMonths} Months</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Rent Charged</span>
                          <span className="font-extrabold text-primary-600">₹{booking.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Dashboard: Bookings Panel */}
      {user.role === 'admin' && activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-display font-extrabold text-xl text-slate-850">Student Bookings Requests</h2>
          </div>
          
          {adminBookings.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-400 text-sm">No reservation requests registered in system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-450 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
                    <th className="p-4 pl-6">Student details</th>
                    <th className="p-4">PG Property Details</th>
                    <th className="p-4">Occupancy</th>
                    <th className="p-4">Stay Tenure</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {adminBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Tenant name/email/phone */}
                      <td className="p-4 pl-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-805">{b.user?.name}</span>
                          <span className="text-xs text-slate-400 font-medium">{b.user?.email}</span>
                          <span className="text-xs text-slate-400 font-medium">{b.user?.phone}</span>
                        </div>
                      </td>
                      
                      {/* PG details */}
                      <td className="p-4 font-semibold text-slate-700">
                        {b.property?.title}
                      </td>

                      {/* room type */}
                      <td className="p-4 capitalize font-semibold text-slate-650">
                        {b.roomType} share
                      </td>

                      {/* tenure */}
                      <td className="p-4 text-xs font-semibold text-slate-650">
                        {new Date(b.startDate).toLocaleDateString()}
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">{b.durationMonths} months</span>
                      </td>

                      {/* price */}
                      <td className="p-4 font-bold text-primary-650">
                        ₹{b.price.toLocaleString('en-IN')}
                      </td>

                      {/* status badge */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : b.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border-rose-100'
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* action button */}
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-center space-x-1">
                          {b.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateBookingStatus(b._id, 'confirmed')}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-colors"
                                title="Confirm Stay"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 transition-colors"
                                title="Cancel Stay"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b._id, 'cancelled')}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 text-xs font-bold transition-all"
                            >
                              Cancel Stay
                            </button>
                          )}
                          {b.status === 'cancelled' && (
                            <span className="text-slate-400 text-xs italic">Closed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Admin Dashboard: Properties List Panel */}
      {user.role === 'admin' && activeTab === 'properties' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-display font-extrabold text-xl text-slate-850">Your PGs Properties</h2>
            <button
              onClick={() => setActiveTab('addProperty')}
              className="flex items-center space-x-1 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold active:scale-95 transition-all shadow-md shadow-primary-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add New PG</span>
            </button>
          </div>

          {adminProperties.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-400 text-sm">No properties listed. Click "Add New PG" to start.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-150">
              {adminProperties.map((p) => (
                <div key={p._id} className="p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={p.images[0]}
                      alt="PG"
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <h3 className="font-display font-bold text-slate-800 text-base">{p.title}</h3>
                      <p className="text-slate-450 text-xs mt-0.5">{p.address}, {p.city}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-650 text-[10px] font-bold border border-slate-200 capitalize">
                          {p.gender} only
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {p.sharingOptions.length} Sharing rates config
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteProperty(p._id)}
                    className="flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete PG</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Dashboard: Add Property Form Panel */}
      {user.role === 'admin' && activeTab === 'addProperty' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-xl text-slate-855 mb-6">List a New PG Accommodation</h2>

          {formMsg.text && (
            <div className={`p-4 rounded-xl border mb-6 text-xs font-bold ${
              formMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-rose-50 text-rose-750 border-rose-100'
            }`}>
              {formMsg.text}
            </div>
          )}

          <form onSubmit={handleAddPropertySubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">PG Name / Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Prime Stay Elite near LPU Campus"
                value={newProperty.title}
                onChange={handleFormChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. GT Road Near Gate 1"
                  value={newProperty.address}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">City Hub</label>
                <select
                  name="city"
                  value={newProperty.city}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
                >
                  <option value="Phagwara (LPU)">Phagwara (LPU)</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Detailed Description</label>
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Describe rooms, housekeeping, catering, distance from college main gates..."
                value={newProperty.description}
                onChange={handleFormChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder-slate-450 focus:outline-none focus:border-primary-500"
              ></textarea>
            </div>

            {/* Gender Rules & Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Gender Restriction</label>
                <select
                  name="gender"
                  value={newProperty.gender}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
                >
                  <option value="boys">Boys Hostel Only</option>
                  <option value="girls">Girls Hostel Only</option>
                  <option value="unisex">Coliving / Unisex</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Cover Image Link (URL)</label>
                <input
                  type="url"
                  name="images"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newProperty.images[0]}
                  onChange={(e) => setNewProperty({ ...newProperty, images: [e.target.value] })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Pricing Options */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">Occupancy Pricing (₹/mo)</label>
              <div className="grid grid-cols-3 gap-4">
                {newProperty.sharingOptions.map((opt, idx) => (
                  <div key={opt.type} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-xs font-bold text-slate-500 capitalize mb-1">{opt.type} Sharing</span>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={opt.price}
                      onChange={(e) => handlePriceChange(idx, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities list */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Included Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {allAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={newProperty.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 rounded border-slate-350 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-650">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 pt-1" />

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-primary-650 text-white font-extrabold rounded-xl shadow-lg transition-all active:scale-95 text-sm cursor-pointer"
            >
              Confirm and Add Property
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
