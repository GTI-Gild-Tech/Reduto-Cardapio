import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurrencyDashboard from './components/CurrencyDashboard';
import FeeCalculator from './components/FeeCalculator';
import SecuritySection from './components/SecuritySection';
import TransactionJourney from './components/TransactionJourney';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <Hero />
      <CurrencyDashboard />
      <FeeCalculator />
      <SecuritySection />
      <TransactionJourney />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;