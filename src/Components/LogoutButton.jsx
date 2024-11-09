// components/LogoutButton.jsx
import React from 'react';
import { useAuth } from '../Contexts/AuthContext';

function LogoutButton() {
  const { logOut } = useAuth();

  return (
    <button onClick={logOut}>Sign Out</button>
  );
}

export default LogoutButton;
