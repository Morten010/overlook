import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../constants'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {

  return (
    <nav
    className='p-5 bg-black fixed w-full z-[300] top-0 left-0'
    >
      <div
      className='flex justify-between items-end max-w-screen-lg mx-auto'
      >
        <img 
        src='/hotel-overlook-logo.svg'
        alt='Overlook logo'
        className='h-16'
        />
        <ul
        className='flex gap-2'
        >
          {navLinks.map(link => (
            <li
            className='last:border-none border-r text-white pr-2 leading-4 hover:text-red-600 transition-colors uppercase'
            >
              <NavLink
              className={({ isActive}) => isActive ? "text-red-600" : ""}
              to={link.href}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar