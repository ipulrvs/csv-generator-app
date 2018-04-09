## CSV-Generator-App
Sample application using loopback and react.js client-side stack

#### How to use:
- Clone this repository `git clone https://github.com/ipulrvs/csv-generator-app.git`
- Install server package `npm install` in root folder
- Open client folder and install package `cd client & npm install`
- Run client it will run on port 5000 `cd client & npm start`
- Run server it will run on port 9000 `npm start` in root folder

#### Generate fake Database
- Before using generate fake data first you need to migrate fake database script found in `server/boot/seed-fakedb.js`
- uncomment script below the line `MIGRATE automigrate | autoupdate`
- Run server wait until finish 
- After all data migration complete comment script migration beacause boot script will run every server startup

#### Requirement
- Node >8.0.0
- Loopback
- Mysql `setting mysql in server/datasources.json`

#### PM2 Prod Use
- Install pm2 globaly `npm install -g pm2`
- Build Client `cd client && webpack .`
- Run Both Server with PM2 `pm2 start ecosystem.config.js`
- Change prod config in `ecosystem.config.js`