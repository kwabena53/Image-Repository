const db = require("./config/db");
const bodyparser = require("body-parser");
const path = require('path')

const express = require('express');
const app = express();
const port = process.env.PORT || 5000; 

const imageController = require("./controllers/image.controller");
const userController = require("./controllers/user.controller");


app.listen(port, () => console.log(`Listening on port ${port}`)); 
app.use(bodyparser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyparser.json());
  app.use(express.static(path.join(__dirname, 'public')));


app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.use( '/user', userController);
app.use(['/api', '/'], imageController);
