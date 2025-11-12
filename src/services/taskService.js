// Servicio para manejo de tareas con LocalStorage
import { getCurrentUser } from './authService';

const TASKS_KEY = 'taskapp_tasks';

export const getTasks = () => {
  const user = getCurrentUser();
  if (!user) return [];
  const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || {};
  return allTasks[user.username] || [];
};

export const saveTasks = (tasks) => {
  const user = getCurrentUser();
  if (!user) return;
  const allTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || {};
  allTasks[user.username] = tasks;
  localStorage.setItem(TASKS_KEY, JSON.stringify(allTasks));
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = { ...task, id: Date.now().toString(), status: 'pending' };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id, updatedTask) => {
  const tasks = getTasks();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
    return tasks[index];
  }
  return null;
};

export const deleteTask = (id) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  saveTasks(filteredTasks);
};

export const toggleTaskStatus = (id) => {
  const tasks = getTasks();
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    saveTasks(tasks);
    return task;
  }
  return null;
};