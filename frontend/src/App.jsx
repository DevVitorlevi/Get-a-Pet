import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Auth/Register'
//components
import Header from './components/Header'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
