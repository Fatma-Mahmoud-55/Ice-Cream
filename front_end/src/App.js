import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home/Home';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { Product } from './pages/Product/Product';
import { NotFound } from './pages/NotFound/NotFound';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/SignUp/Signup';
import { Toaster } from 'react-hot-toast';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { setProductData } from './redux/productSlide';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SuccessPayment } from './pages/SuccessPayment/SuccessPayment';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  const fetchProducts = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
    const products = await response.json()
    dispatch(setProductData(products))
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  // console.log(productData)
 


  return (
    <>
    <Toaster/>
    <div>

    <Header />
        <div className='container bg-red-100 min-h-[calc(100vh)] min-w-full'>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="success" element={<SuccessPayment />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>

        </div>
    </div>

    </>
  );
}

export default App;
