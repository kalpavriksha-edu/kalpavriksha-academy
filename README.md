# Kalpavriksha

## Kalpavriksha backend server

This is repository for kalpavriksha backend server.

 ## Prerequisites

 - Node.js -  Download and install from [https://nodejs.org/](https://nodejs.org/)
 - NPM (Node Package Manager) - Included with Node.js installation
 - MYSQL - Download and install from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
 
 ### Dependencies
 - Express (Used for create server)
 - Sequelize (Used for ORM)

## Getting started

 **Install MySQL**

  **Create a Database:**
  Connect to the MySQL Server using your preferred MySQL client (e.g., MySQL Workbench) and create a new database.
```sql
  CREATE DATABASE kalpavriksha;
```
Create a User:

  ```sql
  CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
  ```
 **Install dependencies:**
  ```bash
  npm install
   ````

**Set up environment variables:**
Create a `.env` file in the root directory
```bash
DB_HOST=localhost
DB_USER=YourUsername
DB_PASS=yourPassword
DB_NAME=kalpavriksha
 ```

**Run the application locally:**
```bash
npm start
 ```
**Run in dev mode:**
```bash
npm run dev
```