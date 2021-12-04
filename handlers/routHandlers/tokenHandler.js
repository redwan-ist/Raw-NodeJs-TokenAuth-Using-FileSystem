const crud = require('../../.lib/crud')
const util = require('../../helpers/utilities')
const handler ={};

handler.tokenHandler = (parsedData,callback)=>{
    const methodList =['get','post','put','delete']
    if(methodList.indexOf(parsedData.method)>-1){ 
        handler[parsedData.method](parsedData,callback);
    }
    else{
        callback(405);
    }
}


handler.post=(parsedData,callback)=>{
    phone = typeof(parsedData.body.phone) ==='string' && parsedData.body.phone.trim().length ===11 ? parsedData.body.phone :false;
    password = typeof(parsedData.body.password) ==='string' && parsedData.body.password.trim().length >0 ? parsedData.body.password :false;
    if(phone && password){
        crud.read('user',phone,(err,data)=>{
            if(!err && data){
                if(util.encrypt(password) === util.parseJSON(data).password){
                        id = util.tokens(20);       
                        const tokenData ={
                            id,
                            phone,
                            expire : Date.now()*60*60*1000
                        }
                        crud.create('token',id,tokenData,(err)=>{
                            if(!err){
                                callback(200,{message: 'token created'});
                            }
                            else{
                                callback(500,{error: 'authentication failure'});
                            }
                        });
                }
                else{
                    callback(500,{error: 'authentication failure'});
                }
                
            }
            else{
                callback(500,{error: 'somthing wrong on server side'});
            }
            

        })
    }
    else{
        callback(500,{error: 'somthing wrong on server side'});
    }
}
handler.get=(parsedData,callback)=>{
    token = typeof(parsedData.header.token) ==='string' && parsedData.header.token.trim().length ===20 ? parsedData.header.token :false;
    if(token){
        crud.read('token',token,(err,d)=>{
            data = {...util.parseJSON(d)};
            if(!err && data){
                if(data.expire > Date.now()){
                    callback(200,data);
                }
                else{
                    callback(500,{error:"token Expired"});
                }
            }
            else{
                callback(500,{error:"something wrong on server side"});
            }
        });
    }
    else{
        callback(500,{error:"invalid Token"});
    }
    
}
handler.put=(parsedData,callback)=>{
    token = typeof(parsedData.header.token) ==='string' && parsedData.header.token.trim().length ===20 ? parsedData.header.token :false;
    extend = typeof(parsedData.body.extend) ==='boolean' && parsedData.body.extend === true ? parsedData.body.extend :false;
    if(token && extend){
        crud.read('token',token,(err,data)=>{
            if(!err && data){
                let newData = {...util.parseJSON(data)}
                if(newData.expire > Date.now()){
                    newData.expire = Date.now() *60*60*1000;
                    crud.update('token',token,newData,()=>{
                        if(!err){
                            callback(200,{message:"token Updated"});
                        }
                        else{
                            callback(500,{error:"something wrong on server side"});
                        }
                    }
                    )
                }
                else{
                    callback(500,{error:"token already expired"});
                }
            }
            else{
                callback(500,{error:"something wrong on server side"});
            }
        });
    }
    else{
        callback(200,{})
    }
   
}
handler.delete=(parsedData,callback)=>{
    token = typeof(parsedData.header.token) ==='string' && parsedData.header.token.trim().length ===20 ? parsedData.header.token :false;
    if(token){
        crud.delete('token',token,(err)=>{
            if(!err){
                callback(200,{message:'token Deleted'});
            }
            else{
                callback(500,{error:'something went wrong'});
            }
        });
    }
}

handler.varify = (parsedData,callback)=>{
    token = typeof(parsedData.header.token) ==='string' && parsedData.header.token.trim().length ===20 ? parsedData.header.token :false;
    phone = typeof(parsedData.body.phone) ==='string' && parsedData.body.phone.trim().length ===11 ? parsedData.body.phone :false;
    if(token && phone){
        crud.read('token',token,(err,d)=>{
            data = {...util.parseJSON(d)};
            if(!err && data){
                if(data.expire > Date.now()){
                    if(data.phone === phone){
                        callback(true);
                    }
                }
                else{
                    callback(false);
                }
            }
            else{
               
                callback(false);
            }
        });
    }
    else{
        callback(false);
    }
}


module.exports = handler;