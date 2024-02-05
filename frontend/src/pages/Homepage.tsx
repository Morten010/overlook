import axios from 'axios'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { ImageProps, NewsProps } from '../types'
import NewsCard from '../components/NewsCard'

interface HomepageProps {
  
}

const Homepage: FC<HomepageProps> = ({}) => {
    const {data: news} = useQuery({
        queryFn: async () => {
            const url = "http://localhost:4000/news";
            const { data } = await axios.get(url)

            return data as NewsProps[]
        },
        queryKey: ["news-Frontpage"]
    })

    console.log(news);
    

  return (
    <div>
        <Hero />
        <div
        className='mt-4 px-2'
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
    </div>
  )
}

export default Homepage

const Hero = () => {
    
    const { data } = useQuery({
        queryFn: async () => {
            const url = "http://localhost:4000/imagelist"
            const { data } = await axios.get(url)

            console.log(data);
            return data[0] as ImageProps
        },
        queryKey: ["heroImage"]
    })

    return (
        <div
        className='h-[calc(100vh-110px)] bg-black/20 relative'
        >
            <img 
            className='absolute -z-10 h-full w-full object-cover'
            src={data?.filename} 
            alt={data?.title} 
            />
            <div
            className='max-w-screen-lg mx-auto h-full'
            >
                <div
                className='w-2/4 h-full flex flex-col justify-center'
                >
                    <h1
                    className='text-2xl rounded-br-full text-white uppercase py-2 pl-4 bg-black/80'
                    >
                        velkommen til hotel overlook online
                    </h1>
                    <div 
                    className='w-[70%] h-4 bg-red-500/80 rounded-br-full'
                    />
                </div>
            </div>
        </div>
    )
}