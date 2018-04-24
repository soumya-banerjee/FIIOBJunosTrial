import React, { Component } from 'react';
import './App.css';
import LoginPage from './containers/LoginPage';
//import RegistrationPage from './containers/RegistrationPage';
import { Route, Switch } from 'react-router-dom';
import { HOME_PATH, REGISTRATION_PATH, ABOUT_PATH, DATA_PATH } from './Router';
import PageNotFound from './containers/PageNotFound';
import asyncComponent from './hoc/asyncComponent';


const AsyncRegistrationPage = asyncComponent(() => {
  return import('./containers/RegistrationPage');
});

class App extends Component {

  render() {

    return (
      <div className="App">    
      <Switch>   
        <Route path={DATA_PATH}  component={AsyncRegistrationPage} />
        <Route path={REGISTRATION_PATH}  component={AsyncRegistrationPage} />
        <Route path={ABOUT_PATH} component={AsyncRegistrationPage} />
        <Route path={HOME_PATH} exact component={LoginPage} />
        <Route component={PageNotFound} />
      </Switch>
      </div>
    );
  }
}

export default App;
