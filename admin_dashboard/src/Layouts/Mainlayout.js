import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../App.css";

const Mainlayout = () => {

    return (
        <>
            <div className="App">
                <div className="AppGlass">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default Mainlayout;