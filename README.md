An app for badminton racket inventory 

In the root directory:

npm init -y
npm install express mongoose dotenv

express = web framework that allows us to build API easily
mongoose = to interact with our data base
.env package to access the environment variables


To speed up the frontend, use Chakra UI 👍

npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
import { ChakraProvider } from '@chakra-ui/react'

in the main.jsx, do the following:
function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication />
    </ChakraProvider>
  )
}

To have multiple pages for a website, install this :
npm i react-router-dom
npm i react-icons
npm i zustand
npm i cors
npm i jsonwebtoken

To run the website, run these two: 
PS C:\Users\eugen\Documents\MongoDB\Product-Store-App> npm run dev
PS C:\Users\eugen\Documents\MongoDB\Product-Store-App\frontend> npm run dev


API = Application Programming Interface

Project: Yonex-Product-Store-Project

    Cluster: YonexProductStore

        Database: products

            Collection  = yonex products

                Documents = Yonex nanoflare, Lining acerBlade

to deploy:
change 
  "scripts": {
    "dev": "nodemon ./backend/server.js",
  },

  to this: 

    "scripts": {
    "dev": "nodemon ./backend/server.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "start" : "node backend/server.js"
  },

  for start, we using node instead of nodemon cuz in production it only run once

  so when do npm run build, it will install all the dependencies in frontend and backend

  npm install cross-env

  then do npm run start to start the application


  seems like 5000, 5001, 8080 ports all occupied, only 8081 works,

  need to change the api from 5000 to 8081 at 
  export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:8081"
      }
    }
  }
}) and also all the jsx files like login sign up all those


now 8081 is not working le
will try again next time

apparently after restarting laptop it works the port is no longer occupied


