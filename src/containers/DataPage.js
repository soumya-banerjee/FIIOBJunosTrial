import React, { Component } from 'react';
import FormPlaceholder from '../components/FormPlaceholder';
import FiiobPrimaryButton from '../components/FiiobPrimaryButton';

class DataPage extends Component {

    state = {
        passcode: ''
    }

    updateInputPasscode = (evt) => {
        this.setState({
            passcode: evt.target.value,
            passcodeButtonText: 'Enter passcode'
          });
    }

    render(){
        return(
            <div className="text-center animated fadeInDown" style={{color: 'black'}}>            
                <FormPlaceholder column="6" > 
                    
                <h1>Data Page</h1>
                <hr/>
                    <div className="ibox float-e-margins">
                        <div className="ibox-content" style={{minHeight: '350px', paddingTop: '40px'}}>           
                            <input 
                                type="password" 
                                className="form-control"
                                value={this.state.passcode} 
                                onChange={this.updateInputPasscode} 
                                style={{width: '40%', margin: '0 auto', textAlign: 'center'}}
                                placeholder="Enter passcode to see data"
                            />

                            <FiiobPrimaryButton
                                buttonText={this.state.editButtonText}
                                disabled={this.state.editButtonDisabled}
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    this.setState({ editFormFlag: true, termsAgreed: false });
                                }}
                                style={{width: '40%'}}
                            />


                        </div>
                    </div>

                </FormPlaceholder>
            </div>
        );
    }
}

export default DataPage;