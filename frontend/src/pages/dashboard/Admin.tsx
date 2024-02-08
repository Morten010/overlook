import { FC } from 'react'
import Container from '../../components/Container'

interface adminProps {
  
}

const Admin: FC<adminProps> = ({}) => {
  return (
    <Container
    className='max-w-screen-lg mx-auto p-4'
    >
        <h1
        className='text-2xl font-bold'
        >
            Admin
        </h1>
    </Container>
  )
}

export default Admin