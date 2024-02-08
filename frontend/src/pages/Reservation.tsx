import { FC, useState } from 'react'
import Container from '../components/Container'
import Select from '../components/Select'
import { useQuery } from 'react-query'
import axios from 'axios'

interface ReservationProps {
  
}

const Reservation: FC<ReservationProps> = ({}) => {
    const [hotel, setHotel] = useState({
        value: "",
        title: ""
    })

    const { data } = useQuery({
        queryFn: async () => {
            const choices: {
                value: string
                title: string
            }[] = []
            const url = 'http://localhost:4000/destinations';
            // fetch all cities
            const {data} = await axios.get(url);

            console.log(data);
            // fetch all countries
            const countries = data.map(async (country: any) => {
                const {data: newCountry} = await axios.get(url + "/" + country.slug)
                console.log(newCountry);
                
                // fetch all cities
                const cities = newCountry.cities.map(async (city: any) => {
                    const {data: newCity} = await axios.get(url + "/" + country.slug + "/" + city.slug)
                    
                    // fetch all hotels
                    const hotels = newCity.cities[0].hotels.map(async (hotel: any) => {
                        const {data: newHotel} = await axios.get(url + "/" + country.slug + "/" + city.slug + "/" + hotel.slug)

                        
                        choices.push({
                            value: "2",
                            title: `${country.name} ${city.name} - ${newHotel.cities[0].hotels[0].title}`
                        })
                    })
                    await Promise.all(hotels)
                })
                await Promise.all(cities)
                
                
                
            })

            await Promise.all(countries)
            
            
            
            return choices
        },
        queryKey: ["mash"]
    })

  return (
    <Container>
        <h1
        className='text-2xl font-bold'
        >
            Reservation
        </h1>
        <p
        className='mb-4'
        >
            Udfyld nedenstående formular for at reservere et af vores værelser.
        </p>
        {data && <Select 
        selected={hotel}
        setSelected={setHotel}
        title='Vælg destination & hotel'
        options={data}
        />}
    </Container>
  )
}

export default Reservation