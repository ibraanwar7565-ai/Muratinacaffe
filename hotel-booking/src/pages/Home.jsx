import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import FeaturedHotels from '../components/sections/FeaturedHotels';
import LuxuryExperience from '../components/sections/LuxuryExperience';
import Destinations from '../components/sections/Destinations';
import RoomShowcase from '../components/sections/RoomShowcase';
import Reviews from '../components/sections/Reviews';
import Amenities from '../components/sections/Amenities';
import SpecialOffers from '../components/sections/SpecialOffers';
import Booking from '../components/sections/Booking';
import Footer from '../components/sections/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="home" className="relative overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturedHotels />
        <LuxuryExperience />
        <Destinations />
        <RoomShowcase />
        <Reviews />
        <Amenities />
        <SpecialOffers />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
