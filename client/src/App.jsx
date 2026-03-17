import Navbar from './components/navbar';
import Navbar2 from './components/navbar2';
import Footer from './components/footer';
import Home from './pages/home';
import Product from './pages/product';
import Electronics from './pages/electronics';
import Groceries from './pages/groceries';
import HomeKitchen from './pages/homeKitchen';
import ProductDetails from './pages/productDetails';
import Favourite from './pages/favourite';
import Cart from './pages/cart';
import AboutUs from './pages/aboutUs';
import Contact from './pages/contact';
import Profile from './pages/profile';
import YourOrders from './pages/yourOrders';
import Help from './pages/help';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import ForgotPassword from './pages/forgotPassword';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Payment from './pages/payment';
import PaymentSuccess from './pages/paymentSuccess';
import { Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { isAdminUser, isAuthenticated, isLoggedInWithValidSession } from './lib/auth';
import { hydrateCartFromBackend } from './lib/shopStorage';

const LAST_VALID_PATH_KEY = 'lastValidPath';

const RequireAuth = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const RequireAdmin = ({ children }) => {
  return isAdminUser() ? children : <Navigate to="/" replace />;
};

const RedirectToLastValid = () => {
  const fallback = sessionStorage.getItem(LAST_VALID_PATH_KEY) || '/';
  return <Navigate to={fallback} replace />;
};

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isLoggedInWithValidSession());

  useEffect(() => {
    setIsLoggedIn(isLoggedInWithValidSession());
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoggedIn) return;
    hydrateCartFromBackend();
  }, [isLoggedIn]);

  const publicPaths = ['/', '/product', '/product/electronics', '/product/groceries', '/product/home-kitchen', '/help', '/login', '/register', '/about-us', '/contact', '/forgot-password'];
  const authOnlyPaths = ['/favourite', '/cart', '/payment', '/payment/success', '/profile', '/orders'];
  const adminOnlyPaths = ['/admin', '/admin/dashboard'];

  const isProductDetailsRoute = /^\/product\/\d+$/.test(location.pathname);

  const isPathAllowed = (pathname) => {
    if (/^\/product\/\d+$/.test(pathname)) {
      return true;
    }

    if (publicPaths.includes(pathname)) {
      return true;
    }

    if (authOnlyPaths.includes(pathname)) {
      return isAuthenticated();
    }

    if (adminOnlyPaths.includes(pathname)) {
      return isAdminUser();
    }

    return false;
  };

  useEffect(() => {
    const pathname = location.pathname;
    const allowed = isPathAllowed(pathname);

    if (allowed) {
      sessionStorage.setItem(LAST_VALID_PATH_KEY, pathname);
      return;
    }

    const fallback = sessionStorage.getItem(LAST_VALID_PATH_KEY) || '/';
    if (fallback !== pathname) {
      navigate(fallback, { replace: true });
    }
  }, [location.pathname, isLoggedIn, navigate]);

  const validPaths = [...publicPaths, ...authOnlyPaths];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isForm = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';
  const wrongURL = !validPaths.includes(location.pathname) && !isProductDetailsRoute;

  return (
    <ThemeProvider>
    <>
    <Toaster/>
    {!isAdminRoute && !isForm && !wrongURL && (
       isLoggedIn ? <Navbar2/>: <Navbar/>)}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/product/electronics' element={<Electronics/>}/>
      <Route path='/product/groceries' element={<Groceries/>}/>
      <Route path='/product/home-kitchen' element={<HomeKitchen/>}/>
      <Route path='/favourite' element={<RequireAuth><Favourite/></RequireAuth>}/>
      <Route path='/cart' element={<RequireAuth><Cart/></RequireAuth>}/>
      <Route path='/payment' element={<RequireAuth><Payment/></RequireAuth>}/>
      <Route path='/payment/success' element={<RequireAuth><PaymentSuccess/></RequireAuth>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/about-us' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
      <Route path='/orders' element={<RequireAuth><YourOrders/></RequireAuth>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin/dashboard' element={<RequireAdmin><AdminDashboard/></RequireAdmin>}/>
      <Route path='/*' element={<RedirectToLastValid/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/admin' element={<RequireAdmin><AdminDashboard/></RequireAdmin>}/>
    </Routes>
    {!isAdminRoute && !isForm && !wrongURL && <Footer/>}
    </>
    </ThemeProvider>
  );
}

export default App;