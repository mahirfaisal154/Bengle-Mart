import './App.css';
import Navbar from './component/navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import men_banner from './component/Assets/banner_mens.png'
import Women_banner from './component/Assets/banner_women.png'
import kid_banner from './component/Assets/banner_kids.png'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
    <Routes>
     <Route path="/" element={<Shop />} />
     <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
     <Route path="/womens" element={<ShopCategory banner={Women_banner} category="women" />} />
     <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
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
