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
1. login and new user registration page (already provided in the boilerplate)
2. /Music (browse songs and search for songs)
3. Search result page
   1. option to post reviews and rate without listening to songs  
4. Playsong page -- and provide option to review and rate 
5. Personal Homepage / Profile page for registered user 
   1. account info 
      user should be able to manage their profile, pwd, and personal info. 
   2. personal recommendation 
      1. based on songs one listened in the past, ratings, etc. Maybe we can write a simple algorithm for this or use something ready-made. 
   3. playlist 
      1. create, modify, delete, make public/private, etc. 
   4. review and rate 
   5. manage friend requests 
   6. display new items of interest -- new reviews by friends or followers, new songs by artists 

6. (optional) see friends or followers personal page -- their reviews, ratings, profiles, events, etc. 


