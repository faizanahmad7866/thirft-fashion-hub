
import React, { useState, useEffect } from 'react';
import { products } from './data';
import { Product, CartItem, Category } from './types';
import Cart from './components/Cart';
import Help from './components/Help';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-[#ff4b2b] selection:text-white flex flex-col">
      {/* Top Black Bar */}
      <div className="bg-[#111] text-white py-2 px-4 text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-center border-b border-white/10 shrink-0">
        WELCOME TO <span className="text-[#ff4b2b]">THRIFTFASHIONHUB</span> &bull; 30% OFF FIRST ORDER &bull; WORLDWIDE SHIPPING
      </div>

      {/* Main Sticky Header */}
      <header className="bg-white border-b border-gray-100 py-4 sm:py-6 px-6 sm:px-10 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#ff4b2b] rounded-lg flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-[#ff4b2b]/20">T</div>
            <h1 className="font-display text-xl sm:text-2xl lg:text-3xl tracking-tight leading-none whitespace-nowrap">THRIFTFASHION<span className="text-[#ff4b2b]">HUB</span></h1>
          </div>

          <nav className="hidden lg:flex gap-8 xl:gap-12 items-center">
            <a href="#" className="nav-link">Home</a>
            <a href="#products" className="nav-link">New Arrivals</a>
            <a href="#featured" className="nav-link">Collections</a>
            <a href="#" className="nav-link text-[#ff4b2b] font-black">Sale</a>
          </nav>

          <div className="flex items-center gap-4 sm:gap-8 shrink-0">
            <div className="hidden xl:flex items-center gap-2 border-b-2 border-gray-100 pb-1 px-2 focus-within:border-[#ff4b2b] transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search Style..." className="bg-transparent outline-none text-xs font-bold w-24 xl:w-32 uppercase tracking-widest placeholder:text-gray-300"/>
            </div>
            
            <button onClick={() => setIsCartOpen(true)} className="relative group p-2 bg-gray-50 rounded-full hover:bg-[#ff4b2b]/10 transition-all shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 group-hover:text-[#ff4b2b] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff4b2b] text-white text-[9px] font-black w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="lg:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-24 px-6 sm:px-10 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000 z-10">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <span className="w-10 sm:w-12 h-[3px] bg-[#ff4b2b]"></span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#ff4b2b]">Professional Thrift Edition</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[100px] leading-[1] mb-6 lg:mb-10 tracking-tight">
              ELEVATE <br /> YOUR NEW <br /> <span className="text-[#ff4b2b]">STYLE.</span>
            </h2>
            <p className="text-gray-500 max-w-md mb-8 lg:mb-12 font-medium text-base sm:text-lg leading-relaxed">
              Discover ThriftFashionHub's curated selection of professional archival patterns. Handpicked by Zeeshan Ahmad for the modern fashion pioneer.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
               <button className="px-8 sm:px-12 py-4 sm:py-5 bg-[#ff4b2b] text-white rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#ff4b2b]/20">
                 Shop Collection 
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
               </button>
               <div className="flex items-center gap-3 sm:gap-5 cursor-pointer group px-4 py-3 sm:py-4 rounded-full border border-gray-100 hover:border-[#ff4b2b] transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ff4b2b] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">Watch The Drop</span>
               </div>
            </div>
            
            <div className="mt-12 lg:mt-20 flex items-center gap-4 sm:gap-6">
               <div className="relative">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center border-4 border-[#ff4b2b]/10">
                     <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#ff4b2b] rounded-full animate-pulse"></div>
                  </div>
               </div>
               <div>
                  <p className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Established</p>
                  <p className="text-sm sm:text-lg font-display uppercase tracking-tight">NEW YEAR 2024 DROP</p>
               </div>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-1000 hidden sm:block">
            <div className="hero-shape"></div>
            <div className="relative z-10 p-4 bg-white/50 backdrop-blur shadow-2xl rounded-2xl transform transition-transform group-hover:rotate-1 duration-700">
               <img 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200" 
                alt="Main Model" 
                className="w-full max-w-lg mx-auto rounded-xl drop-shadow-xl object-contain"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="marquee-container">
        <div className="marquee-content font-display text-xl sm:text-2xl lg:text-3xl flex gap-12 sm:gap-16 items-center uppercase py-1">
           <span>THRIFTFASHIONHUB + NEW ARRIVALS + ARCHIVAL PATTERNS + CURATED BY ZEESHAN + 30% DISCOUNT + LIMITED EDITION + THRIFTFASHIONHUB + NEW ARRIVALS + ARCHIVAL PATTERNS + CURATED BY ZEESHAN + 30% DISCOUNT + LIMITED EDITION + </span>
        </div>
      </div>

      {/* Product Grid Section */}
      <section id="products" className="py-16 lg:py-28 px-6 sm:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
            <div>
               <p className="text-[#ff4b2b] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3">Trending Collections</p>
               <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-none">NEW ARRIVALS.</h2>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-8">
              {['ALL ITEMS', 'HOODIES', 'T-SHIRTS'].map((cat, i) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'ALL ITEMS' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase() as any)}
                  className={`text-[10px] sm:text-[12px] font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] pb-2 sm:pb-3 border-b-2 sm:border-b-4 transition-all ${
                    (selectedCategory === 'All' && i === 0) || (selectedCategory === 'Hoodies' && i === 1) || (selectedCategory === 'T-Shirts' && i === 2)
                    ? 'border-[#ff4b2b] text-[#ff4b2b]' 
                    : 'border-transparent text-gray-300 hover:text-black hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 sm:gap-x-10 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group product-card p-4 sm:p-5 bg-[#fafafa] rounded-2xl border border-gray-100 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 sm:mb-8 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-col gap-1.5 sm:gap-2">
                    <span className="bg-[#111] text-white text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">New Arrival</span>
                    {product.price > 2500 && (
                      <span className="bg-[#ff4b2b] text-white text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">Archival</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-[#ffb703] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     ))}
                  </div>
                  <h3 className="font-black text-[9px] uppercase tracking-[0.2em] text-[#ff4b2b] mb-1 leading-none">{product.category}</h3>
                  <h4 className="font-bold text-base sm:text-lg uppercase mb-4 tracking-tighter text-gray-900 group-hover:text-[#ff4b2b] transition-colors leading-tight line-clamp-1">{product.name}</h4>
                  <div className="mt-auto flex items-center justify-between gap-4">
                     <p className="font-display text-xl sm:text-2xl text-[#111]">₹{product.price}</p>
                     <button 
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111] text-white rounded-xl flex items-center justify-center hover:bg-[#ff4b2b] transition-all transform group-hover:scale-105 shrink-0"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                       </svg>
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 sm:mt-24">
             <button className="px-10 sm:px-16 py-4 sm:py-5 border-[2px] sm:border-[3px] border-black font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-black hover:text-white transition-all transform rounded-xl">
                Explore Full Inventory
             </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="bg-[#111] py-20 lg:py-32 px-6 sm:px-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ff4b2b]/5 blur-[100px] lg:blur-[150px] -z-0"></div>
         <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
            <div className="lg:w-1/2">
               <span className="text-[#ff4b2b] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 sm:mb-6 block">Monthly Highlight</span>
               <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[120px] leading-none text-white mb-6 lg:mb-10 tracking-tighter">BEST OF <br className="hidden sm:block" /> THE MONTH</h2>
               <p className="text-gray-400 text-base sm:text-lg mb-8 lg:mb-12 max-w-md leading-relaxed font-medium">
                  The ThriftFashionHub "COCO" series has redefined professional thrifting. Selected for its unmatched archival pattern and premium heavyweight weave.
               </p>
               <button className="px-10 sm:px-14 py-4 sm:py-5 bg-[#ff4b2b] text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-2xl shadow-[#ff4b2b]/40">
                  Shop Best Sellers
               </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-8">
               <div className="aspect-[4/5] bg-[#1a1a1a] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 group">
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
               </div>
               <div className="aspect-[4/5] bg-[#1a1a1a] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 group translate-y-6 sm:translate-y-12">
                  <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
               </div>
            </div>
         </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 lg:py-32 px-6 sm:px-10 bg-white border-t border-gray-100 overflow-hidden shrink-0">
         <div className="max-w-[1440px] mx-auto text-center relative">
            <h4 className="font-display bg-text-footer text-gray-100/60 leading-none mb-12 sm:mb-16 tracking-tighter overflow-hidden">THRIFTFASHIONHUB</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 text-left mb-16 lg:mb-24 border-b border-gray-100 pb-16 lg:pb-20">
               <div>
                  <h5 className="font-black uppercase tracking-widest text-[10px] mb-6 text-[#ff4b2b]">Brand Info</h5>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6 text-sm">ThriftFashionHub is a curation house specializing in professional archival patterns and heritage thrift pieces managed by Zeeshan Ahmad.</p>
                  <div className="flex gap-4">
                     <a href="https://www.instagram.com/reel/DR6ppWPDbMH/" target="_blank" className="w-10 h-10 bg-[#111] text-white rounded-lg flex items-center justify-center hover:bg-[#ff4b2b] transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                     </a>
                  </div>
               </div>
               <div className="hidden lg:block">
                  <h5 className="font-black uppercase tracking-widest text-[10px] mb-6 text-[#ff4b2b]">Quick Links</h5>
                  <ul className="space-y-4 font-bold uppercase text-[10px] tracking-widest text-gray-400">
                     <li><a href="#" className="hover:text-black">Track Order</a></li>
                     <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                     <li><button onClick={() => setIsHelpOpen(true)} className="hover:text-black">Help Center</button></li>
                  </ul>
               </div>
               <div className="md:col-span-2 lg:col-span-1">
                  <h5 className="font-black uppercase tracking-widest text-[10px] mb-6 text-[#ff4b2b]">Stay Connected</h5>
                  <p className="text-gray-400 font-medium mb-6 text-sm italic">Join our exclusive mailing list for early drop access.</p>
                  <div className="flex gap-2">
                     <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-gray-50 border-2 border-gray-100 px-4 py-3 text-[10px] font-black w-full focus:border-[#ff4b2b] outline-none rounded-lg"/>
                     <button className="bg-[#111] text-white px-6 font-black text-[10px] hover:bg-[#ff4b2b] transition-all rounded-lg shrink-0">JOIN</button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black rounded flex items-center justify-center text-white font-black text-[10px] sm:text-[12px]">T</div>
                 <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">© 2024 ThriftFashionHub. India.</p>
               </div>
               <div className="flex gap-6 sm:gap-12">
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">VISA</span>
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">MASTERCARD</span>
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">UPI</span>
               </div>
            </div>
         </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <Help 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
    </div>
  );
};

export default App;
