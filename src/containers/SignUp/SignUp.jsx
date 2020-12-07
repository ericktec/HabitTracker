import React, { useState } from "react";
import SignUpImage from "./SignUp.jpeg";
import "./SignUp.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = useAuth();
  const history = useHistory();
  const [matchPasswords, setMatchPasswords] = useState(true);

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  async function signUpSubmit(e) {
    e.preventDefault();
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      setMatchPasswords(false);
    } else if (!signUpInfo.email) {
      return;
    } else {
      try {
        setError('');
        setLoading(true)
        await signup(signUpInfo.email, signUpInfo.password);
        
        return history.push('/tracking');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  return (
    <div className="logInBody">
      <img src={SignUpImage} alt="LogIn" />
      <div className="formContainer">
        <form className="logInForm" onSubmit={signUpSubmit}>
          <label>Correo electronico </label>
          <input
            type="text"
            name="email"
            onChange={onChangeInput}
            placeholder="example@mail.com"
          />
          <label>Contraseña </label>
          <input
            type="password"
            name="password"
            onChange={onChangeInput}
            placeholder="....."
          />
          <input
            className={
              matchPasswords ? "ConfirmPassword" : "ConfirmPasswordWrong"
            }
            name="confirmPassword"
            onChange={onChangeInput}
            type="password"
            placeholder="Confirma contraseña"
          />
          <button type="submit" className="SignUpButton">
            Registrarse
          </button>
          <Link to="/">
            <button disabled={loading} className="LogInButton">Iniciar Sesión</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
