
const express = require('express');
const app = express();

app.listen(5000,()=>{

  console.log('listing port 5000')
})



const http = require('http');

http.createServer((req,res)=>{

res.write("<h1>hello this is joy only for test</h1>");
res.end();


}).listen(4500);