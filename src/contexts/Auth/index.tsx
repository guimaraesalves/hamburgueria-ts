import { createContext, useContext, useState, ReactNode } from "react";
import { IUserDataSignIn, IUserDataSignUp } from "../../types/types";
import { History } from "history";
import api from "../../services/index";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderData {
  userId: string;
  authToken: string;
  SignUp: (userData: IUserDataSignUp, history: History) => void;
  SignIn: (userData: IUserDataSignIn, history: History) => void;
  Logout: (history: History) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("@HamburgueriaKenzie:token") || ""
  );

  const [userId, setUserId] = useState(
    () => localStorage.getItem("@HamburgueriaKenzie:userId") || ""
  );

  const SignUp = (userData: IUserDataSignUp, history: History) => {
    api
      .post("users", userData)
      .then((_) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const SignIn = (userData: IUserDataSignIn, history: History) => {
    api
      .post("login", userData)
      .then((response) => {
        localStorage.setItem(
          "@HamburgueriaKenzie:token",
          response.data.accessToken
        );
        localStorage.setItem(
          "@HamburgueriaKenzie:userId",
          response.data.user.id
        );
        setAuthToken(response.data.accessToken);
        setUserId(response.data.user.id);
        history.push("/home");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const Logout = (history: History) => {
    localStorage.clear();
    setAuthToken("");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, userId, Logout, SignIn, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
