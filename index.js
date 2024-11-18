const express = require('express')
const axios = require('axios');
const app = express();


// Set the view engine to 'pug'
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Had trouble with .env encoding
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

// * Please DO NOT INCLUDE the private app access token
const PRIVATE_APP_ACCESS = process.env.HUBSPOT_ACCESS_TOKEN;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call 
// your custom object data. Pass this data along to the front-end and create 
// a new pug template in the views folder.
// Define a route - HOMEPAGE
app.get('/', async (req, res) => {

    // End point URL
    const certifications = 'https://api.hubspot.com/crm/v3/objects/certifications/?properties=name&properties=school&properties=year_completed';
    
    // Headers / Authorization
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'content-type': 'application/json'
    }

    // Error handling
     try {
        const response = await axios.get(certifications, data, { headers });
        const data = response.data.results;
        //const data = response.data; Leave for testing purposes

        // render route
        res.render('homepage', {title: 'Certifications | Hubspot APIs', data});
        //res.json(data); Leave for testing purposes
     } catch (error) {
        console.error(error);
     }

});
// * Code for Route 1 ends here

// TODO: ROUTE 2 - 
// Create a new app.get route for the form to create or 
// update new custom object data. Send this data along in the next route.

app.get('/update', (req, res) => {
  try {
    res.render('update', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
  } catch (error) {
    console.error(error);
  }
});

// * Code for Route 2 ends here

// TODO: ROUTE 3 - 
// Create a new app.post route for the custom objects form 
// to create or update your custom object data. Once executed, 
// redirect the user to the homepage.

app.post('/update', async (req, res) => {
  const certificationEndpoint = 'https://api.hubspot.com/crm/v3/objects/2-36865663';
  
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'content-type': 'application/json'
  }

  const data = {
    properties: {
      name: req.body.name,
      school: req.body.school,
      year_completed: req.body.year_completed
    }
  }

  try {
    const response = await axios.post(certificationEndpoint, data, { headers });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    res.redirect('/'); 
  } catch (error) {
    console.error(error);
  }
});

// * Code for Route 3 ends here

// ** 

// Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000 - Practicum 1'));