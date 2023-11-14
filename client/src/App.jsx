import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/Product/ProductList.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import PageNoteFound from "./pages/PageNoteFound";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import CheckOut from "./pages/CheckOut/CheckOut.jsx";
import Cart from "./pages/Shopping Cart/ShoppingCart.jsx";
import Layout from "./components/Layout/masterLayout.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "./redux/Actions/CartAction.js";
import { isUserLoggedIn } from "./redux/Actions/UserAction.js";
import Profile from "./pages/Auth/UserProfile/Profile.jsx";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);

  return (
    <Layout className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<ProductList />} />
        <Route path="/Products" element={<ProductList />} />
        <Route path="/Products/:slug" element={<ProductDetail />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
