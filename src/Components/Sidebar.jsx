import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [open, setOpen] = useState(true)
  const [subMenuOpen, setSubMenuOpen] = useState(true)

  const Menus = [
    { title: 'Frases célebres', src: 'https://cdn-icons-png.flaticon.com/512/7350/7350737.png', to: '/quotes' },
    { title: 'Portfolio', src: 'https://cdn-icons-png.flaticon.com/512/14/14573.png', to: '/portfolio' },
    {
      title: 'Juegos',
      src: 'https://www.freepnglogos.com/uploads/games-png/games-controller-game-icon-17.png',
      to: '/games',
      submenu: [
        {
          title: "Tic-tac-toe",
          to: "tic-tac-toe"
        },
        {
          title: "Dinosaurio",
          to: "dinosaur"
        }
      ]
    },
    { title: 'Portfolio', src: 'https://cdn-icons-png.flaticon.com/512/14/14573.png', to: '/portfolio' },
    { title: 'Portfolio', src: 'https://cdn-icons-png.flaticon.com/512/14/14573.png', to: '/portfolio' },

  ]

  return (
    <div className='flex z-10 top-0 left-0 fixed md:relative font-caveat'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-200 h-screen p-5 pt-8 bg-green-900 sticky top-0 left-0`}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/109/109618.png'
          alt='/'
          className={`absolute cursor-pointer rounded-full -right-3 top-9 h-7 border-2 border-green-700 ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)} />
        <Link
          to={'/'}
          className='flex items-center duration-200 hover:bg-green-400 '
        >
          <div className='flex gap-x-4 items-center '>
            <img src='https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png' alt='/' className={`duration-500 w-10 p-1 ${open && 'rotate-[360deg]'}`} />
            <h1 className={`text-green-100 origin-left font-medium text-3xl duration-200 hover:text-green-900 ${!open && 'scale-0'}`}>Inicio</h1>
          </div>
        </Link>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <div>
              <Link
                to={`${menu.to}`}
                key={index}
                className={`text-green-100 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-400 hover:text-green-900 duration-200 mt-2`}
              >
                <img src={menu.src} className='w-6' alt="/" />
                <span className={`${!open && 'hidden'} origin-left duration-200`}> {menu.title}</span>
                {menu.submenu
                  ? <img
                    alt="/"
                    src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    className={` cursor-pointer rounded-full h-7 border-2 border-green-700 ${!subMenuOpen && 'rotate-180'} ${!open && 'hidden'}`}
                  />
                  : ''}
              </Link>
              {
                menu.submenu
                  ?
                  <ul>
                    {
                      menu.submenu.map((submenu, index) => (
                        <Link
                          to={`${menu.to}/${submenu.to}`}
                          className={`${!open && 'hidden'} ${subMenuOpen ? 'block' : 'hidden'}`}>
                          {submenu.title}
                        </Link>
                      ))}
                  </ul>

                  : ''
              }
            </div>
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
