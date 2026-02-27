
import React from 'react';

interface HelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Help: React.FC<HelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Help Center</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-indigo-600 mb-2">Order Tracking</h3>
            <p className="text-gray-600">You can track your order using the link sent to your registered email or phone number.</p>
          </section>
          <section>
            <h3 className="font-bold text-indigo-600 mb-2">Returns & Refunds</h3>
            <p className="text-gray-600">We offer a 7-day hassle-free return policy for all our premium thrift items.</p>
          </section>
          <section>
            <h3 className="font-bold text-indigo-600 mb-2">Contact Us</h3>
            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <span className="font-semibold text-gray-800">Email:</span> support@thriftfashionhub.com
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="font-semibold text-gray-800">Phone:</span> +91 98765 43210
              </p>
            </div>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
        >
          Got it, Thanks!
        </button>
      </div>
    </div>
  );
};

export default Help;
