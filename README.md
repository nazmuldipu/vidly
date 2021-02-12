before run the program:
//for windows
set vidly_jwtPrivateKey=mySecureKey
//For mac
export vidly_jwtPrivateKey=mySecureKey

test : "test": "jest --watchAll --verbose --coverage --testEnvironment=node --runInBand --detectOpenHandles --maxWorkers=1"

heroku config:set vidly_jwtPrivateKey=mySecureKey
heroku config:set NODE_ENV=production

start mongodb server:
sudo mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
