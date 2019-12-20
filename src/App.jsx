import React from 'react';
import logo from './lib/img/logo_eco.png';
import {
  FormWrapper, Row, Col, Section, Textfield, Dropdown, Multiselect, setSiteContentUrl,
  Datepicker, Tabulator, Radiobutton, Label, Fileupload,
} from './components/Component';
import Header from './components/Header';

class App extends React.Component {
  constructor(props){
    super(props);
    
    setSiteContentUrl("http://dev.s2m.online/PDS/_layouts/15/start.aspx#/_layouts/15/viewlsts.aspx");
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
    const {personalInfo, payroll, vehicle, family, folder, emergency, education, professional, employment} = window.SPSite;
    const setPrimaryKey = key => {
      payroll.Title.setValue(key);
    };
    const setFileName = n => {personalInfo.Picture.setValue(`${window.location.origin}/PDS/ProfilePicture/${n}`); console.log(personalInfo.Picture.value);};
    const setAge = newAge => this.setState({ age: Math.floor((Date.now() - Date.parse(newAge))/31557600000) });

    return (
      <FormWrapper onSubmit={()=>{
        personalInfo.submitAction()
      .then( ()=>folder.submitAction() )
      .then( ()=>payroll.submitAction() )
      .then( ()=>vehicle.submitAction() )
      .then( ()=>family.submitAction() )
      .then( ()=>emergency.submitAction() )
      .then( ()=>education.submitAction() )
      .then( ()=>professional.submitAction() )
      .then( ()=>employment.submitAction() )
      .then( (m)=>{alert(`successfully submitted`); console.log(m)} )
      .catch( (m)=>{alert(`fail to submitted`); console.log(m)});
      }}>
        <Header title="PERSONNEL DATA SHEET FORM" subtitle="Human Resources Division" logo={logo} />
        {/* <br /> */}
        <Section label="1. PERSONAL INFORMATION">
          <Row>
            <Col>
              <Textfield label={personalInfo.Title.dispName} bindTo={personalInfo.Title} getter={setPrimaryKey} required />
              <Textfield label={personalInfo.Full_x0020_Name.dispName} bindTo={personalInfo.Full_x0020_Name} required />
              <Textfield label={personalInfo.Designation.dispName} bindTo={personalInfo.Designation} required />
              <Radiobutton label={personalInfo.Division.dispName} bindTo={personalInfo.Division} options={personalInfo.Division.choiceValues} required />
              <Datepicker label="Date of Birth" bindTo={personalInfo.Date_x0020_of_x0020_Birth} getter={setAge} required />
              {
                this.state.age && (
                  <p>
                    <Label>Age (calculated) : {this.state.age} years old</Label>
                    { personalInfo.Age.setValue(this.state.age) }
                  </p>
                )
              }
              <Textfield label="NRIC/Passport (current)" bindTo={personalInfo.NRIC_x0020__x002f__x0020_Passpor} required />
              <Textfield label="NRIC/Passport (old)"  />
              <Dropdown label={personalInfo.Citizenship.dispName} bindTo={personalInfo.Citizenship} options={personalInfo.Citizenship.choiceValues} required />
              <Dropdown label={personalInfo.Race.dispName} bindTo={personalInfo.Race} options={personalInfo.Race.choiceValues} required />
              <Dropdown label={personalInfo.Religion.dispName} bindTo={personalInfo.Religion} options={personalInfo.Religion.choiceValues} required />
              <Radiobutton label={personalInfo.Gender.dispName} bindTo={personalInfo.Gender} options={personalInfo.Gender.choiceValues} required />
              <Fileupload label="Upload Picture" bindTo={folder} fileName={personalInfo.Title} getter={(x,y)=>setFileName(x)} required />
            </Col>
            <Col>
              <Textfield label={payroll.Income_x0020_Tax_x0020_No.dispName} bindTo={payroll.Income_x0020_Tax_x0020_No} required />
              <Textfield label={payroll.Income_x0020_Tax_x0020_Branch.dispName} bindTo={payroll.Income_x0020_Tax_x0020_Branch} required />
              <Textfield label={payroll.SOCSO_x0020_No.dispName} bindTo={payroll.SOCSO_x0020_No} required />
              <Textfield label={payroll.EPF_x0020_No.dispName} bindTo={payroll.EPF_x0020_No} required />
              <Radiobutton label={personalInfo.Marital_x0020_Status.dispName} bindTo={personalInfo.Marital_x0020_Status} options={personalInfo.Marital_x0020_Status.choiceValues} required />
              <Textfield label={personalInfo.Permanent_x0020_Address.dispName} bindTo={personalInfo.Permanent_x0020_Address} multiline required />
              <Textfield label={personalInfo.Correspondence_x0020_Address.dispName} bindTo={personalInfo.Correspondence_x0020_Address} multiline />
              <Textfield label={personalInfo.Email_x0020_Address.dispName} bindTo={personalInfo.Email_x0020_Address} title="use , to separate multiple addresses" />
              <Textfield label={personalInfo.Telephone_x0020_No.dispName} bindTo={personalInfo.Telephone_x0020_No}  />
              <Multiselect label={personalInfo.Driving_x0020_License_x0020_Clas.dispName} bindTo={personalInfo.Driving_x0020_License_x0020_Clas} options={personalInfo.Driving_x0020_License_x0020_Clas.choiceValues} />
              <Tabulator bindList={vehicle} foreignKey={personalInfo.Title} fkColName="Title" label="Vehicle Information">
                <Textfield label="Vehicle Brand/Type" bindTo="Brand_x0020__x0026__x0020_Type"  />
                <Textfield label="Reg. No" bindTo="Registration_x0020_No" />
                <Dropdown label="Type" bindTo="Vehicle_x0020_Type" options={vehicle.Vehicle_x0020_Type.choiceValues} />
              </Tabulator>
            </Col>
          </Row>
        </Section>

        <Section label="2. BANK ACCOUNT INFORMATION">
          <Textfield label={payroll.Bank_x0020_Name.dispName} bindTo={payroll.Bank_x0020_Name} />
          <Textfield label={payroll.Bank_x0020_Account_x0020_No.dispName} bindTo={payroll.Bank_x0020_Account_x0020_No} />
          <Textfield label={payroll.Bank_x0020_Branch.dispName} bindTo={payroll.Bank_x0020_Branch} />
          <Textfield label={payroll.Bank_x0020_SWIFT_x0020_Code.dispName} bindTo={payroll.Bank_x0020_SWIFT_x0020_Code} />
        </Section>

        <Section label="3. FAMILY INFORMATION">
          <p>Fill in the details of your core family member, including parents and siblings.</p>
          <Tabulator bindList={family} foreignKey={personalInfo.Title} fkColName="Title" >
            <Dropdown label={family.Relationship.dispName} bindTo="Relationship" options={family.Relationship.choiceValues} />
            <Textfield label={family.Family_x0020_Member_x0020_Name.dispName} bindTo="Family_x0020_Member_x0020_Name" />
            <Dropdown label={family.Gender.dispName} bindTo="Gender" options={family.Gender.choiceValues} />
            <Textfield label={family.NRIC_x0020_No.dispName} bindTo="NRIC_x0020_No" />
            <Dropdown label={family.Education_x0020_Level.dispName} bindTo="Education_x0020_Level" options={family.Education_x0020_Level.choiceValues} />
            <Textfield label={family.Occupation.dispName} bindTo="Occupation" />
            <Textfield label={family.Employer.dispName} bindTo="Employer" />
            <Textfield label={family.Contact_x0020_No_x002e_.dispName} bindTo="Contact_x0020_No_x002e_" />
          </Tabulator>
        </Section>

        <Section label="4. EMERGENCY CONTACT INFORMATION">
          <Tabulator bindList={emergency} foreignKey={personalInfo.Title} fkColName="Title" >
            <Textfield label={emergency.Contact_x0020_Name.dispName} bindTo="Contact_x0020_Name" />
            <Dropdown label={emergency.Relationship.dispName} bindTo="Gender" options={emergency.Relationship.choiceValues} />
            <Textfield label={emergency.Contact_x0020_Address.dispName} bindTo="Contact_x0020_Address" />
            <Textfield label={emergency.Telephone_x0020_No.dispName} bindTo="Telephone_x0020_No" />
            <Textfield label={emergency.Email_x0020_Address.dispName} bindTo="Email_x0020_Address" />
          </Tabulator>
        </Section>

        <Section label="5. EDUCATION BACKGROUND">
          <Tabulator bindList={education} foreignKey={personalInfo.Title} fkColName="Title" >
            <Textfield label="School/College/Institution" bindTo="Institution" />
            <Textfield label={education.Year_x0020_Start.dispName} bindTo="Year_x0020_Start" />
            <Textfield label={education.Year_x0020_End.dispName} bindTo="Year_x0020_End" />
            <Dropdown label={education.Obtained_x0020_Certificate.dispName} bindTo="Obtained_x0020_Certificate" options={education.Obtained_x0020_Certificate.choiceValues} />
            <Dropdown label={education.Major.dispName} bindTo="Major" options={education.Major.choiceValues} width="30%" />
            <Textfield label={education.Achievement.dispName} bindTo="Achievement" />
          </Tabulator>
        </Section>

        <Section label="6. PROFESSIONAL MEMBERSHIP">
          <Tabulator bindList={professional} foreignKey={personalInfo.Title} fkColName="Title" >
            <Textfield label={professional.Membership_x0020__x002f__x0020_A.dispName} bindTo="Membership_x0020__x002f__x0020_A" />
            <Textfield label={professional.Registration_x0020_No.dispName} bindTo="Registration_x0020_No" />
            <Textfield label={professional.Expiration_x0020_Date.dispName} bindTo="Expiration_x0020_Date" />
          </Tabulator>
        </Section>
        <Section label="7. EMPLOYMENT HISTORY">
          <Tabulator bindList={professional} foreignKey={personalInfo.Title} fkColName="Title" >
            <Textfield label={employment.Date_x0020_Start.dispName} bindTo="Date_x0020_Start" />
            <Textfield label={employment.Date_x0020_Enf.dispName} bindTo="Date_x0020_Enf" />
            <Textfield label={employment.Designation.dispName} bindTo="Designation" />
            <Textfield label={employment.Employer.dispName} bindTo="Employer" />
            <Textfield label={employment.Salary.dispName} bindTo="Salary" />
            <Textfield label={employment.Reason_x0020_of_x0020_Leaving.dispName} bindTo="Reason_x0020_of_x0020_Leaving" />
          </Tabulator>
        </Section>
        <br />
        <button type="submit">Submit</button>
      </FormWrapper>
    );
  }
}

export default App;
