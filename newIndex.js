const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const {sequelize} =require('sequelize');
const app = express();

const WebSocket = require('ws')

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



require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// Установка максимального количества обработчиков событий для объектов типа TLSSocket
require('events').EventEmitter.defaultMaxListeners = 20; // Здесь можно установить нужное количество

