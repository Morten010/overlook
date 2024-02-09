import { FC } from 'react'
import Container from '../../components/Container'
import { useUser } from '../../store/useUser'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'

interface adminProps {
  
}

type ResponseProps = {
  checkin: string
  checkout: string
  id: number
  user_id: number
  hotel: { 
    title: string 
  }
  room: { 
    title: string
  }
} 

const Admin: FC<adminProps> = ({}) => {
  const { user, jwt, removeUser } = useUser()
  
  const {data, refetch} = useQuery({
    queryFn: async () => {
      const url = `http://localhost:4000/reservations?attributes=checkin,checkout,id,user_id`
    
      console.log(url);
      
      const { data } = await axios.get(url, {
        headers: { 
          Authorization: `Bearer ${jwt}` 
        },
      })

      return data.filter((r: ResponseProps) => r.user_id === parseInt(user?.userId!)) as ResponseProps[]
    },
    queryKey: ["user-reservations"]
  })

  const {mutate: deleteReservation} = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete("http://localhost:4000/reservations", {
        data: {
          id
        }
      })

      return data
      
    },
    onSuccess: () => {
      toast.success("Slettet reservation 🗑️")
      refetch()
    },
    onError: () => {
      toast.success("Kunne ikke slettet i øjeblikket prøv igen senere 🥲")
    },
    mutationKey: ["delete-item"]
  })

  console.log(data);
  

  return (
    <Container
    className='max-w-screen-lg mx-auto p-4 flex gap-2'
    >
        <div
        className='flex-grow'
        >
          <h1
          className='text-2xl font-bold'
          >
              Administer reservationer
          </h1>
          <p>
            Her kan du ændre og afbestille din reservationer
          </p>
          <table
          className='w-full'
          >
            <thead
            className='font-bold'
            >
              <tr
              className='border-b border-black'
              >
                <td
                className='py-2'
                >
                  Hotel og værelsestype
                </td>
                <td
                className='py-2'
                >
                  Dato
                </td>
                <td
                className='py-2'
                >
                  Handling
                </td>
              </tr>
            </thead>
            <tbody>
              {data ? data.map(reservation => (
                <tr
                >
                  <td
                  className='py-2'
                  >
                    {reservation.hotel.title} - {reservation.room.title}
                  </td>
                  <td
                  className='py-2'
                  >
                    {new Date(reservation.checkin).toLocaleDateString("da-dk", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })} - {new Date(reservation.checkout).toLocaleDateString("da-dk", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </td>
                  <td
                  className='font-semibold py-2 flex gap-3'
                  >
                    <button
                    className='text-green-500'
                    >
                      Rediger
                    </button>
                    <button
                    className='text-red-500'
                    onClick={() => deleteReservation(reservation.id)}
                    >
                      Slet
                    </button>
                  </td>
                </tr>
              )) : "No data"}
            </tbody>
          </table>
        </div>

        <aside 
        className='w-[25%] border-l h-full min-h-[80vh] border-black/20 p-4'
        >
          <h3
          className='text-lg font-bold'
          >
            Dine oplysninger
          </h3>
          <p
          className='leading-4 text-black/50 mb-2 mt-1'
          >
            Du er logget in som <strong
            className='capitalize'
            >
              {user?.firstname} {user?.lastname}
            </strong>
          </p>
          <button
          className='text-red-600 font-semibold'
          onClick={() => removeUser()}
          >
            &#62; Log out
          </button>
        </aside>
        
    </Container>
  )
}

export default Admin