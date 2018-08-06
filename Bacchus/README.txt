
Created the project from VS template React + Redux
Runs on Node 8.11.3 and npm 5.6 (npm install and make sure to have webpack-cli , then run webpack --config webpack.config.vendor.js && webpack)
Downloaded all the required npm packages as well as Nuget packages (Entity Framework for Db)
Created local Db for auction winners
Configured Api points to request the data from Azure and save "offers" and display winners
In the Api controller in the [HttpGet] do all the sorting and filtering, in [HttpPost] do all the saving data
For frontend using Fabric UI and Fabric Core for React components with Redux store and actions for data manipulation and display
For typescript using TSLint 
Deleted server-side boot from ClientApp and webpack as they are not needed
For c# to typescript models used TypeWriter for time saving
Changed routes in routes.tsx and added all the required npm packages with their elements to boot-client as well as wrapped into the Fabric component
Minor css changes in css folder for styling
Created Navbar and NavMenu for the frontend as well as the rest components in the components folder in ClientApp
Rest is simply the usage of the fabric UI and fabric core for modeling the layout and data.



