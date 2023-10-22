import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();
const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
    token: "",
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("auth"));
    if (userData) {
      setAuth({
        ...auth,
        isAuth: true,
        user: userData.user,
        token: userData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
