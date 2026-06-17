import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wifi, Shield, Coffee, Utensils, Wind } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { _id, title, address, city, gender, sharingOptions, amenities, images, rating, reviewsCount } = property;

  // Get starting price
  const startingPrice = sharingOptions.length > 0
    ? Math.min(...sharingOptions.map(opt => opt.price))
    : 0;

  // Gender colors
  const genderColors = {
    boys: 'bg-blue-50 text-blue-700 border-blue-200',
    girls: 'bg-rose-50 text-rose-700 border-rose-200',
    unisex: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  const genderLabels = {
    boys: '♂ Boys Only',
    girls: '♀ Girls Only',
    unisex: '⚤ Coliving'
  };

  // Map amenities string to small icons
  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wifi') || n.includes('internet')) return <Wifi className="w-3.5 h-3.5" title="WiFi" />;
    if (n.includes('security') || n.includes('cctv')) return <Shield className="w-3.5 h-3.5" title="Security" />;
    if (n.includes('food') || n.includes('meal')) return <Utensils className="w-3.5 h-3.5" title="Food Included" />;
    if (n.includes('ac') || n.includes('air cond')) return <Wind className="w-3.5 h-3.5" title="AC Available" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* Property Image & Tags */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gender Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border ${genderColors[gender] || genderColors.unisex} shadow-sm backdrop-blur-md`}>
          {genderLabels[gender] || genderLabels.unisex}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 text-white px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* City/Location */}
        <div className="flex items-center space-x-1 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{city}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Address */}
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed flex-grow">
          {address}
        </p>

        {/* Display some amenities icons */}
        <div className="flex items-center space-x-2 my-4">
          {amenities.slice(0, 4).map((amenity, index) => {
            const icon = getAmenityIcon(amenity);
            return icon ? (
              <div key={index} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-colors" title={amenity}>
                {icon}
              </div>
            ) : null;
          })}
          {amenities.length > 4 && (
            <span className="text-[10px] font-bold text-slate-400 pl-1">
              +{amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Starts from</span>
            <span className="text-slate-800 font-extrabold text-lg">
              ₹{startingPrice.toLocaleString('en-IN')}<span className="text-slate-400 font-medium text-xs">/mo</span>
            </span>
          </div>
          <Link
            to={`/properties/${_id}`}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-primary-600 active:scale-95 shadow-sm hover:shadow-md hover:shadow-primary-500/10 transition-all duration-150"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
