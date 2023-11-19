// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import ProductList from "./pages/Product/ProductList.jsx";
// import Register from "./pages/Auth/Register/Register";
// import Login from "./pages/Auth/Login/Login";
// import PageNoteFound from "./pages/PageNoteFound";
// import "react-toastify/dist/ReactToastify.css";
// import ProductDetail from "./pages/Product/ProductDetail.jsx";
// import CheckOut from "./pages/CheckOut/CheckOut.jsx";
// import Cart from "./pages/Shopping Cart/ShoppingCart.jsx";
// import Layout from "./components/Layout/masterLayout.jsx";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateCart } from "./redux/Actions/CartAction.js";
// import { isUserLoggedIn } from "./redux/Actions/UserAction.js";
// import Profile from "./pages/Auth/UserProfile/Profile.jsx";

// function App() {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!auth.isAuthenticated) {
//       dispatch(isUserLoggedIn());
//     }
//   }, [auth.isAuthenticated]);

//   useEffect(() => {
//     dispatch(updateCart());
//   }, []);

//   return (
//     <Layout className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/search/:keyword" element={<ProductList />} />
//         <Route path="/Products" element={<ProductList />} />
//         <Route path="/Products/:slug" element={<ProductDetail />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="*" element={<PageNoteFound />} />
//         <Route path="/check-out" element={<CheckOut />} />
//         <Route path="/Cart" element={<Cart />} />
//         <Route path="/Profile" element={<Profile />} />
//       </Routes>
//     </Layout>
//   );
// }

// export default App;

//Protected Routes
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ProductList from "./pages/Product/ProductList.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import PageNotFound from "./pages/PageNotFound.jsx";
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
import OrderSuccessful from "./pages/CheckOut/OrderSuccessfull.jsx";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct.jsx";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth.isAuthenticated]);

  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch, auth.isAuthenticated]);

  return (
    <Layout className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<ProductList />} />
        <Route path="/Products" element={<ProductList />} />
        <Route path="/Products/:slug" element={<ProductDetail />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        {/* {auth.isAuthenticated ? (
          <> */}
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/order-success" element={<OrderSuccessful />} />
        <Route path="/admin/update-product/:slug" element={<UpdateProduct />} />
        {/* </>
        ) : (
          <>
            <Route path="/check-out" element={<Login />} />
            <Route path="/Cart" element={<Login />} />
            <Route path="/Profile" element={<Login />} />
          </>
        )} */}
      </Routes>
    </Layout>
  );
}

export default App;
