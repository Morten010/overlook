import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, useState } from 'react'
import { CgChevronDown } from 'react-icons/cg';

interface SelectProps {
  title: string,
  selected: {
    value: string;
    title: string
    }
  setSelected: Dispatch<React.SetStateAction<{
    value: string;
    title: string;
    }>>
  options: {
    value: string,
    title: string 
  }[]
  
}

const Select: FC<SelectProps> = ({title, options, selected, setSelected}) => {
    const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
        <div
        className='rounded-lg cursor-pointer select-none overflow-hidden'
        >
            <div
            className='p-2 px-4 bg-white flex justify-between items-center'
            onClick={() => setOpen(!open)}
            >
                {selected.title ? selected.title : title}
                <CgChevronDown />
            </div>
            <motion.div
            layout
            className='bg-white max-h-[300px] overflow-auto scrollbar'
            transition={{
                duration: 0.18
            }}
            >
                {open && options.map(option => (
                    <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0.2
                    }}
                    transition={{
                        delay: 0.16
                    }}
                    className='p-2 px-4 hover:bg-[#fafafa]'
                    onClick={() => setSelected(option)}
                    >
                        {option.title}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </AnimatePresence>
  )
}

export default Select