import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user) {
            // Save the user info to localStorage (optional)
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to the chat page
            navigate("/chat");
        }
    }, [isAuthenticated, user, navigate]);

    if (isLoading) return <div>Loading...</div>;

    return !isAuthenticated && (
        <button onClick={() => loginWithRedirect()} className="auth-button">
            Log In
        </button>
    );
};

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return isAuthenticated && (
        <button
            onClick={() => {
                localStorage.removeItem("user");
                logout({ logoutParams: { returnTo: window.location.origin } });
            }}
            className="auth-button"
        >
            Log Out
        </button>
    );
};

export { LoginButton, LogoutButton };
