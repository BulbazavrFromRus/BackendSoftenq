const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const {sequelize} =require('sequelize');
const app = express();

app.use(cors());



app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

const db  = require("./sequelize_config.js");

app.get("/api",(req,res)=>{
  res.send("Hell, its working...");
  
});



app.listen(3000, () => console.log('App is running!'));



// const port = 8000;
// app.listen(port, () => {
//   console.log('Frontend server is running on port');
// });



const initApp = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    const port = 8000;
    app.listen(port, () => {
      console.log('Frontend server is running on port');
    })
} catch (error) {
    console.error("Unable to connect to the database:", error.original);
}

}


initApp();


/*const models = require('./models');
const Role = models.Role;
Role.bulkCreate([
  {
    name: "user"
  },
  {
    name: "moderator"
  },
  {
    name:"admin"
  }
])*/

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// Установка максимального количества обработчиков событий для объектов типа TLSSocket
require('events').EventEmitter.defaultMaxListeners = 20; // Здесь можно установить нужное количество

/*onst express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();


const app = express();
app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get("", (req,res)=>{
  res.send("Hell, its working...");
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});*/