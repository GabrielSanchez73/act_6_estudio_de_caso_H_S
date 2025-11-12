import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Fecha límite: {task.dueDate}</p>
      <p className="text-sm text-gray-500">Prioridad: {task.priority}</p>
      <p className={`text-sm ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
        Estado: {task.status === 'pending' ? 'Pendiente' : 'Completada'}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {task.status === 'completed' ? 'Marcar Pendiente' : 'Marcar Completada'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;