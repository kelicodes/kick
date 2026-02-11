import { useState, useEffect } from "react";
import { Home } from "./Pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import "./App.css";
import { ProductPage } from "./Pages/Product/Product";
import { Navbar } from "./Component/Navbarr/Navbar";
import Footer from "./Component/Footer/Footer";
import MyCart from "./Pages/mycart/Mycart";

function App() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    // toggle body class for global dark/light mode styles
    if (lightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [lightMode]);

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home lightMode={lightMode} setLightMode={setLightMode} />}/>
      <Route path="/product/:id" element={<ProductPage/>}/>
      <Route path="/mycart" element={<MyCart />} />
      <Route path="/login" element={}
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
