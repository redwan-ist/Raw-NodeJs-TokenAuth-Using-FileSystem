/*
* Title : User Handle
* Description: crud opertation for user
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/


const crud = require('../../.lib/crud')
const util = require('../../helpers/utilities')
const auth = require('./tokenHandler')
const handler ={};

handler.userHandler=(parsedData,callback)=>{
    const methodList =['get','post','put','delete']
    if(methodList.indexOf(parsedData.method)>-1){ 
        handler[parsedData.method](parsedData,callback);
    }
    else{
        callback(405);
    }
}

handler.get =(parsedData,callback)=>{
    auth.varify(parsedData,(isauth)=>{
        if(isauth){
            if(parsedData.body.phone){
                crud.read("user",parsedData.body.phone,(err,data)=>{
                   
                    if(!err){
                        userData = {...util.parseJSON(data)};
                        
                        delete userData.password;
                        callback(200,userData);
                    }
                    else{
                        callback(500,
                            {error:'someting Wrong'}
                        )
                    }
                })
            }
            else{
                callback(500,{error:'phone=xxxxxxxx'})
            }
        
        }
        else{
            callback(500,{error:'notAuthenticated'})
        }
    })
};
handler.post =(parsedData,callback)=>{
    firstName = typeof(parsedData.body.firstName) ==='string' && parsedData.body.firstName.trim().length> 0 ? parsedData.body.firstName :false;
    lastName = typeof(parsedData.body.lastName) ==='string' && parsedData.body.lastName.trim().length>0 ? parsedData.body.lastName :false;
    phone = typeof(parsedData.body.phone) ==='string' && parsedData.body.phone.trim().length ===11 ? parsedData.body.phone :false;
    password = typeof(parsedData.body.password) ==='string' && parsedData.body.password.trim().length >0 ? parsedData.body.password :false;
    tac = typeof(parsedData.body.tac) ==='boolean' ? parsedData.body.tac : -1;
    if(firstName&&lastName&&password&&tac!=-1){
        data = {
            firstName,
            lastName,
            phone,
            password:util.encrypt(password),
            tac
        }
       crud.read("user",phone,(err)=>{
           if(!err){
            callback(500,{error:'user Already Exist'})
           }
           else{
            crud.create("user",phone,data,(err)=>{
                if(!err){
                    callback(200,{message:"added User Succesfully"});
                }
                else{
                    callback(500,{error:'something wrong'});
                }
            });
           }
       })
        
    } 
    else{
        callback(500,{
            Error: 'Wrong Type Or validate error'
        })
    }
    
};

handler.put =(parsedData,callback)=>{
    
    auth.varify(parsedData,(isauth)=>{
        if(isauth){
            firstName = typeof(parsedData.body.firstName) ==='string' && parsedData.body.firstName.trim().length> 0 ? parsedData.body.firstName :false;
            lastName = typeof(parsedData.body.lastName) ==='string' && parsedData.body.lastName.trim().length>0 ? parsedData.body.lastName :false;
            phone = typeof(parsedData.body.phone) ==='string' && parsedData.body.phone.trim().length ===11 ? parsedData.body.phone :false;
            password = typeof(parsedData.body.password) ==='string' && parsedData.body.password.trim().length >0 ? parsedData.body.password :false;
            if(phone){
                crud.read('user',phone,(err,uData)=>{
                    if(!err){
                        data = {...JSON.parse(uData)}
                        if(firstName){
                            data.firstName =firstName;
                        }
                        if(lastName){
                            data.lastName = lastName;
                        }
                        if(password){
                            data.password = util.encrypt(password);
                        }
                        console.log(data);
                        crud.update('user',phone,data,(err)=>{
                            if(!err){
                                callback(200,{message: "updated Succesfully"});
                            }
                            else{
                                callback(500,{
                                    Error: "Something Went Wrong"
                                })
                            }
                            }    
                        )
                    }
                    else{
                        callback(500,{
                            Error: "Something Went Wrong"
                        })
                    }
                    
                });
            }
            else{
                callback(500,{
                    Error: "Wrong Type Or validate error"
                })
            }
        }
        else{
            callback(500,{error:'notAuthenticated'})
        }
    });


    
}

handler.delete =(parsedData,callback)=>{
    auth.varify(parsedData,(isauth)=>{
        if(isauth){
    if(parsedData.body.phone){
        crud.read("user",parsedData.body.phone,(err)=>{
            if(!err){
                crud.delete("user",parsedData.body.phone,(err)=>{
                    if(!err){
                        
                        callback(200,
                            {Messege:`deleted ${parsedData.body.phone}`}
                            );
                    }
                    else{
                        callback(500,
                            {error:'someting Wrong'}
                        )
                    }
                })
            }
            else{
                callback(500,
                    {error:'someting Wrong'}
                )
            }
        })
    }
    else{
        callback(500,{error:'phone=xxxxxxxx'})
    }}
    else{
        callback(401,
            {error:'notAuthenticated'}
        )
    }
});
};

module.exports=handler;