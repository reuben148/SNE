import React from 'react';

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 0',

    }}>
      <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '1px', fontWeight: 600 }}>
        SNE
      </div>
      <button 
        onClick={onOpenCart}
        style={{ 
          background: 'none', 
          fontSize: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}
      >
        CART ({cartCount})
      </button>
    </nav>
  );
}
