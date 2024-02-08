import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

// fik hjælp her til at læse animation problem
// https://github.com/framer/motion/issues/565#issuecomment-632717489

const Container = forwardRef<HTMLDivElement, ContainerProps>(({
    children,
    className,
    ...props
}, ref) => {
    return(
        <div
        ref={ref}
        className={`max-w-screen-lg mx-auto p-4 ${className}`}
        {...props}
        >
            {children}
        </div>
    )
})

export const MotionContainer = motion(Container)

export default Container