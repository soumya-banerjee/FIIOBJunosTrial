import React from 'react';

const LeftNavHeader = (props) => {
    
    if (props.loggedInUser)
    {
        return (
        <li className="nav-header">
            <div className="dropdown profile-element"> 
                <span>
                    <img alt="fbdp" className="img-circle circle-border" src={`https://graph.facebook.com/${props.loggedInUser.id}/picture?height=76&width=76&access_token=${props.fb_access_token}`} />
                    <br/><br/>
                    <span className="block m-t-xs"> Welcome, </span>
                    <span className="block m-t-xs"> <strong className="font-bold">{props.loggedInUser.name}</strong></span>
                </span>
            </div>
            <div className="logo-element">
                {props.loggedInUser.first_name.substring(0,1).toUpperCase()}{props.loggedInUser.last_name.substring(0,1).toUpperCase()}
            </div>
        </li>
        );
    }
    return null;
}

export default LeftNavHeader;