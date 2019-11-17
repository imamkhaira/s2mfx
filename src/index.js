import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';
import SpList from './lib/js/SpList';
import SpListSimulator, { DataObj } from './lib/js/SpListSimulator';

let simulatedCols = {
    personalInfo: [
        // new DataObj(data name, display name, options array)
        new DataObj("Title", "Employee ID"),
        new DataObj("Age"),
        new DataObj("Citizenship", "Citizenship", ["amerika", "inggris"]),
        new DataObj("Correspondence_x0020_Address", "Mailing Address"),
        new DataObj("Date_x0020_of_x0020_Birth", "Date of Birth"),
        new DataObj("Designation", "Designation"),
        new DataObj("Division", "Division", ["engineering", "admin", "it"]),
        new DataObj("Full_x0020_Name", "Full Name"),
        new DataObj("Gender", "Gender", ["Mel", "Fimel", "Ge"]),
        new DataObj("Marital_x0020_Status", "Marital Status", ["sInGGeL", "Meried", "Diforced"]),
        new DataObj("NRIC_x0020_Current", "NRIC/Passport (current)"),
        new DataObj("NRIC_x0020_Old", "NRIC/Passport (old)"),
        new DataObj("Permanent_x0020_Address", "Permanent Address"),
        new DataObj("Race", "Race", ["Maley", "Chainis", "Indiean", "Others"]),
        new DataObj("Religion", "Religion", ["Islamic", "Radikal", "Khilafah", "HTI"]),
        new DataObj("Email_x0020_Address", "Email Address"),
        new DataObj("Telephone_x0020_No", "Telephone Number"),
        new DataObj("Driving_x0020_License_x0020_Clas", "Driving License Class", ["A", "B", "C", "D"]),
    ],
    payroll: [
        new DataObj("accountNo"),
        new DataObj("bankName"),
        new DataObj("bankBranch"),
        new DataObj("bankSwift"),
        new DataObj("incomeTaxNo"),
        new DataObj("socsoNo"),
        new DataObj("taxBranch"),
        new DataObj("epfNo")
    ]
};

(async () => {
    if(window.SP) {
        window.sprLib.baseUrl("/PDS");
        window.personalInfo = await SpList("99bb42f1-e5ca-46de-8f40-63499c445fc6");
        window.payroll = await SpList("99bb42f1-e5ca-46de-8f40-63499c445fc6");
    }
    else {
        window.personalInfo = await SpListSimulator(simulatedCols.personalInfo);
        window.payroll = await SpListSimulator(simulatedCols.payroll);
    }
    (window.personalInfo && window.payroll) && ReactDOM.render(<App />, document.getElementById('root'));
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
