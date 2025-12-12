import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { usePaystackPayment } from 'react-paystack';

export default function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, subtotal, shippingFee, onClearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'bank'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // PAYSTACK CONFIG
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: totalAmount * 100, // Paystack expects amount in kobo
    publicKey: 'pk_test_99137c1d67e334dd5260470f89ef5c6371e43a81',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOrderEmail = async (paymentDetails = null) => {
    // Generate a simple Order ID
    const orderId = `SNE-${Math.floor(100000 + Math.random() * 900000)}`;

    // Prepare template params
    const templateParams = {
      order_id: orderId,
      to_name: "Admin",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      payment_method: paymentDetails ? "Debit Card (Paystack)" : "Bank Transfer",
      payment_ref: paymentDetails ? paymentDetails.reference : "Pending Transfer",
      message: `
        Order ID: ${orderId}
        
        Order Details:
        ${cartItems.map(item => `- ${item.name} (${item.selectedSize}${item.selectedColor ? `, ${item.selectedColor}` : ''}): ₦${item.price.toLocaleString()}`).join('\n')}
        
        Subtotal: ₦${subtotal ? subtotal.toLocaleString() : '0'}
        Shipping Fee: ₦${shippingFee ? shippingFee.toLocaleString() : '5,000'}
        Total Amount: ₦${totalAmount.toLocaleString()}
        
        Shipping Details:
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}
      `,
      reply_to: formData.email,
    };

    try {
      // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS
      const SERVICE_ID = 'service_c21muzw';
      const TEMPLATE_ID = 'template_maxubpf';
      const PUBLIC_KEY = 'mJx2XB84joa3oObyQ';

      if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        console.log('EmailJS Keys are placeholders. Simulating success.', templateParams);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      }
      
      setIsSuccess(true);
      onClearCart();
    } catch (err) {
      console.error('EmailJS Error:', err);
      // Show the actual error message from EmailJS if available
      const errorMessage = err.text || err.message || 'Unknown error occurred';
      setError(`Failed to send: ${errorMessage}. Please check your keys and permissions.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSuccess = (reference) => {
    sendOrderEmail(reference);
  };

  const onClosePaystack = () => {
    setIsSubmitting(false);
    console.log('Payment closed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (paymentMethod === 'card') {
      initializePayment(onSuccess, onClosePaystack);
    } else {
      // Bank Transfer flow
      await sendOrderEmail(null);
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
          
          {paymentMethod === 'bank' && (
            <div style={{ backgroundColor: '#222', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
              <h4 style={{ color: '#d4af37', marginBottom: '8px' }}>Payment Instructions</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Please transfer <strong>₦{totalAmount.toLocaleString()}</strong> to:</p>
              <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Bank: <strong>GTBank</strong></p>
              <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Account Number: <strong>1234567890</strong></p>
              <p style={{ fontSize: '0.9rem' }}>Account Name: <strong>SNE Clothing</strong></p>
              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '12px' }}>
                Please send proof of payment to reubenluka555@gmail.com or WhatsApp 09071009969.
              </p>
            </div>
          )}

          {paymentMethod === 'card' && (
             <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '24px' }}>
               Your payment was successful. A confirmation email has been sent.
             </p>
          )}

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
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px', fontStyle: 'italic' }}>* Shipping takes 1 week</p>
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

          <div style={{ textAlign: 'left', marginTop: '8px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Payment Method:</label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Pay with Card
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bank" 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                Bank Transfer
              </label>
            </div>
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary" 
            style={{ width: '100%', borderColor: '#fff', marginTop: '8px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Processing...' : (paymentMethod === 'card' ? 'Pay Now' : 'Confirm Order')}
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
