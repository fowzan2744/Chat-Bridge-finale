import React from 'react', { useState, useEffect } from 'react';;

const PaymentPrompt = ({ user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);  
  }, []);
  const stripeLink = `https://buy.stripe.com/test_fZubJ3co391uelB66Q9R602?prefilled_email=${user.email}&client_reference_id=${user.email}`;
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>
        Loading...
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Complete Your Payment to Continue</h2>
      <p>Welcome, {user.name || user.email}! To access full features, please complete the payment.</p>

      <button
        onClick={() => window.location.href = stripeLink}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        Proceed to Payment
      </button>

      <br />

    </div>
  );
};

export default PaymentPrompt;
