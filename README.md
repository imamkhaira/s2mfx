## S2MFX
This is a React framework to help you create interactive SharePoint CEWP Forms quickly.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `.\build`

this script deletes the old contents in 'build' folder, if it exists, then
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
it also copies all javascript in lib/js folder.

### Development.

you can load all list or folders necessary in the index.js file.
if you wanted to generate the columns list, 
please open src/lib/js/GenerateColumn.js and follow  the instruction.

### Deployment

open SharePoint Designer 2013 and open your site, then navigate to Site Assets. create a new folder, give it any name as you like.
then left click the folder, and copy the URL of the folder.
in the project folder, open package.json, then paste the folder URL back into "homepage" section of the JSON file.
