const {Pool} = require('pg');
const dbConf = require('../config/db.config');


const pool = new Pool(dbConf);

module.exports = pool;
