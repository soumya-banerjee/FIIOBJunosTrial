import React from 'react';
import { Link } from 'react-router-dom';

const TopNavElement = (props) => (
    <li>
        <a href={props.link}>
            <i className={`fa fa-${props.itemIcon}`}></i> {props.itemName}
        </a>
    </li>
);

export default TopNavElement;