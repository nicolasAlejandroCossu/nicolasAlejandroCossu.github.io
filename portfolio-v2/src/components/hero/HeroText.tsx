'use client';

import type { CSSProperties } from 'react';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nicolasalejandrocossu' },
  { label: 'Github',   href: 'https://github.com/nicolasAlejandroCossu' },
];

const sections = ['About Me', 'Projects', 'Contact'];

const linkStyle: CSSProperties = {
  fontFamily: "'Colitez', serif",
  fontSize: 'clamp(0.8rem, 1.1vw, 1.05rem)',
  color: 'rgba(255,255,255,0.55)',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 0.2s',
  whiteSpace: 'nowrap',
};

const nameBase: CSSProperties = {
  fontFamily: "'Colitez', serif",
  fontSize: 'clamp(5.5rem, 13vw, 15rem)',
  fontWeight: 'normal',
  lineHeight: 0.9,
};

export default function HeroText() {
  return (
    <div className="absolute inset-0 select-none" style={{ zIndex: 80, pointerEvents: 'none' }}>

      {/* ── Name + title ────────────────────────────────────────────────────── */}
      <div
        data-hero-name-block
        style={{
          position: 'absolute',
          bottom: '15%',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Normal (bone) layer */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '5vw' }}>
          <span style={{ ...nameBase, color: '#e8e0d0', letterSpacing: '0.03em',
            textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 8px 40px rgba(0,0,0,0.35)' }}>
            Nicolás
          </span>
          <span style={{ ...nameBase, color: '#e8e0d0', letterSpacing: '0.05em',
            textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 8px 40px rgba(0,0,0,0.35)' }}>
            Cossu
          </span>
        </div>
        <p style={{
          fontFamily: "'OrangeAvenue', sans-serif",
          fontSize: 'clamp(1.02rem, 1.8vw, 1.92rem)',
          fontWeight: 'normal',
          color: 'rgba(255,255,255,0.82)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: '1em 0 0 0',
        }}>
          Forward Deployment Engineer
        </p>

      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div
        data-hero-nav
        style={{
          position: 'absolute',
          bottom: '2.5%',
          left: '4%',
          right: '4%',
          borderTop: '1px solid rgba(255,255,255,0.18)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.3rem 0',
          pointerEvents: 'auto',
        }}
      >
        {/* Left — socials */}
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Center — scroll indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}>
          <span style={{
            fontFamily: "'Colitez', serif",
            fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
            color: 'rgba(255,255,255,0.40)',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
            style={{ animation: 'scrollBounce 1.6s ease-in-out infinite' }}>
            <path d="M1 1L8 8L15 1" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Right — sections */}
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end' }}>
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(' ', '-')}`}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.35; }
          50%       { transform: translateY(4px); opacity: 0.70; }
        }
      `}</style>
    </div>
  );
}
