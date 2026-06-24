import './App.css';
import Navbar from './component/navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
    <Routes>
     <Route path="/" element={<Shop />} />
     <Route path="/mens" element={<ShopCategory category="mens" />} />
     <Route path="/womens" element={<ShopCategory category="womens" />} />
     <Route path="/kids" element={<ShopCategory category="kids" />} />
     <Route path="/product" element={<Product />} />
     <Route path="/category/:id" element={<ShopCategory />} />
     <Route path=':productId' element={<Product />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/login" element={<LoginSignup />} />
      





    </Routes>


    


      </div>
    </BrowserRouter>
  );
}

export default App;
