import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface RoomAccordionProps {
    room: {
        room_id: number;
        title: string;
        description: string;
        num_persons: number;
        area: string;
        day_price_normal: number;
        day_price_flex: number;
        hotel_room_rel: {
            id: number;
            hotel_id: number;
            room_id: number;
            num_rooms: number;
            hotelId: number;
            roomId: number;
        },
        images: {
            filename: string
            title: string
            room_image_rel: {
              id: number
              room_id: number
              image_id: number
              order_num: number
              roomId: number
              imageId: number
          }
      }[],
    }
    hotelPath: string
}
const RoomAccordion: FC<RoomAccordionProps> = ({ room, hotelPath }) => {
    const [open, setOpen] = useState(false)
    const imageHeight = useRef<HTMLDivElement>(null)
    console.log(room);
    
    const [height, setHeight] = useState(0)
    const [offSet, SetOffSet] = useState(0)

    const handleClick = () => {
        setOpen(!open)
        window.scrollTo(0, offSet + height * 3)
    }
    useEffect(() => {
        if (imageHeight.current) {
            setHeight(imageHeight.current.offsetHeight)
            SetOffSet(imageHeight.current.offsetTop)
          }        
    }, [imageHeight.current?.offsetHeight])

  return (
    <div
    ref={imageHeight}
    className='p-5 bg-white relative'
    >
        <div
        className={`flex gap-4 p-4 bg-white relative ${open ? "flex-col" : ""}`}
        >
            <img 
            src={"http://localhost:4000/images/"+ room.images[0].filename} 
            alt={room.title} 
            className={`aspect-video  object-cover ${+ open ? "w-full  mb-2" : "w-[35%]"}` }
            />
            <div
            className={`flex flex-col flex-grow` }
            >
                <h3
                className='text-xl font-bold mb-2'
                >
                    {room.title}
                </h3>
                <span
                className='text-black/70'
                >
                    {room.area}. Plads til {room.num_persons} personer.
                </span>
                <p
                className='text-black/70 mt-2'
                >
                    {room.description}
                </p>
                {open && (
                    <>
                        <h2
                        className='mt-4 text-lg font-semibold'
                        >
                            Billedere
                        </h2>
                        <div
                        className='grid grid-cols-2 gap-2 mt-2'
                        >
                            {room.images.map(image => (
                                <img 
                                src={"http://localhost:4000/images/" + image.filename}
                                alt={image.title}
                                className=' mb'
                                />
                            ))}
                        </div>
                    </>
                )}
                <div
                className='self-end mt-auto text-end box-border'
                >
                    {open && <Link

                    to={`/reservation?flex=1&room=${room.room_id}&hotel=${hotelPath}`}
                    >
                        <div
                        className='text-lg font-bold bg-red-600 text-white p-2 mt-3 cursor-pointer hover:opacity-80 transition-opacity'
                        >
                            Flex Fra {room.day_price_flex.toLocaleString("da-dk", {})} DKK
                        </div>
                    </Link>}
                    <Link
                    to={`/reservation?flex=0&room=${room.room_id}&hotel=${hotelPath}`}
                    className='text-xl font-bold cursor-pointer p-2 box-border hover:text-red-600 transition-colors'
                    >
                        Fra {room.day_price_normal.toLocaleString("da-dk", {})} DKK
                    </Link>
                </div>
                
            </div>
        </div>
        <button
        onClick={handleClick}
        className='absolute bottom-0 left-2/4 text-4xl bg-white hover:bg-[#fafafa] transition-colors p-2 rounded-full -translate-x-2/4 translate-y-2/4'
        >
            {open ? <BiChevronUp /> : <BiChevronDown />}
        </button>
    </div>
  )
}

export default RoomAccordion