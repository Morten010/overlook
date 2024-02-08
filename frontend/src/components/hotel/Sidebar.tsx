
import { FC } from 'react'
import { HotelProp } from '../../types'
import { PiNavigationArrow, PiPhone } from 'react-icons/pi'
import { FaMapPin, FaPhone } from 'react-icons/fa'

interface SidebarProps {
  hotel: HotelProp
}

const Sidebar: FC<SidebarProps> = ({
    hotel
}) => {
  return (
    <div
    className='flex-grow p-4'
    >
        <h2
        className='text-lg font-bold mb-2'
        >
            Information
        </h2>
        <ul
        className='mb-5 flex flex-col gap-1'
        >
            <li
            className='flex gap-2 items-center'
            >
                <FaMapPin /> {hotel.address}
            </li>
            <li
            className='flex gap-2 items-center'
            >
                <FaPhone /> {hotel.phone}
            </li>
        </ul>
        <h2
        className='text-lg font-bold mb-2'
        >
            Faciliteter
        </h2>
        <ul
        className='mb-5 flex flex-col gap-1'
        >
            {hotel.hotel_facilities.map(facility => (
                <li>
                    {facility.title}
                </li>
            ))}
        </ul>
        <h2
        className='text-lg font-bold mb-2'
        >
            vores Kunders mening
        </h2>
        <div>
            {/* {hotel.} */}
        </div>
    </div>
  )
}

export default Sidebar