import React from 'react';

const LeftNavBar = (props) => (
    <nav className="navbar-default navbar-static-side">
        <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
                {props.children}
            </ul>
        </div>
    </nav>
);

export default LeftNavBar;