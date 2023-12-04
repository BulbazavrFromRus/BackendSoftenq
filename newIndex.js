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
        origin: ["http://localhost:3000", "http://localhost:8001", "http://localhost:8000", "http://0.0.0.0:3000"], // Добавьте все допустимые домены
        methods: ["GET", "POST"],
    },
})

const userSockets = {};
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
        const userId = userSockets[socket.id] || socket.id; // Используем сохраненный идентификатор или socket.id
        const username = data.username || "Unknown User"; // Получаем имя пользователя из данных

        const messageData = { text: data.text, sender: username }; // Используем имя пользователя вместо socket.id

        socket.broadcast.emit("receive_message", messageData);
        socket.emit("send_message", messageData); // Send the message back to the sender

        if (!userSockets[socket.id]) {
            userSockets[socket.id] = userId;
        }
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


app.get("/api",(req,res)=>{
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

