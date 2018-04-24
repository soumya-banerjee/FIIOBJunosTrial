import React, { Component } from 'react';
import axios from 'axios';


class TestComponent extends Component {


  state = {
    data: []
  }

  componentDidMount(){
    console.log(this.props.location.state);
    axios.get('/newfile.php')
          .then(response => {
            this.setState({ data: response.data});
            console.log(response);
          });
  }

  render(){

    const resp = this.state.data.map(member => {
      return <h3 key={member.id}>{member.name}</h3>;
    });


    return(
      <div>
        <h1>Axios Test</h1>
        {resp}
      </div>
    );
  }
}

export default TestComponent;
