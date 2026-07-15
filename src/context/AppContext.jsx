// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../services/api";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.stringify(storedUser));
//     }
//   }, []);

//   // Login
//   const login = async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       const { token, user } = response.data.data;

//       setToken(token);
//       setUser(user);

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       return response.data;
      
//     } catch (error) {
//       throw error; 
//     }
//   };

//   // Register
//   const register = async (credentials) => {
//     try {
//       const response = await api.post('/auth/register', credentials);
//       const { token, user } = response.data;

//       setToken(token);
//       setUser(user);

//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       return response.data.data;

//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);

//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };

//   return (
//     <AppContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);