
var mariadb = require('mariadb/callback');
var con1 = require('../../config/DBconfig');
const fs = require("fs");
const cons = require('consolidate');

const pool1 = mariadb.createPool({
  port: con1.port, // 連接阜號
  host: con1.host, // 主機名稱 
  user: con1.user, // 用戶名稱
  password: con1.password, // 資料庫密碼
  database: con1.database, // 資料庫名稱
  connectionLimit: con1.connectionLimit //連線池限制
});
const shoesinformation3 = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM shoes_information `,(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};




const shoesinformation = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM shoes_information WHERE 品牌 = ?`, [insertValues.logo],(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const shoesinformation2 = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM shoes_information2`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};




// 抓table1資訊
const getTable1Info = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table1 WHERE 製令單號 = ?`, [insertValues.orderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

// 抓table4資訊(APP)
const getTable4Info = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 派工單編號 = ?`, [insertValues.workorderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


// 抓table4資訊(APP) (***)
const insertTable5 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO table5 (製令單號,尺寸,數量,回報數量,部位,回報時間,派工單編號,回報人員,完成狀態) value (?,?,?,?,?,?,?,?,?)',
        [insertValues.orderNumber,insertValues.size,insertValues.number,insertValues.reportNumber,insertValues.section,insertValues.reportTime,insertValues.workorderNumber,insertValues.employee,insertValues.state], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};



// 抓table4資訊(網頁用)
const getTable4Info2 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 製令單號 = ?`, [insertValues.workorderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

// 抓table4資訊(列印派工單用)
const getTable4Info3 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 製令單號 = ? AND 部位 = ? AND 派工時間 = ? ORDER BY cast(尺寸 as FLOAT) ASC`, [insertValues.workorderNumber,insertValues.location,insertValues.time], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};






// 抓材料資訊
const getMaterial = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 材料 FROM table2 WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.orderNumber,insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

// 抓材料資訊
const getMaterial1 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table2 WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.orderNumber, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

// 回傳完成數量及回報時間 (***)
const returnData = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE table4 SET 完成數量=?,完成總數量=?,完成時間=?,回報人員=?,完成狀態=? WHERE 尺寸=? AND 派工單編號 = ? AND 完成狀態=?',
        [insertValues.finishedNumber, insertValues.reportTime, insertValues.employee, insertValues.state1, insertValues.size, insertValues.workorderNumber, insertValues.state2], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
const gettable1fortittle = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table1 WHERE 製令單號 = ?`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


/*  進入派工畫面抓取資料API  */
const gettable1 = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT distinct * FROM table1 `, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

/*  進入派工畫面抓取資料API  */
const getimg = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 圖片 FROM shoes_information`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const gettable2 = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table2 WHERE 製令單號 = ?`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const selectgettable3 = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ? ORDER BY CAST(尺寸 AS FLOAT) ASC`, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const directdispatch = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位名稱,尺寸,數量 FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ? `, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const directdispatchsizenum = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 數量 FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ?`, [insertValues.s,insertValues.s1,insertValues.s2], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const directdispatchsizenum2 = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ?`, [insertValues.s,insertValues.s1,insertValues.s2], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const totalnumberofparts = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 總數量 FROM table2 WHERE 製令單號 = ? AND 部位名稱 = ? `, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const gettable1totalnum = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 總數量 FROM table1 WHERE 製令單號 = ?`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
const totalnumberofparts2 = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 數量 FROM table4 WHERE 製令單號 = ? AND 部位 = ?`, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const directdispatchnum = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 數量 FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ? `, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const gettable4totalnum = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 數量 FROM table4 WHERE 製令單號 = ?`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const gettable4print = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 列印狀態 FROM table4 WHERE 製令單號 = ? AND 部位 = ? AND 派工時間 = ?`, [insertValues.製令單號,insertValues.部位,insertValues.派工時間], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const insertintotable4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('INSERT INTO table4 (製令單號,尺寸,數量,完成數量,未完成數量,完成總數量,部位,派工時間,派工單編號,列印狀態,完成狀態,目前進度) value (?,?,?,?,?,?,?,?,?,?,?,?)',
          [insertValues.id,insertValues.id1, insertValues.id2, insertValues.finishedNumber, insertValues.notfinishedNumber, insertValues.all,insertValues.s1,insertValues.time,insertValues.s2,insertValues.s3,insertValues.s4,insertValues.s5], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};


const updatesizenum = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table3 SET 數量=? WHERE 尺寸=? AND 部位名稱 = ? AND 製令單號 = ? ', [insertValues.num, insertValues.size,insertValues.location,insertValues.numlist], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};


const updateprint = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table4 SET 列印狀態=? WHERE 製令單號=? AND 部位 = ? AND 派工時間 = ? ', [insertValues.print, insertValues.no,insertValues.location,insertValues.time], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};

const updateschedule = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table2 SET 派工進度=? WHERE  部位名稱 = ? AND 製令單號 = ? ', [insertValues.派工進度,insertValues.部位名稱,insertValues.製令單號], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};

const updateschedule2 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table1 SET 派工進度=? WHERE  製令單號 = ? ', [insertValues.派工進度,insertValues.製令單號], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};


const updateschedulenum = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table2 SET 總數量=? WHERE  部位名稱 = ? AND 製令單號 = ? ', [insertValues.總數量,insertValues.部位名稱,insertValues.製令單號], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
const updateschedulenum1 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table1 SET 總數量=? WHERE   製令單號 = ? ', [insertValues.總數量,insertValues.製令單號], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};

const NewArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query("INSERT INTO table1 (製令單號,型體編號,楦頭,大底,型體名稱,logo,顏色,派工進度,上次編輯日期, 完成狀態, 完成總數量) value (?,?,?,?,?,?,?,?,?,?,?)",
        [insertValues.製令單號,insertValues.型體編號,insertValues.楦頭,insertValues.大底,insertValues.型體名稱,insertValues.logo,insertValues.顏色,insertValues.派工進度,insertValues.上次編輯日期,insertValues.完成狀態,insertValues.完成總數量],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！1`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};

/* POST 新增 */
const NewArticle2 = (insertValues2) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO table2 (製令單號,型體編號,型體名稱,部位名稱,材料,本批數量全,單位,派工進度) value (?,?,?,?,?,?,?,?)',
        [insertValues2.製令單號,insertValues2.型體編號,insertValues2.型體名稱,insertValues2.部位名稱,insertValues2.材料,insertValues2.本批數量全,insertValues2.單位,insertValues2.派工進度],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！2`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};

/* POST 新增 */
const NewArticle3 = (insertValues3) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO table3 (製令單號,尺寸,型體名稱,部位名稱,數量) value (?,?,?,?,?)',
        [insertValues3.製令單號,insertValues3.尺寸,insertValues3.型體名稱,insertValues3.部位名稱,insertValues3.數量],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！3 `); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};

const updatedatetime = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table1 SET 上次編輯日期=? WHERE 製令單號=? ', [insertValues.datetime, insertValues.製令單號], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};

// 抓table5資訊
const getTable5Info = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5 WHERE 派工單編號 = ?`, [insertValues.workorderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
// 抓table5回報數量
const getTable5reportNumber = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5 WHERE 派工單編號=? AND 尺寸=? AND 回報時間=?`, [insertValues.workorderNumber, insertValues.size, insertValues.reportTime], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

