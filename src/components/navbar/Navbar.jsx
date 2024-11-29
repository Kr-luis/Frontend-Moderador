import React from "react";
import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    const {dispatch} = useContext(DarkModeContext)
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    {/* <input type="text" placeholder="Search..." />
                    <SearchIcon/> */}
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageIcon className="icon"/>
                        Español
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })}/>
                    </div>
                    {/* <div className="item">
                        <FullscreenExitIcon className="icon"/>
                    </div> */}
                    {/* <div className="item">
                        <NotificationsNoneIcon className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineIcon className="icon"/>
                        <div className="counter">2</div>
                    </div> */}
                    <div className="item">
                        <ListIcon className="icon"/>
                    </div>
                    <div className="item">
                        <Link to="/profile" style={{ textDecoration: "none" }}> 
                            <img src="https://choicefineart.com/cdn/shop/products/portrait-series-bugs-bunny-983890.jpg?v=1688081893" alt="avatar" className="avatar"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar