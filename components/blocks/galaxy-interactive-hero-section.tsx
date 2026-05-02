"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function HeroSplineBackground({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 65% 35%, rgba(30,64,175,0.45) 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(6,182,212,0.25) 0%, transparent 50%), #000',
      }} />
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100dvh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Spline
        style={{ width: '100%', height: '100dvh', pointerEvents: 'auto' }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100dvh',
        background: `
          linear-gradient(to right, rgba(0,0,0,0.8), transparent 30%, transparent 70%, rgba(0,0,0,0.8)),
          linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9))
        `,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function ScreenshotSection({ screenshotRef, isMobile }: {
  screenshotRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}) {
  return (
    <section className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 md:mt-12">
      <div
        ref={screenshotRef}
        className="rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-700/40 overflow-hidden mx-auto"
        style={{ width: isMobile ? '100%' : undefined, maxWidth: isMobile ? '100%' : '85%' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
        >
          <source src="/videomedxai.mp4" type="video/mp4" />
          <source src="/videomedxai.mov" type="video/quicktime" />
        </video>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-white w-full px-5 sm:px-6 pt-24 sm:pt-28 md:pt-36 pb-10 max-w-3xl">
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-5 sm:mb-6 text-xs sm:text-sm text-blue-300 font-medium backdrop-blur-sm">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
        Inteligência Artificial Médica
      </div>

      <h1 className="text-[2.2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 tracking-tight">
        O futuro da{' '}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          medicina
        </span>
        <br />começa aqui.
      </h1>

      <p className="text-sm sm:text-base md:text-lg mb-7 sm:mb-8 text-white/70 max-w-md sm:max-w-xl leading-relaxed">
        O MedX AI potencializa seu trabalho clínico com IA — desde prontuários inteligentes até
        diagnósticos assistidos, tudo em uma plataforma segura e integrada.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto w-full sm:w-auto">
        <button className="bg-blue-600 active:bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3.5 sm:py-3 px-7 rounded-full transition duration-200 w-full sm:w-auto text-sm sm:text-base shadow-lg shadow-blue-500/30 min-h-[48px]">
          Começar Grátis
        </button>
        <button className="bg-white/5 active:bg-white/10 border border-gray-600 hover:border-gray-400 text-gray-200 hover:text-white font-medium py-3.5 sm:py-3 px-7 rounded-full transition duration-200 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base min-h-[48px]">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Ver Demo
        </button>
      </div>
    </div>
  );
}

const LOGO_SVG = (
  <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.15" />
    <path d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-4 4h3v7h-1v2h4v-2h-1v-7h3v2h1v-4H11v4h1v-2z" fill="currentColor" />
  </svg>
);

function Navbar() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({ features: false, solutions: false, resources: false });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    if (isMobileMenuOpen) setMobileDropdowns({ features: false, solutions: false, resources: false });
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) =>
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({ features: false, solutions: false, resources: false });
  };

  const navLinkClass = (itemName: string, extra = '') => {
    const active = hoveredNavItem === itemName;
    const dimmed = hoveredNavItem !== null && !active;
    return `text-sm transition duration-150 ${active ? 'text-white' : dimmed ? 'text-gray-500' : 'text-gray-300'} ${extra}`;
  };

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) closeMobileMenu(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const dropdownMenu = (items: string[]) => (
    <div className="absolute left-0 mt-2 w-52 bg-black/70 rounded-xl shadow-xl py-2 border border-gray-700/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 backdrop-blur-md">
      {items.map(item => (
        <a key={item} href="#" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/30 transition duration-150">
          {item}
        </a>
      ))}
    </div>
  );

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        backgroundColor: 'rgba(13,13,24,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '0 0 14px 14px',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: logo + desktop nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-blue-400 w-7 h-7 sm:w-8 sm:h-8">{LOGO_SVG}</div>
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">MedX AI</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {[
              { name: 'features', label: 'Funcionalidades', items: ['Prontuário Inteligente', 'Diagnóstico por IA', 'Prescrição Automática', 'Análise de Exames'] },
              { name: 'solutions', label: 'Soluções', items: ['Clínicas', 'Hospitais', 'Médicos Autônomos'] },
              { name: 'resources', label: 'Recursos', items: ['Blog', 'Documentação', 'Suporte'] },
            ].map(({ name, label, items }) => (
              <div key={name} className="relative group"
                onMouseEnter={() => setHoveredNavItem(name)}
                onMouseLeave={() => setHoveredNavItem(null)}>
                <a href="#" className={navLinkClass(name, 'flex items-center gap-1')}>
                  {label}
                  <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {dropdownMenu(items)}
              </div>
            ))}
            <a href="#"
              className={navLinkClass('pricing')}
              onMouseEnter={() => setHoveredNavItem('pricing')}
              onMouseLeave={() => setHoveredNavItem(null)}>
              Preços
            </a>
          </div>
        </div>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="#" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">Falar com Vendas</a>
          <a href="#" className="hidden sm:block text-gray-300 hover:text-white text-sm transition-colors">Entrar</a>
          <a href="#" className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 sm:px-5 rounded-full text-sm transition duration-200 shadow-md shadow-blue-500/20 min-h-[40px] flex items-center">
            Começar Grátis
          </a>
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-700/20 ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="px-4 py-5 flex flex-col gap-1">
          {[
            { key: 'features' as const, label: 'Funcionalidades', items: ['Prontuário Inteligente', 'Diagnóstico por IA', 'Prescrição Automática'] },
            { key: 'solutions' as const, label: 'Soluções', items: ['Clínicas', 'Hospitais', 'Médicos Autônomos'] },
            { key: 'resources' as const, label: 'Recursos', items: ['Blog', 'Documentação', 'Suporte'] },
          ].map(({ key, label, items }) => (
            <div key={key}>
              <button
                className="text-gray-300 flex items-center justify-between w-full text-left text-sm py-3 px-1 min-h-[48px]"
                onClick={() => toggleMobileDropdown(key)}
              >
                {label}
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns[key] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdowns[key] ? 'max-h-[300px]' : 'max-h-0'}`}>
                <div className="pl-4 pb-2 flex flex-col gap-0.5">
                  {items.map(item => (
                    <a key={item} href="#" className="text-gray-400 text-sm py-2.5 block min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-700/30 mt-2 pt-4 flex flex-col gap-3">
            <a href="#" className="text-gray-300 text-sm py-3 min-h-[48px] flex items-center" onClick={closeMobileMenu}>Preços</a>
            <a href="#" className="text-gray-300 text-sm py-3 min-h-[48px] flex items-center" onClick={closeMobileMenu}>Falar com Vendas</a>
            <a href="#" className="text-gray-300 text-sm py-3 min-h-[48px] flex items-center" onClick={closeMobileMenu}>Entrar</a>
            <a href="#" className="bg-blue-600 text-white font-semibold text-sm py-3.5 px-6 rounded-full text-center mt-1 min-h-[48px] flex items-center justify-center" onClick={closeMobileMenu}>
              Começar Grátis
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function StatsSection() {
  const stats = [
    { value: '10k+', label: 'Médicos ativos' },
    { value: '98%', label: 'Satisfação' },
    { value: '3x', label: 'Mais rápido' },
    { value: '100%', label: 'LGPD' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-r from-blue-950/40 via-black to-blue-950/40 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
      title: 'Prontuário Inteligente',
      description: 'Documentação clínica automatizada com IA. Capture consultas por voz e gere registros completos em segundos.',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
      title: 'Diagnóstico Assistido',
      description: 'Sugestões diagnósticas baseadas em evidências clínicas com modelos de IA treinados.',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
      title: 'Análise de Exames',
      description: 'Interpretação automática de exames laboratoriais e de imagem, com alertas críticos.',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      title: 'Segurança & LGPD',
      description: 'Dados criptografados end-to-end, em conformidade com a LGPD e padrões internacionais.',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      title: 'Agenda Integrada',
      description: 'Gestão de consultas com confirmação automática, lembretes por WhatsApp e análise de no-shows.',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      title: 'Analytics Clínico',
      description: 'Dashboards com métricas da prática clínica, padrões de diagnóstico e indicadores populacionais.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Tudo que você precisa,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              em um só lugar
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Ferramentas de IA projetadas para médicos — aumentando sua eficiência sem substituir seu julgamento clínico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <div key={i} className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500/50 active:border-blue-500/50 transition-all duration-300 hover:bg-gray-900/80">
              <div className="text-blue-400 mb-4 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Pronto para transformar sua{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            prática clínica?
          </span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
          Junte-se a milhares de médicos que já estão usando IA para atender melhor e com mais eficiência.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a href="#" className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-7 rounded-full transition duration-200 shadow-lg shadow-blue-500/30 text-sm sm:text-base min-h-[52px] flex items-center justify-center">
            Começar Grátis — sem cartão
          </a>
          <a href="#" className="border border-gray-700 hover:border-gray-500 active:border-gray-400 text-gray-300 hover:text-white font-medium py-3.5 px-7 rounded-full transition duration-200 text-sm sm:text-base min-h-[52px] flex items-center justify-center">
            Agendar uma demo
          </a>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mt-5 sm:mt-6">14 dias grátis · Sem compromisso · Cancele quando quiser</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="bg-black border-t border-gray-800 py-8 sm:py-12"
      style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-2">
            <div className="text-blue-400 w-6 h-6">{LOGO_SVG}</div>
            <span className="text-white font-bold">MedX AI</span>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm order-3 md:order-2">© 2026 MedX AI. Todos os direitos reservados.</p>
          <div className="flex gap-5 sm:gap-6 text-xs sm:text-sm text-gray-500 order-2 md:order-3">
            <a href="#" className="hover:text-gray-300 transition-colors min-h-[44px] flex items-center">Privacidade</a>
            <a href="#" className="hover:text-gray-300 transition-colors min-h-[44px] flex items-center">Termos</a>
            <a href="#" className="hover:text-gray-300 transition-colors min-h-[44px] flex items-center">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.pageYOffset;

        if (screenshotRef.current && !isMobile) {
          screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.4}px)`;
        }

        if (heroContentRef.current) {
          const maxScroll = isMobile ? 250 : 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          heroContentRef.current.style.opacity = opacity.toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="relative min-h-[100dvh]">
        <div className="absolute inset-0 z-0">
          {isMobile ? (
            <HeroSplineBackground isMobile={true} />
          ) : (
            <Suspense fallback={<div className="w-full h-full bg-black" />}>
              <HeroSplineBackground isMobile={false} />
            </Suspense>
          )}
        </div>

        <div
          ref={heroContentRef}
          className="absolute inset-0 z-10 flex items-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full max-w-7xl mx-auto" style={{ pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }}>
              <HeroContent />
            </div>
          </div>
        </div>
      </div>

      {/* Below fold */}
      <div className="bg-black relative z-10 -mt-[8vh] sm:-mt-[10vh]">
        <ScreenshotSection screenshotRef={screenshotRef} isMobile={isMobile} />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};
