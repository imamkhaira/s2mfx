import React from 'react';
import logo from './lib/img/logo_eco.png';
import {
  Box, Row, Col, Section, Textfield, Dropdown, Multiselect,
  Datepicker, Tabulator, Radiobutton, Label
} from './components/Component';
import Header from './components/Header';
import SpListSimulator from './lib/js/SpListSimulator';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {age:undefined, bankName: undefined};
    this.setAge = newAge =>this.setState({age: Math.floor((Date.now() - Date.parse(newAge))/31557600000) });
    this.setBankname = newBankname =>this.setState({bankName: newBankname==="Maybank"})
    this.listCols = [
      'fullName',
      'employeeNo',
      'division',
      'designation',
      'dateOfBirth',
      'age',
      'nricCurrent',
      'nricOld',
      'citizenship',
      'race',
      'gender',
      'religion',
      'maritalStatus',
      'epfNo',
      'incomeTaxNo',
      'drivingLicense',
      'addressPermanent',
      'addressCorrespondence',
      'socsoNo',
      'taxBranch'
    ];
    window.personalInfo = new SpListSimulator(this.listCols);
    window.payroll = new SpListSimulator(['accountNo', 'bankName', 'bankBranch', 'bankSwift']);
    this.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    this.division = ["Engineering", "Administration", "Information Technology"];
    this.race = ["Malay", "Chinese", "Indian", "Other"];
    this.gender = ['Male', "Female", "ge"];
    this.religion = ["Muslim", "Christian", "Buddhist", "Hindu", "Other"];
    this.marital = ["Single", "Married", "Divorced"];
    this.license = ["A", "A1", "B", "B1", "B2", "C", "D", "DA", "E", "E1", "E2", "F", "G", "H", "I", "M"];

  }

  render(){
    const {
      fullName, employeeNo, division, designation, dateOfBirth, nricCurrent, nricOld, age,
      citizenship, race, gender, religion, maritalStatus, epfNo, incomeTaxNo, drivingLicense, addressPermanent,
      addressCorrespondence, socsoNo, taxBranch
    } = window.personalInfo.cols;
    const { accountNo, bankName, bankBranch, bankSwift } = window.payroll.cols;
    return (
      <Box>
        <Header title="SHAREPOINT CEWP PLAYGROUND" subtitle="ECOPRASINOS ENGINEERING SDN BHD" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION">
          <Row>
            <Col>
              <Textfield label="Enter Your Name" bindTo={fullName} required/>
              <Textfield label="Employee No" bindTo={employeeNo} required />
              <Textfield label="Designation" bindTo={designation} required />
              <Radiobutton label="Division" bindTo={division} options={this.division} />
              <Datepicker label="Date of Birth" bindTo={dateOfBirth} getter={this.setAge} formatted/>
              {
                this.state.age && (
                  <p>
                    <Label>Age (calculated) : {this.state.age} years old</Label>
                    {age.setValue(this.state.age)}
                  </p>
                )
              }
              <Textfield label="NRIC/Passport (current)" bindTo={nricCurrent} />
              <Textfield label="NRIC/Passport (old)" bindTo={nricOld} />
              <Dropdown label="Citizenship" bindTo={citizenship} options={this.country_list} />
              <Dropdown label="Race" bindTo={race} options={this.race} />
              <Dropdown label="Religion" bindTo={religion} options={this.religion} />
              <Radiobutton label="Gender" bindTo={gender} options={this.gender}/>              
            </Col>
            <Col>
              <Textfield label="Income Tax No" bindTo={incomeTaxNo} />
              <Textfield label="Income tax Branch" bindTo={taxBranch} />
              <Textfield label="SOCSO No" bindTo={socsoNo} />
              <Textfield label="EPF No" bindTo={epfNo} required />
              <Radiobutton label="Marital Status" bindTo={maritalStatus} options={this.marital}/>
              <Textfield label="Permanent Address" bindTo={addressPermanent} multiline />
              <Textfield label="Correspondence Address" bindTo={addressCorrespondence} multiline />
              <Tabulator>
                <Textfield label="Email Address" />
              </Tabulator>
              {/* <Tabulator>
                <Textfield label="Telephone No" />
              </Tabulator> */}
              <Multiselect label="Driving License Class" bindTo={drivingLicense} options={this.license} />
              <Tabulator>
                <Textfield label="Vehicle Brand/Type" />
                <Textfield label="Reg. No" />
                <Multiselect label="test" options={this.race} />

              </Tabulator>
            </Col>
          </Row>
          <br />
        </Section>
        <Section label="2. BANK INFORMATION">
          <Dropdown label="Bank Type" options={['Maybank', 'Other Bank']} getter={this.setBankname} required/>
          { 
            (typeof(this.state.bankName) != "undefined") &&
            <>
              <Textfield label="Account No" bindTo={accountNo} />
              <Textfield label="Bank Name" bindTo={bankName} value={this.state.bankName ? 'Maybank Berhad': undefined} disabled={this.state.bankName} />
              <Textfield label="Bank Branch" bindTo={bankBranch} />
              <Textfield label="SWIFT Code" bindTo={bankSwift} value={this.state.bankName && 'MBBEMYKL'} disabled={this.state.bankName} />
            </>
          }<br />
        </Section>
        <Section label="3. FAMILY INFORMATION">

        </Section>
        <button type="button" onClick={window.personalInfo.submitAction}>Submit!</button>
      </Box>        
    );
  }
}

export default App;
