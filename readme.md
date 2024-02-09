# Hotel Overlook

Built with ❤️

[![Hotel overlook](overlook-thumbnail.png)]()

## How to setup

Start of by cloning repository.

then cd into backend and create an env file looking like this

```env
PORT = 4000

DATABASE_URL="mysql://username:password.@server:port/database"

TOKEN_ACCESS_KEY = "B8C8C7A7208D3BC179B85252B271D917C08DB80972A9DA6699704576EE2C241B"
TOKEN_ACCESS_EXPIRATION_SECS = 120

TOKEN_REFRESH_KEY = myprivaterefreshkey
TOKEN_REFRESH_EXPIRATION_SECS = 3600
```

## Create mysql database

create mysql database locally or not. connect insert database link into env file

## Start project

Open two terminals. cd into backend with one and frontend with another.

npm install in both.

run 
```npm run dev``` 
in frontend

run 
```nodemon index.js``` 
in backend