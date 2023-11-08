import "./App.css";
import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1.jsx";
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import PageNoteFound from "./pages/PageNoteFound";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/ProductDetail.jsx";
import CheckOut from "./pages/CheckOut/CheckOut.jsx";
import Checkout from "./pages/Checkout.jsx";
import Cart from "./pages/Shopping Cart/ShoppingCart.jsx";
import Layout from "./components/Layout/masterLayout.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App() {
  return (
    <Layout className="App">
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Page1 />} />
        <Route path="/Products" element={<ProductList />} />
        <Route path="/Products/:slug" element={<ProductDetail />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Layout>
  );
}

export default App;
