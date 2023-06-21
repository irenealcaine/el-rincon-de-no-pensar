import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 flex-grow mr-2"
          placeholder="Añadir tarea"
          value={newTask}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={addTask}
        >
          Añadir
        </button>
      </div>
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes.</p>
      ) : (
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li className="mb-2" key={index}>
              {task}
              <button
                className="ml-2 text-red-500"
                onClick={() => deleteTask(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
