// app.jsx
import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import OrderHistory from './component/OrderHistory';
import Navbar from "./component/navbar";
import Navbaradm from "./admin/navbaradm";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Orderpage from "./pages/orderPage";
import UserProfile from "./pages/UserProfile";
import GamePage from "./pages/gamepage";
import Home from "./pages/home";
import About from "./pages/about";
import Admin from "./pages/admin";
import Homeadmin from "./admin/homeadm";
import Footer from './component/footer';
import SurketForm from './pages/surketform'; 
import SurketHistory from './pages/surkethistory';
import ProtectedRoute from './ProtectedRoute';
import SurketList from './admin/allsurket';
import OrdersList from './admin/allorder';
import Createpesan from './admin/createpesan';
import Review from './component/review';
import Warga from './admin/allwarga';
import Pesan from './pages/pesan';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/homeadmin12","/admin","/orderlist", "/surketlist","/register","/createpesan","/warga" ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/products/:id" element={<Orderpage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Navbaradmin" element={<Navbaradm />} />
        <Route path="/homeadmin12" element={<ProtectedRoute><Homeadmin /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/surkethistory" element={<SurketHistory />} />
        <Route path="/orderlist" element={<OrdersList />} />
        <Route path="/surketlist" element={<SurketList />} />
        <Route path="/review" element={<Review />} />
        <Route path="/createpesan" element={<Createpesan />} />
        <Route path="/warga" element={<Warga />} />
        <Route path="/pesan" element={<Pesan />} />

        <Route path="/suket" element={<ProtectedRoute><SurketForm /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <VStack minH="100vh" minW="100vw" bgColor="gray.100">
      <Router>
        <AppContent />
        <Footer />
      </Router>
    </VStack>
  );
}

export default App;
