import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HotelsLayout from './layout/HotelsLayout'
import MainLayout from './layout/MainLayout'
import Homepage from './pages/Homepage'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import HotelCity from './pages/hotels/HotelCity'
import HotelPlace from './pages/hotels/HotelPlace'
import Hotels from './pages/hotels/Hotels'
import HotelsCountry from './pages/hotels/HotelsCountry'
import { useUser } from './store/useUser'
import Reservation from './pages/Reservation'
import Admin from './pages/dashboard/Admin'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

function App() {
  const { user } = useUser()

  return (
    <>
      <QueryClientProvider
      client={queryClient}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>

              <Route path='/' element={<Homepage />} />

              {/* hotel routes */}
              <Route path='/hotels' element={<HotelsLayout />}>
                <Route path='/hotels' element={<Hotels />} />
                <Route path='/hotels/:country' element={<HotelsCountry />} />
                <Route path='/hotels/:country/:city' element={<HotelCity />} />
                <Route path='/hotels/:country/:city/:hotel' element={<HotelPlace />} />
              </Route>
              {/* hotel routes */}

              {/* auth routes */}
              <Route path='/login' element={user ? <Navigate to="/admin" /> : <Login />} />
              <Route path='/signup' element={user ? <Navigate to="/admin" /> : <SignUp />} />
              <Route path='/admin' element={user ? <Admin /> : <Navigate to="/login" />} />
              {/* auth routes */}

              <Route path='/reservation' element={user ? <Reservation /> : <Navigate to="/login" />} />


              {/* 404 page */}
              <Route path='/*' element={<p
              className='font-bold text-2xl text-center my-60'
              >
                Page do not exist 404
              </p>} />


            </Route>
          </Routes>
          <Toaster richColors/>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
