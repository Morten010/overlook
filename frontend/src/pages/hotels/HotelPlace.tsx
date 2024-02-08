import axios from 'axios'
import { motion } from 'framer-motion'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CityProps, HotelProps } from '../../types'
import RoomAccordion from '../../layout/RoomAccordion'
import { PiNavigationArrow, PiPhone } from 'react-icons/pi'
import Sidebar from '../../components/hotel/Sidebar'
import { MotionContainer } from '../../components/Container'

interface HotelPlaceProps {
  
}
const HotelPlace: FC<HotelPlaceProps> = ({}) => {
    const params = useParams()

    const { data: hotel } = useQuery({
        queryFn: async () => {
            const url = `http://localhost:4000/destinations/${params.country}/${params.city}/${params.hotel}`;
            
            const { data } = await axios.get(url)
    
            return data as HotelProps
        },
        queryKey: [`hotel-${params.hotel}`]
      })
    

  return (
    <MotionContainer
    className='px-4 py-2 overflow-hidden lg:flex'
    key={"hotel-div"+ hotel?.name}
    layout
    initial={{
      opacity: 0.2,
      translateX: "100%"
    }}
    animate={{
      opacity: 1,
      translateX: "0%"
    }}
    exit={{
      opacity: 0.2,
      translateX: "-100%"
    }}
    transition={{
      bounce: 0,
      ease: "linear",
      duration: 0.5
    }}
    >
       <div
       className='lg:w-[75%] lg:border-r lg:border-black pr-4'
       >
        <section>
                <h2
                className='text-xl font-bold'
                >
                    {hotel?.cities[0].hotels[0].title}
                </h2>
                <p>
                    {hotel?.cities[0].hotels[0].description}
                </p>
        </section>
            <section>
                <h2
                className='text-2xl font-bold mt-4'
                >
                    Vores Værelser
                </h2>
                <div
                className='flex flex-col gap-10 mt-2 mb-5'
                >
                    {hotel?.cities[0].hotels[0].rooms.map(room => (
                        <RoomAccordion 
                        room={room}
                        />
                    ))}
                </div>
            </section>
       </div>
       {hotel?.cities[0].hotels[0] && <Sidebar
       hotel={hotel?.cities[0].hotels[0]}
       />}
       
    </MotionContainer>
  )
}

export default HotelPlace