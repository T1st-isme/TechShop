import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/masterLayout.jsx";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

function App() {
  return (
    <>
      <Layout>
        <div className="App">
          <Routes>
            <Route path="/Products" element={<Page1 />} />
            <Route path="/Pricing" element={<Page2 />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Layout>
    </>
  );
}

export default App;
