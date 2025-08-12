
import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
  const contact = {
    address: '1687 Gaborone International Commerce Park - Rugby Club, Gaborone, Botswana',
    phone: '+267 75 086 025',
    email: 'touchdownrestaurant1@gmail.com',
    hours: 'Open daily from 9 AM'
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-restaurant-red">Contact & Location</h2>
        
        <div className="space-y-4 mb-8 text-restaurant-wood">
          <p className="text-lg flex items-center justify-center gap-2"><MapPin size={20} /> {contact.address}</p>
          <p className="text-lg flex items-center justify-center gap-2"><Phone size={20} /> {contact.phone}</p>
          <p className="text-lg flex items-center justify-center gap-2"><Mail size={20} /> {contact.email}</p>
          <p className="text-lg">{contact.hours}</p>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="#"
            className="flex flex-col items-center text-restaurant-wood hover:text-restaurant-red transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-8 w-8 mb-2" />
            <span className="text-sm">Instagram</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-restaurant-wood hover:text-restaurant-red transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-8 w-8 mb-2" />
            <span className="text-sm">Facebook</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-restaurant-wood hover:text-restaurant-red transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-8 w-8 mb-2" />
            <span className="text-sm">Twitter</span>
          </a>
        </div>

        {/* Footer */}
        <div className="text-restaurant-wood/70 text-sm">
          <p>© 2024 Touch Down Restaurant. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
