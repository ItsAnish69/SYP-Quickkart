import Navbar from './components/navbar';
import Navbar2 from './components/navbar2';
import Footer from './components/footer';
import Home from './pages/home';
import Product from './pages/product';
import AboutUs from './pages/aboutUs';
import Contact from './pages/contact';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Error404 from './pages/error404page';
import ForgotPassword from './pages/forgotPassword';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from './contexts/ThemeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';

const App = () => {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location.pathname]);

  const validPaths = ['/', '/product', '/login', '/register', '/about-us', '/contact','/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isForm = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';
  const wrongURL = !validPaths.includes(location.pathname);

  return (
    <ThemeProvider>
    <>
    <Toaster/>
    {!isAdminRoute && !isForm && !wrongURL && (
       isLoggedIn ? <Navbar2/>: <Navbar/>)}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/*' element={<Error404/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
    </Routes>
    {!isAdminRoute && !isForm && !wrongURL && <Footer/>}
    </>
    </ThemeProvider>
  );
}

export default App;