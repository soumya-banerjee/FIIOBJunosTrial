import React from 'react';

const FormInstructions = (props) => {

    const instructionLoop = props.instructions.map((instruction, index) => {
        return (
            <span key={index} className="list-group-item">
                <h4>{instruction.heading}</h4>
                <p>{instruction.value}</p>
            </span>
        );
    });


    return (
        <div className="col-lg-4" style={{color: '#777'}}>    
            <div className="wrapper wrapper-content project-manager">
                <h1> <i className="fas fa-sign-in-alt"></i> {props.title}</h1>
                <div className="ibox-content" style={{background: 'transparent'}}>
                    <div className="list-group">
                        {instructionLoop}
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default FormInstructions;