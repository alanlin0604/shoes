module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "asas621201",
    DB: "testdb",
    dialect: "mariadb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };