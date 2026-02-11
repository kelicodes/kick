import { Navbar } from "../../Component/Navbarr/Navbar"
import Banner from "../../Component/Banner/Banner"
import "./Home.css"
import Join from "../../Component/Join/Join"
import { Newarrivals } from "../../Component/Newarrivals/Newarrivals"
import { Collection } from "../../Component/Collection/Collection"


export const Home=({lightMode,setLightMode})=>{


    return <>
   <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <Banner lightMode={lightMode} />
      <Newarrivals/>
       <Join />
       <Collection/>
    </>
}