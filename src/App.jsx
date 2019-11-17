import React from 'react';
import logo from './lib/img/logo_eco.png';
import {
  Box, Row, Col, Section, Textfield, Dropdown, Multiselect,
  Datepicker, Tabulator, Radiobutton, Label
} from './components/Component';
import Header from './components/Header';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {age:undefined, bankName: undefined, religion: undefined};
    this.setBankname = newBankname =>this.setState({bankName: newBankname==="Maybank"});
    this.setReligion = newReligion =>this.setState({religion: newReligion});
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
      Title, Age, Citizenship, Correspondence_x0020_Address, Date_x0020_of_x0020_Birth, Designation,
      Division, Full_x0020_Name, Gender, Marital_x0020_Status, NRIC_x0020_Current, NRIC_x0020_Old,
      Permanent_x0020_Address, Race, Religion, Email_x0020_Address, Telephone_x0020_No,  Driving_x0020_License_x0020_Clas
    } = window.personalInfo;
    const { accountNo, bankName, bankBranch, bankSwift, incomeTaxNo, socsoNo, taxBranch, epfNo } = window.payroll;
    const setAge = newAge => this.setState({ age: Math.floor((Date.now() - Date.parse(newAge))/31557600000) });
    return (
      <Box>
        <Header title="SHAREPOINT CEWP PLAYGROUND" subtitle="ECOPRASINOS ENGINEERING SDN BHD" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION">
          <Row>
            <Col>
              <Textfield label={Title.dispName} bindTo={Title} required />
              <Textfield label={Full_x0020_Name.dispName} bindTo={Full_x0020_Name} />
              <Textfield label={Designation.dispName} bindTo={Designation} />
              <Radiobutton label={Division.dispName} bindTo={Division} options={Division.choiceValues} />
              <Datepicker label="Date of Birth" bindTo={Date_x0020_of_x0020_Birth} getter={setAge}/>
              {
                this.state.age && (
                  <p>
                    <Label>Age (calculated) : {this.state.age} years old</Label>
                    {Age.setValue(this.state.age)}
                  </p>
                )
              }
              <Textfield label="NRIC/Passport (current)" bindTo={NRIC_x0020_Current} />
              <Textfield label="NRIC/Passport (old)" bindTo={NRIC_x0020_Old} />
              <Dropdown label={Citizenship.dispName} bindTo={Citizenship} options={Citizenship.choiceValues}/>
              <Dropdown label={Race.dispName} bindTo={Race} options={Race.choiceValues} />
              <Dropdown label={Religion.dispName} bindTo={this.state.religion==="Other"||Religion} options={Religion.choiceValues} getter={this.setReligion}/>
              {
                this.state.religion==="Other" &&  <Textfield label="Enter Religion" bindTo={Religion} />
              }
              <Radiobutton label={Gender.dispName} bindTo={Gender} options={Gender.choiceValues} />              
            </Col>
            <Col>
              <Textfield label="Income Tax No" bindTo={incomeTaxNo} />
              <Textfield label="Income tax Branch" bindTo={taxBranch} />
              <Textfield label="SOCSO No" bindTo={socsoNo} />
              <Textfield label="EPF No" bindTo={epfNo} />
              <Radiobutton label={Marital_x0020_Status.dispName} bindTo={Marital_x0020_Status} options={Marital_x0020_Status.choiceValues} />
              <Textfield label={Permanent_x0020_Address.dispName} bindTo={Permanent_x0020_Address} multiline />
              <Textfield label={Correspondence_x0020_Address.dispName} bindTo={Correspondence_x0020_Address} multiline />
              <Textfield label={Email_x0020_Address.dispName} bindTo={Email_x0020_Address} title="use , to separate multiple addresses"/>
              <Textfield label={Telephone_x0020_No.dispName} bindTo={Telephone_x0020_No} />
              {/*<Tabulator>
                <Textfield label="Email Address" />
              </Tabulator>
              <Tabulator>
                <Textfield label="Telephone No" />
              </Tabulator> */}
              <Multiselect label={Driving_x0020_License_x0020_Clas.dispName} bindTo={Driving_x0020_License_x0020_Clas} options={Driving_x0020_License_x0020_Clas.choiceValues} />
              <Tabulator>
                <Textfield label="Vehicle Brand/Type"  bindTo="brand"  />
                <Textfield label="Reg. No" bindTo="regno" />
              </Tabulator>
            </Col>
          </Row>
          <br />
        </Section>
        <Section label="2. BANK INFORMATION">
          <Dropdown label="Bank Type" options={['Maybank', 'Other Bank']} getter={this.setBankname}/>
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
        <button type="submit" onClick={()=>window.personalInfo.submitAction()}>Submit!</button>
      </Box>        
    );
  }
}

export default App;
