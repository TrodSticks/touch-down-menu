import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import menuData from '@/data/menu.json';

const FoodCategories = () => {
  const placeholderImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  
  // State to manage the active sub-category for each main category
  const [activeSubCategories, setActiveSubCategories] = useState<{[key: string]: string | null}>({});

  // Function to set the default sub-category when a main tab is clicked
  useEffect(() => {
    const defaultSubCategories: {[key: string]: string | null} = {};
    menuData.menu.forEach(cat => {
      if (cat.subCategories && cat.subCategories.length > 0) {
        defaultSubCategories[cat.category] = cat.subCategories[0].name;
      }
    });
    setActiveSubCategories(defaultSubCategories);
  }, []);

  const handleSubCategoryClick = (mainCategory: string, subCategoryName: string) => {
    setActiveSubCategories(prev => ({ ...prev, [mainCategory]: subCategoryName }));
  };

  const renderItems = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map((item) => (
        <Dialog key={item.id}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-full">
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-restaurant-red text-lg">{item.name}</CardTitle>
                  <div className="bg-restaurant-red text-white px-3 py-1 rounded-full text-sm font-bold ml-2 flex-shrink-0">
                    {item.price}
                  </div>
                </div>
                <CardDescription className="text-restaurant-wood text-sm leading-relaxed flex-grow">
                  {item.description || 'Delicious meal from Touch Down.'}
                </CardDescription>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-restaurant-red text-2xl">{item.name}</DialogTitle>
              <DialogDescription className="text-lg text-restaurant-wood font-semibold">{item.price}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-restaurant-wood/90">{item.description || 'Delicious meal from Touch Down.'}</p>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );

  return (
    <div className="py-16 bg-restaurant-beige">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-restaurant-red mb-4">Our Menu</h2>
          <p className="text-xl text-restaurant-wood max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each prepared with the finest ingredients
          </p>
        </div>

        <Tabs defaultValue={menuData.menu[0].category} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-4 bg-white shadow-md rounded-full h-auto p-2">
            {menuData.menu.map((category) => (
              <TabsTrigger
                key={category.category}
                value={category.category}
                className="rounded-full text-restaurant-wood data-[state=active]:bg-restaurant-red data-[state=active]:text-white transition-all duration-300 py-2"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.menu.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              {category.subCategories ? (
                <>
                  <div className="flex justify-center flex-wrap gap-2 mt-4">
                    {category.subCategories.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => handleSubCategoryClick(category.category, sub.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                                    ${activeSubCategories[category.category] === sub.name ? 'bg-restaurant-wood text-white shadow-md' : 'bg-white text-restaurant-wood hover:bg-gray-100'}`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                  {renderItems(category.subCategories.find(sc => sc.name === activeSubCategories[category.category])?.items || [])}
                </>
              ) : (
                renderItems(category.items || [])
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FoodCategories;

