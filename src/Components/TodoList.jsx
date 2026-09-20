import React, { useState, useEffect } from "react";
import Button from "./Button";
import { BsTrash3 } from "react-icons/bs";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

const STORAGE_KEY = "todoList";

const taskColors = [
  { id: "blue", label: "Azul", dot: "bg-blue-500", border: "border-l-blue-500", bg: "bg-blue-500/10" },
  { id: "emerald", label: "Verde", dot: "bg-emerald-500", border: "border-l-emerald-500", bg: "bg-emerald-500/10" },
  { id: "amber", label: "Ámbar", dot: "bg-amber-500", border: "border-l-amber-500", bg: "bg-amber-500/10" },
  { id: "violet", label: "Violeta", dot: "bg-violet-500", border: "border-l-violet-500", bg: "bg-violet-500/10" },
  { id: "rose", label: "Rosa", dot: "bg-rose-500", border: "border-l-rose-500", bg: "bg-rose-500/10" },
  { id: "sky", label: "Celeste", dot: "bg-sky-500", border: "border-l-sky-500", bg: "bg-sky-500/10" },
];

const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const TodoList = () => {
  const [tasks, setTasks] = useState(loadTasks);
  const [newTask, setNewTask] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("blue");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
          color: newTaskColor,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const changeTaskColor = (id, color) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, color } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = () => {
    if (editingText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: editingText.trim() } : task
        )
      );
    }
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const filters = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "completed", label: "Completadas" },
  ];

  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "pending"
      ? !task.completed
      : task.completed
  );

  const pendingCount = tasks.filter((task) => !task.completed).length;

  const emptyMessage =
    filter === "all"
      ? "No hay tareas. Añade la primera arriba."
      : filter === "pending"
      ? "¡Todo hecho! No tienes nada pendiente."
      : "Aún no has completado ninguna tarea.";

  const actionButton =
    "shrink-0 p-2 rounded-full transition duration-200 active:scale-90";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="¿Qué tienes que hacer?"
              className="flex-1 rounded-xl border border-blue-900/10 bg-blue-50/50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <Button value={"Añadir"} onClickValue={addTask} />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-blue-900/80">Color:</span>
            {taskColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setNewTaskColor(color.id)}
                title={color.label}
                className={`w-6 h-6 rounded-full ${color.dot} transition duration-200 ${
                  newTaskColor === color.id
                    ? "ring-2 ring-blue-500 ring-offset-2 scale-110"
                    : "hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                  filter === f.value
                    ? "bg-blue-800 text-white border-blue-800 shadow-md"
                    : "bg-white/70 text-blue-900/80 border-blue-900/10 hover:bg-white hover:border-blue-800/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-sm font-bold text-blue-900/80">
            {pendingCount} {pendingCount === 1 ? "pendiente" : "pendientes"}
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-blue-900/80 text-center py-10">{emptyMessage}</p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => {
              const color =
                taskColors.find((c) => c.id === task.color) ?? taskColors[0];
              return (
                <li
                  key={task.id}
                  className={`flex items-center gap-3 rounded-xl border border-blue-900/10 border-l-4 px-4 py-3 transition-all duration-200 ${color.border} ${color.bg}`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    title={
                      task.completed
                        ? "Marcar como pendiente"
                        : "Marcar como hecha"
                    }
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition duration-200 ${
                      task.completed
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-blue-300 text-transparent hover:border-emerald-600 hover:text-emerald-700/40"
                    }`}
                  >
                    <FiCheck size={14} />
                  </button>

                  {editingId === task.id ? (
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <input
                        autoFocus
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="w-full rounded-lg border border-blue-900/10 bg-white/70 px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                      <div className="flex items-center gap-1.5">
                        {taskColors.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => changeTaskColor(task.id, c.id)}
                            title={c.label}
                            className={`w-4 h-4 rounded-full ${c.dot} transition duration-200 ${
                              (task.color ?? "blue") === c.id
                                ? "ring-2 ring-blue-500 ring-offset-1 scale-110"
                                : "hover:scale-110"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`flex-1 min-w-0 text-blue-900 break-words ${
                        task.completed
                          ? "line-through text-blue-900/70"
                          : "font-medium"
                      }`}
                    >
                      {task.text}
                    </span>
                  )}

                  <div className="flex gap-1 shrink-0">
                    {editingId === task.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          title="Guardar"
                          className={`${actionButton} text-emerald-700 hover:bg-emerald-50`}
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={cancelEdit}
                          title="Cancelar"
                          className={`${actionButton} text-red-700 hover:bg-red-50`}
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(task)}
                        title="Editar"
                        className={`${actionButton} text-blue-700 hover:bg-blue-50`}
                      >
                        <FiEdit />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      title="Eliminar"
                      className={`${actionButton} text-red-700 hover:bg-red-50`}
                    >
                      <BsTrash3 />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TodoList;