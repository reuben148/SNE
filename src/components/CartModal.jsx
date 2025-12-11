import React from 'react';

export default function CartModal({ isOpen, onClose, cartItems, onRemove, onCheckout }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          cursor: 'pointer'
        }}
      />
      
      {/* Drawer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#111',
        color: '#fff',
        height: '100%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Your Bag ({cartItems.length})</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', background: 'none', color: '#fff' }}>&times;</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>Your bag is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '4px' }}>
                    Size: {item.selectedSize}
                    {item.selectedColor && ` | Color: ${item.selectedColor}`}
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>₦{item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => onRemove(index)}
                  style={{ color: '#666', fontSize: '0.9rem', alignSelf: 'flex-start', background: 'none' }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: '24px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.1rem' }}>
            <span>Total</span>
            <span>₦{cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}</span>
          </div>
          <button 
            className="btn-primary" 
            style={{ width: '100%', borderColor: '#fff' }}
            onClick={onCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
