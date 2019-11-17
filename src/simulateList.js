import SpListSimulator, { DataObj } from './lib/js/SpListSimulator';

let simulatedCols = {
    personalInfo: [
        new DataObj("Title", "Employee ID"),
        new DataObj("Age"),
        new DataObj("Citizenship"),
        new DataObj("Correspondence_x0020_Address"),
        new DataObj("Date_x0020_of_x0020_Birth"),
        new DataObj("Designation,"),
        new DataObj("Division", "Division", ["engineering"]),
        new DataObj("Full_x0020_Name", "Full Name"),
        new DataObj("Gender"),
        new DataObj("Marital_x0020_Status"),
        new DataObj("NRIC_x0020_Current"),
        new DataObj("NRIC_x0020_Old"),
        new DataObj("Permanent_x0020_Address"),
        new DataObj("Race"),
        new DataObj("Religion"),
        new DataObj("Email_x0020_Address"),
        new DataObj("Telephone_x0020_No"),
        new DataObj("Driving_x0020_License_x0020_Clas"),
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

window.personalInfo = new SpListSimulator(simulatedCols.personalInfo);
window.payroll = new SpListSimulator(simulatedCols.payroll);