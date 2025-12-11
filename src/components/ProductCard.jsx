import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors.length > 0 ? product.colors[0] : null);

  const handleAdd = () => {
    onAddToCart({ ...product, selectedSize, selectedColor });
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        marginBottom: '16px',
        aspectRatio: '3/4'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{product.name}</h3>
        <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
          ₦{product.price.toLocaleString()}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div className="card-options">
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid var(--color-gray-medium)',
              borderRadius: '0',
              fontFamily: 'var(--font-sans)',
              flex: 1,
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)'
            }}
          >
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          {product.colors.length > 0 && (
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid var(--color-gray-medium)',
                borderRadius: '0',
                fontFamily: 'var(--font-sans)',
                flex: 1,
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)'
              }}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          )}
        </div>
        
        <button 
          className="btn-primary"
          onClick={handleAdd}
          style={{ width: '100%' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
