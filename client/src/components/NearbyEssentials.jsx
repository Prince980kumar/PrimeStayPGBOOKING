import React, { useState, useEffect, useCallback } from 'react';
import {
  GraduationCap, Hospital, CreditCard, Bus, Dumbbell, Coffee,
  MapPin, Navigation, Loader2, AlertCircle, RefreshCw, ExternalLink
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'college',
    label: 'Colleges',
    icon: GraduationCap,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
    emoji: '🎓',
    overpassTag: `node["amenity"~"university|college|school"](around:2000,LAT,LNG);way["amenity"~"university|college|school"](around:2000,LAT,LNG);`,
  },
  {
    id: 'hospital',
    label: 'Hospitals',
    icon: Hospital,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
    emoji: '🏥',
    overpassTag: `node["amenity"~"hospital|clinic|pharmacy"](around:2000,LAT,LNG);way["amenity"~"hospital|clinic"](around:2000,LAT,LNG);`,
  },
  {
    id: 'atm',
    label: 'ATMs',
    icon: CreditCard,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    emoji: '🏧',
    overpassTag: `node["amenity"="atm"](around:1000,LAT,LNG);node["amenity"="bank"](around:1000,LAT,LNG);`,
  },
  {
    id: 'bus_stop',
    label: 'Bus Stops',
    icon: Bus,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    emoji: '🚌',
    overpassTag: `node["highway"="bus_stop"](around:1500,LAT,LNG);node["amenity"="bus_station"](around:2000,LAT,LNG);`,
  },
  {
    id: 'gym',
    label: 'Gyms',
    icon: Dumbbell,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    emoji: '💪',
    overpassTag: `node["leisure"~"fitness_centre|sports_centre|gym"](around:2000,LAT,LNG);way["leisure"~"fitness_centre|sports_centre"](around:2000,LAT,LNG);`,
  },
  {
    id: 'cafe',
    label: 'Cafes',
    icon: Coffee,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
    emoji: '☕',
    overpassTag: `node["amenity"~"cafe|restaurant|fast_food"](around:1000,LAT,LNG);`,
  },
];

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = x => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(m) {
  if (!m && m !== 0) return '';
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}

// Try multiple geocoding queries for best results
async function geocode(address, city) {
  const queries = [
    `${address}, ${city}, India`,
    `${city}, India`,
  ];
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&countrycodes=in`,
        { headers: { 'User-Agent': 'PrimeStayApp/1.0' } }
      );
      const data = await res.json();
      if (data && data[0]) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (_) {}
  }
  return null;
}

async function fetchPlaces(lat, lng, category) {
  const q = category.overpassTag.replace(/LAT/g, lat).replace(/LNG/g, lng);
  const body = `[out:json][timeout:20];(${q});out center 6;`;
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(body)}`,
  });
  const data = await res.json();
  return (data.elements || [])
    .filter(el => el.tags?.name)
    .map(el => {
      const elLat = el.lat ?? el.center?.lat;
      const elLng = el.lon ?? el.center?.lon;
      return {
        id: el.id,
        name: el.tags.name,
        subtype: (el.tags.amenity || el.tags.leisure || el.tags.highway || '').replace(/_/g, ' '),
        lat: elLat,
        lng: elLng,
        dist: elLat && elLng ? Math.round(haversine(lat, lng, elLat, elLng)) : null,
      };
    })
    .sort((a, b) => (a.dist ?? 99999) - (b.dist ?? 99999))
    .slice(0, 5);
}

