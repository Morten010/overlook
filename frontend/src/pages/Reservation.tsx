import { FC, useEffect, useState } from 'react'
import Container from '../components/Container'
import Select from '../components/Select'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useUser } from '../store/useUser'
import { toast } from 'sonner'

interface ReservationProps {
  
}

type PayloadProps = {
    user_id: string
    hotel_id: number
    room_id: number
    is_flex: number
    num_persons: number
    checkin: string
    checkout: string
    firstname: string
    lastname: string
    email: string
    phone: string
    comment: string
}

const Reservation: FC<ReservationProps> = ({}) => {
    const { user, jwt } = useUser()
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
    const [form, setForm] = useState({
        isFlex: 0, 
        checkin: '',
        checkout:'',
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        comment: ""
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

    const { mutate: submitForm } = useMutation({
        mutationFn: async (payload: PayloadProps) => {
            const url = "http://localhost:4000/reservations"
            console.log(payload);
            
            const { data } = await axios.post(url, payload, {
                headers: { 
                    Authorization: `Bearer ${jwt}` 
                }
            })

            return data
        },
        onSuccess: () => {
            toast.success("Room reserved 🍾");
        },
        onError: (err) => {
            toast.error("Something went wrong 🥲")
        }
    })

    const handleSubmit = async () => {

        // validate form
        if(!hotel.value){
            toast.error("Pick a hotel to stay at 📍")
            return
        }
        if(!room.value){
            toast.error("Pick a room to stay at 🛏️")
            return
        }
        if(!people.value){
            toast.error("Pick how many is staying 👨‍👩‍👧‍👦")
            return
        }
        if(!form.checkin || !form.checkout){
            toast.error("Pick when you are coming and leaving 🚪")
            return
        }
        if(!form.firstname){
            toast.error("First name is missing 🅰️")
            return
        }
        if(!form.lastname){
            toast.error("Last name is missing 🅱️")
            return
        }
        if(!form.email){
            toast.error("Email is missing 📨")
            return
        }
        if(!form.phone){
            toast.error("Phone number is missing 📱")
            return
        }
        if(!form.comment){
            toast.error("comment is missing 💬")
            return
        }
        // fetch hotel id
        const { data } = await axios.get(hotel.value)
        const hotel_id = data.cities[0].hotels[0].hotel_id
        
        const payload: PayloadProps = {
            user_id: user?.userId!,
            hotel_id,
            room_id: parseInt(room.value),
            is_flex: form.isFlex,
            num_persons: parseInt(people.value),
            checkin: form.checkin,
            checkout: form.checkout,
            firstname: form.firstname,
            lastname: form.lastname,
            email: form.email,
            phone: form.phone,
            comment: form.comment
        }
        console.log(payload);
        
        submitForm(payload)
    }

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
        options={data ? data : [{title: "Loading", value: ""}]}
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
            checked={form.isFlex === 0}
            onClick={() => setForm({
                ...form,
                isFlex: 0
            })}
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
            checked={form.isFlex === 1}
            onClick={() => setForm({
                ...form,
                isFlex: 1
            })}
            />
            <span>
                Flex
            </span>
        </label>
        <div
        className='grid grid-cols-2 gap-3 mt-2 mb-3'
        >
            <input 
            type="date" 
            className='p-2 rounded-lg'
            value={form.checkin}
            onChange={(e) => {
                setForm({
                    ...form,
                    checkin: e.currentTarget.value
                })
            }}
            />
            <input 
            type="date" 
            className='p-2 rounded-lg'
            value={form.checkout}
            onChange={(e) => {
                setForm({
                    ...form,
                    checkout: e.currentTarget.value
                })
            }}
            />
        </div>
        <label>
            <span
            className='sr-only'
            >
                Fornavn
            </span>
            <input 
            className='p-2 rounded-lg w-full'
            placeholder='Fornavn'
            value={form.firstname}
            onChange={(e) => setForm({...form, firstname: e.currentTarget.value})}
            />
        </label>
        <label>
            <span
            className='sr-only'
            >
                Fornavn
            </span>
            <input 
            className='p-2 rounded-lg w-full mt-3'
            placeholder='Efternavn(e)'
            value={form.lastname}
            onChange={(e) => setForm({...form, lastname: e.currentTarget.value})}
            />
        </label>
        <div
        className='grid grid-cols-2 gap-3'
        >
            <label>
                <span
                className='sr-only'
                >
                    Email
                </span>
                <input 
                className='p-2 rounded-lg w-full mt-3'
                placeholder='Email'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.currentTarget.value})}
                />
            </label>
            <label>
                <span
                className='sr-only'
                >
                    Telefon
                </span>
                <input 
                className='p-2 rounded-lg w-full mt-3'
                placeholder='Telefon'
                type='number'
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.currentTarget.value})}
                />
            </label>
        </div>

        <label>
            <span
            className='sr-only'
            >
                Kommentar
            </span>
            <textarea
            className='w-full mt-3 rounded-lg p-2'
            placeholder='Kommentar' 
            rows={10}
            value={form.comment}
            onChange={(e) => setForm({...form, comment: e.currentTarget.value})}
            />
        </label>
        <label
        className='flex flex-row-reverse gap-2 justify-end mt-2 items-center'
        >
            <span>
                Jeg acceptere hermed overlooks betingelser (sæt kryds)
            </span>
            <input 
            name='termsAndConditions'
            type='radio' 
            />
        </label>
        <button
        className='bg-red-500 px-4 py-2 text-white rounded-lg mt-3'
        onClick={() => handleSubmit()}
        >
            Send reservation
        </button>
        
    </Container>
  )
}

export default Reservation