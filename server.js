const db = require("./model/db");
const bodyparser = require("body-parser");

const express = require('express');
const app = express();
const port = process.env.PORT || 5000; 

const controllers = require("./controllers/controllers");

app.listen(port, () => console.log(`Listening on port ${port}`)); 
app.use(bodyparser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyparser.json());

app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.use("/api", controllers);