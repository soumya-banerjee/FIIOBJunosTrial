import React, { Component } from 'react';
import LeftNavBar from '../components/LeftNavBar';
import LeftNavHeader from '../components/LeftNavHeader';
import LeftNavElement from '../components/LeftNavElement';
import TopNavBar from '../components/TopNavBar';
import { REGISTRATION_PATH, ABOUT_PATH, HOME_PATH, DATA_PATH } from '../Router';
import TopNavElement from '../components/TopNavElement';
import TransparentBreadcrumb from '../components/TransparentBreadcrumb';
import RegistartionForm from './RegistrationForm';
import AboutContent from './AboutContent';
import DataPage from './DataPage';


class RegistrationPage extends Component {

    state = this.props.location.state || null;

    componentDidMount(){
        
        if (!this.state){
            this.props.history.replace(HOME_PATH);
        }
    }


    render(){

        const loggedInUser = this.state ? this.state.loggedInUser : null;
        const auth_token =  this.state ? this.state.auth_token : null;
        const fiiobid = this.state ? this.state.fiiobid : null;
        const fb_access_token = this.state ? this.state.fb_access_token : null;

        const LoadContentByRoute = () => {

            let subComponentToLoad=null;

            switch (this.props.location.pathname) {
                case REGISTRATION_PATH:
                    subComponentToLoad = <RegistartionForm loggedInUser={loggedInUser} auth_token={auth_token} fiiobid={fiiobid} fb_access_token={fb_access_token} />
                    break;
                case ABOUT_PATH:
                    subComponentToLoad = <AboutContent loggedInUser={loggedInUser} auth_token={auth_token} fiiobid={fiiobid} />
                    break;
                case DATA_PATH:
                    subComponentToLoad = <DataPage loggedInUser={loggedInUser} auth_token={auth_token} fiiobid={fiiobid} />
                    break;
                default :
                    subComponentToLoad = <RegistartionForm loggedInUser={loggedInUser} auth_token={auth_token} fiiobid={fiiobid} fb_access_token={fb_access_token} />
                    break;
            }
                
            return subComponentToLoad;        
        }


        return(  
            <div id="wrapper">
                <LeftNavBar>
                    <LeftNavHeader loggedInUser={loggedInUser} fb_access_token={fb_access_token} />
                    <br/>
                    <LeftNavElement link={REGISTRATION_PATH} itemName="Register" itemIcon="fa fa-hand-point-right"/>
                    <LeftNavElement link={ABOUT_PATH} itemName="About Junos" itemIcon="fa fa-info-circle"/>
                    <LeftNavElement link={DATA_PATH} itemName="Console" itemIcon="fas fa-terminal"/>
                </LeftNavBar>
                
                <div id="page-wrapper" className="gray-bg">
                    
                    <TopNavBar>
                        <TopNavElement link="/junostrial" itemIcon="sign-out-alt" itemName="Logout" />
                    </TopNavBar>
                    
                    <TransparentBreadcrumb path={this.props.match.path}/>

                    <div className="row wrapper border-bottom header_image_panel" >
                    </div>

                        {LoadContentByRoute()}
                    
                    {/*}
                    <div className="footer">
                        <div className="pull-right">
                            10GB of <strong>250GB</strong> Free.
                        </div>
                        <div>
                            <strong>Copyright</strong> Example Company &copy; 2014-2017
                        </div>
                    </div>
                    {*/}

                </div>
            </div>
        );
    }
}

export default RegistrationPage;