// 抓table4資訊
const getTable4reportNumber = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 派工單編號 = ? AND 尺寸 = ?`, [insertValues.workorderNumber, insertValues.size], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


// 抓table4派工單編號
const getTable4workorder = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 派工單編號 FROM table4 `, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const insertshoes = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query("INSERT INTO shoes_information (ID,品牌,型號,尺寸,材質,製造商,出產地,製令單號) value (?,?,?,?,?,?,?,?)",
        [insertValues.id1,insertValues.id2,insertValues.id3,insertValues.id4,insertValues.id5,insertValues.id6,insertValues.id7,insertValues.id8],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！1`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};


// 打卡API
const insertpunchin = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO punch_in (員工,上班時間,日期,出勤狀況) value (?,?,?,?)',
        [insertValues.employee,insertValues.punchin,insertValues.datetime,insertValues.punchstate], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const updatepunchout = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE punch_in SET 下班時間=? WHERE 員工=? AND 日期 =?',
        [insertValues.punchout, insertValues.employee, insertValues.datetime], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const getAllPunchData = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM punch_in WHERE 員工 = ?`, [insertValues.employee], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const getAllPunch = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM punch_in WHERE 日期 = ?`, [insertValues.date], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const getAllPunch1 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM punch_in WHERE 出勤狀況 = ? AND 日期 = ?`, [insertValues.d,insertValues.date], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const nfcid = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM nfcidlist`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const NFCRegister = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE nfcidlist SET ID=? WHERE NFCID=? ', [insertValues.new, insertValues.old], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });

        conn.query(`UPDATE nfc SET 使用狀態 = '已使用' WHERE NFCID = ? `, [insertValues.new], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(`Deleted`); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        });

        conn.query('UPDATE table4 SET 派工單編號=? WHERE 派工單編號=? ', [insertValues.new, insertValues.old], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(`Deleted`); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        });

        conn.query('UPDATE printingtable SET 派工單編號=? WHERE 派工單編號=? ', [insertValues.new, insertValues.old], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(`Deleted`); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        });

        conn.query('UPDATE highfrequencytable SET 派工單編號=? WHERE 派工單編號=? ', [insertValues.new, insertValues.old], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(`Deleted`); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.NFCRegister= NFCRegister;

const updatenfcid = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE nfcidlist SET 使用狀態=? WHERE NFCID=? ', [insertValues.use, insertValues.nfcidno], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};

// 新的API
const insertNFCIDList = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO nfcidlist (NFCID, ID, 使用狀態) value (?, ?, ?)',
        [insertValues.nfcid, insertValues.ID, insertValues.usingstate], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


const updatetable4state = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE table4 SET 完成狀態=? WHERE 派工單編號 = ? AND 完成狀態=?',
        [insertValues.state1, insertValues.workorderNumber, insertValues.state2], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const updatetable5state = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE table5 SET 完成狀態=? WHERE 派工單編號 = ? AND 完成狀態=?',
        [insertValues.state1, insertValues.workorderNumber, insertValues.state2], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


/* POST 更新table6回報數量 */
const NewArticle6 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table6 SET 回報數量 = ? WHERE 製令單號 = ? AND 部位名稱=? ', [insertValues.回報數量,insertValues.製令單號,insertValues.部位名稱], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });

        conn.query('UPDATE table6 SET 目前進度 = round((回報數量/總數量)*100, 2) WHERE 製令單號 = ? AND 部位名稱 = ? ', [insertValues.回報數量,insertValues.製令單號,insertValues.部位名稱], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });

      }
    });
  });
};

/* POST 更新table6回報數量 */
const NewArticle4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table4 SET 完成總數量 = ? , 目前進度 = ? WHERE 製令單號 = ? AND 部位 = ? AND 尺寸 = ?', [insertValues.完成總數量,insertValues.目前進度,insertValues.製令單號,insertValues.部位,insertValues.尺寸], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};


/* POST 更新table6總數量 */
const NewArticle6total = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table6 SET 總數量 = ? WHERE 製令單號 = ? AND 部位名稱=? ', [insertValues.總數量,insertValues.製令單號,insertValues.部位名稱], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};


/* POST 更新table6目前進度 */
const NewArticle6now = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table6 SET 目前進度 = ? WHERE 製令單號 = ? AND 部位名稱 = ? ', [insertValues.目前進度,insertValues.製令單號,insertValues.部位名稱], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};








/* POST 新增 */
const NewArticle66 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query("INSERT INTO table6 (製令單號,部位名稱,目前進度,總數量,回報數量) value (?,?,?,?,?)",
        [insertValues.製令單號,insertValues.部位名稱,insertValues.目前進度,insertValues.總數量,insertValues.回報數量],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！6`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};


// 抓table1資訊
const articlegetDB2 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 製令單號,總數量,部位名稱 FROM table2  WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.a,insertValues.b], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB2 = articlegetDB2;




// 抓table4資訊
const articlegetDB4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 製令單號 = ? AND 部位 = ?`, [insertValues.a ,insertValues.b], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB4= articlegetDB4;



// 抓table5資訊
const articlegetDB5 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5  WHERE 製令單號 = ? AND 部位 = ?`, [insertValues.a,insertValues.b], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB5 = articlegetDB5;


