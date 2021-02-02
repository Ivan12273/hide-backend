//ENVIRONMENT [dev, local, prod test]
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
process.env.APP_NAME = 'Rooster Software'

//PORT
process.env.PORT = 3700;

//TOKEN EXPIRATION
process.env.TOKEN_EXP = '48h';

// DATABASE
if (process.env.NODE_ENV === 'local') {
  process.env.DB_URI = `mongodb://localhost:27017/hidedb`;
} else if (process.env.NODE_ENV === "dev") {
  process.env.DB_URI = `mongodb+srv://root:12rooster.@hide.mgqeo.mongodb.net/hide?retryWrites=true&w=majority`;
} else {
  process.env.DB_URI = `mongodb+srv://root:12rooster.@hide.mgqeo.mongodb.net/hide?retryWrites=true&w=majority`;
}

//Auth seed
process.env.AUTH_SEED = process.env.AUTH_SEED || 'este-es-el-seed-desarrollo';

// MAIL
process.env.MAIL_SENDER_USER = 'erofaba@gmail.com'
process.env.MAIL_SENDER_PASS = 'epucqywrcptafhht'
process.env.MAIL_FROM = 'Rooster software'

//FRONT-END
var host = 'localhost' // o localhost
process.env.FRONT_URL = `http://${host}:4200`
process.env.BACK_URL = host




