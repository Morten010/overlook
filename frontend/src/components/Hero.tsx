import axios from "axios";
import { useQuery } from "react-query";
import { ImageProps } from "../types";

export const Hero = ({
    title,
    image
}: {
    title: string,
    image: string
}) => {
    
    const { data } = useQuery({
        queryFn: async () => {
            const url = "http://localhost:4000/imagelist"
            const { data } = await axios.get(url)

            const i = data.find((i: ImageProps) => i.filename.includes(image))
            console.log(i);
            return i as ImageProps
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
                className='w-3/4 lg:w-2/4 h-full flex flex-col justify-center'
                >
                    <h1
                    className='text-2xl rounded-br-full text-white uppercase py-2 pl-4 pr-5 bg-black/80'
                    >
                        {title}
                    </h1>
                    <div 
                    className='w-[70%] h-4 bg-red-500/80 rounded-br-full'
                    />
                </div>
            </div>
        </div>
    )
}