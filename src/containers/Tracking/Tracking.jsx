import React, { useState } from 'react';
import Calendar from '../../components/Calendar';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

function Tracking()
{

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');


  async function handleLogOut(){
    try {
      await logout();
      return history.push('/');
    } catch (error) {
      setError('Failed to log out');
    }
  }

  return(
    <>
    <h1>Welcome to your calendar {currentUser && currentUser.email}</h1>
    <Link to="/updateProfile"><button>Actualizar perfil</button></Link>
    <Calendar />
    <button onClick={handleLogOut}>Cerrar sesión</button>
    </>
  )
}

export default Tracking;