// ─── Component ────────────────────────────────────────────────────────────────
const NearbyEssentials = ({ address, city }) => {
  const [coords, setCoords] = useState(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [geoError, setGeoError] = useState(null);
  const [activeId, setActiveId] = useState('college');
  const [placeData, setPlaceData] = useState({});   // { catId: { status:'idle'|'loading'|'done', items:[] } }

  // ── Geocode on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setGeoLoading(true);
    setGeoError(null);
    geocode(address, city).then(c => {
      if (cancelled) return;
      setGeoLoading(false);
      if (c) setCoords(c);
      else setGeoError(`Could not locate "${city}" on the map.`);
    }).catch(() => {
      if (!cancelled) { setGeoLoading(false); setGeoError('Network error during geocoding.'); }
    });
    return () => { cancelled = true; };
  }, [address, city]);

  // ── Fetch places for active category ────────────────────────────────────
  const load = useCallback((catId) => {
    if (!coords) return;
    if (placeData[catId]?.status === 'loading' || placeData[catId]?.status === 'done') return;
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;

    setPlaceData(prev => ({ ...prev, [catId]: { status: 'loading', items: [] } }));
    fetchPlaces(coords.lat, coords.lng, cat)
      .then(items => setPlaceData(prev => ({ ...prev, [catId]: { status: 'done', items } })))
      .catch(() => setPlaceData(prev => ({ ...prev, [catId]: { status: 'done', items: [] } })));
  }, [coords, placeData]);

  useEffect(() => { if (coords) load(activeId); }, [coords, activeId]);

  const activeCat = CATEGORIES.find(c => c.id === activeId);
  const activeState = placeData[activeId];

  // Google Maps embed — shows a map centred on the property
  const mapSrc = coords
    ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
    : city
    ? `https://maps.google.com/maps?q=${encodeURIComponent(city + ' India')}&z=13&output=embed`
    : null;

  const gmapsSearch = coords
    ? `https://www.google.com/maps/search/${encodeURIComponent(activeCat.label)}/@${coords.lat},${coords.lng},15z`
    : `https://www.google.com/maps/search/${encodeURIComponent(activeCat.label + ' ' + city)}`;

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        <Navigation className="w-5 h-5 text-primary-500" />
        <h2 className="font-display font-extrabold text-slate-800 text-xl">Nearby Essentials</h2>
      </div>
      <p className="text-slate-500 text-sm mb-5">Explore what's around this PG</p>

      {/* Category Pill Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveId(cat.id); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border"
              style={
                isActive
                  ? { background: cat.color, color: '#fff', borderColor: cat.color, boxShadow: `0 4px 14px ${cat.color}44` }
                  : { background: cat.bg, color: cat.color, borderColor: cat.border }
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">

        {/* Map Panel */}
        <div className="lg:col-span-3 relative" style={{ minHeight: 300 }}>
          {geoLoading ? (
            <div className="flex items-center justify-center bg-slate-50 h-full" style={{ minHeight: 300 }}>
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Locating address…</p>
              </div>
            </div>
          ) : geoError ? (
            <div className="flex items-center justify-center bg-rose-50 h-full p-6" style={{ minHeight: 300 }}>
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                <p className="text-rose-500 text-sm font-semibold">{geoError}</p>
              </div>
            </div>
          ) : (
            <>
              <iframe
                title="Property Map"
                src={mapSrc}
                className="w-full h-full border-0"
                style={{ minHeight: 300 }}
                allowFullScreen
                loading="lazy"
              />
              {/* Open in Maps overlay button */}
              <a
                href={gmapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-lg hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}
              >
                <ExternalLink className="w-3 h-3" />
                Find {activeCat.label} on Maps
              </a>
            </>
          )}
        </div>

        {/* Places List Panel */}
        <div className="lg:col-span-2 flex flex-col" style={{ background: activeCat.bg }}>
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/60">
            <div className="flex items-center gap-2">
              <span className="text-lg">{activeCat.emoji}</span>
              <span className="font-bold text-slate-800 text-sm">{activeCat.label}</span>
            </div>
            <button
              title="Refresh"
              onClick={() => {
                setPlaceData(prev => { const n = { ...prev }; delete n[activeId]; return n; });
              }}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-grow p-3 space-y-2" style={{ minHeight: 240 }}>
            {!coords && !geoError ? (
              <div className="flex items-center justify-center h-full py-10">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : activeState?.status === 'loading' || !activeState ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: activeCat.color }} />
                <p className="text-slate-500 text-xs">Finding {activeCat.label.toLowerCase()}…</p>
              </div>
            ) : activeState.items.length > 0 ? (
              activeState.items.map((place, i) => (
                <a
                  key={place.id}
                  href={`https://www.google.com/maps/search/${encodeURIComponent(place.name)}${place.lat ? `/@${place.lat},${place.lng},17z` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white border border-white/60 hover:border-slate-200 transition-all shadow-sm hover:shadow-md group"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-extrabold text-white"
                    style={{ background: activeCat.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-slate-800 text-xs font-bold leading-tight truncate group-hover:text-sky-600 transition-colors">
                      {place.name}
                    </p>
                    {place.subtype && (
                      <p className="text-slate-400 text-[10px] mt-0.5 capitalize">{place.subtype}</p>
                    )}
                  </div>
                  {place.dist !== null && (
                    <span
                      className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ background: `${activeCat.color}18`, color: activeCat.color }}
                    >
                      {fmtDist(place.dist)}
                    </span>
                  )}
                </a>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-center px-3">
                <span className="text-3xl">🔍</span>
                <p className="text-slate-500 text-xs font-semibold">
                  No {activeCat.label.toLowerCase()} found within 2 km
                </p>
                <a
                  href={gmapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ background: activeCat.color }}
                >
                  Search on Google Maps
                </a>
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="px-4 py-2 border-t border-white/40">
            <p className="text-[10px] text-slate-400 text-center">
              Data: OpenStreetMap · Click to open in Google Maps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyEssentials;
