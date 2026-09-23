import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing'
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import PublicRoutes from './components/PublicRoutes.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes><Landing /></PublicRoutes>} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/signup" element={<PublicRoutes><Signup /></PublicRoutes>} />
          <Route path="/home" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
