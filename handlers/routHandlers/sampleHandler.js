const handler ={};

handler.sampleHandler = (parsedData,callback)=>{
    callback(200,{
        message: "this is a sample URL",
        fname : parsedData.query['fname'],
        lname : parsedData.query['lname'],
    });
}

module.exports = handler;