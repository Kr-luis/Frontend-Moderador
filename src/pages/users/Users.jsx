import "./users.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datausuarios from "../../components/datausers/Datausers"

const Mods = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <Datausuarios/>
            </div>
        </div>
    )
}

export default Mods