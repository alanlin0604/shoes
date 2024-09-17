var config = {
  port: "3306", // 連接阜號
  host: "127.0.0.1", // 主機名稱 
  user: "root", // 用戶名稱
  password: "a232659586", // 資料庫密碼
  database: "topic", // 資料庫名稱
  connectionLimit: 5, // 連線池限制
  allowPublicKeyRetrieval: true, // 允許自動檢索公鑰
  ssl: { 
      rejectUnauthorized: false // 忽略未授權的 SSL 證書
  }
};

module.exports = config; // 模組匯出