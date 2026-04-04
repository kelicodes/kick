import { Navbar } from "../../Component/Navbarr/Navbar";
import Banner from "../../Component/Banner/Banner";
import "./Home.css";
import Join from "../../Component/Join/Join";
import { Newarrivals } from "../../Component/Newarrivals/Newarrivals";
import { Collection } from "../../Component/Collection/Collection";
import Footer from "../../Component/Footer/Footer";
import HeroSlider from "../../Component/Heroslider/Heroslider";
import ShopByCategory from "../../Component/ShopBy/ShopBy";

export const Home = ({ lightMode, setLightMode }) => {
  return (
    // Add this wrapper div and conditionally apply the "dark" class
    <div className={lightMode ? "" : "dark"}>
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <HeroSlider/>
      <ShopByCategory/>
      <Newarrivals />
      <Join />
      <Collection />
   
    </div>
  );
};
