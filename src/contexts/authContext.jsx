import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onIdTokenChanged,
} from "firebase/auth";
import React, { useState, createContext, useContext, useEffect } from "react";
import Clientform from "../components/inscClient/formClient";
import { auth } from "../utils/firebase.config";

export const AuthContext = createContext({
  currentUser: null,
  Logout: () => Promise,
  inscription: () => Promise,
  connex: () => Promise,
  resetPassword: () => Promise,
  role: null,
  token: null,

  // verifyUserRole:()=> Promise
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(null);
  const [url, setUrl] = useState("");

  const inscription = async (
    email,
    password,
    prenom,
    nom,
    selectedOption,
    phone,
    role
  ) => {
    try {
      const clientCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const client = clientCredential.user;
      console.log("Client enregistrer :", client);

      const userToken = await client.getIdToken();

      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          userToken,
          email,
          password,
          prenom,
          nom,
          selectedOption,
          phone,
          role,
        }),
      });
      console.log("Token du Client :", userToken);

      console.log("Réponse du serveur :", response);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  useEffect(() => {
    const suscrit = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      user.getIdToken().then((token) => {
        console.log(token);
        setToken(token);
      });

      // user.getIdTokenResult().then((idTokenResult) => {
      //   // Check if user has 'client' role
      //   const hasClientRole = idTokenResult.claims.role === "client";
      //   setRole(hasClientRole ? "client" : "not a client");
      // });
      user.getIdTokenResult().then((idTokenResult) => {
       
        setRole(idTokenResult.claims.role);
        console.log('auth role' , role)
        console.log('auth name' , idTokenResult.claims.displayname)


      });
    });
    return () => {
      suscrit();
    };
  }, []);

  const connex = async (email, password) => {
    // if (userType === 'client') {
    //   setUrl('http://localhost:5000/api/clients/login')
    // } else if (userType === 'supplier') {
    //   setUrl('http://localhost:5000/api/suppliers/login')
    // }

    try {
      const clientCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const client = clientCredential.user;
      console.log("Client Logged in :", client);
      const userToken = await client.getIdToken();

      const response = await fetch("http://localhost:5000/api/clients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          userToken,
          email,
          password,
        }),
      });
      console.log("Réponse du serveur :", response);
      // // Extract the role from the response and set it in state
      // const data = await response.json();
      // // setRole(data.role);
      // console.log('User data' , data)

      // setRole(userToken.claims.role);


      // console.log('User role is' + role)
      // const userData = await response.json();
      // console.log(userData)
      // if (userData.role === "client") {
      //   // Redirect to client dashboard
      //   console.log("Redirecting to client dashboard");
      // } else if (userData.role === "supplier") {
      //   // Redirect to supplier dashboard
      //   console.log("Redirecting to supplier dashboard");
      // } else {
      //   console.log("Unknown user role");
      // }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
  };

  const resetPassword = async (email) => {
    try {
      const clientCredential = await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/connexion",
      });
      // alert("Password reset email sent check your Email !");
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
  };

  const Logout = async () => {
    await signOut(auth);
    setToken("");
  };

  const value = {
    currentUser,
    role,
    token,
    Logout,
    inscription,
    connex,
    resetPassword,
    // verifyUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
