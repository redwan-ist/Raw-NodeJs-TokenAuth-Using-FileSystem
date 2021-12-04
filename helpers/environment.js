const environment ={}

environment.production ={
    port : 5000,
}

environment.stage ={
    port : 3000,
}


const selectEnv = typeof(process.env.NODE_ENV )==='string' ? process.env.NODE_ENV : 'stage';
const selected = typeof (environment[selectEnv]) === 'object'? environment[selectEnv] : environment[stage];

module.exports  = selected
