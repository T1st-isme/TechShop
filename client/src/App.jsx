import "./App.css";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import PageNoteFound from "./pages/PageNoteFound";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import ShoppingCart from "./pages/ShoppingCart";
import Likes from "./pages/Likes";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="App">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/Products" element={<Page1 />} />
            <Route path="/Pricing" element={<Page2 />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<PageNoteFound />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Likes" element={<Likes />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Sidebar" element={<Sidebar />} />
          </Routes>
        
      </div>
    </>
  );
}

export default App;
