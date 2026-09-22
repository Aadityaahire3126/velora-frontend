import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import Analytics from "./pages/Analytics";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/admin/products"element={<ProtectedRoute allowedRole="admin"><AdminProducts /></ProtectedRoute>}/>
        <Route path="/admin/orders"element={<ProtectedRoute allowedRole="admin"><AdminOrders /></ProtectedRoute>}/>
        <Route path="/admin/analytics"element={<ProtectedRoute allowedRole="admin"><Analytics /></ProtectedRoute>}/>
        <Route path="/about" element={<About />} />
        <Route path="/cart"element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;