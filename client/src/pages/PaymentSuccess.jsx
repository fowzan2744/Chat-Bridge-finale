import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/PaymentSuccess.css'; // 👈 import the CSS

const PaymentSuccess = ({ user, setUserDetails, fetchUser }) => {
  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get('session_id');
  const navigate = useNavigate();

  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'

  useEffect(() => {
    const saveAndFetch = async () => {
      if (sessionId && user?.email) {
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/payment/save-payment`, {
            sessionId,
            email: user.email,
          });

          await fetchUser(); // Update user details
          setStatus('success');
        } catch (err) {
          console.error('Failed to save payment:', err.response?.data || err.message);
          setStatus('error');
        }
      } else {
        navigate('/');
      }
    };

    saveAndFetch();
  }, [sessionId, user, fetchUser, navigate]);

  return (
    <div className="payment-container">
      {status === 'verifying' && (
        <div className="payment-box">
          <div className="loader"></div>
          <h2>Verifying your payment...</h2>
        </div>
      )}
      {status === 'success' && (
        <div className="payment-box success">
          <div className="icon success-icon">&#10004;</div>
          <h2>Payment Successful!</h2>
          <p>Your payment has been verified.</p>
          <button onClick={() => navigate('/')}>Go to Chat Page</button>
        </div>
      )}
      {status === 'error' && (
        <div className="payment-box error">
          <div className="icon error-icon">&#10006;</div>
          <h2>Payment Failed</h2>
          <p>Something went wrong while processing your payment.</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
