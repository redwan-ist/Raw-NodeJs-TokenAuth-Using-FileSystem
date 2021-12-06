# Raw-NodeJs-TokenAuth-Using-FileSystem


This is a learning Project

Token Based Authentication using File system


#Registration User:
POST:
http://127.0.0.1:3000/user
<br>
Params:
```json
{
    "firstName" : "",
    "lastName" : "",
    "phone" : "",
    "password" : ""
}
```


#Generate Token:
POST:
http://127.0.0.1:3000/token
<br>
Params:
```json

{
    "phone" : "",
    "password" : ""
}
```
