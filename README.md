# Raw-NodeJs-TokenAuth-Using-FileSysyem


This is a learning Project

Token Based Authentication using File system


#Registration User:
POST:
http://127.0.0.1:3000/user
Params:
{
    "firstName" : "",
    "lastName" : "",
    "phone" : "",
    "password" : ""
}


#Generate Token:
POST:
http://127.0.0.1:3000/token
Params:
{
    "phone" : "",
    "password" : ""
}
