import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext<any>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem("token") || '{}')
  : undefined);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = (localStorage.getItem('token')? JSON.parse(localStorage.getItem("token") || '{}')
    : undefined);
    const storedUser = JSON.parse(localStorage.getItem('user')|| '{}');
    
    if (!token) {
        setUser(null);
        setToken(null);
    }else{
        setToken(token);
        setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, { email, password })
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', JSON.stringify(response.data.token));
    setUser(response.data.user);
    setToken(response.data.token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token ,user,isAuthenticated: Boolean(token), loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
