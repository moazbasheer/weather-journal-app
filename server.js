// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.post('/all', (req, res) => {
    const data = (req.body);
    projectData["temp"] = data.temp;
    projectData["feelings"] = data.feelings;
    projectData["date"] = data.date;
    res.send(projectData);
});

app.get('/ui', (req, res) => {
    res.send(projectData);
});
// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};
