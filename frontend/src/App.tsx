import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { QueryClient, QueryClientProvider } from 'react-query'
import Footer from './components/Footer'
import Hotels from './pages/Hotels'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider
      client={queryClient}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/hotels' element={<Hotels />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
