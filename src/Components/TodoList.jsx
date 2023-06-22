import React, { useState } from "react";
import Button from "./Button";
import { BsTrash3 } from "react-icons/bs";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto px-4 mt-8">
      <div className="flex mb-4 ">
        <input
          type="text"
          className="border border-gray-300 p-2 flex-grow mr-2 rounded border-none"
          placeholder="Añadir tarea"
          value={newTask}
          onChange={handleInputChange}
        />

        <Button value={"Añadir"} onClickValue={addTask} />
      </div>
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes.</p>
      ) : (
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li
              className="mb-2 flex justify-between items-center w-full hover:bg-blue-700/10 rounded transition duration-200 "
              key={index}
            >
              <p className="px-2">{task}</p>

              <Button
                type={"red"}
                className={"ml-2 !px-2"}
                value={<BsTrash3 />}
                onClickValue={() => deleteTask(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
