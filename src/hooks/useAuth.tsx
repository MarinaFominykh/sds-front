import {
  createContext,
  useContext,
  useMemo,
  useState,
  FC,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { IUser } from "@src/types/IUser";
import { IResponse } from "@src/types/IResponse";

type Response = {
  data: IResponse;
};
interface Context {
  login: (data: Response) => void;
  logout: () => void;
  code: string | null;
  user: IUser | null;
  error: string | null;
}
interface Props {
  children: ReactNode;
}
const AuthContext = createContext<Context | null>(null);
//const AuthContext = createContext();

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [code, setCode] = useLocalStorage("code", null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (dt: Response) => {
    if (!dt.data.error) {
      setError("");
      setUser(dt.data?.data?.[0]);
      setCode(dt.data.user_sess_code);
      navigate("/");
    } else {
      setError(dt.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      code,
      error,
      login,
      logout,
    }),
    [user, code, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
