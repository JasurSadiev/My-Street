// pages/SignupPage.jsx
import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    await signInWithGoogle();
    navigate('/');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
    </div>
  );
}

export default SignupPage;
