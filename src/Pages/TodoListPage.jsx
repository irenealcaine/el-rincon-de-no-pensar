import React from 'react'
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TodoList from '../Components/TodoList';

const TodoListPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Lista de tareas"} />
      <TodoList />
      <Footer />
    </div>
  )
}

export default TodoListPage
