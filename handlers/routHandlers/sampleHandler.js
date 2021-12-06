const handler ={};

handler.sampleHandler = (parsedData,callback)=>{
    callback(200,{
        message: "this is a sample URL",
    });
}

module.exports = handler;