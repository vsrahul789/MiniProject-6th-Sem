// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
const logoutColor = "red.500";
const hoverBg = "red.600";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Are you sure you want to log out?");
    window.location.reload();
    localStorage.removeItem('jwtToken');
    navigate('/'); // Redirect to the login page or any other page
  };

  return (
    <Button bg={logoutColor} color="white" _hover={{ bg: hoverBg }} onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default Logout;