import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface MainLayoutProps {
  
}

const MainLayout: FC<MainLayoutProps> = ({}) => {
  return (
    <>
        <Navbar />
        <div
        className='min-h-screen pt-[104px]'
        >
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default MainLayout