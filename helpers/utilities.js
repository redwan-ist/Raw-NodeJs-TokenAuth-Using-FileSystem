const crypto = require('crypto');
const utilities = {}

utilities.parseJSON =(string)=>{
    output = {}
    try{
        output=JSON.parse(string);
    }
    catch{
        output = {
            'Error': 'Not JSON'
        }
    }
    return output;
}
utilities.encrypt =(string)=>{
    if(typeof(string)==='string' && string.length >0){
     let hash =crypto.createHmac("sha256","afshagfahguaghakj").update(string).digest('hex');
     return hash;
    }
    return false;
}

utilities.tokens =(strlen)=>{
    if (typeof(strlen) ==='number' && strlen>0){
        const array ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        let output = ''
        for(let i=0;i<strlen;i++){
            output+= array.charAt(Math.floor(Math.random() * array.length));
        }
        return output;
    }
    else{
        return false;
    }
}

module.exports = utilities