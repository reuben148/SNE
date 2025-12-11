import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, onClearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Prepare template params
    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: `
        Order Details:
        ${cartItems.map(item => `- ${item.name} (${item.selectedSize}${item.selectedColor ? `, ${item.selectedColor}` : ''}): ₦${item.price.toLocaleString()}`).join('\n')}
        
        Total Amount: ₦${totalAmount.toLocaleString()}
      `,
      reply_to: formData.email,
    };

    try {
      // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS
      const SERVICE_ID = 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

      // For now, we simulate success if keys are placeholders
      if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        console.log('EmailJS Keys are placeholders. Simulating success.', templateParams);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      }

      setIsSuccess(true);
      onClearCart();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          <h2 style={{ color: '#d4af37', marginBottom: '16px' }}>Order Confirmed!</h2>
          <p style={{ marginBottom: '24px' }}>
            Thank you for your purchase, {formData.name}.<br/>
            We have received your order details.
          </p>
          <div style={{ backgroundColor: '#222', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
            <h4 style={{ color: '#d4af37', marginBottom: '8px' }}>Payment Instructions</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Please transfer <strong>₦{totalAmount.toLocaleString()}</strong> to:</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Bank: <strong>GTBank</strong></p>
            <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Account Number: <strong>1234567890</strong></p>
            <p style={{ fontSize: '0.9rem' }}>Account Name: <strong>SNE Clothing</strong></p>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '24px' }}>
            Please send proof of payment to reubenluka555@gmail.com or WhatsApp 09071009969.
          </p>
          <button onClick={onClose} className="btn-primary" style={{ width: '100%', borderColor: '#fff' }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Checkout</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', background: 'none', color: '#fff' }}>&times;</button>
        </div>

        <div style={{ marginBottom: '24px', textAlign: 'left', backgroundColor: '#222', padding: '12px', borderRadius: '4px' }}>
          <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Total to Pay:</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d4af37' }}>₦{totalAmount.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            required
            value={formData.address}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          />

          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary" 
            style={{ width: '100%', borderColor: '#fff', marginTop: '8px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1100,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
};

const modalContentStyle = {
  backgroundColor: '#111',
  color: '#fff',
  width: '100%',
  maxWidth: '500px',
  padding: '32px',
  borderRadius: '0',
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  textAlign: 'center',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const inputStyle = {
  padding: '12px',
  backgroundColor: '#222',
  border: '1px solid #333',
  color: '#fff',
  fontSize: '1rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  width: '100%'
};
