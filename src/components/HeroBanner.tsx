import React from 'react';
import logo from '/Thumbnail Logo.png'; // Import the logo from the public folder

const HeroBanner = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Use the new web banner image
          backgroundImage: "url('/web banner image.png')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center text-white animate-fade-in">
          
          {/* Replaced welcome text with the logo */}
          <img 
            src={logo} 
            alt="Touch Down Restaurant Logo" 
            className="w-4/5 max-w-lg mx-auto drop-shadow-lg"
          />

          <div className="mt-6">
            <div className="inline-block px-6 py-3 bg-restaurant-red/90 backdrop-blur-sm rounded-full text-base font-medium shadow-lg">
              Welcome to an Unforgettable Dining Experience
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
