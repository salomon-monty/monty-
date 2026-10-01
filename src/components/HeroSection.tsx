import React from 'react';
import { HERO_IMAGE } from '../data/mockData';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onSelectCollection?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Hero Banner Wrapper */}
      <div className="hero-mask relative min-h-[580px] lg:min-h-[640px] xl:min-h-[720px] w-full flex items-center justify-center bg-[#0D5BE1] overflow-hidden">
        {/* Background Editorial Photography */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Editorial high fashion photography of a confident modern African model wearing a minimalist vibrant blue tailored outfit"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            src={HERO_IMAGE}
          />
          {/* Vignette & Blue Atmospheric overlays to match original design */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D5BE1]/90 via-[#0D5BE1]/35 to-blue-900/40" />
          <div className="absolute inset-0 bg-[#0D5BE1]/25 mix-blend-multiply" />
        </div>

        {/* Left Vertical Scroll Indicator */}
        <div className="absolute left-6 bottom-8 z-20 hidden md:flex items-center space-x-2 text-white/70 font-mono-tag text-[10px] tracking-widest uppercase select-none">
          <span className="scroll-vertical-text">SCROLL_EXPLORER</span>
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center select-none pt-8">
          {/* Collection Sub-heading Badge */}
          <div className="mb-4 inline-flex items-center gap-2 font-mono-tag text-xs md:text-sm font-semibold tracking-[0.28em] text-white/90">
            <span>[</span>
            <span className="text-sky-300">N</span>OUVELLE_COLLECTION_2026
            <span>]</span>
          </div>

          {/* Massive Hero Typography */}
          <h1 className="hero-title-glitch text-white text-6xl sm:text-7xl md:text-8xl lg:text-[132px] tracking-tight leading-[0.88] my-2 text-center drop-shadow-2xl">
            MODERN<br />AFRICA
          </h1>

          {/* Call to Action and Subtitle container */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between w-full max-w-3xl gap-6 pt-4">
            {/* Action Button */}
            <button
              onClick={onExplore}
              className="bg-white hover:bg-slate-100 text-[#0D5BE1] font-mono-tag text-xs md:text-sm font-bold tracking-widest uppercase py-3.5 px-8 rounded-full shadow-xl shadow-blue-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>VOIR_LA_COLLECTION</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* Descriptive Subtitle */}
            <p className="font-mono-tag text-[10px] md:text-xs text-white/90 tracking-widest uppercase text-center md:text-left max-w-xs leading-relaxed">
              INSPIRÉ PAR LA MODERNITÉ AFRICAINE. CONÇU POUR LA CONFIANCE. FABRIQUÉ AVEC EXCELLENCE.
            </p>
          </div>
        </div>

        {/* Bottom ambient radial gradient shine */}
        <div className="absolute -bottom-24 inset-x-0 h-48 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
