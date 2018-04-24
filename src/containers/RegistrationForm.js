import React, { Component } from 'react';
//import FiiobDatePicker from '../components/FiiobDatePicker';
import FormPlaceholder from '../components/FormPlaceholder';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select, { Creatable } from 'react-select';
import { Checkbox } from 'react-icheck';
import axios from 'axios';
import toastr from 'toastr';
import Loader from '../components/Loader';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies


import {KolkataLocality} from '../KolkataLocality';
import FiiobPrimaryButton from '../components/FiiobPrimaryButton';
import FormInstructions from './FormInstructions';

import 'sweetalert/dist/sweetalert.css';
import 'icheck/skins/all.css'; 
import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';
import FiiobDefaultButton from '../components/FiiobDefaultButton';
import FiiobRedButton from '../components/FiiobRedButton';



class RegistartionForm extends Component {

    state = {
        username: this.props.loggedInUser ? this.props.loggedInUser.name : '',
        startDate: moment("04212000", "MMDDYYYY"),
        birthdate: null,
        selectedPositionOptions: '',
        selectedLocationOption: '',
        contactNumber: '',
        termsAgreed: false,
        submitButtonDisabled: false,
        submitButtonText:'Submit Registration',
        invalidFormData: false,
        errorMessage: '',
        loadingContent: false,
        userRegistered: false,
        formRenderError:false,
        withdrawButtonDisabled: false,
        withdrawButtonText: 'Withdraw',
        editButtonDisabled: false,
        editButtonText: 'Edit',
        showConfirmModal: false,
        editFormFlag: false
    };


