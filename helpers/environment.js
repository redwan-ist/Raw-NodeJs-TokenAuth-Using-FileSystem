/*
* Title : Environment
* Description: Environment varialbe for production and stage
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/
const environment ={}

environment.production ={
    port : 5000,
    SKEY :'KdhG5NCYxcjxg6gDE2zZ',
}

environment.stage ={
    port : 3000,
    SKEY :'LahE4SNYyZjxw4gDE2zC',
}


const selectEnv = typeof(process.env.NODE_ENV )==='string' ? process.env.NODE_ENV : 'stage';
const selected = typeof (environment[selectEnv]) === 'object'? environment[selectEnv] : environment[stage];

module.exports  = selected
