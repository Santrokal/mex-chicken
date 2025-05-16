import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/index";
import OrderNow from "./Pages/OrderNow";
import CheckOut from "./Pages/CheckOut";
import { OrderProvider } from "./components/OrderContext";

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<OrderNow />} />
          <Route path="/CheckOut" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
