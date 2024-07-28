import { useState, useEffect } from "react";
import "./assets/library/css/toolbar.css";

interface ToolbarProps {
    
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div className="toolbar">
            <div id="tools" >
                {/* <h3>
                    <a>
                        <img src="img/misc/Sticker.png" height="25"></img>
                    </a>
                </h3>
                <a href="#below-splash"><p>Home</p></a>
                <a href="Learning_Resources.html"><p>Learning Resources</p></a>
                <a href="Research.html"><p>Research</p></a>
                <a href="Workshops.html"><p>Workshops</p></a>
                <a href="Merch.html"><p>Merch</p></a>
                <a href="Contact.html"><p>Contact</p></a>
                <a href="About.html"><p>About</p></a> */}
            </div>
        </div>
    )
};

export default Toolbar;
