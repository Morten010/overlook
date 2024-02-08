import { FC, useState } from 'react'
import { NewsProps } from '../types'
import { AnimatePresence, motion } from 'framer-motion'

interface NewsCardProps {
  news: NewsProps
}

const NewsCard: FC<NewsCardProps> = ({news}) => {
    const [hide, setHide] = useState(true)

  return (
    <div
    className='flex flex-col gap-2 shadow-xl relative overflow-hidden cursor-pointer max-w-[500px]'
    onMouseEnter={() => {
        setHide(false)
    }}
    onMouseLeave={() => {
        setHide(true)
    }}
    >
        <img 
        src={"http://localhost:4000/images/" + news.image.filename}
        alt={news.title}
        className='aspect-video object-cover' 
        />
        <AnimatePresence>
            <motion.div
            className='p-2 absolute bottom-0 left-0 bg-white w-full'
            layout
            >
                <motion.h3
                layout
                className={`font-bold text-lg ${hide ? "" : "text-red-600"} transition-colors`}
                >
                    {news.title}
                </motion.h3>
                {!hide && <motion.p
                layout
                >
                    {news.teaser.slice(0,130)}
                </motion.p>}
            </motion.div>
        </AnimatePresence>

    </div>
  )
}

export default NewsCard