/*
* Title : Handle Request Response
* Description: Handle Request Response
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/

//dependency
const {StringDecoder} =require('string_decoder');
const url = require('url');
const routes = require('../routes');
const {notFoundHandler} =require('../handlers/routHandlers/notFoundHandler');
const {parseJSON} =require('./utilities')
//module scaffolding
const handler ={}

handler.handleReqRes =(req,res)=>{
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname
    const trimedPath = path.replace(/^\/+|\/+$/g,'').toString();
    const method = req.method.toLowerCase();
    const query = parsedUrl.query;
    const header = req.headers;
    const decoder = new StringDecoder('utf-8');
    let realData =''
    const parsedData = {
        parsedUrl,
        trimedPath,
        method,
        query,
        header
    };
    const selectedRoute = routes[trimedPath]? routes[trimedPath] : notFoundHandler;

   req.on('data',(Buffer)=>{
    realData +=decoder.write(Buffer)
   });
   req.on('end',()=>{
       realData +=decoder.end()
       parsedData.body=parseJSON(realData)
     selectedRoute(parsedData,(status,payload)=>{
        status =typeof(status)=== 'number' ? status :500;
        payload = typeof(payload)==='object' ?payload:{};
        const payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type','application/json');
        res.writeHead(status);
        res.end(payloadString);
    });
   })
}
module.exports = handler;