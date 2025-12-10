import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductList({ onAddToCart }) {
  return (
    <section className="container" style={{ marginBottom: '80px' }}>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
