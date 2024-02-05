import { FC } from 'react'
import { Hero } from '../components/Hero'
import { useQuery } from 'react-query'
import axios from 'axios'
import { CountryProps } from '../types'

interface HotelsProps {
  
}

const Hotels: FC<HotelsProps> = ({}) => {

    const { data: countries } = useQuery({
        queryFn: async () => {
            const url = 'http://localhost:4000/destinations';
            const { data } = await axios.get(url)

            return data as CountryProps[]
        },
        queryKey: ["countries"]
    })


  return (
    <div>
        <Hero 
        title='HOTELLER & DESTINATIONER'
        image='seljalandvoss-iceland.jpg'
        />
        <ul
        className='flex justify-center bg-white relative shadow-md'
        >
          <div 
          className='bg-gradient-to-r from-[#ebebeb] via-[#ebebeb] to-[#ebebeb00] absolute top-0 left-0 w-[30%] h-[120%] shadow-none'
          />
          <div 
          className='bg-gradient-to-l from-[#ebebeb] via-[#ebebeb] to-[#ebebeb00] absolute top-0 right-0 w-[30%] h-[130%] shadow-none'
          />
            {countries && countries.map(country => (
              <li
              className='px-4 py-4 cursor-pointer hover:text-red-600 transition-colors'
              >
                {country.name}
              </li>
            ))}
        </ul>
    </div>
  )
}

export default Hotels