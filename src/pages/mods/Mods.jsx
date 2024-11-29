import "./mods.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/navbar"
import Dataimportant from "../../components/dataimportant/Dataimportant"

const Mods = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <Dataimportant/>
            </div>
        </div>
    )
}

export default Mods