import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import RPS from '../Components/RPS'


const RPSGame = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Piedra-papel-tijeras"} />
      <RPS />
      <Footer />
    </div>
  )
}

export default RPSGame
