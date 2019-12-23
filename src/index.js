import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';
import SpSite, { Column } from './lib/js/SpSite';

let PersonnelDataSheet = new SpSite();

PersonnelDataSheet.loadList("personalInfo", "Personal Information", [
    Column("Title", "Employee ID"),
    Column("Full_x0020_Name", "Full Name"),
    Column("Designation", "Designation"),
    Column("Division", "Divisions", ["Engineering","Admin","Information Technology"]),
    Column("Date_x0020_of_x0020_Birth", "Date of Birth"),
    Column("Age", "Age"),
    Column("NRIC_x0020__x002f__x0020_Passpor", "NRIC / Passport"),
    Column("Citizenship", "Citizenship", ["Select...","Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar, {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"]),
    Column("Race", "Race", ["Select...","Malay","Chinese","Indian","Others"]),
    Column("Gender", "Gender", ["Male","Female","Others"]),
    Column("Religion", "Religion", ["Select...","Muslim","Christian","Buddhist","Hindu"]),
    Column("Marital_x0020_Status", "Marital Status", ["Single","Married","Divorced"]),
    Column("Permanent_x0020_Address", "Permanent Address"),
    Column("Correspondence_x0020_Address", "Correspondence Address"),
    Column("Email_x0020_Address", "Email Address"),
    Column("Telephone_x0020_No", "Telephone No"),
    Column("Driving_x0020_License_x0020_Clas", "Driving License Class", ["No Driving License","A","B","C","D","E","F"]),
    Column("Status", "Status", ["Active","Resigned","Inactive"]),
    Column("Picture", "Picture")
]);

PersonnelDataSheet.loadList("payroll", "Payroll Information", [  
    Column("Title", "Employee ID"),
    Column("Employee", "Employee"),
    Column("Bank_x0020_Account_x0020_No", "Bank Account No"),
    Column("Bank_x0020_Name", "Bank Name"),
    Column("Bank_x0020_Branch", "Bank Branch"),
    Column("Bank_x0020_SWIFT_x0020_Code", "Bank SWIFT Code"),
    Column("Income_x0020_Tax_x0020_No", "Income Tax No"),
    Column("Income_x0020_Tax_x0020_Branch", "Income Tax Branch"),
    Column("SOCSO_x0020_No", "SOCSO No"),
    Column("EPF_x0020_No", "EPF No")
]);

PersonnelDataSheet.loadList("vehicle", "Vehicle Information", [ 
    Column("Title", "Employee ID"),
    Column("Employee_x0020_Name", "Employee Name"),
    Column("Brand_x0020__x0026__x0020_Type", "Brand & Type"),
    Column("Registration_x0020_No", "Registration No"),
    Column("Vehicle_x0020_Type", "Vehicle Type", ["Car","Motorcycle","Tank"])
]);

PersonnelDataSheet.loadList("family", "Family Information", [ 
    Column("Title", "Employee ID"),
    Column("Employee", "Employee"),
    Column("Family_x0020_Member_x0020_Name", "Family Member Name"),
    Column("Relationship", "Relationship", ["Select...","Spouse","Children","Parent","Sibling","Relative","Other"]),
    Column("Gender", "Gender", ["Male","Female","Other"]),
    Column("NRIC_x0020_No", "NRIC No"),
    Column("Education_x0020_Level", "Education Level", ["Select...","No Formal Education","Elementary School","High School","College / Diploma","University (Degree)","University (Masters)","University (PhD)"]),
    Column("Occupation", "Occupation"),
    Column("Employer", "Employer"),
    Column("Contact_x0020_No_x002e_", "Contact No.")
]);

PersonnelDataSheet.loadList("emergency", "Emergency Contact", [
    Column("Title", "Title"),
    Column("Employee", "Employee"),
    Column("Contact_x0020_Name", "Contact Name"),
    Column("Relationship", "Relationship", ["Select...","Spouse","Parent","Children","Sibling","Friend","Relative"]),
    Column("Contact_x0020_Address", "Contact Address"),
    Column("Telephone_x0020_No", "Telephone No"),
    Column("Email_x0020_Address", "Email Address")
]);

