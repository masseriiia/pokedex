import {Header} from "../components/Header/Header";
import {Outlet} from "react-router-dom";
import '../index.css'

export const Layout = () => {
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}
