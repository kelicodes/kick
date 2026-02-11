import { Navbar } from "../../Component/Navbarr/Navbar"
import Banner from "../../Component/Banner/Banner"
import "./Home.css"
import Join from "../../Component/Join/Join"
import { Newarrivals } from "../../Component/Newarrivals/Newarrivals"


export const Home=({lightMode,setLightMode})=>{


    return <>
   <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <Banner lightMode={lightMode} />
      <Join />
      <Newarrivals/>
    </>
}