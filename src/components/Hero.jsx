import React from 'react';
import heroLogo from '../assets/hero_logo.png';

export default function Hero() {
  return (
    <section style={{ 
      textAlign: 'center', 
      padding: '40px 0', 
      marginBottom: '40px'
    }}>
      <img 
        src={heroLogo} 
        alt="Allure" 
        className="hero-image"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          display: 'block',
          margin: '0 auto'
        }} 
      />
    </section>
  );
}
