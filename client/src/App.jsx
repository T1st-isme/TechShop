import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/masterLayout.jsx";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import PageNoteFound from "./pages/PageNoteFound";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/Products" element={<Page1 />} />
            <Route path="/Pricing" element={<Page2 />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<PageNoteFound />} />
          </Routes>
        </div>
      </Layout>
    </>
  );
}

export default App;
