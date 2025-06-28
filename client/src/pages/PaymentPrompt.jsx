import React from 'react';

const PaymentPrompt = ({ user, logout }) => {
  const stripeLink = `https://buy.stripe.com/test_fZubJ3co391uelB66Q9R602?prefilled_email=${user.email}&client_reference_id=${user.email}`;

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

      <button
        onClick={() => logout({ returnTo: import.meta.env.VITE_APP_BASE_URL })}
        style={{
          padding: '8px 16px',
          fontSize: '0.9rem',
          backgroundColor: '#ccc',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default PaymentPrompt;
