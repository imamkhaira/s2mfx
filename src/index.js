import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';
import SpList from './lib/js/SpList';
import SpListSimulator, { DataObj } from './lib/js/SpListSimulator';
import { SpFileWriter } from './lib/js/SpFile';

// delete this in production
window.s2mfx_debug = true; 
let simulatedCols = {
    personalInfo: [
        new DataObj("Title", "Title"),
        new DataObj("Employee_x0020_ID", "Employee ID"),
        new DataObj("Full_x0020_Name", "Full Name"),
        new DataObj("Designation", "Designation"),
        new DataObj("Division", "Division", ["aaaa", "bbbb", "cccc"]), //choic
        new DataObj("Date_x0020_of_x0020_Birth", "Date of Birth"),
        new DataObj("Age", "Age"),
        new DataObj("NRIC_x0020__x002f__x0020_Passpor", "NRIC / Passport"),
        new DataObj("Citizenship", "Citizenship", ["aaaaa", "bbbbb", "ccccc"]), //choic
        new DataObj("Race", "Race", ["malay", "chine", "india"]), //choice",
        new DataObj("Gender", "Gender", ["male", "female", "other"]), //choice",
        new DataObj("Religion", "Religion", ["slim", "kristen", "budha", "hindu"]), //choice",
        new DataObj("Marital_x0020_Status", "Marital Status", ["singgle", "married", "diforced"]), //choice
        new DataObj("Permanent_x0020_Address", "Permanent Address"),
        new DataObj("Correspondence_x0020_Address", "Correspondence Address"),
        new DataObj("Email_x0020_Address", "Email Address"),
        new DataObj("Telephone_x0020_No", "Telephone No"),
        new DataObj("Driving_x0020_License_x0020_Clas", "Driving License Class", ["a", "b", "c", "d"]), //choice
        new DataObj("Status", "Status", ["Active", "Resigned"]), //choice
        new DataObj("Attachments", "Attachments"),
        new DataObj("Picture", "Picture")
    ],
    payroll: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Employee", "Employee"),
        new DataObj("Bank_x0020_Account_x0020_No", "Bank Account No"),
        new DataObj("Bank_x0020_Name", "Bank Name"),
        new DataObj("Bank_x0020_Branch", "Bank Branch"),
        new DataObj("Bank_x0020_SWIFT_x0020_Code", "Bank SWIFT Code"),
        new DataObj("Income_x0020_Tax_x0020_No", "Income Tax No"),
        new DataObj("Income_x0020_Tax_x0020_Branch", "Income Tax Branch"),
        new DataObj("SOCSO_x0020_No", "SOCSO No"),
        new DataObj("EPF_x0020_No", "EPF No")
    ],
    vehicle: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Employee_x0020_Name", "Employee Name"),
        new DataObj("Brand_x0020__x0026__x0020_Type", "Brand & Type"),
        new DataObj("Registration_x0020_No", "Registration No"),
        new DataObj("Vehicle_x0020_Type", "Vehicle Type", ["car", "motor"]), //choice
    ],
    family: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Employee", "Employee"),
        new DataObj("Family_x0020_Member_x0020_Name", "Family Member Name"),
        new DataObj("Gender", "Gender", ["Male", "Female"]), //choice
        new DataObj("Relationship", "Relationship", ["Parent", "Children", "Spouse", "Sibling", "Relative"]), //choice
        new DataObj("NRIC_x0020_No", "NRIC No"),
        new DataObj("Education_x0020_Level", "Education Level", ["No School", "University", "High School"]), //choice
        new DataObj("Occupation", "Occupation"),
        new DataObj("Employer", "Employer"),
        new DataObj("Contact_x0020_No_x002e_", "Contact No."), 
    ],
    emergency:[
        new DataObj("Title", "Title"),
        new DataObj("Contact_x0020_Name", "Contact Name"),
        new DataObj("Relationship", "Relationship", ['parent', 'spouse', 'children', 'relative', 'friend']),
        new DataObj("Contact_x0020_Address", "Contact Address"),
        new DataObj("Telephone_x0020_No", "Telephone No"),
        new DataObj("Email_x0020_Address", "Email Address"),
    ],
    education: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Employee", "Employee"),
        new DataObj("Institution", "Institution"),
        new DataObj("Year_x0020_Start", "Year Start"),
        new DataObj("Year_x0020_End", "Year End"),
        new DataObj("Obtained_x0020_Certificate", "Obtained Certificate", ["degree", "master", "phD"]), //choice  
        new DataObj("Major", "Major", ["IT-related", "engine-related", "admin-related"]), //choice  
        new DataObj("Achievement", "Achievement")
    ],
    professional: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Employee", "Employee"),
        new DataObj("Membership_x0020__x002f__x0020_A", "Membership / Accreditation"),
        new DataObj("Registration_x0020_No", "Registration No"),
        new DataObj("Expiration_x0020_Date", "Expiration Date")
    ],
    employment: [
        new DataObj("Title", "Employee ID"), 
        new DataObj("Employee", "Employee"), 
        new DataObj("Date_x0020_Start", "Date Start"), 
        new DataObj("Date_x0020_Enf", "Date End"), 
        new DataObj("Designation", "Designation"), 
        new DataObj("Employer", "Employer"), 
        new DataObj("Salary", "Salary"), 
        new DataObj("Reason_x0020_of_x0020_Leaving", "Reason of Leaving")
    ]
};



(async () => {
    window.folder = await SpFileWriter("ProfilePicture/", "pds");
    if(window.SP) {
        window.sprLib.baseUrl("/PDS");
        window.personalInfo = await SpList("a07c5f04-151f-4b39-ba21-6e392c4903b1");
        window.payroll = await SpList("bb435aa8-b97f-42e3-855e-68bdc461bc4a");
        window.vehicle = await SpList("2fc87dc6-7a66-4668-be6c-b601fcbbf3c6");
        window.family = await SpList("d5ce1c0f-871e-4ba3-b18a-caa8a30408b4");
        window.emergency = await SpList("3c83db38-c854-4191-a7b9-149e2af83fe9");
        window.education = await SpList("8f7d03c4-aa22-47bc-ba8c-7ca6c1bd2dd7");
        window.professional = await SpList("6fb360ac-3ec4-4cd3-bebe-c6d84990b1fd");
        window.employment = await SpList("0dc300d8-352d-4fd7-9eca-8536ada32e3a");
    }
    //delete this else block when in production.
    else {
        window.personalInfo = await SpListSimulator(simulatedCols.personalInfo);
        window.payroll = await SpListSimulator(simulatedCols.payroll);
        window.vehicle = await SpListSimulator(simulatedCols.vehicle);
        window.family = await SpListSimulator(simulatedCols.family);
        window.emergency = await SpListSimulator(simulatedCols.emergency);
        window.education = await SpListSimulator(simulatedCols.education);
        window.professional = await SpListSimulator(simulatedCols.professional);
        window.employment = await SpListSimulator(simulatedCols.employment);
    }
    (
        window.personalInfo 
        && window.payroll
        && window.vehicle
        && window.family
        && window.emergency
        && window.folder
        && window.education
        && window.professional
        && window.employment
    ) && ReactDOM.render(<App />, document.getElementById('root'));
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
