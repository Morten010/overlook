import axios from 'axios'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { ImageProps, NewsProps, RoomProps } from '../types'
import { Hero } from '../components/Hero'
import NewsCard from '../components/NewsCard'

interface HomepageProps {
  
}

const Homepage: FC<HomepageProps> = ({}) => {
    const {data: news} = useQuery({
        queryFn: async () => {
            const url = "http://localhost:4000/news";
            const { data } = await axios.get(url)

            return data?.slice(0, 3) as NewsProps[]
        },
        queryKey: ["news-Frontpage"]
    })

    const {data: rooms} = useQuery({
        queryFn: async () => {
            const url = "http://localhost:4000/destinations/danmark/aalborg/overlook-aalborg-city";
            const { data } = await axios.get(url)

            return data.cities[0].hotels[0].rooms.slice(0, 3) as RoomProps[]
        },
        queryKey: ["rooms-Frontpage"]
    })
    
    

  return (
    <div>
        <Hero 
        title='velkommen til hotel overlook online'
        image='frankfurt-skyline-germany.jpg'
        />
        <div
        className='max-w-screen-lg mx-auto p-2'
        >
            <div
            className='mt-4 px-2 mb-2'
            >
                <h2
                className='text-xl font-bold mb-2'
                >
                    Sidste nyt
                </h2>
                <div
                className='newsGrid'
                >
                    {news && news.map(n => (
                        <NewsCard 
                        news={n}
                        /> 
                    ))}
                </div>
            </div>
            <div
            className='mt-4 px-2 mb-2'
            >
                <h2
                className='text-xl font-bold mb-2'
                >
                    Se vores udvalg af værelser
                </h2>
                <div
                className='newsGrid'
                >
                    {rooms && rooms.map((r, index) => (
                        <NewsCard 
                        key={"home" + r.title}
                        news={{
                            id: r.room_id,
                            image: r.images[0],
                            teaser: r.description,
                            title: r.title
                        }}
                        /> 
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Homepage