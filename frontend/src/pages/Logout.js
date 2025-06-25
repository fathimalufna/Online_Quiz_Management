import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  }, [navigate, setIsLoggedIn, setUserRole]);

  return null;
}

export default Logout;