// 抓table5回報加總用
const articlegetDB5ok = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5  WHERE 製令單號 = ? AND 部位 = ? AND 尺寸 = ?`, [insertValues.a,insertValues.b,insertValues.c], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB5ok = articlegetDB5ok;

// 抓table6資訊
const articlegetDB6 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table6 WHERE 製令單號 = ? `, [insertValues.a],(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB6 = articlegetDB6;


// 抓table6資訊
const articlegetDB6all = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 製令單號,部位名稱,目前進度 FROM table6 `,(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB6all = articlegetDB6all;

// 抓table6 計算目前進度的值
const articlegetDB6total = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table6 WHERE 製令單號 = ? AND 部位名稱 = ? `, [insertValues.a,insertValues.b],(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB6total = articlegetDB6total;


const updateNFCIDlistUsingstate = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE nfcidlist SET 使用狀態=? WHERE nfcid = ?',
        [insertValues.usingstate, insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};


//new
const updatepeople = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('UPDATE punch_in SET 當日生產總數量=? WHERE 員工 = ? AND 日期 = ?',
        [insertValues.allnumm, insertValues.people,insertValues.date], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

const getpeople = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5 WHERE  回報人員 = ? AND 回報時間 = ? `, [insertValues.name,insertValues.datee],(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.getpeople = getpeople;

const newgetallpunch = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM punch_in WHERE  員工 = ? AND 日期 = ? `, [insertValues.name,insertValues.datee],(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.newgetallpunch = newgetallpunch;




//目前使用API
//new
module.exports.updatepeople = updatepeople;


// 新的(08/15)
const getTable5 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table5 WHERE 製令單號 = ?`, [insertValues.orderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.getTable5 = getTable5;

// 抓table6資訊
const articlegetDB6all2 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 製令單號,部位名稱,目前進度 FROM table6 WHERE 製令單號 = ? `, [insertValues.orderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB6all2 = articlegetDB6all2;

const NewArticle1 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table1 SET 完成狀態 = ? WHERE 製令單號 = ? ', [insertValues.完成狀態,insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.NewArticle1= NewArticle1;

// 抓table4資訊
const articlegetDB4all = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4  WHERE 製令單號 = ? `, [insertValues.a], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.articlegetDB4all= articlegetDB4all;

// remove data in database - table1
const removetable1 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => {
      if (connectionError){
        reject(connectionError);
      } else {
          conn.query(`DELETE FROM table1 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });


          conn.query(`DELETE FROM table2 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });


          conn.query(`DELETE FROM table3 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });


          conn.query(`DELETE FROM table4 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });


          conn.query(`DELETE FROM table5 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });
        

          conn.query(`DELETE FROM table6 WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM cuttingqc WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM printingtable WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM printing WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM printingqc WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM highfrequencytable WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM highfrequency WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          conn.query(`DELETE FROM highfrequencyqc WHERE 製令單號 = ? `, [insertValues.ids], (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

          }
    });
  });
};
module.exports.removetable1 = removetable1;

const inputlogo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        console.log(2 + " " +insertValues.品牌);
        conn.query(`INSERT INTO shoes_information2 (品牌) values (?)`,[insertValues.品牌],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.inputlogo = inputlogo;

// check member data 
const members = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM members `,(error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.members = members;

const register = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        console.log(2 + " " +insertValues.品牌);
        conn.query(`INSERT INTO members (email, user, passwords) values (?, ?, ?)`,[insertValues.email, insertValues.user, insertValues.passwords],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.register = register;

const editTable4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table4 SET 完成數量 = ? , 完成總數量 = ? , 未完成數量 = ? , 完成時間 = ? , 完成狀態 = ? , 回報人員 = ? WHERE 派工單編號 = ? AND 部位 = ? AND 尺寸 = ?', [insertValues.完成數量,insertValues.完成數量,insertValues.未完成數量, insertValues.完成時間, insertValues.完成狀態, insertValues.回報人員, insertValues.派工單編號,insertValues.部位,insertValues.尺寸], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.editTable4 = editTable4;


const PrintCutting = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 派工單編號 = ?`, [insertValues.number], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.PrintCutting = PrintCutting;

const logo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        console.log(2 + " " +insertValues.品牌);
        conn.query(`INSERT INTO shoes_information (ID, 圖片, 品牌, 型號, 尺寸, 材質, 製造商, 出產地) values (?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.email, insertValues.user, insertValues.passwords],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.logo = logo;

const RemoveTable4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => {
      if (connectionError){
        reject(connectionError);
      } else {
          conn.query(`DELETE FROM table4 WHERE 製令單號 = ? AND 派工時間 = ?`, [insertValues.id,insertValues.time], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

      }
    });
  });
};
module.exports.RemoveTable4 = RemoveTable4;

const RemoveTable4FromWorkorderNumber = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
          conn.query(`DELETE FROM table4 WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.id,insertValues.WorkorderNumber], (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });

      }
    });
  });
};
module.exports.RemoveTable4FromWorkorderNumber = RemoveTable4FromWorkorderNumber;

const CreatePrinting = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO printing (製令單號, 型體編號,LOGO ,顏色 ,可支配數 ,完成雙數 ,總數量 ,上傳時間 ,派工進度 ,完成狀態) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.型體編號, insertValues.LOGO, insertValues.顏色, insertValues.可支配數, insertValues.完成雙數, insertValues.總數量, insertValues.上傳時間, insertValues.派工進度, insertValues.完成狀態],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.CreatePrinting = CreatePrinting;

const UpdatePrintingTotal = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printing SET 總數量 = ? WHERE 製令單號 = ?', [insertValues.總數量, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatePrintingTotal = UpdatePrintingTotal;

const UpdatePrintingPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printing SET 派工進度 = ? WHERE 製令單號 = ?', [insertValues.派工進度, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatePrintingPercent = UpdatePrintingPercent;

const UpdatePrintingCompletePercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printing SET 完成狀態 = ? WHERE 製令單號 = ?', [insertValues.完成狀態, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatePrintingCompletePercent = UpdatePrintingCompletePercent;

const GetPrinting = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printing`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrinting = GetPrinting;

const GetPrintingItem = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printing WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingItem = GetPrintingItem;

// const UpdatePrintingSection = (insertValues) => {
//   return new Promise((resolve, reject) => {
//     pool1.getConnection((connectionError, conn) => { // 資料庫連線
//       if (connectionError) {
//         reject(connectionError); // 若連線有問題回傳錯誤
//       } else { // Article資料表修改指定id一筆資料
//         conn.query('UPDATE printing SET 部位 = ? WHERE 製令單號 = ?', [insertValues.部位, insertValues.製令單號], (error, result) => {
//           if (error) { 
//             console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
//             reject(error);
//           } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
//             resolve('請確認修改Id！');
//           } else if (result.affectedRows == 1) { // 寫入成功
//             resolve(`修改成功！`);

//           } else {
//             resolve('資料無異動');
//           }
//           conn.release();
//         });
//       }
//     });
//   });
// };
// module.exports.UpdatePrintingSection = UpdatePrintingSection;

const CreatePrintingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO printingtable (製令單號, 部位, 尺寸, 數量, 總數量, 列印狀態, 目前進度) values (?, ?, ?, ?, ?, ?, ?)`,[insertValues.id, insertValues.section, insertValues.size, insertValues.amount, insertValues.allamount, insertValues.print, insertValues.percent],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.CreatePrintingTable = CreatePrintingTable;

const GetPrintingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingtable WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTable = GetPrintingTable;

const sumtable4 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位, SUM(完成數量) as 完成數量 FROM table4 WHERE 製令單號 = ? and 部位 = ?`, [insertValues.製令單號, insertValues.部位], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.sumtable4 = sumtable4;


const UpdatePrintingCompletePercentx = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`UPDATE printingtable SET 目前進度 = ROUND((完成數量/總數量), 2)*100 WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );

        conn.query(`UPDATE printingtable SET 目前進度 = 0 WHERE 目前進度 is null`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.UpdatePrintingCompletePercentx = UpdatePrintingCompletePercentx;

const UpdateHighFrequencyCompletePercentx = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`UPDATE highfrequencytable SET 目前進度 = ROUND((完成數量/總數量), 2)*100 WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );

        conn.query(`UPDATE highfrequencytable SET 目前進度 = 0 WHERE 目前進度 is null`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.UpdateHighFrequencyCompletePercentx = UpdateHighFrequencyCompletePercentx;

const GetPrintingTableSectionInfo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingtable WHERE 製令單號 = ? AND 部位 = ? ORDER BY cast(尺寸 as FLOAT) ASC`, [insertValues.rid, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTableSectionInfo = GetPrintingTableSectionInfo;

const GetHighFrequencyTableSectionInfo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencytable WHERE 製令單號 = ? AND 部位 = ? ORDER BY cast(尺寸 as FLOAT) ASC`, [insertValues.rid, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyTableSectionInfo = GetHighFrequencyTableSectionInfo;

const GetPrintingTableSection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT distinct 部位 FROM printingtable WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTableSection = GetPrintingTableSection;

const GetPrintingTableSize = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT distinct 尺寸, 數量 FROM printingtable WHERE 製令單號 = ? ORDER BY CAST(尺寸 as FLOAT)`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTableSize = GetPrintingTableSize; // 用於抓取尺寸序列

const GetPrintingTableList = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingtable WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.製令單號, insertValues.派工單編號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTableList = GetPrintingTableList;

const UpdatePrintingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printingtable SET 數量 = ? , 完成數量 = ? , 派工時間 = ? , 派工單編號 = ? WHERE 製令單號 = ? AND 尺寸 = ? AND 總數量 = ? AND 部位 = ?', [insertValues.數量,insertValues.完成數量,insertValues.派工時間,insertValues.派工單編號,insertValues.製令單號,insertValues.尺寸,insertValues.總數量,insertValues.部位], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatePrintingTable = UpdatePrintingTable;

const UndoPrintingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printingtable SET 數量 = ? , 完成數量 = ? , 派工時間 = ? , 派工單編號 = ? WHERE 製令單號 = ? AND 派工單編號 = ? AND 尺寸 = ?', [insertValues.數量,insertValues.完成數量,insertValues.派工時間,insertValues.派工單編號,insertValues.製令單號,insertValues.派工單編號old,insertValues.尺寸], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UndoPrintingTable = UndoPrintingTable;

const UndoHighFrequencyTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequencytable SET 數量 = ? , 完成數量 = ? , 派工時間 = ? , 派工單編號 = ? WHERE 製令單號 = ? AND 派工單編號 = ? AND 尺寸 = ?', [insertValues.數量,insertValues.完成數量,insertValues.派工時間,insertValues.派工單編號,insertValues.製令單號,insertValues.派工單編號old,insertValues.尺寸], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UndoHighFrequencyTable = UndoHighFrequencyTable;

const ReturnPrintingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printingtable SET 完成數量 = ? , 完成時間 = ? , 回報人員 = ? WHERE 尺寸 = ? AND 派工單編號 = ?', 
        [insertValues.完成數量,insertValues.完成時間,insertValues.回報人員,insertValues.尺寸,insertValues.派工單編號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.ReturnPrintingTable = ReturnPrintingTable;

const ReturnHighFrequencyTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequencytable SET 完成數量 = ? , 完成時間 = ? , 回報人員 = ? WHERE 尺寸 = ? AND 派工單編號 = ?', 
        [insertValues.完成數量,insertValues.完成時間,insertValues.回報人員,insertValues.尺寸,insertValues.派工單編號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.ReturnHighFrequencyTable = ReturnHighFrequencyTable;

const GetPrintingTableInfo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingtable WHERE 派工單編號 = ?`, [insertValues.workorderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingTableInfo = GetPrintingTableInfo;

const GetHighFrequencyTableSection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT distinct 部位 FROM highfrequencytable WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyTableSection = GetHighFrequencyTableSection;

const GetHighFrequencyTableInfo = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencytable WHERE 派工單編號 = ?`, [insertValues.workorderNumber], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyTableInfo = GetHighFrequencyTableInfo;

const CreateHighFrequency = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO highfrequency (製令單號, 型體編號 ,LOGO ,顏色 ,可支配數 ,完成雙數 ,總數量 ,上傳時間 ,派工進度 ,完成狀態) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.型體編號, insertValues.LOGO, insertValues.顏色, insertValues.可支配數, insertValues.完成雙數, insertValues.總數量, insertValues.上傳時間, insertValues.派工進度, insertValues.完成狀態],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.CreateHighFrequency = CreateHighFrequency;

const UpdateHighFrequencyTotal = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequency SET 總數量 = ? WHERE 製令單號 = ?', [insertValues.總數量, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencyTotal = UpdateHighFrequencyTotal;

const GetHighFrequencyTableList = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencytable WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.製令單號, insertValues.派工單編號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyTableList = GetHighFrequencyTableList;

const GetHighFrequency = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequency`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequency = GetHighFrequency;

const UpdateHighFrequencyPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequency SET 派工進度 = ? WHERE 製令單號 = ?', [insertValues.派工進度, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencyPercent = UpdateHighFrequencyPercent;

const UpdateHighFrequencyCompletePercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequency SET 完成狀態 = ? WHERE 製令單號 = ?', [insertValues.完成狀態, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencyCompletePercent = UpdateHighFrequencyCompletePercent;

const GetHighFrequencyItem = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequency WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyItem = GetHighFrequencyItem;

const UpdateHighFrequencySection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequency SET 部位 = ? WHERE 製令單號 = ?', [insertValues.部位, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencySection = UpdateHighFrequencySection;





const CreateHighFrequencyTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO highfrequencytable (製令單號, 部位, 尺寸, 數量, 總數量, 列印狀態, 目前進度) values (?, ?, ?, ?, ?, ?, ?)`,[insertValues.id, insertValues.section, insertValues.size, insertValues.amount, insertValues.allamount, insertValues.print, insertValues.percent],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.CreateHighFrequencyTable = CreateHighFrequencyTable;

const GetHighFrequencyTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencytable WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyTable = GetHighFrequencyTable;

const UpdateHighFrequencyTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequencytable SET 數量 = ? , 完成數量 = ? , 派工時間 = ? , 派工單編號 = ? WHERE 製令單號 = ? AND 尺寸 = ? AND 總數量 = ? AND 部位 = ?', [insertValues.數量,insertValues.完成數量,insertValues.派工時間,insertValues.派工單編號,insertValues.製令單號,insertValues.尺寸,insertValues.總數量,insertValues.部位], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencyTable = UpdateHighFrequencyTable;

const QCCutting = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM table4 WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.rid, insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.QCCutting = QCCutting;

const QCPrinting = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingtable WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.rid, insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.QCPrinting = QCPrinting;

const QCHighFrequency = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencytable WHERE 製令單號 = ? AND 派工單編號 = ?`, [insertValues.rid, insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.QCHighFrequency = QCHighFrequency;


const ReloadNFC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE nfcidlist SET 使用狀態 =?', [insertValues.使用狀態], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.ReloadNFC = ReloadNFC;

const deleteNFC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => {
      if (connectionError){
        reject(connectionError);
      } else {
          conn.query(`DELETE FROM nfcidlist`, (error, result) => { 
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(`Deleted`); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          });
      }
    });
  });
};
module.exports.deleteNFC = deleteNFC;

const nfcidNFCID = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM nfc WHERE NFCID = ?`, [insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.nfcidNFCID = nfcidNFCID;

const InsterCuttingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query(`INSERT INTO cuttingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 來料問題, 是否修改, 完成進度) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.工作內容, insertValues.部位名稱, insertValues.尺寸, insertValues.數量, insertValues.派工單編號, insertValues.來料問題, insertValues.是否修改, insertValues.完成進度],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.InsterCuttingQC = InsterCuttingQC;

const UpdateCuttingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE cuttingqc SET 來料問題 = ? , 是否修改 = ? , 完成進度 = ? WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ? AND 派工單編號 = ?', [insertValues.來料問題, insertValues.是否修改, insertValues.完成進度, insertValues.製令單號, insertValues.部位名稱, insertValues.尺寸, insertValues.派工單編號],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateCuttingQC = UpdateCuttingQC;

const GetCuttingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM cuttingqc WHERE 派工單編號 = ?`, [insertValues.派工單編號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetCuttingQC = GetCuttingQC;  //判斷是否有剪裁qc資料

const GetCuttingQCSection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM cuttingqc WHERE 製令單號 = ? and 部位名稱 = ?`, [insertValues.製令單號, insertValues.部位名稱], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetCuttingQCSection = GetCuttingQCSection;  //判斷是否有剪裁qc資料

const GetCuttingQCSectionPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT SUM(cuttingqc.數量) AS 數量, SUM(cuttingqc.來料問題) AS 來料問題 FROM cuttingqc WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.製令單號, insertValues.部位名稱], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetCuttingQCSectionPercent = GetCuttingQCSectionPercent;  //判斷是否有剪裁qc資料

const GetCuttingQCPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT ROUND((SUM(來料問題)/SUM(數量))*100,2) AS 不良率 FROM cuttingqc WHERE 製令單號 = ?`, [insertValues.製令單號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetCuttingQCPercent = GetCuttingQCPercent;  //取得QC平均完成進度

const FixCuttingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE cuttingqc SET 完成進度 = ROUND(100-(來料問題/數量)*100,2) WHERE 製令單號 = ? AND 部位名稱 = ?', [insertValues.製令單號, insertValues.部位名稱],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.FixCuttingQC = FixCuttingQC;

const InsterPrintingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query(`INSERT INTO printingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 正確圖案, 正確顏色, 正確段碼, 油墨牢固, 達到效果, 是否修改) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.工作內容, insertValues.部位名稱, insertValues.尺寸, insertValues.數量, insertValues.派工單編號, insertValues.正確圖案, insertValues.正確顏色, insertValues.正確段碼, insertValues.油墨牢固, insertValues.達到效果, insertValues.是否修改],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.InsterPrintingQC = InsterPrintingQC;

const UpdatePrintingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE printingqc SET 正確圖案 = ? , 正確顏色 = ? , 正確段碼 = ? , 油墨牢固 = ? , 達到效果 = ? , 是否修改 = ? WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ? AND 派工單編號 = ?', [insertValues.正確圖案, insertValues.正確顏色, insertValues.正確段碼, insertValues.油墨牢固, insertValues.達到效果, insertValues.是否修改, insertValues.製令單號, insertValues.部位名稱, insertValues.尺寸, insertValues.派工單編號],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatePrintingQC = UpdatePrintingQC;

const GetPrintingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM printingqc WHERE 派工單編號 = ?`, [insertValues.派工單編號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingQC = GetPrintingQC;  //判斷是否有剪裁qc資料

const GetPrintingQCSize = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 尺寸, ROUND((((printingqc.正確圖案 + printingqc.正確顏色 + printingqc.正確段碼 + printingqc.油墨牢固 + printingqc.達到效果)/5)/ 數量)*100,2) AS 不良率 FROM printingqc WHERE 製令單號 = ?`, [insertValues.製令單號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingQCSize = GetPrintingQCSize;  //判斷是否有剪裁qc資料

const InsterHighFrequencyQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query(`INSERT INTO highfrequencyqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 熱壓開膠, 熱壓效果, 烙印紋路, 烙印損傷, 熱切牢度, 熱切損傷, 熱切分片, 熱切效果, 熱切包風, 轉印圖案, 轉印效果, 轉印牢度, 轉印尺碼, 是否修改) values (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`,[insertValues.製令單號, insertValues.工作內容, insertValues.部位名稱, insertValues.尺寸, insertValues.數量, insertValues.派工單編號, insertValues.熱壓開膠, insertValues.熱壓效果, insertValues.烙印紋路, insertValues.烙印損傷, insertValues.熱切牢度, insertValues.熱切損傷, insertValues.熱切分片, insertValues.熱切效果, insertValues.熱切包風, insertValues.轉印圖案, insertValues.轉印效果, insertValues.轉印牢度, insertValues.轉印尺碼, insertValues.是否修改
        ],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.InsterHighFrequencyQC = InsterHighFrequencyQC;

const UpdateHighFrequencyQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE highfrequencyqc SET 熱壓開膠 = ? , 熱壓效果 = ? , 烙印紋路 = ? , 烙印損傷 = ? , 熱切牢度 = ? , 熱切損傷 = ? , 熱切分片 = ? , 熱切效果 = ? , 熱切包風 = ? , 轉印圖案 = ? , 轉印效果 = ? , 轉印牢度 = ? , 轉印尺碼 = ? , 是否修改 = ? WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ? AND 派工單編號 = ?', [insertValues.熱壓開膠, insertValues.熱壓效果, insertValues.烙印紋路, insertValues.烙印損傷, insertValues.熱切牢度, insertValues.熱切損傷, insertValues.熱切分片, insertValues.熱切效果, insertValues.熱切包風, insertValues.轉印圖案, insertValues.轉印效果, insertValues.轉印牢度, insertValues.轉印尺碼, insertValues.是否修改, insertValues.製令單號, insertValues.部位名稱, insertValues.尺寸, insertValues.派工單編號],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdateHighFrequencyQC = UpdateHighFrequencyQC;

const GetHighFrequencyQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM highfrequencyqc WHERE 派工單編號 = ?`, [insertValues.派工單編號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyQC = GetHighFrequencyQC;  //判斷是否有剪裁qc資料

const FixTable4Percent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table4 SET 未完成數量 = ? , 完成狀態 = ? , 完成總數量 = ? , 目前進度 = ? WHERE 製令單號 = ? AND 部位 = ? AND 尺寸 = ?', [insertValues.未完成數量,insertValues.完成狀態,insertValues.完成總數量,insertValues.目前進度,insertValues.製令單號,insertValues.部位,insertValues.尺寸], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.FixTable4Percent = FixTable4Percent;

// return table6 amount
const ReturnTable6Total = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE table6 SET 回報數量 = ? WHERE 製令單號 = ? AND 部位名稱=? ', [insertValues.回報數量,insertValues.製令單號,insertValues.部位名稱], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.ReturnTable6Total = ReturnTable6Total;

// return table6 amount
const ReturnCuttingQC = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query(`INSERT INTO cuttingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 來料問題, 是否修改, 完成進度) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.工作內容, insertValues.部位名稱, insertValues.尺寸, insertValues.數量, insertValues.派工單編號, insertValues.來料問題, insertValues.是否修改, insertValues.完成進度],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.ReturnCuttingQC = ReturnCuttingQC;

const GetCuttingReportAmount = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位名稱, min(回報數量) as 回報數量 FROM TABLE6 WHERE 製令單號 = ? AND 回報數量 != 0 GROUP BY 部位名稱 ORDER BY 回報數量`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetCuttingReportAmount = GetCuttingReportAmount;  //取得 剪裁(table6)的回報數量

const GetPrintingReportAmount = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位, SUM(完成數量) as 回報數量 FROM printingtable WHERE 製令單號 = ? GROUP BY 部位 ORDER BY 回報數量`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingReportAmount = GetPrintingReportAmount;  //取得 剪裁(table6)的回報數量

const GetHighFrequencyReportAmount = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位, SUM(完成數量) as 回報數量 FROM highfrequencytable WHERE 製令單號 = ? GROUP BY 部位 ORDER BY 回報數量`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyReportAmount = GetHighFrequencyReportAmount;  //取得 剪裁(table6)的回報數量

const GetPrintingQCPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位名稱, ROUND((((printingqc.正確圖案 + printingqc.正確顏色 + printingqc.正確段碼 + printingqc.油墨牢固 + printingqc.達到效果)/5)/ 數量)*100,2) AS 不良率, ROUND(avg(printingqc.數量),2) AS 數量, ROUND(avg(printingqc.正確圖案),2) AS 正確圖案, ROUND(avg(printingqc.正確顏色),0) AS 正確顏色, ROUND(avg(printingqc.正確段碼),2) AS 正確段碼, ROUND(avg(printingqc.油墨牢固),2) AS 油墨牢固, ROUND(avg(printingqc.達到效果),2) AS 達到效果 FROM printingqc WHERE 製令單號 = ?`, [insertValues.製令單號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingQCPercent = GetPrintingQCPercent;  //取得QC平均完成進度

const GetPrintingQCPercentSection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位名稱, sum(printingqc.正確圖案 + printingqc.正確顏色 + printingqc.正確段碼 + printingqc.油墨牢固 + printingqc.達到效果) AS 不良數, ROUND(avg(printingqc.數量),2) AS 數量, sum(printingqc.正確圖案) AS 正確圖案, sum(printingqc.正確顏色) AS 正確顏色, sum(printingqc.正確段碼) AS 正確段碼, sum(printingqc.油墨牢固) AS 油墨牢固, sum(printingqc.達到效果) AS 達到效果 FROM printingqc WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.製令單號, insertValues.部位名稱], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetPrintingQCPercentSection = GetPrintingQCPercentSection;  //取得QC平均完成進度

const GetHighFrequencyQCPercentSection = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位名稱, sum(highfrequencyqc.熱壓開膠 + highfrequencyqc.熱壓效果 + highfrequencyqc.烙印紋路 + highfrequencyqc.烙印損傷 + highfrequencyqc.熱切牢度 + highfrequencyqc.熱切損傷 + highfrequencyqc.熱切分片 + highfrequencyqc.熱切效果 + highfrequencyqc.熱切包風 + highfrequencyqc.轉印圖案 + highfrequencyqc.轉印效果 + highfrequencyqc.轉印牢度 + highfrequencyqc.轉印尺碼) AS 不良數, ROUND(avg(highfrequencyqc.數量),2) AS 數量, sum(highfrequencyqc.熱壓開膠) AS 熱壓開膠, sum(highfrequencyqc.熱壓效果) AS 熱壓效果, sum(highfrequencyqc.烙印紋路) AS 烙印紋路, sum(highfrequencyqc.烙印損傷) AS 烙印損傷, sum(highfrequencyqc.熱切牢度) AS 熱切牢度, sum(highfrequencyqc.熱切損傷) AS 熱切損傷, sum(highfrequencyqc.熱切分片) AS 熱切分片, sum(highfrequencyqc.熱切效果) AS 熱切效果, sum(highfrequencyqc.熱切包風) AS 熱切包風, sum(highfrequencyqc.轉印圖案) AS 轉印圖案, sum(highfrequencyqc.轉印效果) AS 轉印效果, sum(highfrequencyqc.轉印牢度) AS 轉印牢度, sum(highfrequencyqc.轉印尺碼) AS 轉印尺碼 from highfrequencyqc WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.製令單號, insertValues.部位名稱], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyQCPercentSection = GetHighFrequencyQCPercentSection;  //取得QC平均完成進度


const GetHighFrequencyQCPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT ROUND(avg(highfrequencyqc.數量),2) AS 數量, ROUND(avg(highfrequencyqc.熱壓開膠),2) AS 熱壓開膠, ROUND(avg(highfrequencyqc.熱壓效果),2) AS 熱壓效果, ROUND(avg(highfrequencyqc.烙印紋路),2) AS 烙印紋路, ROUND(avg(highfrequencyqc.烙印損傷),2) AS 烙印損傷, ROUND(avg(highfrequencyqc.熱切牢度),2) AS 熱切牢度, ROUND(avg(highfrequencyqc.熱切損傷),2) AS 熱切損傷, ROUND(avg(highfrequencyqc.熱切分片),2) AS 熱切分片, ROUND(avg(highfrequencyqc.熱切效果),2) AS 熱切效果, ROUND(avg(highfrequencyqc.熱切包風),2) AS 熱切包風, ROUND(avg(highfrequencyqc.轉印圖案),2) AS 轉印圖案, ROUND(avg(highfrequencyqc.轉印效果),2) AS 轉印效果, ROUND(avg(highfrequencyqc.轉印牢度),2) AS 轉印牢度, ROUND(avg(highfrequencyqc.轉印尺碼),2) AS 轉印尺碼 FROM highfrequencyqc WHERE 製令單號 = ?`, [insertValues.製令單號], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetHighFrequencyQCPercent = GetHighFrequencyQCPercent;  //取得QC平均完成進度

const GetModelID = () => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 型體編號 FROM TABLE1`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
  };
  module.exports.GetModelID = GetModelID ; 
  
  const GetSizeID = () => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT DISTINCT (CAST(尺寸 AS FLOAT)) AS 尺寸 FROM TABLE3 ORDER BY CAST(尺寸 AS FLOAT) ASC`, (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.GetSizeID = GetSizeID ;
  
  const ReturnShesLogo = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
            reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query("INSERT INTO shoes_information (ID,品牌,型號,尺寸,材質,製造商,出產地,製令單號,圖片) value (?,?,?,?,?,?,?,?,?)",
          [insertValues.id1,insertValues.id2,insertValues.id3,insertValues.id4,insertValues.id5,insertValues.id6,insertValues.id7,insertValues.id8,insertValues.id9],(error, result) => { // Article資料表寫入一筆資料
            if (error) {
              console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
              reject(error);
            } else if (result.affectedRows == 1) {
              resolve(`新增成功！1`); // 寫入成功回傳寫入id
            }
            conn.release();
          });
        }
    });
   });
  };
  module.exports.ReturnShesLogo = ReturnShesLogo ;
  
  const GetLogoInformation= (insertValues) => {
  
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT * FROM shoes_information WHERE ID = ?`, [insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  
  module.exports.GetLogoInformation = GetLogoInformation;

  const GetHighFrequencyQCSize = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT 尺寸, ROUND((((highfrequencyqc.熱壓開膠 + highfrequencyqc.熱壓效果 + highfrequencyqc.烙印紋路 + highfrequencyqc.烙印損傷 + highfrequencyqc.熱切牢度 + highfrequencyqc.熱切損傷 + highfrequencyqc.熱切分片 + highfrequencyqc.熱切效果 + highfrequencyqc.熱切包風 + highfrequencyqc.轉印圖案 + highfrequencyqc.轉印效果 + highfrequencyqc.轉印牢度 + highfrequencyqc.轉印尺碼)/13)/ 數量)*100,2) AS 不良率 FROM highfrequencyqc WHERE 製令單號 = ?`, [insertValues.製令單號], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.GetHighFrequencyQCSize = GetHighFrequencyQCSize;  //判斷是否有剪裁qc資料

  const ReturnExcelTime = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT DATE_FORMAT(MAX(TABLE1.上傳日期), '%Y.%m.%d') as 上傳日期, DATE_FORMAT(MAX(TABLE1.上傳日期), '%H:%i') as 上傳時間 FROM shoes_information INNER JOIN TABLE1 ON shoes_information.製令單號 = TABLE1.製令單號 WHERE shoes_information.ID  = ?`, [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.ReturnExcelTime = ReturnExcelTime;  //回傳匯入時間 用於生產履歷

  const ReturnCuttingCompleteTime = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT DATE_FORMAT(MAX(table4.完成時間), '%Y.%m.%d') as 完成日期, DATE_FORMAT(MAX(table4.完成時間), '%H:%i') as 完成時間 FROM shoes_information INNER JOIN table4 ON shoes_information.製令單號 = table4.製令單號 WHERE table4.尺寸 = shoes_information.尺寸 AND shoes_information.ID = ?`, [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.ReturnCuttingCompleteTime = ReturnCuttingCompleteTime;  //回傳剪裁完工時間 用於生產履歷

  const ReturnPrintingCompleteTime = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT DATE_FORMAT(MAX(printingtable.完成時間), '%Y.%m.%d') as 完成日期, DATE_FORMAT(MAX(printingtable.完成時間), '%H:%i') as 完成時間 FROM shoes_information INNER JOIN printingtable ON shoes_information.製令單號 = printingtable.製令單號 WHERE printingtable.尺寸 = shoes_information.尺寸 AND shoes_information.ID = ?`, [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.ReturnPrintingCompleteTime = ReturnPrintingCompleteTime;  //回傳印刷完工時間 用於生產履歷

  const ReturnHighFrequencyCompleteTime = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT DATE_FORMAT(MAX(highfrequencytable.完成時間), '%Y.%m.%d') as 完成日期, DATE_FORMAT(MAX(highfrequencytable.完成時間), '%H:%i') as 完成時間 FROM shoes_information INNER JOIN highfrequencytable ON shoes_information.製令單號 = highfrequencytable.製令單號 WHERE highfrequencytable.尺寸 = shoes_information.尺寸 AND shoes_information.ID = ?`, [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.ReturnHighFrequencyCompleteTime = ReturnHighFrequencyCompleteTime;  //回傳高周波完工時間 用於生產履歷

  const GetNFCIDList = () => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT * FROM nfc where 使用狀態 = '未使用'`, (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };

  module.exports.GetNFCIDList = GetNFCIDList;

  const insertNFCID = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query('INSERT INTO nfc (NFCID) value (?)',
          [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.insertNFCID = insertNFCID;

  const CheckNFCIDList = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT * FROM nfc where NFCID = ?`, [insertValues.nfcid], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.CheckNFCIDList = CheckNFCIDList;

  const CheckNFCIDListSearch = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT * FROM nfc where NFCID like CONCAT('%', ?, '%') and 使用狀態 = '未使用'`, [insertValues.ID], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.CheckNFCIDListSearch = CheckNFCIDListSearch;  //判斷是否有剪裁qc資料

  const Sumtable3 = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT sum(數量) as 數量 FROM table3 WHERE 製令單號 = ? AND 部位名稱 = ?`, [insertValues.rid, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.Sumtable3 = Sumtable3;  //回傳匯入時間 用於生產履歷

  const GetPrintingPercent = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT 製令單號, 部位, sum(完成數量) as 完成數量, SUM(總數量) AS 總數量, ROUND((SUM(完成數量)/SUM(總數量))*100,1) AS 進度 FROM printingtable WHERE 製令單號 = ? AND 部位 = ?`, [insertValues.rid, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.GetPrintingPercent = GetPrintingPercent;  //回傳匯入時間 用於生產履歷

  const GetHighFrequencyPercent = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`SELECT 製令單號, 部位, sum(完成數量) as 完成數量, SUM(總數量) AS 總數量, ROUND((SUM(完成數量)/SUM(總數量))*100,1) AS 進度 FROM highfrequencytable WHERE 製令單號 = ? AND 部位 = ?`, [insertValues.rid, insertValues.section], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.GetHighFrequencyPercent = GetHighFrequencyPercent;  //回傳匯入時間 用於生產履歷

  //練習 cmd.html

  const AddPunchIn = (insertValues) => {
    return new Promise((resolve, reject) => {
      pool1.getConnection((connectionError, conn) => { // 資料庫連線
        if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
        } else {
          conn.query(`INSERT INTO punch_in(員工) value(?)`, [insertValues.Username], (error, result) => {  // Article撈取所有欄位的值組
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            conn.release();
          }
          );
        }
      });
    });
  };
  module.exports.AddPunchIn = AddPunchIn  //回傳匯入時間 用於生產履歷

const postsewing = (insertValues2) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO sewing (製令單號,楦頭編號,尺寸,原本數量,派工數量,完工數量,上傳時間,上次編輯時間,完成狀態,派工時間,總數量) value (?,?,?,?,?,?,?,?,?,?,?)`,[insertValues2.製令單號,insertValues2.楦頭編號,insertValues2.尺寸,insertValues2.原本數量,insertValues2.派工數量,insertValues2.完工數量,insertValues2.上傳時間,insertValues2.上次編輯時間,insertValues2.完成狀態,insertValues2.派工時間,insertValues2.總數量],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！2`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};

module.exports.postsewing = postsewing;

const getsewingsystem = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, SUM(原本數量) AS 原本數量, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM sewing group by 製令單號`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getsewingsystem  = getsewingsystem;

const getsewingPercent = () => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, 楦頭編號, 上傳時間, 上次編輯時間, SUM(原本數量) AS 原本數量, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM sewing  group by 製令單號`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getsewingPercent  = getsewingPercent ;

//針車系統的派工進度條
const getsewingPercent1 = () => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號,SUM(原本數量) AS 原本數量, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM sewing  group by 製令單號`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getsewingPercent1  = getsewingPercent1 ;


//針車抓取總數量
const selectgetsewing = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM sewing WHERE 製令單號 = ?  ORDER BY CAST(尺寸 AS FLOAT) ASC`, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.selectgetsewing = selectgetsewing;

const UpdatesewingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE sewing SET 原本數量 = ? , 完成數量 = ? WHERE 製令單號 = ? AND 派工單編號 = ? AND 尺寸 = ? ', [insertValues.數量,insertValues.完成數量,insertValues.派工時間,insertValues.派工單編號,insertValues.製令單號,insertValues.派工單編號old,insertValues.尺寸],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatesewingTable = UpdatesewingTable;

const UpdatesewingPercent = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE sewing SET 派工進度 = ? WHERE 製令單號 = ?', [insertValues.派工進度, insertValues.製令單號], (error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.UpdatesewingPercent = UpdatesewingPercent;

const getsewingmonitor = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, 楦頭編號, 上傳時間, 上次編輯日期, SUM(原本數量) AS 原本數量, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM sewing  group by 製令單號`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getsewingmonitor  = getsewingmonitor ;

const getsewingmonitor2 = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT 部位, SUM(完成數量) as 完成數量 FROM sewing WHERE 製令單號 = ? and 部位名稱 = ?`, [insertValues.製令單號, insertValues.部位名稱], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.getsewingmonitor2 = getsewingmonitor2;


const postoutsole = (insertValues2) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query('INSERT INTO outsole (製令單號,楦頭編號,尺寸,原本數量,派工數量,完工數量,上傳時間,上次編輯時間,完成狀態,派工時間,總數量) value (?,?,?,?,?,?,?,?,?,?,?)',[insertValues2.製令單號,insertValues2.楦頭編號,insertValues2.尺寸,insertValues2.原本數量,insertValues2.派工數量,insertValues2.完工數量,insertValues2.上傳時間,insertValues2.上次編輯時間,insertValues2.完成狀態,insertValues2.派工時間,insertValues2.總數量],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功！2`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};

module.exports.postoutsole = postoutsole;

const getoutsolesystem = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, SUM(原本數量) AS 原本數量, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM outsole group by 製令單號`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getoutsolesystem  = getoutsolesystem ;

// const selectgetoutsole = (insertValues) => {

//   return new Promise((resolve, reject) => {
//     pool1.getConnection((connectionError, conn) => { // 資料庫連線
//       if (connectionError) {
//         reject(connectionError); // 若連線有問題回傳錯誤
//       } else {
//         conn.query(`SELECT * FROM sewingandoutsole WHERE 製令單號 = ?  ORDER BY CAST(尺寸 AS FLOAT) ASC`, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
//           if (error) {
//             console.error('SQL error: ', error);
//             reject(error); // 寫入資料庫有問題時回傳錯誤
//           } else {
//             resolve(result); // 撈取成功回傳 JSON 資料
//           }
//           conn.release();
//         }
//         );
//       }
//     });
//   });
// };

// module.exports.selectgetoutsole = selectgetoutsole;

//update修改
const Updateoutsole = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        conn.query('UPDATE outsole SET 派工編號 = ? , 派工數量 = ? WHERE 製令單號 = ? AND 部位名稱 = ? AND 尺寸 = ?', [insertValues.派工編號, insertValues.派工數量, insertValues.製令單號, insertValues.部位名稱, insertValues.尺寸],(error, result) => {
          if (error) { 
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.affectedRows == 1) { // 寫入成功
            resolve(`修改成功！`);

          } else {
            resolve('資料無異動');
          }
          conn.release();
        });
      }
    });
  });
};
module.exports.Updateoutsole = Updateoutsole;

