import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/index";
import OrderNow from "./Pages/OrderNow";
import CheckOut from "./Pages/CheckOut";
import { OrderProvider } from "./components/OrderContext";
import { AuthProvider } from "./components/Checkout/AuthContext";
import Profile from "./components/Profile";
import ProductCreate from "./components/ProductCreate";
import OrderSuccess from "./components/OrderSuccess";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Reservation from "./components/Reservation";
function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/order" element={<OrderNow />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/product" element={<ProductCreate />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
