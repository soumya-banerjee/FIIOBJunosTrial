import React from 'react';

const Loader = (props) => (
    <div class="spiner-example">
        <div class="sk-spinner sk-spinner-cube-grid">
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
            <div class="sk-cube"></div>
        </div>
        <br />
        <div style={{textAlign: 'center'}}>{props.text}</div>
    </div>
);

export default Loader;