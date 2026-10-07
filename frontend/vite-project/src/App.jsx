import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing'
import HomePage from './pages/HomePage';
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import PublicRoutes from './components/PublicRoutes.jsx';
import Wishlist from './pages/Wishlist.jsx';
import { CartContextProvider } from './context/CartContext.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes><Landing /></PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/signup" element={<PublicRoutes><Signup /></PublicRoutes>} />
          <Route path="/home" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path="/products" element={<ProtectedRoutes><Products /></ProtectedRoutes>}></Route>
          <Route path="/products/:id" element={<ProtectedRoutes><ProductDetails /></ProtectedRoutes>}></Route>
          <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>}></Route>
          <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>}></Route>
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
