import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const TokenChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const expiration = localStorage.getItem("tokenExpiration");

        // Public routes that don't require authentication
        const publicRoutes = ["/login", "/register"];

        // If on a public route, skip auth check
        if (publicRoutes.includes(location.pathname)) {
          setIsChecking(false);
          return;
        }

        // For protected routes:
        if (!token) {
          navigate("/login");
          return;
        }

        // Check token expiration
        if (expiration && new Date(expiration) < new Date()) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          toast.info("Session expired. Please login again.");
          navigate("/login", { state: { from: location.pathname } });
          return;
        }

        // Optional: Verify token with backend
        const isValid = await verifyTokenWithBackend(token);
        if (!isValid) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    const verifyTokenWithBackend = async (token) => {
      try {
        const response = await fetch(
          "https://shop-hub-server-90zc.onrender.com/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.ok;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    checkAuthStatus();

    // Set up periodic checks
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
};

export default TokenChecker;