    componentDidMount(){

        const that=this;

        if (!this.props.loggedInUser || this.state.editFormFlag)
            return;

        axios({
            method: 'post',
            url: '/checkJunosRegistration',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                fbid: this.props.loggedInUser.id,
                auth_token: this.props.auth_token,
                fiiob_id: this.props.fiiobid
            }
            }).then(function (response) {

                if(response.data.success){
                    if(response.data.body.length > 0){      
                        that.setState({
                            loadingContent: false,
                            userRegistered: true,
                            username: response.data.body[0].user.name,
                            birthdate: response.data.body[0].user.birthdate,
                            selectedPositionOptions: response.data.body[0].user.positions,
                            selectedLocationOption: response.data.body[0].user.location,
                            contactNumber: response.data.body[0].user.contact_number,
                        });  
                    } else {
                        that.setState({
                            loadingContent: false,
                            userRegistered: false
                        }); 
                    }
                } else {
                    that.setState({
                        loadingContent: false,
                        formRenderError: true,
                    }); 
                }
            })
            .catch(function (error) {
                that.setState({
                    loadingContent: false,
                    formRenderError: true
                }); 
            });
    }


    updateInputValue = (evt) => {
        this.setState({
          username: evt.target.value
        });
      }

    updateContactNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)){
            this.setState({contactNumber: e.target.value});  
        }        
    }

    handleDateChange = (date) => {
        const strdate = moment(date, 'MM/DD/YYYY');
        this.setState({
            startDate: date,
            birthdate: strdate
        });
    }

    handlePositionChange = (selectedPositionOptions) => {
        this.setState({ selectedPositionOptions });
    }

    handleLocalityChange = (selectedLocationOption) => {
        this.setState({ selectedLocationOption });
    }

    handleCheckboxChange = (e, checked) => {
        this.setState({termsAgreed: checked});
    }

    submitForm = () => {

        const that = this;

        axios({
            method: 'post',
            url: '/registerJunosTrial',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                fbid: this.props.loggedInUser.id,
                name: this.state.username,
                birthdate: moment(this.state.birthdate).format("MM/DD/YYYY"),
                positions: this.state.selectedPositionOptions,
                location: this.state.selectedLocationOption,
                auth_token: this.props.auth_token,
                fiiob_id: this.props.fiiobid,
                contactNumber: this.state.contactNumber
            }
          }).then(function (response) {

                if(response.data.success){
                    that.setState({
                        loadingContent: false,
                        editFormFlag: false,
                        userRegistered: true,
                        username: that.props.loggedInUser ? that.props.loggedInUser.name : '',
                        submitButtonDisabled: false,
                        submitButtonText:'Submit Registration',
                    });  
                    toastr.success('Hi '+that.state.username+', Your regstration has been processed', 'Registered!'); 
                } else {
                    that.setState({
                        loadingContent: false,
                        editFormFlag: false,
                        userRegistered: false,
                        invalidFormData: true,
                        submitButtonDisabled: false,
                        submitButtonText:'Submit Registration',
                        errorMessage: response.data.error[0].error_message,
                    }); 
                }
            })
            .catch(function (error) {
                that.setState({
                    loadingContent: false,
                    editFormFlag: false,
                    userRegistered: false,
                    invalidFormData: true,
                    submitButtonDisabled: false,
                    submitButtonText:'Submit Registration',
                    errorMessage: "Oops! An error occured while submitting the request. Please check your internet connection / firewall settings"
                }); 
            });
    }


    validateForm = (e) => {
        e.preventDefault();
        
        if(this.state.username.trim() === ''){
            this.setState({
                invalidFormData: true,
                errorMessage: 'Your name cannot be left blank'
            });
            return;
        }

        if (/[^a-zA-Z ]+$/.test(this.state.username)) {
            this.setState({
                invalidFormData: true,
                errorMessage: 'That\'s an invalid name! '
            });
            return;
        }

        if (!this.state.birthdate) {
            this.setState({
                invalidFormData: true,
                errorMessage: 'You date of birth cannot be left blank'
            });
            return;
        }

        if (!moment(this.state.birthdate).isValid()) {
            this.setState({
                invalidFormData: true,
                errorMessage: 'You seem to have entered an invalid date of birth'
            });
            return;
        }

        if (this.state.selectedPositionOptions.trim() === '') {
            this.setState({
                invalidFormData: true,
                errorMessage: 'Your preferred postions cannot be left blank'
            });
            return;
        }

        if(this.state.selectedLocationOption.trim() === '') {
            this.setState({
                invalidFormData: true,
                errorMessage: 'Your location cannot be left blank'
            });
            return;
        }


        if(this.state.contactNumber.trim() === '') {
            this.setState({
                invalidFormData: true,
                errorMessage: 'Your contact number cannot be left blank'
            });
            return;
        }


        if (/[^0-9]+$/.test(this.state.contactNumber) || this.state.contactNumber.length !== 10) {
            this.setState({
                invalidFormData: true,
                errorMessage: 'That\'s an invalid contact number! '
            });
            return;
        }
        

        if(!this.state.termsAgreed) {
            this.setState({
                invalidFormData: true,
                errorMessage: 'You need to declare by checking the checkbox'
            });
            return;
        }

        this.setState({
            invalidFormData: false,
            errorMessage: '',
            submitButtonText: 'Submitting Registration...',
            submitButtonDisabled: true
        }, function(){
            this.submitForm();
        });

    }


    withdrawRegistrationConfirm = () => {
        this.setState({
            showConfirmModal: true,
            withdrawButtonDisabled: true,
            withdrawButtonText: 'withdrawing..',  
        })
    }


    withdrawRegistration = () => {

        const that = this;

        axios({
            method: 'post',
            url: '/deleteJunosRegistration',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                fbid: this.props.loggedInUser.id,
                auth_token: this.props.auth_token,
                fiiob_id: this.props.fiiobid
            }
        }).then(function (response) {
               if(response.data.success){
                   that.setState({
                        userRegistered: false,
                        withdrawButtonDisabled: false,
                        withdrawButtonText: 'Withdraw',  
                        termsAgreed: 'false'  
                   });
               }
            })
            .catch(function (error) {
                that.setState({
                    loadingContent: false,
                    userRegistered: false
                }); 
        });
    }


    render(){

    const positionsArray = [
        { value: 'ANY- No Choice', label: 'ANY- No Choice' },
        { value: 'GK- Goalkeeper', label: 'GK- Goalkeeper' },
        { value: 'LB- Left Back', label: 'LB- Left Back' },
        { value: 'LWB- Left Wing Back', label: 'LWB- Left Wing Back' },
        { value: 'CB- Centre Back', label: 'CB- Centre Back' },
        { value: 'RB- Right Back', label: 'RB- Right Back' },
        { value: 'RWB- Right Wing Back', label: 'RWB- Right Wing Back' },
        { value: 'LM- Left Midfielder', label: 'LM- Left Midfielder' },
        { value: 'CM- Centre Midfielder', label: 'CM- Centre Midfielder' },
        { value: 'CDM- Centre Defensive Midfielder', label: 'CDM- Centre Defensive Midfielder' },
        { value: 'CAM- Centre Attacking Midfielder', label: 'CAM- Centre Attacking Midfielder' },
        { value: 'RM- Right Midfielder', label: 'RM- Right Midfielder' },
        { value: 'LW- Left Winger', label: 'LW- Left Winger' },
        { value: 'RW- Right Winger', label: 'RW- Right Winger' },
        { value: 'LF- Left Forward', label: 'LF- Left Forward' },
        { value: 'CF- Centre Forward', label: 'CF- Centre Forward' },
        { value: 'RF- Right Forward', label: 'RF- Right Forward' },
        { value: 'ST- Striker', label: 'ST- Striker' }
    ];

    const instructions = [
        {"heading": "DOB should be after 01/01/1999", "value": "In order to register and nominate yourself for a trial in the FIIOB Junos Kolkata team, your date of birth must be after 01/01/1999."},
        {"heading": "No Payment", "value": "FIIOB Junos Kolkata is an amateur team and we do not charge from any player or pay any player for the match/practice sessions or for being a part of the team."},
        {"heading": "Discipline & Regularity", "value": "Discipline and Regulatory are the two primary strengths of our team and we are very strict about them. Make sure you can dedicate enough time as required by the team if you are selected."}
    ];

    const displayErrorPanel = () => {
        if (this.state.invalidFormData) {
            return (
                <div className="alert alert-danger fadeIn">
                    {this.state.errorMessage}
                </div>
            );
        }
        return null;
    }

    const showCancelButton = () => {
        if (this.state.editFormFlag)
            return (
                <FiiobDefaultButton 
                    buttonText='Cancel'
                    onClick={(evt) => {
                        evt.preventDefault();
                        this.setState({ editFormFlag: false });
                    }}
                />
            );
    }


    const displayMainForm = () => {  
        return (
            <div>
                {displayErrorPanel()}
                <form className="form-horizontal">
                                        
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your Name: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" value={this.state.username} onChange={this.updateInputValue} />
                            <span className="help-block m-b-none"><small>Edit your name in the textbox if required</small></span>
                        </div>
                    </div>

                    <div className="form-group" id="data_3">
                        <label className="col-sm-4 control-label">Your Date of Birth: </label>
                        <div className="col-sm-8">
                            <DatePicker
                                placeholderText="Click to select a date"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                openToDate={moment("2000-04-21")}
                                className="form-control"
                                style={{display: 'block'}}
                                minDate={moment("01011999", "MMDDYYYY")}
                                maxDate={moment("12312005", "MMDDYYYY")}
                            />
                            <span className="help-block m-b-none"><small>Your date of birth should be after 01/01/1999</small></span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your Prefered Positions: </label>
                        <div className="col-sm-8">
                            <Select
                                name="form-field-name"
                                value={this.state.selectedPositionOptions}
                                onChange={this.handlePositionChange}
                                options={positionsArray}
                                multi
                                simpleValue
                            />
                            <span className="help-block m-b-none"><small>You can select multiple preferred positions</small></span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your nearest Locality: </label>
                        <div className="col-sm-8">
                            <Creatable
                                name="form-field-name"
                                value={this.state.selectedLocationOption}
                                onChange={this.handleLocalityChange}
                                options={KolkataLocality}
                                simpleValue
                            />
                            <span className="help-block m-b-none"><small>Select/Enter the locality you stay in/near to Kolkata, West Bengal</small></span>
                        </div>
                    </div>


                     <div className="form-group">
                        <label className="col-sm-4 control-label">Your Contact Number: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" maxLength={10} value={this.state.contactNumber} onChange={this.updateContactNumber} />
                            <span className="help-block m-b-none"><small>Enter your 10 digit mobile number</small></span>
                        </div>
                    </div>


                    <div className="form-group" style={{marginTop: '40px'}}>
                        <label className="col-sm-4 control-label"></label>
                        <div className="col-sm-8">
                            <label>
                                <div className="icheckbox_square-green" style={{position: 'relative'}}>
                                <Checkbox
                                    id="checkbox1"
                                    checkboxClass="icheckbox_square-blue"
                                    increaseArea="20%"
                                    onChange={this.handleCheckboxChange}
                                    cursor
                                    checked={this.state.termsAgreed}
                                    />
                                </div> 
                                &nbsp;&nbsp;<small> I declare that the information provided are true to my knowledge</small>
                            </label>
                        </div>
                    </div>

                    <div className="form-group" style={{marginTop: '40px'}}>
                        <label className="col-sm-4 control-label"></label>
                            <div className="col-sm-8">
                                <div className="col-sm-6">
                                    {showCancelButton()}
                                </div>
                                <div className="col-sm-6">
                                    <FiiobPrimaryButton 
                                        buttonText={this.state.submitButtonText}
                                        onClick={this.validateForm}
                                        disabled={this.state.submitButtonDisabled}
                                    />
                                </div>
                            </div>
                    </div>
                </form>
            </div>
            );
    }


    // const displayEditForm = () => {

    // }

    const displayRegisteredContent = () => {
        return (
            <div>

                <div className="alert alert-success" style={{textAlign: 'center'}}>
                    <i className="fas fa-check-circle"></i> Great, You are already registered!
                </div>

                <form className="form-horizontal">
                                            
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your Name: </label>
                        <label className="col-sm-8 control-label-left">{this.state.username}</label>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your Date of Birth: </label>
                        <label className="col-sm-8 control-label-left">{moment(this.state.birthdate).format("MM/DD/YYYY")}</label>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your Prefered Positions: </label>
                        <label className="col-sm-8 control-label-left">{this.state.selectedPositionOptions}</label>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-4 control-label">Your nearest Locality: </label>
                        <label className="col-sm-8 control-label-left">{this.state.selectedLocationOption}</label>
                    </div>


                     <div className="form-group">
                        <label className="col-sm-4 control-label">You contact number: </label>
                        <label className="col-sm-8 control-label-left">{this.state.contactNumber}</label>
                    </div>

                    <div className="form-group" style={{marginTop: '40px'}}>
                        <label className="col-sm-4 control-label"></label>
                        <div className="col-sm-8 control-label-left">
                            <label>
                                <div className="icheckbox_square-green" style={{position: 'relative'}}>
                                <Checkbox
                                    id="checkbox1"
                                    checkboxClass="icheckbox_square-blue"
                                    increaseArea="20%"
                                    onChange={this.handleCheckboxChange}
                                    cursor
                                    disabled
                                    checked
                                />
                                </div> 
                                &nbsp;&nbsp;<small> I declare that the information provided are true to my knowledge</small>
                            </label>
                        </div>
                    </div>

                    <div className="form-group" style={{marginTop: '40px'}}>
                        <div className="col-sm-4 control-label"></div>
                        <div className="col-sm-8 control-label-left">
                            
                            <div className="col-sm-6 control-label">
                                <FiiobRedButton
                                    buttonText={this.state.withdrawButtonText}
                                    onClick={this.withdrawRegistrationConfirm}
                                    disabled={this.state.withdrawButtonDisabled}
                                />
                            </div>

                            <div className="col-sm-6 control-label">
                                <FiiobPrimaryButton 
                                    buttonText={this.state.editButtonText}
                                    disabled={this.state.editButtonDisabled}
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        this.setState({ editFormFlag: true, termsAgreed: false });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }



    const displayFormContent = () => {
        if (this.state.loadingContent)
            return <Loader text="Loading Form.."/>
        else {
            if(this.state.editFormFlag)
                return displayMainForm();
            else if (this.state.userRegistered)
                return displayRegisteredContent();
            else
                return displayMainForm();
        }
    }

    const registrationFormSubtitle = this.state.userRegistered ? 'You are registered for the trial' : 'Fill up the registration form and submit to nominate yourself for a trial';


    const displayWithdrawAlert = () => {
        return (
            <SweetAlert
                        show={this.state.showConfirmModal}
                        title="Withdraw Registration"
                        type="warning"
                        text="Are you sure you want to withdraw the registration?"
                        showCancelButton="true"
                        confirmButtonColor="#DD6B55"
                        confirmButtonText="Yes"
                        onConfirm={() => { 
                            this.setState({ showConfirmModal: false });
                            this.withdrawRegistration();
                        }}
                        onCancel={() => {
                            this.setState({ 
                                showConfirmModal: false, 
                                withdrawButtonDisabled: false,
                                withdrawButtonText: 'Withdraw' 
                            });
                        }}
                    />
        );
    }

    return(
        <FormPlaceholder column="8">

            {/* Component to display information on the right side of the main form */}
            <FormInstructions title="Registration Criteria" instructions={instructions} />


            {/* The Main Form Block */}
            <div className="col-lg-8">
                <div className="ibox float-e-margins">
             
                    <div className="ibox-title">
                        <h5>Registration Form <small>{registrationFormSubtitle}</small></h5>
                    </div>

                    <div className="ibox-content">               
                        {displayFormContent()}
                    </div>

                     {displayWithdrawAlert()}

                </div>
            </div>

        </FormPlaceholder>
        );
    }
}

export default RegistartionForm;