import React, { createContext, useState, useContext, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (email, password, navigation) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        };
        setUser(user);
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  const register = (name, email, password, imageUrl, navigation) => {
    if (!name || !email || !password) {
      alert("Please fill out all required fields.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: imageUrl || "https://i.stack.imgur.com/l60Hf.png",
        })
          .then(() => {
            alert("Account created successfully");
            navigation.navigate("Login");
          })
          .catch((error) => {
            alert("Error updating profile: " + error.message);
          });
      })
      .catch((error) => alert(error.message));
    //   .finally(() => {
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    //     setImageUrl("");
    //   });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(() => alert(error.message));
  };

  const memoedValue = useMemo(
    () => ({ user, signIn, register, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
