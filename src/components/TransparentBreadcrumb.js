import React from 'react';


const TransparentBreadcrumb = (props) => {

    let path = props.path;
    path = path.charAt(0) + ' ' + path.charAt(1).toUpperCase() + props.path.slice(2)

    return(
        <div className="row wrapper border-bottom page-heading" style={{backgroundColor: 'transparent'}}>
            <div className="col-sm-12" style={{backgroundColor: 'transparent'}}>
            <h1 style={{ color: 'white' }}> {path.slice(1)} </h1>
                <ol className="breadcrumb breadcrumb-transparent">
                    <li className="active">
                        FIIOB Junos Kolkata {path}
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default TransparentBreadcrumb;