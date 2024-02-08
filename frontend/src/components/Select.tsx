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
  disabled?: boolean
}

const Select: FC<SelectProps> = ({title, options, selected, setSelected, disabled = false}) => {
    const [open, setOpen] = useState(false);
    console.log(disabled);
    
  return (
    <>
      {open && <div 
      className='absolute top-0 left-0 w-full h-[calc(100vh-20px)] z-[5] '
      onClick={() => disabled ? null : setOpen(false)}
      />}
      <AnimatePresence>
          <div
          className={`rounded-lg cursor-pointer select-none relative ${disabled ? "opacity-60 transition-opacity cursor-not-allowed" : ""}`}
          >
              <div
              className={`p-2 px-4 bg-white flex justify-between items-center z-10 ${open ? "border-b rounded-t-lg": " rounded-lg"}`}
              onClick={() => disabled ? null : setOpen(!open)}
              >
                  {selected.title ? selected.title : title}
                  <CgChevronDown />
              </div>
              <motion.div
              layout
              className='bg-white max-h-[300px] overflow-auto scrollbar absolute  -translate-y-full  left-0 z-20 w-full rounded-b-lg'

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
                      onClick={() => {
                        setSelected(option)
                        setOpen(false)
                      }}
                      >
                          {option.title}
                      </motion.div>
                  ))}
              </motion.div>
          </div>
      </AnimatePresence>
    </>
  )
}

export default Select