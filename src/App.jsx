import React from 'react';
import logo from './lib/img/logo_eco.png';
import {Box, Row, Section} from './components/Component';
import Header from './components/Header';

class App extends React.Component {
  
  render(){
    return (
      <Box>
        <Header title="SHAREPOINT CEWP PLAYGROUND" subtitle="ECOPRASINOS ENGINEERING SDN BHD" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION"> anak kurus berkepala</Section>
      </Box>
        
    );
  }
}

export default App;
