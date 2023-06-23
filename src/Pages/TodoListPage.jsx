import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TodoList from "../Components/TodoList";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

const TodoListPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Lista de tareas"} />
      <Button
        type={"violet"}
        className={"ml-8"}
        onClickValue={() => {
          navigate("/projects");
        }}
        value={"Proyectos"}
      />
      <TodoList />
      <Footer />
    </div>
  );
};

export default TodoListPage;
