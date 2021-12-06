/*
* Title : Token Based User Authentication with file system
* Description: A RESTFul API 
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/

//dependencies
const  http = require('http');
const {handleReqRes} =require('./helpers/handleReqRes')
const environment = require('./helpers/environment')
const crud = require('./.lib/crud')
//module scaffolding
const app = {};

// configeration


//create Server
app.createServer =()=>{
    const server= http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log(`listening port ${environment.port}`);
    });
}
//handle Request Response
app.handleReqRes=handleReqRes;
app.createServer()