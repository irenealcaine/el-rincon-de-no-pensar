import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoIosArrowBack } from 'react-icons/io'

const Sidebar = () => {

  const Sidebar_animation = {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      }
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      }
    }
  }

  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <motion.div
        variants={Sidebar_animation}
        animate={isOpen ? "open" : "closed"}
        className='bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed '>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer'>
          <IoIosArrowBack size={25} />
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar
