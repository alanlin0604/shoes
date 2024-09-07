var mariadb = require('mariadb/callback');
var con1 = require('../config/DBconfig');



const pool = mariadb.createPool({ 
  port:con1.port, // 連接阜號
  host: con1.host, // 主機名稱 
  user: con1.user, // 用戶名稱
  password: con1.password, // 資料庫密碼
  database: con1.database, // 資料庫名稱
  connectionLimit: con1.connectionLimit //連線池限制
});

const query = (sql, values) => {
    return new Promise((reslove, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (error, rows) => {
            if (error) {
              reject(error);
            } else {
              reslove(rows);
            }
            connection.release();
          });
        }
      });
    });
  }
  module.exports = { query };