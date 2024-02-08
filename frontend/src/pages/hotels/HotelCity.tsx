import axios from 'axios';
import { FC } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { CityProps, CountryProps } from '../../types';
import NewsCard from '../../components/NewsCard';
import { motion } from 'framer-motion';

interface HotelCityProps {
  
}

const HotelCity: FC<HotelCityProps> = ({}) => {
  const params = useParams()
  

  const { data: city } = useQuery({
    queryFn: async () => {
        const url = `http://localhost:4000/destinations/${params.country}/${params.city}`;
        
        const { data } = await axios.get(url)

        return data as CityProps
    },
    queryKey: [`city-${params.city}`]
  })

  return (
    <motion.div
    className='max-w-screen-lg mx-auto px-4 py-2 overflow-hidden'
    layout
    key={city?.name}
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
        <h2
        className='text-xl font-bold leading-4'
        >
          {city?.cities[0].name} - Hotels
        </h2>
        <span
        className='text-sm font-semibold text-red-600'
        >
          {city?.name}
        </span>
        <p>
          {city?.cities[0].description}
        </p>
        <div
        className='newsGrid mt-4'
        >
          {city?.cities[0].hotels.map(hotel => (
            <Link
            key={"country-link-"+hotel.title}
            to={`/hotels/${params.country}/${params.city}/${hotel.slug}`}
            >
              <NewsCard 
              news={{
                id: hotel.hotel_id,
                image: { filename: hotel.HotelImage.hotel_image_filename},
                title: hotel.title,
                teaser: ""
              }}
              />
            </Link>
          ))}
        </div>
    </motion.div>
  )
}

export default HotelCity