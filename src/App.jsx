import React from 'react';
import logo from './lib/img/logo_eco.png';
import {Box, Row, Section, TextField} from './components/Component';
import Header from './components/Header';
import SpListSimulator from './lib/js/SpListSimulator';

class App extends React.Component {
  constructor(props){
    super(props);
    window.test = new SpListSimulator();
  }
  render(){
    const {id, firstName, lastName} = window.test.cols;
    return (
      <Box>
        <Header title="SHAREPOINT CEWP PLAYGROUND" subtitle="ECOPRASINOS ENGINEERING SDN BHD" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION">
          <TextField label="Enter Your Name" bindTo={firstName} />
          <br />
        </Section>
        <button type="button" onClick={window.test.submitAction}>Submit!</button>
      </Box>
        
    );
  }
}

export default App;
