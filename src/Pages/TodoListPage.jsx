import React from "react";
import Footer from "../Components/Footer";
import TodoList from "../Components/TodoList";
import PageIntro from "../Components/PageIntro";

const TodoListPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ pendiente o hecho ~"}
          title={"Lista de tareas"}
          description={
            "Organiza tus tareas y ve cumpliéndolas una a una. Si no está en la lista, no existe."
          }
          backTo={"/projects"}
          backLabel={"Volver a proyectos"}
        />
        <TodoList />
      </main>
      <Footer />
    </div>
  );
};

export default TodoListPage;