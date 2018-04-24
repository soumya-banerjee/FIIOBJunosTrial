import React from 'react';
import $ from 'jquery';

const TopNavBar = (props) => {

    const SmoothlyMenu = () => {
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(200);
                }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(
                function () {
                    $('#side-menu').fadeIn(200);
                }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    }

    const clickNav = (event) => {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    }

    return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top  " role="navigation" style={{marginBottom: '0'}}>
            <div className="navbar-header">
                <button 
                    className="navbar-minimalize minimalize-styl-2 btn btn-danger"
                    onClick={clickNav}
                > 
                    <i className="fa fa-bars"></i> 
                </button>

                    <span className="minimalize-styl-2 m-r-sm header_text welcome-message">Football Is In Our Blood</span>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    {props.children}
                </ul>
            </nav>
        </div>

    );
}

export default TopNavBar;