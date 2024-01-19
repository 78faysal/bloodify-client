import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { axiosPublic } from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logOut = () => {
    return signOut(auth);
  };

  // update user
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // update password
  const updatePass = (password) => {
    // const user = auth.currentUser;

    // // re-authenticate user
    // const credential = EmailAuthProvider.credential(user.email, currentPassword);
    // try{
    //     await user.reauthenticateWithCredential(credential);
    return updatePassword(auth.currentUser, password);
    // }
    // catch(err){
    //     console.log(err);
    // }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("ovserbing user of", currentUser);
      const userEmail = currentUser?.email;
      if (userEmail) {
        axiosPublic.post("/jwt", { email: userEmail })
        .then((res) => {
          const token = res.data.token;
          if (token) {
            setLoading(false);
            localStorage.setItem("access-token", token);
          }
        })
        .catch(error => {
            console.log(error);
        })
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
  }, []);

  const authInfo = {
    loading,
    createUser,
    logInUser,
    logOut,
    updateUser,
    user,
    updatePass,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
