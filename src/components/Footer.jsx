import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--color-gray-light)', 
      color: '#fff', 
      padding: '60px 0', 
      textAlign: 'center',
      marginTop: 'auto' 
    }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '2rem', 
          letterSpacing: '4px', 
          marginBottom: '16px',
          fontFamily: 'var(--font-serif)'
        }}>
          SNE
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '32px' }}>
          See No Evil.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
          <p>09071009969</p>
          <p>reubenluka555@gmail.com</p>
        </div>
        <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#444' }}>
          &copy; {new Date().getFullYear()} SNE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
