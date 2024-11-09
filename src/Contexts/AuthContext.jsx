import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

const AuthContext = createContext();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if user document exists
    const userDocRef = doc(db, 'users', result.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Set default role to "citizen" for new users
      await setDoc(userDocRef, { role: 'citizen' });
      setUserRole('citizen');
    } else {
      // If the user already exists, fetch and set the role
      setUserRole(userDoc.data().role);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch role from Firestore if user is logged in
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userRole, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
