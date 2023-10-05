const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const {sequelize} =require('sequelize');
const app = express();
app.use(cors());

const db  = require("./sequelize_config.js");

app.get("/getData",(req,res)=>{
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

    /**
     * Start the web server on the specified port.
     */
    const port = 8000;
    app.listen(port, () => {
      console.log('Frontend server is running on port');
    })
} catch (error) {
    console.error("Unable to connect to the database:", error.original);
}

}


initApp();
