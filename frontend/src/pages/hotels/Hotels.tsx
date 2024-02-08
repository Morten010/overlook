import axios from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CountriesProps } from '../../types';
import NewsCard from '../../components/NewsCard';
import { motion } from 'framer-motion';
import { MotionContainer } from '../../components/Container';

interface HotelsProps {
  
}

const Hotels: FC<HotelsProps> = ({}) => {

  const { data: countries } = useQuery({
    queryFn: async () => {
        const url = 'http://localhost:4000/destinations';
        const { data } = await axios.get(url)

        return data as CountriesProps[]
    },
    queryKey: ["countries"]
  })
  
  return (
    <MotionContainer
    className='px-4 py-2 overflow-hidden'
    key={"countries-div"}
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
      <h2
      className='text-xl font-bold'
      >
        Lande
      </h2>
      <div
      className='newsGrid mt-2'
      >
        {countries?.map(country => (
          <Link
          key={"country-link-"+country.name}
          to={`/hotels/${country.slug}`}
          >
            <NewsCard 
            news={{
              id: country.id,
              image: { filename: country.CountryImage.country_image_filename},
              title: country.name,
              teaser: country.description
            }}
            />
          </Link>
        ))}
      </div>
    </MotionContainer>
  )
}

export default Hotels