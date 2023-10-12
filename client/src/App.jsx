// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/masterLayout.jsx";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";

function App() {
  return (
    <>
      <Layout>
        <div className="App">
          <Routes>
            <Route path="/Products" element={<Page1 />} />
            <Route path="/Pricing" element={<Page2 />} />
          </Routes>
        </div>
      </Layout>
    </>
  );
}

export default App;
