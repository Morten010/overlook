import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { useQuery } from 'react-query';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CountriesProps } from '../types';
import { AnimatePresence } from 'framer-motion';

interface HotelsLayoutProps {
  
}

const HotelsLayout: FC<HotelsLayoutProps> = ({}) => {
    const [breadCrumbs, setBreadCrumbs] = useState(["Hotel overlook", "Hoteller & Destinationer"])
    const location = useLocation()

    const { data: countries } = useQuery({
        queryFn: async () => {
            const url = 'http://localhost:4000/destinations';
            const { data } = await axios.get(url)

            return data as CountriesProps[]
        },
        queryKey: ["countries"]
    })

    useEffect(() => {
        const newLoc = location.pathname.split("/hotels")
            .filter(loc => !!loc)
            .map(loc => loc.replace("/", ""))
        const arr = !!newLoc.length ? newLoc[0].split("/") : []
        
        setBreadCrumbs(["Hotel overlook", "Hoteller & Destinationer", ...arr])
    }, [location])
    

  return (
    <>
        <Hero 
        title='HOTELLER & DESTINATIONER'
        image='seljalandvoss-iceland.jpg'
        />
        <ul
        className='flex justify-center bg-white relative shadow-md mb-3'
        >
          <div 
          className='bg-gradient-to-r from-[#ebebeb] via-[#ebebeb] to-[#ebebeb00] absolute top-0 left-0 w-[30%] h-[120%] shadow-none'
          />
          <div 
          className='bg-gradient-to-l from-[#ebebeb] via-[#ebebeb] to-[#ebebeb00] absolute top-0 right-0 w-[30%] h-[130%] shadow-none'
          />
            {countries && countries.map(country => (
              <li
              className='px-4 py-4 transition-colors'
              >
                <NavLink
                className="cursor-pointer hover:text-red-600"
                to={`/hotels/${country.slug}`}
                >
                    {country.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <div
        className=' px-4 py-2 flex gap-1 max-w-screen-lg mx-auto'
        >
            {breadCrumbs.map((crumb, index) => (
                <div
                className='flex gap-1 items-center'
                >
                    <p
                    className='capitalize flex gap-1'
                    > 
                        {crumb}
                    </p>
                    {index !== breadCrumbs.length - 1 && <CgChevronRight 
                    className='pt-1'
                    />}
                </div>
            ))}
        </div>
        <AnimatePresence  key={"HotelLayout"}>
            <div
            className='min-h-[20vh]'
            >
                <Outlet />
            </div>
        </AnimatePresence>
    </>
  )
}

export default HotelsLayout