//大底監控
const getoutsolemonitor = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, 大底編號, 上傳時間, 上次編輯日期, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM outsole group by 製令單號`, [insertValues.s], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
}; 
// 派工進度 並非真的是資料庫有一筆名稱叫派工進度的資料
// 而是 透過計算「AS 派工進度」 AS的用法是 將 前面的數據取名叫什麼
// ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 為例 
// ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1)的結果被取名 派工進度   //round(a,b) 將A的數值取到小數點第b位  sum()就是加總

module.exports.getoutsolemonitor  = getoutsolemonitor ;
//大底
const getoutsolemonitor2 = () => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, 大底編號, ROUND((SUM(完工數量)/SUM(原本數量))*100,1) AS 完工進度 FROM outsole group by 製令單號`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getoutsolemonitor2  = getoutsolemonitor2 ;

//建立outsole的管理單

const Createoutsole = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
          reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`INSERT INTO outsole (製令單號, 型體編號 ,LOGO ,顏色 ,可支配數 ,完成雙數 ,總數量 ,上傳時間 ,派工進度 ,完成狀態) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[insertValues.製令單號, insertValues.型體編號, insertValues.LOGO, insertValues.顏色, insertValues.可支配數, insertValues.完成雙數, insertValues.總數量, insertValues.上傳時間, insertValues.派工進度, insertValues.完成狀態],(error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows == 1) {
            resolve(`新增成功`); // 寫入成功回傳寫入id
          }
          conn.release();
        });
      }
  });
 });
};
module.exports.Createoutsole = Createoutsole;




//大底派工進度
const getoutsolePercent = () => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT DISTINCT 製令單號, 楦頭編號, 上傳時間, 上次編輯時間, ROUND((1-(SUM(派工數量)/SUM(原本數量)))*100,1) AS 派工進度 FROM outsole group by 製令單號`, (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.getoutsolePercent  = getoutsolePercent ;
// first, I create a new api // it's name call getoutsolePercent
// controller, module, router all the same   //遠端不讓我中英文切換ˋˊ

// const postsewingoutsole = (insertValues2) => {
//   return new Promise((resolve, reject) => {
//     pool1.getConnection((connectionError, conn) => { // 資料庫連線
//       if (connectionError) {
//           reject(connectionError); // 若連線有問題回傳錯誤
//       } else {
//         conn.query(`INSERT INTO sewingandoutsole (製令單號,楦頭編號,尺寸,原本數量,派工數量,完工數量,上傳時間,上次編輯時間,完成狀態,總數量) value (?,?,?,?,?,?,?,?,?,?)`,[insertValues2.製令單號,insertValues2.楦頭編號,insertValues2.尺寸,insertValues2.原本數量,insertValues2.派工數量,insertValues2.完工數量,insertValues2.上傳時間,insertValues2.上次編輯日期,insertValues2.完成狀態,insertValues2.總數量],(error, result) => { // Article資料表寫入一筆資料
//           if (error) {
//             console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
//             reject(error);
//           } else if (result.affectedRows == 1) {
//             resolve(`新增成功！2`); // 寫入成功回傳寫入id
//           }
//           conn.release();
//         });
//       }
//   });
//  });
// };

// module.exports.postsewingoutsole = postsewingoutsole;



const selectgettable31 = (insertValues) => {

  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM dw WHERE 製令單號 = ?  ORDER BY CAST(尺寸 AS FLOAT) ASC`, [insertValues.s,insertValues.s1], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};

module.exports.selectgettable31  = selectgettable31;

const GetsewingTable = (insertValues) => {
  return new Promise((resolve, reject) => {
    pool1.getConnection((connectionError, conn) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        conn.query(`SELECT * FROM sewingtable WHERE 製令單號 = ?`, [insertValues.rid], (error, result) => {  // Article撈取所有欄位的值組
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else {
            resolve(result); // 撈取成功回傳 JSON 資料
          }
          conn.release();
        }
        );
      }
    });
  });
};
module.exports.GetsewingTable = GetsewingTable;


//目前使用API
module.exports.updatenfcid = updatenfcid;
module.exports.nfcid = nfcid;
module.exports.insertshoes = insertshoes;
module.exports.gettable1fortittle = gettable1fortittle;
module.exports.gettable1 = gettable1;
module.exports.gettable2 = gettable2;
module.exports.selectgettable3 = selectgettable3;
module.exports.insertintotable4 = insertintotable4;
module.exports.directdispatch = directdispatch;
module.exports.gettable4totalnum = gettable4totalnum;
module.exports.gettable4print = gettable4print;
module.exports.gettable1totalnum = gettable1totalnum;
module.exports.directdispatchsizenum = directdispatchsizenum;
module.exports.directdispatchsizenum2 = directdispatchsizenum2;
module.exports.directdispatchnum = directdispatchnum;
module.exports.totalnumberofparts = totalnumberofparts;
module.exports.totalnumberofparts2 = totalnumberofparts2;
module.exports.NewArticle = NewArticle;
module.exports.NewArticle2 = NewArticle2;
module.exports.NewArticle3 = NewArticle3;
module.exports.updatesizenum = updatesizenum;
module.exports.updateprint = updateprint;
module.exports.updateschedule = updateschedule;
module.exports.updateschedule2 = updateschedule2;
module.exports.updateschedulenum = updateschedulenum;
module.exports.updateschedulenum1 = updateschedulenum1;
module.exports.getTable1Info = getTable1Info;
module.exports.getTable4Info = getTable4Info;
module.exports.getTable4Info3 = getTable4Info3;
module.exports.getTable5Info = getTable5Info;
module.exports.getTable4Info2 = getTable4Info2;
module.exports.getMaterial = getMaterial;
module.exports.getMaterial1 = getMaterial1;
module.exports.returnData = returnData;
module.exports.updatedatetime = updatedatetime;
module.exports.insertTable5 = insertTable5;
module.exports.getTable5reportNumber = getTable5reportNumber;
module.exports.getTable4reportNumber = getTable4reportNumber;
module.exports.getTable4workorder = getTable4workorder;
module.exports.shoesinformation = shoesinformation;
module.exports.shoesinformation3 = shoesinformation3;
module.exports.shoesinformation2 = shoesinformation2;
module.exports.getimg = getimg;



module.exports.insertpunchin = insertpunchin;
module.exports.updatepunchout = updatepunchout;
module.exports.getAllPunchData = getAllPunchData;
module.exports.getAllPunch = getAllPunch;
module.exports.getAllPunch1 = getAllPunch1;


// 新的
module.exports.insertNFCIDList = insertNFCIDList;
module.exports.updatetable4state = updatetable4state;
module.exports.updatetable5state = updatetable5state;
module.exports.updateNFCIDlistUsingstate = updateNFCIDlistUsingstate;

module.exports.NewArticle6now = NewArticle6now;
module.exports.NewArticle4 = NewArticle4;

module.exports.NewArticle6 = NewArticle6;
module.exports.NewArticle6total = NewArticle6total;
module.exports.NewArticle66 = NewArticle66;



