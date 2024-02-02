const express = require("express");


const app = express();

app.get("/",(req,res)=>{
    // res.writeHead(200,{"content-type":"text/html"});
    res.send("hello");
    
});


app.listen(3333,()=>{
    console.log("server is running");
})