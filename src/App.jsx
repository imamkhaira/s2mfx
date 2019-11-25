import React from 'react';
import logo from './lib/img/logo_eco.png';
import {
  Box, Row, Col, Section, Textfield, Dropdown, Multiselect,
  Datepicker, Tabulator, Radiobutton, Label, Subsection, Button, Pallete
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

  componentDidMount(){
    let leftblank = document.getElementById("onetIDListForm");
    if (leftblank) leftblank.style.width = "100%";
  }
 
  render(){
    const personalInfo = window.personalInfo;
    const payroll = window.payroll;
    const vehicle = window.vehicle;
    const family = window.family;

    const setAge = newAge => this.setState({ age: Math.floor((Date.now() - Date.parse(newAge))/31557600000) });
    return (
      <Box>
        <Header title="SHAREPOINT CEWP PLAYGROUND" subtitle="ECOPRASINOS ENGINEERING SDN BHD" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION" closed>
          <Row>
            <Col>
              <Textfield label={personalInfo.Title.dispName} bindTo={personalInfo.Title} required />
              <Textfield label={personalInfo.Full_x0020_Name.dispName} bindTo={personalInfo.Full_x0020_Name} />
              <Textfield label={personalInfo.Designation.dispName} bindTo={personalInfo.Designation} />
              <Radiobutton label={personalInfo.Division.dispName} bindTo={personalInfo.Division} options={personalInfo.Division.choiceValues} />
              <Datepicker label="Date of Birth" bindTo={personalInfo.Date_x0020_of_x0020_Birth} getter={setAge}/>
              {
                this.state.age && (
                  <p>
                    <Label>Age (calculated) : {this.state.age} years old</Label>
                    { personalInfo.Age.setValue(this.state.age) }
                  </p>
                )
              }
              <Textfield label="NRIC/Passport (current)" bindTo={personalInfo.NRIC_x0020_Current} />
              <Textfield label="NRIC/Passport (old)" bindTo={personalInfo.NRIC_x0020_Old} />
              <Dropdown label={personalInfo.Citizenship.dispName} bindTo={personalInfo.Citizenship} options={personalInfo.Citizenship.choiceValues}/>
              <Dropdown label={personalInfo.Race.dispName} bindTo={personalInfo.Race} options={personalInfo.Race.choiceValues} />
              <Dropdown label={personalInfo.Religion.dispName} bindTo={this.state.religion==="Other"||personalInfo.Religion} options={personalInfo.Religion.choiceValues} getter={this.setReligion}/>
              {
                this.state.religion==="Other" &&  <Textfield label="Enter Religion" bindTo={personalInfo.Religion} />
              }
              <Radiobutton label={personalInfo.Gender.dispName} bindTo={personalInfo.Gender} options={personalInfo.Gender.choiceValues} />              
            </Col>
            <Col>
              <Textfield label="Income Tax No" />
              <Textfield label="Income tax Branch" />
              <Textfield label="SOCSO No" />
              <Textfield label="EPF No" />
              <Radiobutton label={personalInfo.Marital_x0020_Status.dispName} bindTo={personalInfo.Marital_x0020_Status} options={personalInfo.Marital_x0020_Status.choiceValues} />
              <Textfield label={personalInfo.Permanent_x0020_Address.dispName} bindTo={personalInfo.Permanent_x0020_Address} multiline />
              <Textfield label={personalInfo.Correspondence_x0020_Address.dispName} bindTo={personalInfo.Correspondence_x0020_Address} multiline />
              <Textfield label={personalInfo.Email_x0020_Address.dispName} bindTo={personalInfo.Email_x0020_Address} title="use , to separate multiple addresses"/>
              <Textfield label={personalInfo.Telephone_x0020_No.dispName} bindTo={personalInfo.Telephone_x0020_No} />
            
              <Multiselect label={personalInfo.Driving_x0020_License_x0020_Clas.dispName} bindTo={personalInfo.Driving_x0020_License_x0020_Clas} options={personalInfo.Driving_x0020_License_x0020_Clas.choiceValues} />
              <Tabulator bindList={window.vehicle} foreignKey={window.personalInfo.Title} fkColName="Title" label="Vehicle Information">
                <Textfield label="Vehicle Brand/Type" bindTo="Brand"  />
                <Textfield label="Reg. No" bindTo="Registration_x0020_No" />
              </Tabulator>
            </Col>
          </Row>
        </Section>

        <Section label="2. BANK INFORMATION" closed>
          <Dropdown label="Bank Type" options={['Maybank', 'Other Bank']} getter={this.setBankname}/>
          { 
            (typeof(this.state.bankName) != "undefined") &&
            <>
              <Textfield label="Account No" />
              <Textfield label="Bank Name" value={this.state.bankName ? "Maybank": undefined} />
              <Textfield label="Bank Branch" />
              <Textfield label="SWIFT Code" value={this.state.bankName ? "MBBEMYKL": undefined} />
            </>
          }
        </Section>

        <Section label="3. FAMILY BACKGROUND" closed>
          <Subsection label="A. Spouse Information">
          <Row>
            <Col>
              <Textfield label="Spouse Full Name" />
              <Textfield label={family.Title.dispName} />
              <Textfield label="Employment Status" />
              
              <Textfield label={family.Income_x0020_Tax_x0020_No.dispName} />
              <Textfield label={family.Income_x0020_Tax_x0020_Branch.dispName} />
            </Col>
            <Col>
              <Textfield label={family.Occupation.dispName} />
              <Textfield label={family.Employment.dispName} />
              <Textfield label={family.Employer_x0027_s_x0020_Address.dispName} />
              <Textfield label={family.Email_x0020_Address.dispName} />
              <Textfield label="Phone No." />
            </Col>
          </Row>
          </Subsection>
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title" label="B. Children Details">
            <Textfield label="Child Name" />
            <Textfield label="Age" />
            <Textfield label="Gender" />
            <Textfield label="IC/Cert. No" />
            <Textfield label="Fulltime Study" />
          </Tabulator>
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title" label="C. Family Member Details" >
            <Textfield label="Family Member Name" />
            <Textfield label="Age" />
            <Textfield label="Gender" />
            <Textfield label="Education Level" />
            <Textfield label="Occupation" />
            <Textfield label="Employer" />
          </Tabulator>
        </Section>

        <Section label="4. EMERGENCY CONTACT NUMBER">
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title">
            <Textfield label="Name" />
            <Textfield label="Relationship" />
            <Textfield label="Address" />
            <Textfield label="Telephone No" />
            <Textfield label="Email Address" />
          </Tabulator>
        </Section>

        <Section label="5. QUALIFICATIONS">
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title" label="A. Education Background">
            <Textfield label="School/College/Institutions" />
            <Textfield label="Obtained Certificate" />
            <Textfield label="Major" />
            <Textfield label="Year Start" />
            <Textfield label="Year End" />
            <Textfield label="Achievement" />
          </Tabulator>
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title" label="B. Professional Membership">
            <Textfield label="Membership/Accreditation" />
            <Textfield label="Membership No" />
            <Textfield label="Expiration date" />
          </Tabulator>
          <Tabulator bindList={window.family} foreignKey={window.personalInfo.Title} fkColName="Title" label="C. Employment History">
            <Textfield label="Year Start" />
            <Textfield label="Year End" />
            <Textfield label="Employer" />
            <Textfield label="Designation" />
            <Textfield label="Salary" />
            <Textfield label="Reason of leaving" />
          </Tabulator>
        </Section>
        <br />
        <Button type="button" 
          onClick={()=>{
            window.vehicle.submitAction(m=>alert(`success: ${m}`)); 
          }}
          text="Yahudi"
          allowDisabledFocus
          iconName="SharepointAppIcon16"
          styles={{root:{width: "100%", border: `2px solid ${Pallete.primary}`, alignContent: "center"}, icon:{align: "center"}}}
          />
          <br />
          <br />
      </Box>
    );
  }
}

export default App;
