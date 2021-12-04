const handler ={};

handler.notFoundHandler = (parsedData,callback)=>{
    callback(400,{
        message: "URL not Found",
    });
}

module.exports = handler;