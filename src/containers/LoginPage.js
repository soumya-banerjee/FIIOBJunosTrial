import React , { Component } from 'react';
import toastr from 'toastr';
import FrontLogo from '../components/FrontLogo';
import PortalDescription from '../components/PortalDescription';
import FacebookLoginButton from '../components/FacebookLoginButton';
import { REGISTRATION_PATH } from '../Router';
import axios from 'axios';


toastr.options = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "preventDuplicates": true,
    "positionClass": "toast-top-center",
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "3000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

class LoginPage extends Component {

    state = {
        isLoggedIn: false,
        loggedInUser: null,
        buttonText: 'Checking Login Status..',
        disabled: false,
        auth_token: null,
        fiiobid: null,
        fb_access_token:''
      }

      componentDidMount() {
          this.setState({
              disabled: true
          });
      }
     
     
    onFacebookLogin = (loginStatus, resultObject) => {

        if (loginStatus === true) {
            this.getAuthToken(loginStatus, resultObject);
            //console.log(resultObject.user.name);
        } else {
        this.setState({
            isLoggedIn: false,
            buttonText: 'Login with Facebook',
            disabled: false
        });
        }
    }


    getAuthToken = (loginStatus, resultObject) => {

        const that=this;

        axios({
            method: 'post',
            url: '/getUserToken.php',
            headers: {
                //'Access-Control-Allow-Origin': 'https://localhost:3000',
                //'Access-Control-Request-Headers': 'Content-Type'
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': 'application/json'
            },
            data: {
              name: resultObject.user.name,
              fbid: resultObject.user.id
            }
          }).then(function (response) {

                const resp=response.data;

                if(resp.success){
                    that.setState({
                        loggedInUser: resultObject.user,
                        isLoggedIn: true,
                        disabled: false,
                        auth_token: resp.auth_token,
                        fiiobid: resp.body[0].user.fiiobid,
                        fb_access_token: resultObject.authResponse.accessToken
                    }, () => {
                        toastr.success('Hi '+that.state.loggedInUser.first_name+', You are now logged in to FIIOB', 'Logged In!');
                    });
                } 
                else {
                    that.setState({
                        isLoggedIn: false,
                        buttonText: 'Login with Facebook',
                        disabled: false
                    });
                }          
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    navigateToRegisterRoute = () => {
        toastr.remove();
        this.props.history.replace({
            pathname: REGISTRATION_PATH,
            state: this.state
        });
    }

    render(){
        let loginPanel = this.state.isLoggedIn ? (
                <button
                type="submit"
                className="btn btn-success full-width m-b"
                disabled={this.state.disabled}
                onClick={this.navigateToRegisterRoute}
                >
                <img
                    src={`https://graph.facebook.com/${this.state.loggedInUser.id}/picture?type=square&access_token=${this.state.fb_access_token}`}
                    className="img-rounded img-sm"
                    alt="user display picture"
                /> &nbsp;&nbsp;Continue with Facebook
                </button>
            ) : (<FacebookLoginButton
                        disabled={this.state.disabled}
                        buttonText={this.state.buttonText}
                        onLogin={this.onFacebookLogin}
                        leftLogo="facebook-square"
                    />
            );

        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <FrontLogo logoname="FIIOB" subtitle="Junos Kolkata Trial" />

                    <PortalDescription>
                        <p>Register and nominate yourself for a trial in the FIIOB Junos Team </p>
                    </PortalDescription>

                    {loginPanel}

                    <p className="m-t">
                        <small>FIIOB does not post anything to facebook. The portal uses facebook authentication to access your public data for the registration.</small>
                    </p>
                </div>
            </div>  
        );
    }
}

export default LoginPage;