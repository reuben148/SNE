import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductList({ onAddToCart }) {
  return (
    <section className="container" style={{ marginBottom: '80px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '40px' 
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
