// Servicio para autenticación básica con LocalStorage
const USERS_KEY = 'taskapp_users';
const CURRENT_USER_KEY = 'taskapp_current_user';

export const registerUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (users.find(user => user.username === username)) {
    throw new Error('Usuario ya existe');
  }
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  throw new Error('Credenciales incorrectas');
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};