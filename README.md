before run the program:
    set vidly_jwtPrivateKey=mySecureKey

test : "test": "jest --watchAll --verbose --coverage  --testEnvironment=node --runInBand --detectOpenHandles  --maxWorkers=1"

heroku config:set vidly_jwtPrivateKey=mySecureKey
heroku config:set NODE_ENV=production