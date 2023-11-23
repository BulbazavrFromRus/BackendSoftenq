const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const {sequelize} =require('sequelize');
const app = express();
const {Server} = require('socket.io')
const http = require("http");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8001", "http://localhost:8000", "http://0.0.0.0:3000", "http://0.0.0.0:8000"], // Добавьте все допустимые домены
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket)=>{
    if(socket.connected){
        console.log("Everything is good")
    }
    else
    {
        console.log("Something wend wrong")
    }


    console.log(`User connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
        console.log(data)
    });



})

//then create out "connection" and we mentioned other port
server.listen(8001, ()=>{
    console.log("SERVER IS RUNNING")
})





app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);


const db  = require("./sequelize_config.js");


app.get("/zopa",(req,res)=>{
  res.send("Hell, its working...");

});

app.listen(3000, () => console.log('App is running!'));


const initApp = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    const port = 8002;
    app.listen(port, () => {
      console.log('Frontend server is running on port:', port);
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

