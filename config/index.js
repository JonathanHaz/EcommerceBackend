const dotenv = require('dotenv')
dotenv.config()
const {MONGOURL} = process.env;
const config = {
    MONGOURL,
}
module.exports = {config}