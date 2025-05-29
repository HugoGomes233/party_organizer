import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../images/logo.png";
import { toast } from "react-toastify";
import { LoginFailure, LoginSuccess } from "../../toast/FeedbackMessages.js";
import { auth } from "../../firebase/firebase.js";
import useScrollToTopOnKeyboardHide from "../../hooks/useScrollToTopOnKeyboardHide.js";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(LoginSuccess);
    } catch (err) {
      toast.error(LoginFailure);
    }
  };

  useScrollToTopOnKeyboardHide();
  return (
    <div className="page-container">
      <div className="login-container">
        <div className="logo-container">
          <img className="login-logo" src={Logo} alt="Cabra Sueca Logo"></img>
        </div>
        <div>
          <form className="form" onSubmit={handleLogin}>
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
