
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px] transition-all duration-500"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-in">
        <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Your Bag</h2>
            <p className="text-[9px] font-black text-[#ff4b2b] uppercase tracking-[0.2em] mt-1">ThriftFashionHub Exclusive</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10">
          {items.length === 0 ? (
            <div className="text-center py-40">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-gray-50/50">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6">No items selected yet</p>
              <button onClick={onClose} className="px-8 py-3 bg-[#111] text-white font-black text-[10px] uppercase tracking-widest hover:bg-[#ff4b2b] transition-all rounded-full">Explore The Hub</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-8 group animate-fade-in">
                <div className="w-24 h-32 bg-[#fafafa] shrink-0 border border-gray-100 overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-[#111] text-xs uppercase tracking-tight group-hover:text-[#ff4b2b] transition-colors leading-relaxed line-clamp-2">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-200 hover:text-[#ff4b2b] transition-colors p-1">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-[#ff4b2b] text-[9px] font-black uppercase tracking-[0.2em] mb-auto">{item.category}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-black font-black">-</button>
                      <span className="w-6 text-center text-[11px] font-black text-[#111]">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-black font-black">+</button>
                    </div>
                    <span className="font-display text-xl">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-10 border-t border-gray-100 bg-[#fafafa] sticky bottom-0">
            <div className="flex justify-between items-center mb-10">
               <div>
                 <span className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] block mb-1">Total Payment</span>
                 <p className="text-[10px] text-[#ff4b2b] font-bold">Free standard shipping applied</p>
               </div>
              <span className="text-4xl font-display text-[#111]">₹{total}</span>
            </div>
            <button className="w-full py-6 bg-[#111] text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-[#ff4b2b] transition-all shadow-2xl shadow-black/10 active:scale-95 rounded-2xl flex items-center justify-center gap-3">
              Secure Checkout 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] mt-8">Archival Excellence Guarantee</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
