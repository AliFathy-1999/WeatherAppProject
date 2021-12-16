// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const path = require("path");
// Start up an instance of app
const app = express();
//Start up server
const port = 3000;
// Local server running and give feedback to the commind line through a callback function
app.listen(port, () => {
  console.log(`Server running at port : ${port}`);
});


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder & At line 26, I used app.use() to make app (instance of express) see my frontend folder (website)
app.use(express.static("website"));
//To appear images in this Website
app.use(express.static(path.join(__dirname, 'public')));


//GET route that returns the projectData object in server code
app.get("/getData", (req, res) => {
  return res.send(projectData);
});
//Create post method route to add data from client-side to projectData Object and The POST route receiving three pieces of data from the request body
app.post("/postData", (req, res) => {
  console.log(req.body);
  // Add each of those Data to projectData key 
  projectData = req.body;
  //I used JSON.stringify() method to convert a JavaScript object (projectData) value to a JSON string
  return res.send(JSON.stringify(projectData));
});
