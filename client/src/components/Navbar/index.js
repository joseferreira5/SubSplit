import React from "react";
import "./nav.css";

const Navbar = (props) => {
    return(
    <div className = "header clearfix container">
        <div className = "title"><h1>{props.children}</h1></div>
        <div className="login">
         <h3> <a href = "#" >Login/Create Account {props.login}</a></h3>
        </div>
    </div>
    )
} 

export default Navbar;