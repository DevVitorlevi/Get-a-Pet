import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Auth/Register'
//components
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/Content'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Content>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </Content>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
