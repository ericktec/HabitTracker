import React, { useState } from "react";
import LogInSideImage from "./LogInSideImage.jpeg";
import "./LogIn.css";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function LogIn() {
  
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name , value } = e.target;
    setUserInfo({...userInfo, [name]: value});
  };

  async function submtiHandler(e) {
    e.preventDefault();
    if(userInfo.email && userInfo.password){
      try {
        setLoading(true);
        await login(userInfo.email, userInfo.password);
        return history.push('/tracking');
      } catch (error) {
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
          <p>{error}</p>
          <label>Correo electronico </label>
          <input name="email"  onChange={onChangeInput} type="text" />
          <label>Contraseña </label>
          <input name="password" onChange={onChangeInput} type="password"/>
          <button disabled={loading} type='submit' className="LogInButton">Iniciar Sesión</button>
          <Link to="/signUp"><button className="SignUpButton">Registrarse</button></Link>
          <br/>
          <Link to="/forgot-password" className="forgetPassword">¿Olvidaste tu contraseña?</Link>
        </form>
        <div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
