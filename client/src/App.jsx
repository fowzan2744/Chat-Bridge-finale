import React, { useState, useEffect } from 'react';
import './assets/styles/App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import Container from './components/Container';
import LandingPage from './components/LandingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentPrompt from './pages/PaymentPrompt';  // <-- Import new page here
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

function App() {
  const { user, loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();
  const [userDetails, setUserDetails] = useState({});
  const location = useLocation();

  const fetchUser = async () => {
    if (isAuthenticated && user?.email) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/user/info/${user.email}`
        );
        setUserDetails(res.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated, user, location.pathname]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} setUserDetails={setUserDetails} />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <LandingPage loginWithRedirect={loginWithRedirect} />
            ) : userDetails?.paymentId ? (
              <Container user={{ ...userDetails, ...user }} />
            ) : (
              <PaymentPrompt user={user} logout={logout} />
            )
          }
        />
        <Route
          path="/payment-success"
          element={
            <PaymentSuccess
              user={user}
              setUserDetails={setUserDetails}
              fetchUser={fetchUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
