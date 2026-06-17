const mysql=require('mysql2/promise')
require('dotenv').config()

const pool=mysql.createPool({
    host:process.env.MY_HOST,
    user:process.env.MY_MYSQL_USERNAME,
    password:process.env.MY_MYSQL_PASSWORD,
    database:process.env.MY_DB
})

module.exports=pool