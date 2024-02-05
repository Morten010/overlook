import { FC } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {

  const navLinks = [
    {
      title: "Forside",
      href: "/"
    },
    {
      title: "Hoteller & Desinationer",
      href: "/"
    },
    {
      title: "Værelser",
      href: "/"
    },
    {
      title: "Reservation",
      href: "/"
    },
    {
      title: "Login",
      href: "/"
    }
  ]

  return (
    <nav
    className='p-5 bg-black '
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
              <Link
              to={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar