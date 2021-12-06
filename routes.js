/*
* Title : Routes
* Description: App Routes
* Author: Md. Redwan Ahmed
* Date: 26/11/2020
*/
const {userHandler} = require('./handlers/routHandlers/userHandler')
const {tokenHandler} = require('./handlers/routHandlers/tokenHandler')

const routes ={
    user : userHandler,
    token : tokenHandler,
};
module.exports = routes;