import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { logoutUser, getCurrentUser } from '../services/authService';

const Home = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Bienvenido, {user.username}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  );
};

export default Home;