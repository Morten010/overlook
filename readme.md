# Hotel Overlook

Built with ❤️

![Hotel Overlook](overlook-thumbnail.png)

## Setup Instructions

1. **Clone Repository:**

    git clone <repository-url>


2. **Navigate to Backend:**

    cd backend


3. **Create Environment File:**
Create a `.env` file with the following content:
```env
PORT=4000
DATABASE_URL="mysql://username:password.@server:port/database"

TOKEN_ACCESS_KEY="B8C8C7A7208D3BC179B85252B271D917C08DB80972A9DA6699704576EE2C241B"
TOKEN_ACCESS_EXPIRATION_SECS=120

TOKEN_REFRESH_KEY=myprivaterefreshkey
TOKEN_REFRESH_EXPIRATION_SECS=3600
```

4. **Create MySQL Database:**
    - Create a MySQL database locally or remotely.
    - Insert the database link into the `.env` file.

5. **Start the project:**
    - Open two terminals.
    - in one terminal, navigate to the frontend directory and run: 
    ```
    npm install
    npm run dev
    ```
    - In the other terminal, navigate to the backend directory and run:
    ```
    npm install
    nodemon index.js
    ```

Now, your Hotel Overlook project is set up and running!