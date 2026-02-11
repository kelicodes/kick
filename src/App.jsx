import { useState, useEffect } from "react";
import { Home } from "./Pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import "./App.css";
import { ProductPage } from "./Pages/Product/Product";

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
    <Routes>
      <Route path="/" element={<Home lightMode={lightMode} setLightMode={setLightMode} />}/>
      <Route path="/product/:id" element={<ProductPage/>}/>
    </Routes>
  );
}

export default App;
