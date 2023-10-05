const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

app.get("/getData",(req,res)=>{
  res.send("Hello");
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
