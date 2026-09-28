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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes><Landing /></PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/signup" element={<PublicRoutes><Signup /></PublicRoutes>} />
          <Route path="/home" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
