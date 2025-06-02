import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Logo from "../../images/logo.png";
import { toast } from "react-toastify";
import {
  LoginFailure,
  LoginSuccess,
  PasswordChangeError,
  PasswordChangeSuccess,
  RegistrationError,
  RegistrationSuccess,
} from "../../toast/FeedbackMessages";
import { auth } from "../../firebase/firebase.js";
import useScrollToTopOnKeyboardHide from "../../hooks/useScrollToTopOnKeyboardHide.js";
import styles from "./Login.module.css";

const PasswordField = ({ password, setPassword, showPassword, setShowPassword }) => (
  <div className={styles.passwordInputWrapper}>
    <input
      type={showPassword ? "text" : "password"}
      className={styles.formInput}
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button
      type="button"
      className={styles.showPasswordBtn}
      onClick={() => setShowPassword((prev) => !prev)}
      tabIndex={-1}
    >
      {showPassword ? "Ocultar" : "Mostrar"}
    </button>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isToRegister, setIsToRegister] = useState(false);
  const [isToChangePassword, setIsToChangePassword] = useState(false);

  const title = isToRegister
    ? "Registo"
    : isToChangePassword
    ? "Recuperar Senha"
    : "Login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
    } catch (err) {
      toast.error(LoginFailure);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Failed to register");
      setIsToRegister(false);
      toast.success(RegistrationSuccess);
    } catch (err) {
      toast.error(RegistrationError);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsToChangePassword(false);
      toast.success(PasswordChangeSuccess);
    } catch (error) {
      toast.error(PasswordChangeError);
    }
  };

  const handleSubmit = isToRegister
    ? handleSignUp
    : isToChangePassword
    ? handleChangePassword
    : handleLogin;

  const handleIsToRegister = () => {
    setIsToChangePassword(false);
    setIsToRegister((prev) => !prev);
  };

  const handleIsToChangePassword = () => {
    setIsToRegister(false);
    setIsToChangePassword((prev) => !prev);
  };

  const spanOnClickAction = isToChangePassword
                    ? handleIsToChangePassword
                    : handleIsToRegister

  const spanLabel = isToRegister
                  ? "Já sou utilizador"
                  : isToChangePassword
                  ? "Fazer Login"
                  : "Criar utilizador"

  useScrollToTopOnKeyboardHide();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <img
            className={styles.loginLogo}
            src={Logo}
            alt="Cabra Sueca Logo"
          />
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.formInput}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {!isToChangePassword && (
              <PasswordField
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}

            <div className={styles.passwordRegisterContainer}>
              <span
                className={styles.loginRegisterLabel}
                onClick={spanOnClickAction}
              >
              {spanLabel}
              </span>

              {!isToRegister && !isToChangePassword && (
                <span
                  className={styles.loginRegisterLabel}
                  onClick={handleIsToChangePassword}
                >
                  Recuperar senha
                </span>
              )}
            </div>

            <button type="submit">Submeter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
