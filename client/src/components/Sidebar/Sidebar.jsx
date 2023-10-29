import React, { useState } from "react";
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";

const Sidebar = ({children}) => {
    const[isOpen,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem = [
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<HomeIcon/>
        },
        {
            path:"/likes",
            name:"Likes",
            icon:<FavoriteIcon/>
        },
        {
            path:"/shoppingcart",
            name:"ShoppingCart",
            icon:<ShoppingCartIcon/>
        },
    ]
    return (
        <div className="container">
            <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bar">
                    <MenuIcon onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
};


export default Sidebar;