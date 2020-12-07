import React, { useState } from "react";
import SignUpImage from "./SignUp.jpeg";
import "./SignUp.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function UpdateProfile() {
  
  const { updatePassword, updateEmail, currentUser } = useAuth();
  const history = useHistory();
  const [matchPasswords, setMatchPasswords] = useState(true);
  
  const [signUpInfo, setSignUpInfo] = useState({
    email: currentUser ? currentUser.email : '',
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  function signUpSubmit(e) {
    e.preventDefault();
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      return setMatchPasswords(false);
    } else {
      const promises = []
      if(currentUser.email !== signUpInfo.email){
        promises.push(updateEmail(signUpInfo.email));
        
      }
      if(signUpInfo.password){
        promises.push(updatePassword(signUpInfo.password));
      }
      Promise.all(promises).then(() => {
        return history.push('/tracking');
      })
      .catch(e => setError('Algo salio mal al actualizar tu perfil intentalo de nuevo'))
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
            defaultValue={currentUser.email}
          />
          <label>Contraseña </label>
          <input
            type="password"
            name="password"
            onChange={onChangeInput}
            placeholder="Dejalo en blanco para mantener la misma contraseña"
          />
          <input
            className={
              matchPasswords ? "ConfirmPassword" : "ConfirmPasswordWrong"
            }
            name="confirmPassword"
            onChange={onChangeInput}
            type="password"
            placeholder="Dejalo en blanco para mantener la misma contraseña"
          />
          <button disabled={loading} type="submit" className="SignUpButton">
            Actualizar perfil
          </button>
          <Link to="/tracking">
            <button className="LogInButton">Regresar a tu calendario</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
