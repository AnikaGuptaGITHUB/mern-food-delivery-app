import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from "./pages/Verify/Verify";

// Components
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/Navbar/Navbar';

// Store context
import StoreContextProvider from './context/StoreContextProvider';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <StoreContextProvider>
      <>
        {/* Login Popup */}
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

        <div className='app'>
          {/* Navbar */}
          <Navbar setShowLogin={setShowLogin} />

          {/* Routes */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/Verify' element={<Verify/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </>
    </StoreContextProvider>
  );
};

export default App;
