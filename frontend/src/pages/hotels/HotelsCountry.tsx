import { FC } from 'react'
import { useQuery } from 'react-query';
import { CountriesProps, CountryProps} from '../../types';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NewsCard from '../../components/NewsCard';
import { motion } from 'framer-motion';
import { MotionContainer } from '../../components/Container';

interface HotelsCountryProps {
  
}

const HotelsCountry: FC<HotelsCountryProps> = ({}) => {
  const params = useParams()
  console.log(params);
  

  const { data: country } = useQuery({
    queryFn: async () => {
        const url = `http://localhost:4000/destinations/${params.country}`;
        const { data } = await axios.get(url)

        return data as CountryProps
    },
    queryKey: [`country-${params.country}`]
  })

  console.log(country);
  
 
  return (
    <MotionContainer
    className='px-4 py-2 overflow-hidden'
    key={country?.name}
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
        {country?.name}
      </h2>
      <p
      className='mt-1'
      >
        {country?.description}
      </p>
      <div
      className='newsGrid mt-4'
      >
        {country?.cities.map(city => (
          <Link 
          to={`/hotels/${params.country}/${city.slug}`}
          key={city.name + country.name}
          >
            <NewsCard
            key={"city-"+city.name}
            news={{
              id: city.city_id,
              image: { filename: city.CityImage.city_image_filename},
              title: city.name,
              teaser: ""
            }}
            />
          </Link>
        ))}
      </div>
    </MotionContainer>)
}

export default HotelsCountry