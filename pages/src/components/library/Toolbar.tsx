import { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import "./assets/library/css/nav-bar.css";

interface NavBarProps {
    
}

const NavBar = (props: NavBarProps) => {
    return (
        <div className="nav-bar">
            <h1>MAIC Learning Tree</h1>
            <Button/>
        </div>
    )
};

export default NavBar;
