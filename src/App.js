import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/index";
import OrderNow from "./Pages/OrderNow";
import CheckOut from "./Pages/CheckOut";
import { OrderProvider } from "./components/Order/OrderContext";
import { AuthProvider } from "./components/Checkout/AuthContext";
import Profile from "./components/SignUp/Profile";
import ProductCreate from "./components/Order/ProductCreate";
import OrderSuccess from "./components/Order/OrderSuccess";
import AboutUs from "./components/About/AboutUs";
import Contact from "./components/Contact/Contact";
import Reservation from "./components/SignUp/Reservation";
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
