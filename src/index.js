import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';
import SpList from './lib/js/SpList';
import SpListSimulator, { DataObj } from './lib/js/SpListSimulator';

// delete this in production
let simulatedCols = {
    personalInfo: [
        // new DataObj(data name, display name, options array)
        new DataObj("Title", "Employee ID"),
        new DataObj("Age"),
        new DataObj("Citizenship", "Citizenship", ["amerika", "inggris", "yurop", "arab", "bangladess"]),
        new DataObj("Correspondence_x0020_Address", "Mailing Address"),
        new DataObj("Date_x0020_of_x0020_Birth", "Date of Birth"),
        new DataObj("Designation", "Designation"),
        new DataObj("Division", "Division", ["Engineering", "Admin", "Information Technology"]),
        new DataObj("Full_x0020_Name", "Full Name"),
        new DataObj("Gender", "Gender", ["Male", "Female", "Other?"]),
        new DataObj("Marital_x0020_Status", "Marital Status", ["Single", "Married", "Divorced"]),
        new DataObj("NRIC_x0020_Current", "NRIC/Passport (current)"),
        new DataObj("NRIC_x0020_Old", "NRIC/Passport (old)"),
        new DataObj("Permanent_x0020_Address", "Permanent Address"),
        new DataObj("Race", "Race", ["Malay", "Chinese", "Indian", "Others"]),
        new DataObj("Religion", "Religion", ["Muslim", "Christian", "Buddhist", "Hindu"]),
        new DataObj("Email_x0020_Address", "Email Address"),
        new DataObj("Telephone_x0020_No", "Telephone Number"),
        new DataObj("Driving_x0020_License_x0020_Clas", "Driving License Class", ["A", "B", "C", "D"]),
    ],
    payroll: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Income_x0020_Tax_x0020_No", "Income Tax No"),
        new DataObj("Income_x0020_Tax_x0020_Branch", "Income Tax Branch"),
        new DataObj("EPF_x0020_No", "EPF No"),
        new DataObj("SOCSO_x0020_No", "SOCSO No"),
        new DataObj("Bank_x0020_Name", "Bank Name"),
        new DataObj("Account_x0020_No", "Account No"),
        new DataObj("Bank_x0020_Branch", "Bank Branch"),
        new DataObj("SWIFT_x0020_Code", "SWIFT Code"),
    ],
    vehicle : [
        new DataObj("Title", "Employee ID"),
        new DataObj("Brand", "Brand"),
        new DataObj("Registration_x0020_No", "Registration No"),
    ],
    family : [
        new DataObj("Title", "NRIC / Passport"),
        new DataObj("Relationship", "Relationship", ["Parent", "Spouse", "Sibling", "Relative"]), //choice
        new DataObj("Employee", "Employee"),
        new DataObj("Employment", "Employment"),
        new DataObj("Employer_x0027_s_x0020_Address", "Employer's Address"),
        new DataObj("Email_x0020_Address", "Email Address"),
        new DataObj("Contact_x0020_No", "Contact No"),
        new DataObj("Age", "Age"),
        new DataObj("Fulltime_x0020_Study", "Fulltime Study", ["Yes", "No"]), //choice
        new DataObj("Scholarship", "Scholarship"),
        new DataObj("Gender", "Gender"),
        new DataObj("Education_x0020_Level", "Education Level", ["Elementary School", "High School", "University", "No Formal Education"]), //choice
        new DataObj("Occupation", "Occupation"),
        new DataObj("Employee_x003a_Employee_x0020_ID", "Employee ID"),
        new DataObj("Employee_x003a_Name", "Employee Name"),
        new DataObj("LinkTitleNoMenu", "NRIC / Passport"),
        new DataObj("LinkTitle", "NRIC / Passport"),
        new DataObj("Full_x0020_Name", "Full Name"),
        new DataObj("Income_x0020_Tax_x0020_No", "Income Tax No"),
        new DataObj("Income_x0020_Tax_x0020_Branch", "Income Tax Branch"),
        new DataObj("No", "No"),
        new DataObj("Modified", "Modified"),
        new DataObj("ComplianceAssetId", "Compliance Asset Id"),
        new DataObj("ID", "ID"),
        new DataObj("ContentType", "Content Type"),
        new DataObj("Created", "Created"),
        new DataObj("Author", "Created By"),
        new DataObj("Editor", "Modified By"),
        new DataObj("Attachments", "Attachments"),
        new DataObj("ItemChildCount", "Item Child Count"),
        new DataObj("FolderChildCount", "Folder Child Count"),
        new DataObj("AppAuthor", "App Created By"),
        new DataObj("AppEditor", "App Modified By"),
    ]
};

(async () => {
    if(window.SP) {
        window.sprLib.baseUrl("/PDS");
        window.personalInfo = await SpList("99bb42f1-e5ca-46de-8f40-63499c445fc6");
        window.payroll = await SpList("e788d805-bbe4-4a19-9784-0c16d811ba4d");
        window.vehicle = await SpList("e5d6cd9a-f845-406c-82d1-b0836faa3322");
        window.family = await SpList("526d18a1-4695-4a2c-812a-8748286c8f6b");
    }
    //delete this else block when in production.
    else {
        window.personalInfo = await SpListSimulator(simulatedCols.personalInfo);
        window.payroll = await SpListSimulator(simulatedCols.payroll);
        window.vehicle = await SpListSimulator(simulatedCols.vehicle);
        window.family = await SpListSimulator(simulatedCols.family);
        
    }
    (window.personalInfo && window.vehicle && window.family) && ReactDOM.render(<App />, document.getElementById('root'));
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
