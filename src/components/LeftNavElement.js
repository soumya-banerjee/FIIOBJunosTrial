import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNavElement = (props) => (
    <li>
        <NavLink to={props.link} activeStyle={{ color: 'white' }} >
            <i className={props.itemIcon}></i> 
            <span className="nav-label">{props.itemName}</span> 
        </NavLink>
    </li>
);

export default LeftNavElement;