import { FC } from 'react'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { navLinks } from '../constants'
import { Link } from 'react-router-dom'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return <div
  className='p-5 max-w-screen-lg mx-auto flex justify-between items-center flex-col lg:flex-row gap-3 lg:gap-2'
  >
    <p>
      © 2021 Hotel Overlook. Alle rettigheder forbeholdt.
    </p>


    <div
    className='flex gap-2 text-2xl'
    >
      <BsTwitter 
      className='hover:opacity-80 cursor-pointer'
      />
      <BsFacebook 
      className='hover:opacity-80 cursor-pointer'
      />
    </div>


    <ul
    className='flex gap-2 '
    >
      {navLinks.map(link => (
        <li>
          <Link
          className='text-black/80'
          to={link.href}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
}

export default Footer