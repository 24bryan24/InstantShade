import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Shield, 
  Menu, 
  X, 
  ChevronRight, 
  DollarSign, 
  LogOut, 
  Phone, 
  MapPin, 
  Star
} from 'lucide-react';

// --- BRANDING ASSETS ---

const BRAND = {
  name: "Instant Shade",
  slogan: "measure. mount. marvel",
  owner: "Bryan Heilman",
  phone: "+1 (215) 360-4621",
  email: "info@instantshadeinstalls.com",
  area: "Servicing PA & NJ",
  colors: {
    navy: "bg-[#1B365D]",
    orange: "text-[#F97316]",
    orangeBg: "bg-[#F97316]",
    navyText: "text-[#1B365D]"
  }
};

const InstantShadeLogo = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="50" height="10" rx="2" fill="#F97316" />
    <rect x="20" y="35" width="55" height="10" rx="2" fill="#F97316" />
    <rect x="20" y="50" width="50" height="10" rx="2" fill="#F97316" />
    <rect x="25" y="65" width="40" height="10" rx="2" fill="#F97316" />
    <path d="M75 20C85 20 90 35 90 50C90 70 80 85 60 90C65 88 80 75 80 50C80 35 75 25 70 20H75Z" fill="#1B365D" />
  </svg>
);

// --- INITIAL DATA & CONFIGURATION ---

const INITIAL_PRICING = {
  types: [
    { id: 'roller', label: 'Roller Shades', price: 45 },
    { id: 'venetian', label: 'Venetian / Mini Blinds', price: 50 },
    { id: 'vertical', label: 'Vertical Blinds', price: 60 },
    { id: 'roman', label: 'Roman Shades', price: 65 },
    { id: 'cellular', label: 'Cellular / Honeycomb', price: 50 },
    { id: 'wood', label: 'Faux/Real Wood', price: 70 },
    { id: 'shutter', label: 'Plantation Shutters', price: 120 },
    { id: 'drapery', label: 'Drapery / Curtains', price: 65 },
  ],
  brands: [
    { id: 'generic', label: 'Generic / Big Box Store', surcharge: 0 },
    { id: 'hunter', label: 'Hunter Douglas', surcharge: 25 },
    { id: 'bali', label: 'Bali / Graber', surcharge: 10 },
    { id: 'levolor', label: 'Levolor', surcharge: 10 },
    { id: 'other', label: 'Other / Custom', surcharge: 15 },
  ],
  fees: {
    highLadder: 45,
    specialSurface: 20,
    minimumTrip: 100
  }
};

const TESTIMONIALS = [
  { name: "Sarah J.", text: "Incredible speed! I called at 9am and they were installed by 4pm the same day.", rating: 5 },
  { name: "Mike T.", text: "Very professional. Cleaned up everything afterwards. The pricing was transparent.", rating: 5 },
  { name: "Elena R.", text: "Saved me so much time. I bought blinds from Home Depot and didn't know how to put them up.", rating: 5 }
];

// --- COMPONENTS ---

