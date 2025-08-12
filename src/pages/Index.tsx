
import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import TDWaiter from '@/components/TDWaiter';
import FoodCategories from '@/components/FoodCategories';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <TDWaiter />
      <FoodCategories />
      <ContactSection />
    </div>
  );
};

export default Index;
