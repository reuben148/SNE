import React from 'react';

export default function CartModal({ isOpen, onClose, cartItems, onRemove, onCheckout, subtotal, shippingFee, totalAmount }) {
  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Size: {item.selectedSize}</p>
                    {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    <p>₦{item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => onRemove(index)} className="remove-btn">Remove</button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-summary" style={{ marginBottom: '16px', borderTop: '1px solid #333', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>
                  <span>Subtotal:</span>
                  <span>₦{subtotal ? subtotal.toLocaleString() : '0'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>
                  <span>Shipping:</span>
                  <span>₦{shippingFee ? shippingFee.toLocaleString() : '0'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                  <span>Total:</span>
                  <span>₦{totalAmount ? totalAmount.toLocaleString() : '0'}</span>
                </div>
              </div>
              <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
