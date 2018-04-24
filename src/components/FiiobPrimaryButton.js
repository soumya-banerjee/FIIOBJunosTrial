import React from 'react';

const FiiobPrimaryButton = (props) => {

    if (props.leftLogo) {
      return(
        <button
          type="submit"
          className="btn btn-success full-width m-b"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          <i className={`fab fa-${props.leftLogo}`}> </i> &nbsp;&nbsp;{props.buttonText}
        </button>
      );
    }

    return(
      <button
        type="submit"
        className="btn btn-success full-width m-b"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.buttonText}
      </button>
    );
}

export default FiiobPrimaryButton;
