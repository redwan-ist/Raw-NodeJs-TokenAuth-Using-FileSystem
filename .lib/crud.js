/*
* Title : CRUD
* Description: crud from file
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/

//dependency
const fs =require('fs')
const path = require('path')

//module scaffolding

const lib ={}

lib.basedir = path.join(__dirname,'../.data/')

//write data to file

lib.create = (dir,file,data,callback)=>{
    //file open
    fs.open(lib.basedir+dir+'/'+file+'.json','wx',(err,fileDesc)=>{
        if(!err && fileDesc){
           // convert data to Json String
           JsonData = JSON.stringify(data)
            //Write Data to file and Close it
            fs.writeFile(fileDesc,JsonData,(err)=>{
                if(!err){
                    fs.close(fileDesc,(err)=>{
                        if(!err){
                            callback(false);
                        }
                        else{
                            callback('error closing new file');
                        }
                    });
                }
                else{
                    callback('couldnt write to new file!');
                }
            })


        }
        else{
            callback('couldnt create new file, it may already exists!');
        }
    });

};
//read data from file
lib.read = (dir,file,callback)=>{

            fs.readFile(lib.basedir+dir+'/'+file+'.json','utf-8',(err,data)=>{
                if(!err){
                    callback(false,data)
                }
                else{
                    callback('an error occure while reading file');
                }
            })
};
//update data on file 
lib.update = (dir,file,data,callback)=>{
    fs.open(lib.basedir+dir+'/'+file+'.json','r+',(err,fileDesc)=>{
        if(!err){
            JsonData = JSON.stringify(data);
            fs.ftruncate(fileDesc,(err)=>{
                if(!err){
                    fs.writeFile(fileDesc,JsonData,(err)=>{
                        if(!err){
                            fs.close(fileDesc,(err)=>{
                                if(!err){
                                    callback(false);
                                }
                                else{
                                    callback('Error: Closing File');
                                }
                            })
                        }
                        else{
                            callback('Error: Writing File');
                        }
                    })
                }
                else{
                    callback('Error: Truncate Error')
                }
            });
        }
        else{
            callback('Error: Updating: File may not Exist');
        }
    });
}

lib.delete= (dir,file,callback)=>{
    fs.unlink(lib.basedir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            callback(false);
        }
        else{
            callback('Error: Deleting File');
        }
    })
}
module.exports = lib;