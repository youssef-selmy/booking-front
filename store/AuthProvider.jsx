import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { domain } from "../globals";

const AuthContext = createContext({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  isAdmin: false,
  isManager: false,
  hasActiveSubscription: true,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(true);
  const navigate = useNavigate();

  const parseToken = (jwt) => {
    const decoded = jwtDecode(jwt);
    const parsedRole =
      decoded.Role === "front_office" ? "front desk" : decoded.Role;

    return {
      role: parsedRole,
      exp: decoded.exp * 1000,
      hotel: decoded.hotel,
    };
  };

  const fetchSubscriptionState = async (jwt, hotelId) => {
    if (!hotelId) return false;
    const response = await axios.get(`${domain}/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return !!response.data?.data?.isActiveSubscription;
  };

  useEffect(() => {
    const restoreSession = async () => {
      const saved = localStorage.getItem("token");
      if (saved) {
        try {
          const data = parseToken(saved);
          if (Date.now() < data.exp) {
            const isAdmin = data.role === "admin";
            setToken(saved);
            setRole(data.role);
            if (isAdmin) {
              setHasActiveSubscription(true);
            } else {
              const isActive = await fetchSubscriptionState(saved, data.hotel);
              setHasActiveSubscription(isActive);
            }
          } else {
            localStorage.removeItem("token");
          }
        } catch {
          localStorage.removeItem("token");
          setToken(null);
          setRole(null);
          setHasActiveSubscription(true);
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (jwt) => {
    try {
      const data = parseToken(jwt);
      localStorage.setItem("token", jwt);
      setToken(jwt);
      setRole(data.role);

      if (data.role === "admin") {
        setHasActiveSubscription(true);
        navigate("/admin", { replace: true });
        return { ok: true };
      }

      const isActive = await fetchSubscriptionState(jwt, data.hotel);
      setHasActiveSubscription(isActive);

      if (!isActive) {
        navigate("/subscription", { replace: true });
        return { ok: false, inactiveSubscription: true };
      }

      if (data.role === "manager") {
        navigate("/manager", { replace: true });
        return { ok: true };
      }
      if (data.role === "front desk") {
        navigate("/front-desk", { replace: true });
        return { ok: true };
      }

      logout();
      return { ok: false };
    } catch {
      logout();
      return { ok: false, error: "Login failed. Please try again." };
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  setToken(null);
  setRole(null);
  setHasActiveSubscription(true);
  navigate("/auth/login", { replace: true });
};

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: !!token && role === "admin",
        isManager: !!token && role === "manager",
        hasActiveSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