PersonnelDataSheet.loadList("education", "Education Information", [
    Column("Title", "Employee ID"),
    Column("Employee", "Employee"),
    Column("Institution", "Institution"),
    Column("Year_x0020_Start", "Year Start"),
    Column("Year_x0020_End", "Year End"),
    Column("Obtained_x0020_Certificate", "Obtained Certificate", ["Select...","High School","Diploma","Bachelor","Masters","Doctorate"]),
    Column("Major", "Major", ["Select...","PETROLEUM ENGINEERING","ELECTRICAL ENGINEERING TECHNOLOGY","MINING AND MINERAL ENGINEERING","NAVAL ARCHITECTURE AND MARINE ENGINEERING","METALLURGICAL ENGINEERING","CIVIL ENGINEERING","CHEMICAL ENGINEERING","MECHANICAL ENGINEERING","ELECTRICAL ENGINEERING","COMPUTER ENGINEERING","NUCLEAR ENGINEERING","ENVIRONMENTAL ENGINEERING","FINANCE","ECONOMICS","ACCOUNTING","BUSINESS ECONOMICS","INFORMATION SCIENCES","COMPUTER SCIENCE","COMPUTER AND INFORMATION SYSTEMS","MATHEMATICS","ACTUARIAL SCIENCE","ASTRONOMY AND ASTROPHYSICS","AEROSPACE ENGINEERING","BIOMEDICAL ENGINEERING","MATERIALS SCIENCE","ENGINEERING MECHANICS PHYSICS AND SCIENCE","BIOLOGICAL ENGINEERING","INDUSTRIAL AND MANUFACTURING ENGINEERING","GENERAL ENGINEERING","ARCHITECTURAL ENGINEERING","COURT REPORTING","FOOD SCIENCE","MATERIALS ENGINEERING AND MATERIALS SCIENCE","MANAGEMENT INFORMATION SYSTEMS AND STATISTICS","CONSTRUCTION SERVICES","OPERATIONS LOGISTICS AND E-COMMERCE","MISCELLANEOUS ENGINEERING","PUBLIC POLICY","ENGINEERING TECHNOLOGIES","MISCELLANEOUS FINE ARTS","GEOLOGICAL AND GEOPHYSICAL ENGINEERING","NURSING","INDUSTRIAL PRODUCTION TECHNOLOGIES","PHYSICS","MEDICAL TECHNOLOGIES TECHNICIANS","STATISTICS AND DECISION SCIENCE","APPLIED MATHEMATICS","PHARMACOLOGY","OCEANOGRAPHY","ENGINEERING AND INDUSTRIAL MANAGEMENT","MEDICAL ASSISTING SERVICES","MATHEMATICS AND COMPUTER SCIENCE","COMPUTER PROGRAMMING AND DATA PROCESSING","COGNITIVE SCIENCE AND BIO-PSYCHOLOGY","SCHOOL STUDENT COUNSELING","INTERNATIONAL RELATIONS","GENERAL BUSINESS","ARCHITECTURE","INTERNATIONAL BUSINESS","PHARMACY PHARMACEUTICAL SCIENCES AND ADMINISTRATION","MOLECULAR BIOLOGY","MISCELLANEOUS BUSINESS & MEDICAL ADMINISTRATION","AGRICULTURE PRODUCTION AND MANAGEMENT","GENERAL AGRICULTURE","MISCELLANEOUS ENGINEERING TECHNOLOGIES","MECHANICAL ENGINEERING RELATED TECHNOLOGIES","GENETICS","MISCELLANEOUS SOCIAL SCIENCES","UNITED STATES HISTORY","INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY","AGRICULTURAL ECONOMICS","PHYSICAL SCIENCES","MILITARY TECHNOLOGIES","CHEMISTRY","ELECTRICAL, MECHANICAL, AND PRECISION TECHNOLOGIES AND PRODUCTION","BUSINESS MANAGEMENT AND ADMINISTRATION","MARKETING AND MARKETING RESEARCH","POLITICAL SCIENCE AND GOVERNMENT","GEOGRAPHY","MICROBIOLOGY","COMPUTER ADMINISTRATION MANAGEMENT AND SECURITY","BIOCHEMICAL SCIENCES","BOTANY","COMPUTER NETWORKING AND TELECOMMUNICATIONS","GEOLOGY AND EARTH SCIENCE","HUMAN RESOURCES AND PERSONNEL MANAGEMENT","PRE-LAW AND LEGAL STUDIES","MISCELLANEOUS HEALTH MEDICAL PROFESSIONS","PUBLIC ADMINISTRATION","GEO-SCIENCES","SOCIAL PSYCHOLOGY","ENVIRONMENTAL SCIENCE","COMMUNICATIONS","CRIMINAL JUSTICE AND FIRE PROTECTION","COMMERCIAL ART AND GRAPHIC DESIGN","JOURNALISM","MULTI-DISCIPLINARY OR GENERAL SCIENCE","ADVERTISING AND PUBLIC RELATIONS","AREA ETHNIC AND CIVILIZATION STUDIES","SPECIAL NEEDS EDUCATION","PHYSIOLOGY","CRIMINOLOGY","NUTRITION SCIENCES","HEALTH AND MEDICAL ADMINISTRATIVE SERVICES","COMMUNICATION TECHNOLOGIES","TRANSPORTATION SCIENCES AND TECHNOLOGIES","NATURAL RESOURCES MANAGEMENT","NEUROSCIENCE","MULTI/INTERDISCIPLINARY STUDIES","ATMOSPHERIC SCIENCES AND METEOROLOGY","FORESTRY","SOIL SCIENCE","GENERAL EDUCATION","HISTORY","FRENCH GERMAN LATIN AND OTHER COMMON FOREIGN LANGUAGE STUDIES","INTERCULTURAL AND INTERNATIONAL STUDIES","SOCIAL SCIENCE OR HISTORY TEACHER EDUCATION","COMMUNITY AND PUBLIC HEALTH","MATHEMATICS TEACHER EDUCATION","EDUCATIONAL ADMINISTRATION AND SUPERVISION","HEALTH AND MEDICAL PREPARATORY PROGRAMS","MISCELLANEOUS BIOLOGY","BIOLOGY","SOCIOLOGY","MASS MEDIA","TREATMENT THERAPY PROFESSIONS","HOSPITALITY MANAGEMENT","LANGUAGE AND DRAMA EDUCATION","LINGUISTICS AND COMPARATIVE LANGUAGE AND LITERATURE","MISCELLANEOUS EDUCATION","INTERDISCIPLINARY SOCIAL SCIENCES","ECOLOGY","SECONDARY TEACHER EDUCATION","GENERAL MEDICAL AND HEALTH SERVICES","PHILOSOPHY AND RELIGIOUS STUDIES","ART AND MUSIC EDUCATION","ENGLISH LANGUAGE AND LITERATURE","ELEMENTARY EDUCATION","PHYSICAL FITNESS PARKS RECREATION AND LEISURE","LIBERAL ARTS","FILM VIDEO AND PHOTOGRAPHIC ARTS","GENERAL SOCIAL SCIENCES","PLANT SCIENCE AND AGRONOMY","SCIENCE AND COMPUTER TEACHER EDUCATION","PSYCHOLOGY","MUSIC","PHYSICAL AND HEALTH EDUCATION TEACHING","ART HISTORY AND CRITICISM","FINE ARTS","FAMILY AND CONSUMER SCIENCES","SOCIAL WORK","ANIMAL SCIENCES","VISUAL AND PERFORMING ARTS","TEACHER EDUCATION: MULTIPLE LEVELS","MISCELLANEOUS PSYCHOLOGY","HUMAN SERVICES AND COMMUNITY ORGANIZATION","HUMANITIES","THEOLOGY AND RELIGIOUS VOCATIONS","STUDIO ARTS","COSMETOLOGY SERVICES AND CULINARY ARTS","MISCELLANEOUS AGRICULTURE","ANTHROPOLOGY AND ARCHAEOLOGY","COMMUNICATION DISORDERS SCIENCES AND SERVICES","EARLY CHILDHOOD EDUCATION","OTHER FOREIGN LANGUAGES","DRAMA AND THEATER ARTS","COMPOSITION AND RHETORIC","ZOOLOGY","EDUCATIONAL PSYCHOLOGY","CLINICAL PSYCHOLOGY","COUNSELING PSYCHOLOGY","LIBRARY SCIENCE"]),
    Column("Achievement", "Achievement")
]);

PersonnelDataSheet.loadList("professional", "Professional Membership", [
    Column("Title", "Employee ID"),
    Column("Employee", "Employee"),
    Column("Membership_x0020__x002f__x0020_A", "Membership / Accreditation"),
    Column("Registration_x0020_No", "Registration No"),
    Column("Expiration_x0020_Date", "Expiration Date"),
    Column("ContentType", "Content Type")
]);

PersonnelDataSheet.loadList("employment", "Employment Information", [
    Column("Title", "Employee ID"),
    Column("Employee", "Employee"),
    Column("Date_x0020_Start", "Date Start"),
    Column("Date_x0020_Enf", "Date End"),
    Column("Designation", "Designation"),
    Column("Employer", "Employer"),
    Column("Salary", "Salary"),
    Column("Reason_x0020_of_x0020_Leaving", "Reason of Leaving") 
]);

PersonnelDataSheet.loadFolder("folder", "ProfilePicture/");

PersonnelDataSheet.ready().then( function(){
    ReactDOM.render(<App />, document.getElementById('root'));
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
