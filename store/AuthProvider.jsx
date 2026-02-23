import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  isAdmin: false,
  isManager: false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const parseToken = (jwt) => {
    const decoded = jwtDecode(jwt);

    return {
      role: decoded.Role,
      exp: decoded.exp * 1000,
    };
  };

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      const data = parseToken(saved);

      if (Date.now() < data.exp) {
        setToken(saved);
        setRole(data.role);
      } else {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (jwt) => {
    const data = parseToken(jwt);
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setRole(data.role);
    if (data.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }
    if (data.role === "manager") {
      navigate("/manager", { replace: true });
      return;
    }
    if (data.role === "employee") {
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  setToken(null);
  setRole(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
