const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    user : 'dalibike',
    password : 'dalibike',
    multipleStatements : true,
    database : 'DALI_BIKE',
    host : 'raspberrypi.meowning.kr',
    port : 3306
});

mysql2.getConnection((err, res) => {
    // 제대로 연결되면 res, 제대로 연결되지 않으면 err이 넘어옴요
    console.log(err);
});

module.exports = pool;