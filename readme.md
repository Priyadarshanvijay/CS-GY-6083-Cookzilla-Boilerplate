# Instructions

1. Clone the repository to your local.
2. Download and install Node.js + npm if you don't have it installed: https://kinsta.com/blog/how-to-install-node-js/
3. Install backend packages using the following commands:
```
cd nodejs
npm ci
```
4. Install frontend packages using the following commands:
```
cd frontend
npm ci
```
5. Create environment variables file in backend using the following command:
```
cd nodejs
touch .env
```
6. Initialize the .env file with following variables:
```
PORT=3000
DB_HOST=localhost
DB_USER_ID= `YOUR_DATABASE_USER_ID (Defaults to root)`
DB_USER_PASSWORD= `YOUR_DATABASE_PASSWORD`
DB_NAME=cookzilla
JWT_SECRET= `YOUR_ENCRYPTION_KEY (COULD BE ANY RANDOM STRING)`
```
7. Start the Server:
```
cd nodejs
npm start
```
8. Open a separate terminal and start the frontend:
```
cd frontend
npm start
```
9. Open browser and navigate to http://localhost:8081

# FatEar Project Logs: 
1. login and new user registration page [x]
   
2. browse songs and search for songs at /music  -- backend TODO  
   1. Find the titles, artists, and albums of songs of a particular genre and/or with an average rating above some threshold and/or by a particular artist, etc.
     
3. Profile page for registered users 
   1. playlist -- [TODO]
      1. create, modify, delete, make public/private, etc. 
   2. review and rate 
      1. review [x]
      2. rate [TODO]
   3. manage friend requests [x] 
      1. accept or reject [x]
      2. issue a request to another user [x]
   4. display new items of interest 
      1. new reviews by friends or followers [x]
      2. new songs by artists -- [TODO]  


