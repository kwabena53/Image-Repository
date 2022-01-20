const db = require("./config/db");
const bodyparser = require("body-parser");
const path = require('path')

const express = require('express');
const app = express();
const port = process.env.PORT || 5000; 

const imageController = require("./controllers/image.controller");
const userController = require("./controllers/user.controller");

// app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
      extended: true,
    })
  );
// app.use(express.static(path.join(__dirname, 'public')));


app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.use( '/api/user', userController);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, '../', 'client/build/index.html')
      );
    });
  }
app.listen(port, () => console.log(`Listening on port ${port}`)); 

