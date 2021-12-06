/*
* Title : 404 handler
* Description: 404 not found handler
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/
const handler ={};

handler.notFoundHandler = (parsedData,callback)=>{
    callback(400,{
        message: "URL not Found",
    });
}

module.exports = handler;