import { FC, useEffect, useState } from 'react'
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
    const [room, setRoom] = useState({
        value: "",
        title: ""
    })
    const [people, setPeople] = useState({
        value: "",
        title: ""
    })
    const [hotelData, setHotelData] = useState({
        people: [] as { title: string; value: any; }[],
        roomType: [] as { title: string; value: any; }[]
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
            // fetch all countries
            const countries = data.map(async (country: any) => {
                const {data: newCountry} = await axios.get(url + "/" + country.slug)
                // fetch all cities
                const cities = newCountry.cities.map(async (city: any) => {
                    const {data: newCity} = await axios.get(url + "/" + country.slug + "/" + city.slug)
                    
                    // fetch all hotels
                    const hotels = newCity.cities[0].hotels.map(async (hotel: any) => {
                        const {data: newHotel} = await axios.get(url + "/" + country.slug + "/" + city.slug + "/" + hotel.slug)

                        
                        choices.push({
                            value: url + "/" + country.slug + "/" + city.slug + "/" + hotel.slug,
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


    useEffect(() => {
        if(!hotel.title) return

        const getData = async () => {
            const { data: { cities } } = await axios.get(hotel.value)
            const c = cities[0]
            const h = c.hotels[0]
            const rooms = h.rooms
            
            setHotelData({
                people: [],
                roomType: rooms.map((r: any) => ({ value: r.room_id, title: r.title})),
            })
            if(room) {
                const choosenRoom = rooms.find((r: any) => r.room_id === room.value)
                const arr = Array(choosenRoom.num_persons).fill("")
                const newArr = arr.map((_item, index) => {
                    return {
                        title: `${index + 1} Personer`,
                        value: choosenRoom.room_id
                    }
                })                
                
                setHotelData({
                    ...hotelData,
                    people: newArr
                })
            }

            
        }
        
        getData()
    }, [hotel, room])

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
        <Select 
        selected={hotel}
        setSelected={setHotel}
        title='Vælg destination & hotel'
        options={data ? data : ["Loading..."]}
        />
        <div
        className='grid grid-cols-2 mt-3 gap-3'
        >
            <Select 
            selected={room}
            setSelected={setRoom}
            options={hotelData.roomType}
            disabled={!hotel.title}
            title='Værelse type'
            />
            <Select 
            selected={people}
            setSelected={setPeople}
            options={hotelData.people}
            disabled={!room.title}
            title='Værelse type'
            />
        </div>
        <h2
        className='text-xl font-bold mt-2 mb-1'
        >
            Vælg prisklasse
        </h2>
        <label
        className='flex gap-2 items-center'
        >
            <input 
            type='radio'
            name='priceclass'
            value="normal"
            />
            <span>
                Normal
            </span>
        </label>
        <label
        className='flex gap-2 items-center'
        >
            <input 
            type='radio'
            name='priceclass'
            value="flex"
            />
            <span>
                Flex
            </span>
        </label>
        
    </Container>
  )
}

export default Reservation