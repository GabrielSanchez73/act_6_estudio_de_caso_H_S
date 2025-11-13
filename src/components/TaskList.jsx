import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { getTasks, addTask, updateTask, deleteTask, toggleTaskStatus } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const loadTasks = () => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleAddTask = (taskData) => {
    addTask(taskData);
    loadTasks();
    setShowForm(false);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(editingTask.id, taskData);
    loadTasks();
    setEditingTask(null);
    setShowForm(false);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    loadTasks();
  };

  const handleToggleTask = (id) => {
    toggleTaskStatus(id);
    loadTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todas las prioridades</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? 'Cancelar' : 'Nueva Tarea'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <TaskForm
            task={editingTask}
            onSave={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={() => { setShowForm(false); setEditingTask(null); }}
          />
        </div>
      )}

      <div className="grid gap-4">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;