const Navbar = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${BRAND.colors.navy} text-white sticky top-0 z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-white p-1.5 rounded-lg shadow-md">
              <InstantShadeLogo className="h-10 w-10" />
            </div>
            <div>
              <h1 className="font-bold text-2xl tracking-tight leading-none uppercase italic">{BRAND.name}</h1>
              <p className="text-[10px] text-orange-400 font-medium tracking-[0.2em] uppercase mt-1">{BRAND.slogan}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => setView('home')} className={`hover:text-orange-400 transition-colors ${currentView === 'home' ? 'text-orange-400 font-bold' : ''}`}>Home</button>
              <button onClick={() => setView('quote')} className={`hover:text-orange-400 transition-colors ${currentView === 'quote' ? 'text-orange-400 font-bold' : ''}`}>Get Quote & Book</button>
              <button onClick={() => setView('admin')} className={`hover:text-orange-400 transition-colors ${currentView.includes('admin') ? 'text-orange-400 font-bold' : ''}`}>Admin</button>
              <button onClick={() => setView('quote')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wide transition-all shadow-md transform hover:scale-105">Book Now</button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#162a4a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { setView('home'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Home</button>
            <button onClick={() => { setView('quote'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Get Quote</button>
            <button onClick={() => { setView('admin'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Admin Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setView }) => (
  <div className={`relative ${BRAND.colors.navy} overflow-hidden`}>
    <div className="absolute inset-0 opacity-10">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 L100 0 L100 100 Z" fill="white" />
      </svg>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
      <div className="lg:w-2/3">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 mb-6">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">Same Day Service Available</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          <span className="block text-xl md:text-2xl text-orange-400 font-medium mb-2 uppercase tracking-widest">{BRAND.area}</span>
          Professional Blind Installation. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">Done Fast. Done Right.</span>
        </h1>
        <p className="mt-4 text-xl text-slate-300 mb-8 max-w-2xl">
          Don't struggle with brackets and leveling. We install your purchased blinds, shades, and shutters with precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setView('quote')} className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-orange-500/25">
            Get an Instant Quote <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-slate-300 px-4 py-4">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="py-24 bg-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-[#1e3a8a] uppercase tracking-wide">Why Choose Instant Shade?</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">We bring professionalism and speed to every window in PA & NJ.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { icon: Clock, title: "Unbeatable Speed", desc: "Installations available same day, next day, or day after usually. We value your time." },
          { icon: Shield, title: "Owner/Operator Care", desc: "Work directly with Bryan Heilman. Expert installers who respect your home. Precise measuring and mounting." },
          { icon: Phone, title: "Direct Communication", desc: "No call centers. Call or text +215-360-4621 for instant updates and transparent scheduling." },
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-orange-500 hover:shadow-2xl transition-all duration-300 group">
            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6">
              <feature.icon className={`h-7 w-7 ${BRAND.colors.navyText}`} />
            </div>
            <h3 className={`text-xl font-bold ${BRAND.colors.navyText} mb-3`}>{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const QuoteForm = ({ pricing, onSubmitRequest }) => {
  const [items, setItems] = useState([{ id: 1, type: pricing.types[0].id, brand: pricing.brands[0].id, size: '', qty: 1 }]);
  const [conditions, setConditions] = useState({ highLadder: false, metalTile: false });
  const [schedule, setSchedule] = useState({ date: '', time: 'morning' });
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', zip: '' });
  const [showSummary, setShowSummary] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now(), type: pricing.types[0].id, brand: pricing.brands[0].id, size: '', qty: 1 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotal = () => {
    let subtotal = 0;
    let totalWindows = 0;
    items.forEach(item => {
      const typePrice = pricing.types.find(t => t.id === item.type)?.price || 0;
      const brandSurcharge = pricing.brands.find(b => b.id === item.brand)?.surcharge || 0;
      subtotal += (typePrice + brandSurcharge) * parseInt(item.qty || 0);
      totalWindows += parseInt(item.qty || 0);
    });
    if (conditions.highLadder) subtotal += pricing.fees.highLadder;
    if (conditions.metalTile) subtotal += (pricing.fees.specialSurface * totalWindows);
    return Math.max(subtotal, pricing.fees.minimumTrip);
  };

  const handleSubmit = (e) => { e.preventDefault(); setShowSummary(true); };
  const confirmBooking = () => onSubmitRequest();

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-[#1e3a8a] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 transform translate-x-10 -translate-y-10"></div>
          <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Quote Ready!</h2>
          <p className="text-green-100 mt-2">We can install this on {schedule.date || 'your preferred date'}.</p>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-6">
            <div>
              <p className="text-slate-500 text-sm uppercase tracking-wide">Estimated Total</p>
              <p className={`text-4xl font-extrabold ${BRAND.colors.navyText}`}>${calculateTotal()}</p>
            </div>
            <div className="text-right"><p className="text-sm text-slate-500">Includes labor & supplies</p></div>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm"><span className="text-slate-600">Customer:</span><span className="font-medium">{customer.name} ({customer.zip})</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">Service Date:</span><span className="font-medium">{schedule.date} ({schedule.time})</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">Total Items:</span><span className="font-medium">{items.reduce((acc, curr) => acc + parseInt(curr.qty || 0), 0)}</span></div>
          </div>
          <button onClick={confirmBooking} className={`w-full ${BRAND.colors.navy} hover:bg-[#2a4575] text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]`}>
            Confirm & Schedule Appointment
          </button>
          <button onClick={() => setShowSummary(false)} className="w-full mt-4 text-slate-500 font-medium hover:text-slate-800">Edit Details</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-6 md:p-8">
          <h2 className={`text-2xl font-bold ${BRAND.colors.navyText} flex items-center gap-2`}>
            <DollarSign className="h-6 w-6 text-orange-500" /> Get Your Instant Quote
          </h2>
          <p className="text-slate-500 mt-2">Enter your product details below. If you don't know the exact size, just leave it blank.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wide">Products to Install</label>
            </div>
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100 relative group">
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                  <select required className="w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm" value={item.type} onChange={(e) => updateItem(item.id, 'type', e.target.value)}>
                    {pricing.types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Brand</label>
                  <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm" value={item.brand} onChange={(e) => updateItem(item.id, 'brand', e.target.value)}>
                    {pricing.brands.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">W x H (Optional)</label>
                  <input type="text" placeholder='e.g. 30"x60"' className="w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm" value={item.size || ''} onChange={(e) => updateItem(item.id, 'size', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Quantity</label>
                  <input type="number" min="1" required className="w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', e.target.value)} />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" disabled={items.length === 1}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} className={`text-sm font-bold ${BRAND.colors.navyText} hover:text-orange-600 flex items-center gap-2 mt-2`}>+ Add Another Product Type</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`text-sm font-bold ${BRAND.colors.navyText} uppercase tracking-wide block mb-3`}>Installation Conditions</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 h-5 w-5" checked={conditions.highLadder} onChange={(e) => setConditions({...conditions, highLadder: e.target.checked})} />
                  <div>
                    <span className="block font-medium text-slate-900">High Ladder Needed</span>
                    <span className="block text-xs text-slate-500">Windows above 10ft (requires extra equipment)</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500 h-5 w-5" checked={conditions.metalTile} onChange={(e) => setConditions({...conditions, metalTile: e.target.checked})} />
                  <div>
                    <span className="block font-medium text-slate-900">Metal or Tile Surface</span>
                    <span className="block text-xs text-slate-500">Requires special drill bits (Fee per window)</span>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className={`text-sm font-bold ${BRAND.colors.navyText} uppercase tracking-wide block mb-3`}>Preferred Time</label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input type="date" required className="pl-10 w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={schedule.date} onChange={(e) => setSchedule({...schedule, date: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Time Slot</label>
                  <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={schedule.time} onChange={(e) => setSchedule({...schedule, time: e.target.value})}>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 7PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6">
            <label className={`text-sm font-bold ${BRAND.colors.navyText} uppercase tracking-wide block mb-3`}>Your Details</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required className="rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} />
              <input type="text" placeholder="Zip Code" required className="rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={customer.zip} onChange={(e) => setCustomer({...customer, zip: e.target.value})} />
              <input type="email" placeholder="Email Address" required className="rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={customer.email} onChange={(e) => setCustomer({...customer, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number" required className="rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.01]">Calculate Quote & Schedule</button>
            <p className="text-center text-xs text-slate-400 mt-4">By clicking above, you agree to our terms of service. Final price subject to on-site verification.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ pricing, setPricing, setView }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localPricing, setLocalPricing] = useState(pricing);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => { setLocalPricing(pricing); }, [pricing]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect password (hint: admin123)');
  };

  const handlePriceChange = (category, id, field, value) => {
    const updated = { ...localPricing };
    if (category === 'fees') updated.fees[id] = parseFloat(value);
    else {
      const index = updated[category].findIndex(item => item.id === id);
      updated[category][index][field] = category === 'brands' && field === 'label' ? value : parseFloat(value);
      if (field === 'label') updated[category][index][field] = value;
    }
    setLocalPricing(updated);
  };

  const saveChanges = () => {
    setPricing(localPricing);
    setSaveStatus('Settings Saved Successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-md">
          <div className="flex justify-center mb-6"><div className="bg-slate-100 p-4 rounded-full"><Shield className="h-8 w-8 text-slate-600" /></div></div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" className="w-full rounded-lg border-slate-300 p-3" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className={`w-full ${BRAND.colors.navy} text-white font-bold py-3 rounded-lg hover:bg-[#2a4575]`}>Access Dashboard</button>
            <p className="text-center text-xs text-slate-400">Hint: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Pricing Configuration</h2>
        <div className="flex gap-4">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900"><LogOut className="h-4 w-4" /> Exit Admin</button>
          <button onClick={saveChanges} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors">Save Changes</button>
        </div>
      </div>
      {saveStatus && (
        <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"><CheckCircle className="h-5 w-5" />{saveStatus}</div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Base Install Prices (Per Unit)</h3>
          <div className="space-y-4">
            {localPricing.types.map(type => (
              <div key={type.id} className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">{type.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">$</span>
                  <input type="number" value={type.price} onChange={(e) => handlePriceChange('types', type.id, 'price', e.target.value)} className="w-24 rounded border-slate-300 text-right p-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Service Fees</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-slate-600">High Ladder Flat Fee</span><div className="flex items-center gap-2"><span className="text-slate-400">$</span><input type="number" value={localPricing.fees.highLadder} onChange={(e) => handlePriceChange('fees', 'highLadder', null, e.target.value)} className="w-24 rounded border-slate-300 text-right p-1" /></div></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">Metal/Tile Drill (Per Window)</span><div className="flex items-center gap-2"><span className="text-slate-400">$</span><input type="number" value={localPricing.fees.specialSurface} onChange={(e) => handlePriceChange('fees', 'specialSurface', null, e.target.value)} className="w-24 rounded border-slate-300 text-right p-1" /></div></div>
              <div className="flex justify-between items-center"><span className="text-slate-600">Minimum Trip Charge</span><div className="flex items-center gap-2"><span className="text-slate-400">$</span><input type="number" value={localPricing.fees.minimumTrip} onChange={(e) => handlePriceChange('fees', 'minimumTrip', null, e.target.value)} className="w-24 rounded border-slate-300 text-right p-1" /></div></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Brand Surcharges</h3>
            <div className="space-y-4">
              {localPricing.brands.map(brand => (
                <div key={brand.id} className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">{brand.label}</span>
                  <div className="flex items-center gap-2"><span className="text-slate-400">+ $</span><input type="number" value={brand.surcharge} onChange={(e) => handlePriceChange('brands', brand.id, 'surcharge', e.target.value)} className="w-20 rounded border-slate-300 text-right p-1" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className={`${BRAND.colors.navy} text-slate-300 py-12 mt-12 border-t-4 border-orange-500`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4 text-white">
            <div className="bg-white p-1 rounded-md"><InstantShadeLogo className="h-8 w-8" /></div>
            <span className="font-bold text-xl uppercase italic">{BRAND.name}</span>
          </div>
          <p className="mb-4">Specializing in Blinds, Shades, and Shutters. We bring the tools, the ladders, and the expertise so you don't have to.</p>
          <div className="flex items-center gap-2 text-orange-400 font-semibold"><Star className="h-4 w-4 fill-current" /><span>{BRAND.owner}, Owner/Operator</span></div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Service Areas</h4>
          <ul className="space-y-2"><li>{BRAND.area}</li><li>Greater Philadelphia</li><li>South Jersey</li><li>Bucks County</li></ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-400" /> <a href={`tel:${BRAND.phone}`} className="hover:text-white transition-colors">{BRAND.phone}</a></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-400" /> {BRAND.email}</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange-400" /> Mon-Sun: 7am - 9pm</div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm">&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved. {BRAND.slogan}</div>
    </div>
  </footer>
);

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [pricing, setPricing] = useState(INITIAL_PRICING);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBookingSubmit = () => setShowSuccessModal(true);
  const closeSuccessModal = () => { setShowSuccessModal(false); setCurrentView('home'); };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-orange-100 selection:text-orange-900">
      <Navbar setView={setCurrentView} currentView={currentView} />
      {currentView === 'home' && (
        <>
          <Hero setView={setCurrentView} />
          <Features />
          <div className="py-20 bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className={`text-3xl font-bold text-center ${BRAND.colors.navyText} mb-12`}>What Our Customers Say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex text-orange-400 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                    <p className="text-slate-600 mb-4 italic">"{t.text}"</p>
                    <p className={`font-bold ${BRAND.colors.navyText}`}>- {t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-orange-500 text-white py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#1B365D] opacity-10 transform -skew-x-12 scale-150"></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to get those blinds up?</h2>
              <p className="mb-8 text-orange-100">Availability is limited. Secure your same-day or next-day slot now.</p>
              <button onClick={() => setCurrentView('quote')} className={`bg-white ${BRAND.colors.navyText} font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-100 transition-colors uppercase tracking-wider`}>Schedule Installation</button>
            </div>
          </div>
        </>
      )}
      {currentView === 'quote' && (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <h1 className={`text-3xl font-bold ${BRAND.colors.navyText}`}>Installation Quote</h1>
            <p className="text-slate-500">Fast, transparent pricing. No hidden fees.</p>
          </div>
          <QuoteForm pricing={pricing} onSubmitRequest={handleBookingSubmit} />
        </div>
      )}
      {currentView === 'admin' && (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-screen">
          <AdminDashboard pricing={pricing} setPricing={setPricing} setView={setCurrentView} />
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-10 w-10 text-green-600" /></div>
            <h2 className={`text-3xl font-bold ${BRAND.colors.navyText} mb-2`}>Request Received!</h2>
            <p className="text-slate-600 mb-8">We have received your installation request. <strong>{BRAND.owner}</strong> or one of our team members will call you shortly at {BRAND.phone} to confirm.</p>
            <button onClick={closeSuccessModal} className={`w-full ${BRAND.colors.navy} text-white font-bold py-3 rounded-xl hover:bg-[#2a4575] transition-colors`}>Return Home</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
