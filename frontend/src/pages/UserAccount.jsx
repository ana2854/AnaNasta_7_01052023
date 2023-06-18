import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function UserAccount() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Check if local storage contains user authentication token
  const isAuthenticated = !!localStorage.getItem('userIds');
  const isAuthorized = isAuthenticated && userId;

  // Logout function
  function handleLogout() {
    // Clear user data from local storage
    localStorage.removeItem('userAuth');

    // Redirect the user to the login page
    navigate('/login');
  }

  useEffect(() => {
    if (!isAuthorized) {
      // Redirect the user to the login page
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) {
    // Render null or a placeholder while the user is being redirected
    return null;
  }

  return (
    <main>
      <h1>Mon compte</h1>
      <button className="btn-logout" onClick={handleLogout}>LOG OUT</button>
    </main>
  );
}
