import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth, API_URL } from '../context/AuthContext';
import { Star, MapPin, Wifi, Shield, Coffee, Utensils, Wind, ShieldAlert, Sparkles, Calendar, Plus, Minus, ArrowLeft, CheckCircle2, Ticket } from 'lucide-react';
import NearbyEssentials from '../components/NearbyEssentials';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking Form State
  const [selectedRoom, setSelectedRoom] = useState(null); // 'single', 'double', 'triple'
  const [duration, setDuration] = useState(1); // months
  const [startDate, setStartDate] = useState('');
  
  // Checkout flow state
  const [bookingStep, setBookingStep] = useState('detail'); // 'detail' | 'checkout' | 'success'
  const [createdBooking, setCreatedBooking] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState(user ? user.name : '');
  const [reviewRole, setReviewRole] = useState('Resident');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews?propertyId=${id}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (user) {
      setReviewName(user.name);
    }
  }, [user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewSuccess('');
    setReviewError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId: id,
          rating: reviewRating,
          text: reviewText,
          name: reviewName,
          role: reviewRole
        })
      });

      const data = await res.json();
      if (data.success) {
        setReviewSuccess('Thank you! Your review has been submitted successfully.');
        setReviewText('');
        fetchReviews();
        // Refresh property details to reflect new rating and review counts
        const propRes = await fetch(`${API_URL}/properties/${id}`);
        const propData = await propRes.json();
        if (propData.success) {
          setProperty(propData.data);
        }
      } else {
        setReviewError(data.message || 'Failed to submit review');
      }
    } catch (err) {
      setReviewError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  // Set default start date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setStartDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/properties/${id}`);
        const data = await res.json();
        if (data.success) {
          setProperty(data.data);
          // Set default room selection to the first available option
          if (data.data.sharingOptions.length > 0) {
            setSelectedRoom(data.data.sharingOptions[0].type);
          }
        }
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center flex-grow">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading premium property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center flex-grow">
        <div className="text-4xl mb-4">🏠</div>
        <h3 className="font-display font-extrabold text-slate-800 text-lg mb-2">Property Not Found</h3>
        <p className="text-slate-500 mb-6">The property you are looking for does not exist or has been removed.</p>
        <Link to="/search" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Back to Search</Link>
      </div>
    );
  }

  const { title, description, address, city, gender, sharingOptions, amenities, images, rating, reviewsCount, rules } = property;

  const currentSharingOpt = sharingOptions.find(opt => opt.type === selectedRoom);
  const roomPrice = currentSharingOpt ? currentSharingOpt.price : 0;
  const roomAvailable = currentSharingOpt ? currentSharingOpt.available : 0;

  // Invoice calculations
  const totalRent = roomPrice * duration;
  const securityDeposit = roomPrice; // 1 month deposit
  const onboardingFee = 500;
  const grandTotal = totalRent + securityDeposit + onboardingFee;

  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wifi') || n.includes('internet')) return <Wifi className="w-5 h-5" />;
    if (n.includes('security') || n.includes('cctv') || n.includes('biometric')) return <Shield className="w-5 h-5" />;
    if (n.includes('food') || n.includes('meal')) return <Utensils className="w-5 h-5" />;
    if (n.includes('ac') || n.includes('air cond')) return <Wind className="w-5 h-5" />;
    if (n.includes('gym')) return <Sparkles className="w-5 h-5 text-indigo-500" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  const genderLabels = {
    boys: '♂ Boys Hostel',
    girls: '♀ Girls Hostel',
    unisex: '⚤ Unisex Coliving'
  };

  const genderBadgeColors = {
    boys: 'bg-blue-50 text-blue-700 border-blue-200',
    girls: 'bg-rose-50 text-rose-700 border-rose-200',
    unisex: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setBookingError('');
    setSubmittingBooking(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId: id,
          roomType: selectedRoom,
          startDate,
          durationMonths: duration
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setCreatedBooking(data.data);
        setBookingStep('success');
      } else {
        setBookingError(data.message || 'Failed to place booking.');
      }
    } catch (err) {
      setBookingError('Connection to server failed. Please try again.');
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-800 font-bold text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Go Back</span>
      </button>

      {bookingStep === 'success' ? (
        /* Success Overlay Screen */
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 text-center shadow-xl max-w-2xl mx-auto my-12 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h2 className="font-display font-extrabold text-slate-800 text-3xl mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            Congratulations! Your stay at <span className="font-bold text-slate-700">{title}</span> has been provisionally reserved. An email receipt was sent to {user.email}.
          </p>

          {/* Booking Summary Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-3.5 mb-8 max-w-md mx-auto">
            <h3 className="font-display font-bold text-slate-800 text-sm border-b border-slate-200/50 pb-2">Stay Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Room Share Type:</span>
              <span className="font-bold text-slate-700 capitalize">{createdBooking?.roomType} Sharing</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Start Date:</span>
              <span className="font-bold text-slate-700">{new Date(createdBooking?.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Duration:</span>
              <span className="font-bold text-slate-700">{createdBooking?.durationMonths} Months</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-200/50">
              <span className="text-slate-800 font-bold">Total Stay Amount:</span>
              <span className="font-extrabold text-primary-600">₹{createdBooking?.price.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 transition-all text-sm"
            >
              Go to My Dashboard
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 transition-all text-sm"
            >
              Return Home
            </Link>
          </div>
        </div>
      ) : (
        /* Regular Details Page layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Center - Info and Media */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Main Image */}
              <div className="sm:col-span-2 rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
                <img
                  src={images[0]}
                  alt={title}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-350"
                />
              </div>
              
              {/* Sidebar Images */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
                  <img
                    src={images[1] || images[0]}
                    alt="Gallery 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
                  <img
                    src={images[2] || images[0]}
                    alt="Gallery 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Title & Location Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3.5 mb-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold border uppercase tracking-wider ${genderBadgeColors[gender] || genderBadgeColors.unisex}`}>
                  {genderLabels[gender] || genderLabels.unisex}
                </span>
                
                <div className="flex items-center space-x-1 text-slate-800 bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{rating.toFixed(1)} ({reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 leading-tight">
                {title}
              </h1>

              <div className="flex items-start space-x-1.5 text-slate-500 text-sm mt-3 font-semibold">
                <MapPin className="w-5 h-5 text-slate-450 shrink-0 mt-0.5" />
                <span>{address}, {city}</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div>
              <h2 className="font-display font-extrabold text-slate-800 text-xl mb-3.5">About this PG</h2>
              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Room Options Configuration */}
            <div>
              <h2 className="font-display font-extrabold text-slate-800 text-xl mb-4">Select Occupancy type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sharingOptions.map((opt) => (
                  <button
                    key={opt.type}
                    disabled={opt.available === 0}
                    onClick={() => setSelectedRoom(opt.type)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      opt.available === 0
                        ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        : selectedRoom === opt.type
                          ? 'border-primary-600 bg-primary-50/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-display font-extrabold text-slate-800 text-base capitalize">
                        {opt.type} Sharing
                      </span>
                      {selectedRoom === opt.type && (
                        <span className="w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                      )}
                    </div>
                    
                    <div className="text-slate-800 font-extrabold text-xl mb-1">
                      ₹{opt.price.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-405">/mo</span>
                    </div>

                    <div className={`text-[10px] font-bold ${opt.available <= 2 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
                      {opt.available === 0 ? 'Fully Booked' : `${opt.available} rooms left`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Amenities Grid */}
            <div>
              <h2 className="font-display font-extrabold text-slate-800 text-xl mb-4">Included Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-primary-50 hover:bg-primary-50/10 transition-all">
                    <div className="p-2 rounded-lg bg-slate-50 text-primary-600 border border-slate-100 shrink-0">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-slate-700 text-xs sm:text-sm font-semibold">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* House Rules */}
            <div>
              <h2 className="font-display font-extrabold text-slate-800 text-xl mb-3.5 flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span>House Rules & Policies</span>
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-650 text-sm">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Nearby Essentials */}
            <NearbyEssentials address={address} city={city} />

            <hr className="border-slate-100" />

            {/* Reviews Marquee Section */}
            <div>
              <h2 className="font-display font-extrabold text-slate-800 text-xl mb-3.5 flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>What Residents Say ({reviews.length > 0 ? reviews.length : reviewsCount})</span>
              </h2>

              {reviews.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                  <p className="text-slate-500 text-sm">No reviews yet for this PG. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="marquee-container bg-slate-50/50 rounded-2xl p-4 border border-slate-100/60">
                  <div className="marquee-content">
                    {/* Render reviews list twice to make the loop seamless */}
                    {[...reviews, ...reviews].map((rev, idx) => (
                      <div key={idx} className="w-[300px] shrink-0 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex text-amber-400 mb-2">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-450" />
                            ))}
                          </div>
                          <p className="text-slate-700 text-xs italic mb-4 leading-relaxed line-clamp-3">"{rev.text}"</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-650 text-xs border border-slate-200">
                            {rev.name ? rev.name.charAt(0) : 'R'}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-xs">{rev.name}</h4>
                            <p className="text-slate-500 text-[10px]">{rev.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            {/* Write a Review Form */}
            <div className="bg-slate-50/40 rounded-3xl p-6 border border-slate-100">
              <h3 className="font-display font-extrabold text-slate-800 text-lg mb-2">Share Your Experience</h3>
              <p className="text-slate-500 text-xs mb-5">Tell others what you like about this PG property.</p>

              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {reviewSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      {reviewSuccess}
                    </div>
                  )}
                  {reviewError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                      {reviewError}
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-7 h-7 ${star <= reviewRating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Custom Name */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-500"
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Role */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Designation / Role</label>
                      <input
                        type="text"
                        value={reviewRole}
                        onChange={e => setReviewRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-500"
                        placeholder="e.g. LPU Student, IT Professional"
                      />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Review</label>
                    <textarea
                      rows="3"
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-500 resize-none"
                      required
                      placeholder="Tell us about the rooms, food, WiFi, and housekeeping..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 bg-white rounded-2xl border border-slate-100">
                  <p className="text-slate-500 text-xs mb-3 font-semibold">You must be logged in to write a review.</p>
                  <Link
                    to="/login"
                    className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    Login Now
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Right - Sticky Booking checkout panel */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6 lg:sticky lg:top-20">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selected Rent</span>
                  <span className="text-slate-800 font-extrabold text-2xl">
                    ₹{roomPrice.toLocaleString('en-IN')}
                    <span className="text-slate-400 text-sm font-medium">/mo</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 uppercase tracking-wide">
                    Available
                  </span>
                </div>
              </div>

              <hr className="border-slate-100" />

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1.5 px-1">Check-in Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Duration select */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 px-1">
                    <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider">Stay Duration</label>
                    <span className="text-xs font-bold text-primary-600">{duration} Months</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2">
                    <button
                      type="button"
                      disabled={duration <= 1}
                      onClick={() => setDuration(duration - 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-650 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-slate-700">{duration} {duration === 1 ? 'Month' : 'Months'}</span>
                    <button
                      type="button"
                      disabled={duration >= 12}
                      onClick={() => setDuration(duration + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-650 hover:bg-slate-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pricing Summary / Invoice */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-3">
                  <div className="flex justify-between font-semibold text-slate-600">
                    <span>Rent (₹{roomPrice.toLocaleString()} x {duration} mo)</span>
                    <span>₹{totalRent.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-slate-600">
                    <span className="flex items-center space-x-1">
                      <span>Refundable Deposit</span>
                      <span className="cursor-help text-slate-400" title="Equal to 1 month rent, returned at move-out">ⓘ</span>
                    </span>
                    <span>₹{securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-slate-600">
                    <span>Onboarding Fee</span>
                    <span>₹{onboardingFee}</span>
                  </div>

                  <div className="border-t border-slate-200/60 pt-3 flex justify-between text-sm font-extrabold text-slate-800">
                    <span>Grand Total</span>
                    <span className="text-primary-650">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Error Banner */}
                {bookingError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
                    {bookingError}
                  </div>
                )}

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  disabled={submittingBooking || roomAvailable === 0}
                  className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>{user ? 'Instant Booking' : 'Login to Book Stay'}</span>
                </button>
                
                <p className="text-[10px] text-center text-slate-400 font-semibold px-2">
                  *By clicking Book, you agree to pay the refundable security deposit and check-in rent.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
