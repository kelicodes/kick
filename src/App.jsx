import { useState, useEffect } from "react";
import { Home } from "./Pages/Home/Home";
import "./App.css";

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
      <Home lightMode={lightMode} setLightMode={setLightMode} />
    </>
  );
}

export default App;
