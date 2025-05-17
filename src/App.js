import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/index";
import OrderNow from "./Pages/OrderNow";
import CheckOut from "./Pages/CheckOut";
import { OrderProvider } from "./components/OrderContext";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/order" element={<OrderNow />} />
            <Route path="/CheckOut" element={<CheckOut />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
