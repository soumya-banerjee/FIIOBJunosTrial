import React from 'react';

const FormPlaceholder = (props) => (
    <div className="wrapper wrapper-content">
        <div className="row animated fadeIn">
            {props.children}   
        </div>
    </div>
);

export default FormPlaceholder;