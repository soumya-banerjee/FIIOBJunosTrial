import React from 'react';

const TimelineContent = (props) => {

    console.log(props);

    return(
    <div className="timeline-item">
        <div className="row">
            <div className="col-xs-3 date">
                <i className={props.icon}></i>
                {props.label1}
                <br/>
                <small className="text-navy">{props.label2}</small>
            </div>
            <div className="col-xs-7 content no-top-border">
                <p className="m-b-xs"><strong>{props.heading}</strong></p>
                <p>{props.children}</p>
            </div>
        </div>
    </div>
    );
}

export default TimelineContent;