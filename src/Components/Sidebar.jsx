import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [open, setOpen] = useState(true)

  const Menus = [
    { title: 'Frases célebres', src: 'plant', to: '/quotes' },
    { title: 'Portfolio', src: 'plant', to: '/portfolio' },
    { title: 'Juegos', src: 'plant', to: '/games', gap: true },

  ]

  return (
    <div className='flex z-10 top-0 left-0 fixed md:relative font-caveat'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-200 h-screen p-5 pt-8 bg-green-900 sticky top-0 left-0`}>
        <img src='https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png' alt='/' className={`absolute cursor-pointer rounded-full -right-3 top-9 h-7 border-2 border-green-700 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
        <Link
          to={'/'}
          className='flex items-center duration-200 hover:bg-green-400 '
        >
          <div className='flex gap-x-4 items-center '>
            <img src='https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png' alt='/' className={`duration-500 w-10 p-1 ${open && 'rotate-[360deg]'}`} />
            <h1 className={`text-green-100 origin-left font-medium text-3xl duration-200 hover:text-green-900 ${!open && 'scale-0'}`}>Inicio</h1>
          </div>
        </Link>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <Link
              to={`${menu.to}`}
              key={index}
              className={`text-green-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-400 hover:text-green-900 duration-200 ${menu.gap ? 'mt-7' : 'mt-2'}`}
            >
              {/* <img src={`./src/assets/${menu.src}.svg`} className='w-6' /> */}
              <span className={`${!open && 'hidden'} origin-left duration-200`}> {menu.title}</span>
            </Link>
          ))}
        </ul>
      </div>
      {/* <div className='p-7 text-2xl font-semibold flex-1 h-screen bg-blue-50'>
      <h1>Home Page</h1>
    </div> */}

    </div>
  )
}

export default Sidebar
