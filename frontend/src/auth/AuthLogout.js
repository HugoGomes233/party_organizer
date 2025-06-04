import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const useAuthLogout = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logout;
};