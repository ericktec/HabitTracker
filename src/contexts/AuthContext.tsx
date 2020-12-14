import React, { useContext, useState, useEffect, ReactNode} from "react"
import { auth } from "../firebase"
import firebase from 'firebase';
import { SwitchProps } from "react-router";

const AuthContext = React.createContext({})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: SwitchProps ): JSX.Element{
  const [currentUser, setCurrentUser] = useState<firebase.User|null>(null);
  const [loading, setLoading] = useState(true)

  function signup(email: string, password:string) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      if(user.user){
        return user.user.sendEmailVerification();
      }
    }).catch(err => err);
    ;
  }

  function login(email: string, password: string):Promise<firebase.auth.UserCredential>  {
    return auth.setPersistence('local').then(()=>auth.signInWithEmailAndPassword(email, password))
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email:string): Promise<void> {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string): Promise<void>{
    if(currentUser){
      return currentUser.updateEmail(email);
    }
    throw new Error("Error");
  }

  function updatePassword(password: string){
    if(currentUser){
      return currentUser.updatePassword(password);
    }
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}