import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

//const env = "dev";
axios.defaults.baseURL=  "https://localhost/phpcontainer/";
//axios.defaults.baseURL="/junostrial/phpcontainer/";
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


ReactDOM.render(
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>, 
    document.getElementById('root'));

registerServiceWorker();
