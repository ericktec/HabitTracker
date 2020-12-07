import React, { useState } from "react";
import LogInSideImage from "./LogInSideImage.jpeg";
import "./LogIn.css";
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeInput = (e) => {
    const { name , value } = e.target;
    setUserInfo({...userInfo, [name]: value});
  };

  async function submtiHandler(e) {
    e.preventDefault();
    if(userInfo.email){
      try {
        setLoading(true);
        console.log("holaaaaa");
        await resetPassword(userInfo.email);
        setMessage('Revisa tu email para restablecer tu contraseña');
      } catch (error) {
        setMessage("Hubo un error al restablecer tu contraseña");
        setError(error);
      }
      setLoading(false);
    }
    console.log(userInfo);
  }


  return (
    <div className="logInBody">
      <img src={LogInSideImage} alt="LogIn" />
      <div className="formContainer">
        <form className="logInForm" onSubmit={submtiHandler}>
          <label>Correo electronico </label>
          <input name="email"  onChange={onChangeInput} type="text" />
          <label>{message}</label>
          <button disabled={loading} type='submit' className="LogInButton">Reiniciar contraseña</button>
          <br/>
          <Link to="/" className="forgetPassword">Iniciar sesión</Link>
        </form>
        <div>
        </div>
      </div>
    </div>
  );
}
