import React from 'react';
import Header from '@/components/layout/Header';
import MarketOverview from '@/components/home/MarketOverview';
import LatestNews from '@/components/home/LatestNews';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left side - Market Overview (80% on large screens) */}
          <div className="lg:col-span-3">
            <MarketOverview />
          </div>
          
          {/* Right side - Latest News (20% on large screens) */}
          <div className="lg:col-span-1">
            <LatestNews />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
