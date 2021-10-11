### Steps to deploy the application

#### Front End

1. Clone the repository's front end folder "Frontend" into any machine having node.js installed on it.
2. Open the terminal in the folder "Frontend".
3. Execute "npm install" to install all the dependencies.
4. Update the webConfig.js file in Frontend/src folder with the backend server's IP address and port.
5. Execute "npm start" to run the front end server.

#### Backend

1. Clone the repository's front end folder "Backend" into any machine having node.js installed on it.
2. Open the terminal in the folder "Backend".
3. Execute "npm install" to install all the dependencies.
4. Create a database "ubereats" in MySQL database server and execute the SQL dump to generate the schema.
5. Update connection.js file in Backend folder with database name and connection details.
6. Update the app.js file in Backend folder with frontend server's IP address and port.
7. Execute "node index" to run the backend server.

#### Launch the application

1. Open the browser and navigate to Front end server's IP address with Port number (Eg: 127.0.0.1:3000) to find the landing page.
