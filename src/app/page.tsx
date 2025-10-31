'use client';
import Hero from './components/Hero';
import FilterBar, { type Filters } from './components/FilterBar';
import AnimalGrid from './components/AnimalGrid';
import { useAnimals } from '../hooks/useAnimals';
import { useEffect, useState } from 'react';
import AboutPage from './components/About';
import { CASI_NEGRO } from '../Constants/colors';
import AnimalList from './components/AnimalList';
import HomeSections from './components/HomeSections';
import DonationSection from './components/DonationSection';


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <Hero />



      <section id="about" className="space-y-4">
        <AboutPage />
      </section>

      <section id="home-sections" className="space-y-4">
        <HomeSections />
      </section>

      <section id="donations" className="space-y-4">
        <DonationSection />
      </section>
    </main>
  );
}