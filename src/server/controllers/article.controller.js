

var articleModule = require('../modules/article.module');


// 抓table5資訊
const getTable5Info = (req, res) => {
  const insertValues = req.query; //query post , body get 一組
  articleModule.getTable5Info(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable5Info = getTable5Info;


// img
const getimg = (req, res) => {

  articleModule.getimg().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getimg = getimg;

// 抓table5資訊
const shoesinformation = (req, res) => {
  const insertValues = req.query;
  articleModule.shoesinformation(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.shoesinformation = shoesinformation;

// 抓table5資訊
const shoesinformation3 = (req, res) => {
  
  articleModule.shoesinformation3().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.shoesinformation3 = shoesinformation3;

// 抓table5資訊
const shoesinformation2 = (req, res) => {
  //const insertValues = req.query;
  articleModule.shoesinformation2().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.shoesinformation2 = shoesinformation2;

// 抓table1資訊
const getTable1Info = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable1Info(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable1Info = getTable1Info;

// 抓table4資訊
const getTable4Info = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable4Info(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable4Info = getTable4Info;

const getTable4Info2 = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable4Info2(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable4Info2 = getTable4Info2;


const getTable4Info3 = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable4Info3(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable4Info3 = getTable4Info3;

const insertTable5 = (req, res) => {
  const insertValues = req.query;
  articleModule.insertTable5(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.insertTable5 = insertTable5;
// 抓table4派工單編號
const getTable4workorder = (req, res) => {
  articleModule.getTable4workorder().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable4workorder = getTable4workorder;
// 抓table4資訊
const getTable4reportNumber = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable4reportNumber(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable4reportNumber = getTable4reportNumber;
// 抓table5回報數量
const getTable5reportNumber = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable5reportNumber(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable5reportNumber = getTable5reportNumber;
// 抓材料資訊
const getMaterial = (req, res) => {
  const insertValues = req.query;
  articleModule.getMaterial(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getMaterial = getMaterial;

// 抓材料資訊
const getMaterial1 = (req, res) => {
  const insertValues = req.query;
  articleModule.getMaterial1(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getMaterial1 = getMaterial1;

// 回傳完成數量及回報時間
const returnData = (req, res) => {
  const insertValues = req.query;
  articleModule.returnData(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.returnData = returnData;


//派工畫面資料API
const gettable1fortittle = (req, res) => {
  
  const insertValues = req.query;
 

  articleModule.gettable1fortittle(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable1fortittle = gettable1fortittle;

/* 進入派工畫面抓取資料API */
const gettable1 = (req, res) => {
  articleModule.gettable1().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable1 = gettable1;

//部位名稱等資料API
const gettable2 = (req, res) => {

  const insertValues = req.query;
 

  articleModule.gettable2(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable2 = gettable2;


const selectgettable3 = (req, res) => {

  const insertValues = req.query;
 

  articleModule.selectgettable3(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.selectgettable3 = selectgettable3;


const insertintotable4 = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  
  articleModule.insertintotable4(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.insertintotable4 = insertintotable4;


const directdispatch = (req, res) => {

  const insertValues = req.query;
  articleModule.directdispatch(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.directdispatch = directdispatch;


const directdispatchsizenum = (req, res) => {

  const insertValues = req.query;

  articleModule.directdispatchsizenum(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.directdispatchsizenum = directdispatchsizenum;

const directdispatchsizenum2 = (req, res) => {

  const insertValues = req.query;

  articleModule.directdispatchsizenum2(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.directdispatchsizenum2 = directdispatchsizenum2;

const directdispatchnum = (req, res) => {

  const insertValues = req.query;

  articleModule.directdispatchnum(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.directdispatchnum = directdispatchnum;

const totalnumberofparts = (req, res) => {

  const insertValues = req.query;

  articleModule.totalnumberofparts(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.totalnumberofparts = totalnumberofparts;

const gettable4totalnum = (req, res) => {

  const insertValues = req.query;

  articleModule.gettable4totalnum(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable4totalnum = gettable4totalnum;


const gettable4print = (req, res) => {

  const insertValues = req.query;

  articleModule.gettable4print(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable4print = gettable4print;

const gettable1totalnum = (req, res) => {

  const insertValues = req.query;

  articleModule.gettable1totalnum(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.gettable1totalnum = gettable1totalnum;

const totalnumberofparts2 = (req, res) => {

  const insertValues = req.query;

  articleModule.totalnumberofparts2(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.totalnumberofparts2 = totalnumberofparts2;


const updatesizenum = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updatesizenum(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updatesizenum = updatesizenum;

const updateschedule = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updateschedule(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updateschedule = updateschedule;

const updateschedule2 = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updateschedule2(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updateschedule2 = updateschedule2;

const updateprint = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updateprint(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updateprint = updateprint;

const updateschedulenum = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updateschedulenum(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updateschedulenum = updateschedulenum;

const updateschedulenum1 = (req, res) => {
  // 取得修改參數
  const insertValues = req.body;
  articleModule.updateschedulenum1(insertValues).then((result) => {
      res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

module.exports.updateschedulenum1 = updateschedulenum1;
/* GET 取得所有資料庫數值 */

const articlePost = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

/* POST新增 */
const articlePost2 = (req, res) => {
  const insertValues2 = req.body; //取得欄位值
  articleModule.NewArticle2 (insertValues2).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

/* POST新增 */
const articlePost3 = (req, res) => {
  const insertValues3 = req.body; //取得欄位值
  articleModule.NewArticle3 (insertValues3).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

/* POST新增 */
const updatedatetime = (req, res) => {
  const insertValues3 = req.body; //取得欄位值
  articleModule.updatedatetime (insertValues3).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

module.exports.updatedatetime = updatedatetime;

module.exports.articlePost = articlePost;
module.exports.articlePost2 = articlePost2;
module.exports.articlePost3 = articlePost3;
  
/* POST新增 */
const insertshoes = (req, res) => {
  const insertValues3 = req.body; //取得欄位值
  articleModule.insertshoes (insertValues3).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.insertshoes = insertshoes;




// 打卡API
const insertpunchin = (req, res) => {
  const insertValues = req.query;
  articleModule.insertpunchin(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.insertpunchin = insertpunchin;

const updatepunchout = (req, res) => {
  const insertValues = req.query;
  articleModule.updatepunchout(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updatepunchout = updatepunchout;

const getAllPunchData = (req, res) => {
  const insertValues = req.query;
  articleModule.getAllPunchData(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getAllPunchData = getAllPunchData;

const getAllPunch = (req, res) => {
  const insertValues = req.query;
  articleModule.getAllPunch(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getAllPunch = getAllPunch;

const getAllPunch1 = (req, res) => {
  const insertValues = req.query;
  articleModule.getAllPunch1(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getAllPunch1 = getAllPunch1;

const nfcid = (req, res) => {
  const insertValues = req.query;

  articleModule.nfcid().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.nfcid = nfcid;

const updatenfcid = (req, res) => {
  const insertValues = req.body;
  articleModule.updatenfcid(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updatenfcid = updatenfcid;


// 新的
const insertNFCIDList = (req, res) => {
  const insertValues = req.body;
  articleModule.insertNFCIDList(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.insertNFCIDList = insertNFCIDList;

const deleteNFC = (req, res) => {
  const insertValues = req.body;
  articleModule.deleteNFC(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.deleteNFC = deleteNFC;

const updatetable4state = (req, res) => {
  const insertValues = req.query;
  articleModule.updatetable4state(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updatetable4state = updatetable4state;

const updatetable5state = (req, res) => {
  const insertValues = req.query;
  articleModule.updatetable5state(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updatetable5state = updatetable5state;


const articlegetDB4 = (req, res) => {
  const insertValues = req.query;
  articleModule.articlegetDB4(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.articlegetDB4 = articlegetDB4;


/* GET 取得所有資料庫數值 */
const articlegetDB5 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB5 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB5 = articlegetDB5;

/* GET 取得所有資料庫數值 */
const articlegetDB5ok = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB5ok (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB5ok = articlegetDB5ok;

/* GET 取得所有資料庫數值 */

const articlegetDB6 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB6 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB6 = articlegetDB6;

const articlegetDB6all = (req, res) => {
  //const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB6all ().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB6all = articlegetDB6all;

const articlegetDB6total = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB6total (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB6total = articlegetDB6total;




/* POST新增 */
const articlePost66 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle66 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost66 = articlePost66;

/* POST新增 */
const articlePost6now = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle6now (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost6now = articlePost6now;



/* POST新增 */
const articlePost4 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle4 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost4 = articlePost4;

/* POST table6回報數量 */
const articlePost6 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle6 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost6 = articlePost6;

/* POST table6總數量 */
const articlePost6total = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle6total (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost6total = articlePost6total;


const articlegetDB1 = (req, res) => {
  const insertValues = req.query;
  articleModule.articlegetDB1(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.articlegetDB1 = articlegetDB1;
/* GET 取得所有資料庫數值 */

/* GET 取得所有資料庫數值 */

const articlegetDB2 = (req, res) => {
  const insertValues = req.query;
  articleModule.articlegetDB2(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.articlegetDB2 = articlegetDB2;
/* GET 取得所有資料庫數值 */

const updateNFCIDlistUsingstate = (req, res) => {
  const insertValues = req.query;
  articleModule.updateNFCIDlistUsingstate(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updateNFCIDlistUsingstate = updateNFCIDlistUsingstate;


//new

const updatepeople = (req, res) => {
  const insertValues = req.body;
  articleModule.updatepeople(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.updatepeople = updatepeople;

const getpeople = (req, res) => {
  const insertValues = req.query;
  articleModule.getpeople(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getpeople = getpeople;

const sumtable4 = (req, res) => {
  const insertValues = req.query;
  articleModule.sumtable4(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.sumtable4 = sumtable4;

const newgetallpunch = (req, res) => {
  const insertValues = req.query;
  articleModule.newgetallpunch(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.newgetallpunch = newgetallpunch;


// 新的(08/15)
const getTable5 = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable5(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getTable5 = getTable5;

const articlegetDB6all2 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.articlegetDB6all2 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlegetDB6all2 = articlegetDB6all2;

/* POST table6回報數量 */
const articlePost1 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.NewArticle1 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.articlePost1 = articlePost1;


const articlegetDB4all = (req, res) => {
  const insertValues = req.query;
  articleModule.articlegetDB4all(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.articlegetDB4all = articlegetDB4all;

const removetable1 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.removetable1 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.removetable1 = removetable1;

const inputlogo = (req, res) => {
  const insertValues = req.body;
  articleModule.inputlogo (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.inputlogo = inputlogo;


const members = (req, res) => {
  const insertValues = req.query;
  articleModule.getTable5(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.members = members;


const register = (req, res) => {
  const insertValues = req.body;
  articleModule.register (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.register = register;


const editTable4 = (req, res) => {
  const insertValues3 = req.query; //取得欄位值
  articleModule.editTable4 (insertValues3).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.editTable4 = editTable4;

const PrintCutting = (req, res) => {
  const insertValues = req.query;
  articleModule.PrintCutting(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.PrintCutting = PrintCutting;

const logo = (req, res) => {
  const insertValues = req.body;
  articleModule.logo (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.logo = logo;

const RemoveTable4 = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.RemoveTable4 (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.RemoveTable4 = RemoveTable4;

const RemoveTable4FromWorkorderNumber = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.RemoveTable4FromWorkorderNumber (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.RemoveTable4FromWorkorderNumber = RemoveTable4FromWorkorderNumber;


const CreatePrinting = (req, res) => {
  const insertValues = req.body;
  articleModule.CreatePrinting (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.CreatePrinting = CreatePrinting;

const UpdatePrintingTotal = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdatePrintingTotal (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatePrintingTotal = UpdatePrintingTotal;

const GetPrinting = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrinting(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrinting = GetPrinting;

const Sumtable3 = (req, res) => {
  const insertValues = req.query;
  articleModule.Sumtable3(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.Sumtable3 = Sumtable3;  // sum table 3   amount  // select sum(數量) as 數量 from table3 where 製令單號 = ? AND 部位名稱 = ?


const GetPrintingItem = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingItem(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingItem = GetPrintingItem;

const GetPrintingTableSection = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTableSection(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTableSection = GetPrintingTableSection;

const UndoPrintingTable = (req, res) => {
  const insertValues = req.query;
  articleModule.UndoPrintingTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.UndoPrintingTable = UndoPrintingTable;

const UndoHighFrequencyTable = (req, res) => {
  const insertValues = req.query;
  articleModule.UndoHighFrequencyTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.UndoHighFrequencyTable = UndoHighFrequencyTable;

const GetPrintingTableSize = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTableSize(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTableSize = GetPrintingTableSize;

const GetPrintingTableSectionInfo = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTableSectionInfo(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTableSectionInfo = GetPrintingTableSectionInfo;
// const UpdatePrintingSection = (req, res) => {
//   const insertValues = req.body; //取得欄位值
//   articleModule.UpdatePrintingSection (insertValues).then((result) => {
//     res.send(result); // 成功回傳result結果
//   }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
// };
// module.exports.UpdatePrintingSection = UpdatePrintingSection;

const UpdatePrintingPercent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdatePrintingPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatePrintingPercent = UpdatePrintingPercent;

const UpdatePrintingCompletePercent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdatePrintingCompletePercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatePrintingCompletePercent = UpdatePrintingCompletePercent;

const CreatePrintingTable = (req, res) => {
  const insertValues = req.body;
  articleModule.CreatePrintingTable (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.CreatePrintingTable = CreatePrintingTable;

const GetPrintingTable = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTable = GetPrintingTable;

const UpdatePrintingCompletePercentx = (req, res) => {
  const insertValues = req.query;
  articleModule.UpdatePrintingCompletePercentx(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.UpdatePrintingCompletePercentx = UpdatePrintingCompletePercentx;

const UpdateHighFrequencyCompletePercentx = (req, res) => {
  const insertValues = req.query;
  articleModule.UpdateHighFrequencyCompletePercentx(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.UpdateHighFrequencyCompletePercentx = UpdateHighFrequencyCompletePercentx;

const GetPrintingTableList = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTableList(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTableList = GetPrintingTableList;

const UpdatePrintingTable = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdatePrintingTable (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatePrintingTable = UpdatePrintingTable;

const GetPrintingTableInfo = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTableInfo(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingTableInfo = GetPrintingTableInfo;

const ReturnPrintingTable = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnPrintingTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnPrintingTable = ReturnPrintingTable;

const ReturnHighFrequencyTable = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnHighFrequencyTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnHighFrequencyTable = ReturnHighFrequencyTable;

const GetHighFrequencyTableInfo = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyTableInfo(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyTableInfo = GetHighFrequencyTableInfo;

const GetHighFrequencyTableList = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyTableList(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyTableList = GetHighFrequencyTableList;

const CreateHighFrequency = (req, res) => {
  const insertValues = req.body;
  articleModule.CreateHighFrequency (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.CreateHighFrequency = CreateHighFrequency;

const UpdateHighFrequencyTotal = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdateHighFrequencyTotal (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencyTotal = UpdateHighFrequencyTotal;

const GetHighFrequency = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequency(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequency = GetHighFrequency;

const UpdateHighFrequencySection = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdateHighFrequencySection (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencySection = UpdateHighFrequencySection;

const CreateHighFrequencyTable = (req, res) => {
  const insertValues = req.body;
  articleModule.CreateHighFrequencyTable (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.CreateHighFrequencyTable = CreateHighFrequencyTable;

const GetHighFrequencyTable = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyTable = GetHighFrequencyTable;

const UpdateHighFrequencyTable = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdateHighFrequencyTable (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencyTable = UpdateHighFrequencyTable;

const UpdateHighFrequencyPercent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdateHighFrequencyPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencyPercent = UpdateHighFrequencyPercent;

const UpdateHighFrequencyCompletePercent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdateHighFrequencyCompletePercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencyCompletePercent = UpdateHighFrequencyCompletePercent;

const GetHighFrequencyTableSection = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyTableSection(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyTableSection = GetHighFrequencyTableSection;

const GetHighFrequencyTableSectionInfo = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyTableSectionInfo(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyTableSectionInfo = GetHighFrequencyTableSectionInfo;

const GetHighFrequencyItem = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyItem(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyItem = GetHighFrequencyItem;

const QCCutting = (req, res) => {
  const insertValues = req.query;
  articleModule.QCCutting(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.QCCutting = QCCutting;

const QCPrinting = (req, res) => {
  const insertValues = req.query;
  articleModule.QCPrinting(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.QCPrinting = QCPrinting;

const QCHighFrequency = (req, res) => {
  const insertValues = req.query;
  articleModule.QCHighFrequency(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.QCHighFrequency = QCHighFrequency;

const QCsewing = (req, res) => {
  const insertValues = req.query;
  articleModule.QCsewing(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.QCsewing = QCsewing;


const ReloadNFC = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.ReloadNFC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.ReloadNFC = ReloadNFC;

const nfcidNFCID = (req, res) => {
  const insertValues = req.query;
  articleModule.nfcidNFCID(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.nfcidNFCID = nfcidNFCID;

const NFCRegister = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.NFCRegister (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.NFCRegister = NFCRegister;

const InsterCuttingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.InsterCuttingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.InsterCuttingQC = InsterCuttingQC;

const UpdateCuttingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.UpdateCuttingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateCuttingQC = UpdateCuttingQC;

const FixCuttingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.FixCuttingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.FixCuttingQC = FixCuttingQC;

const GetCuttingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetCuttingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetCuttingQC = GetCuttingQC;

const GetCuttingQCSection = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetCuttingQCSection (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetCuttingQCSection = GetCuttingQCSection;

const GetCuttingQCSectionPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetCuttingQCSectionPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetCuttingQCSectionPercent = GetCuttingQCSectionPercent;

const GetCuttingQCPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetCuttingQCPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetCuttingQCPercent = GetCuttingQCPercent;

const InsterPrintingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.InsterPrintingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.InsterPrintingQC = InsterPrintingQC;

const UpdatePrintingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.UpdatePrintingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatePrintingQC = UpdatePrintingQC;

const GetPrintingQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetPrintingQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetPrintingQC = GetPrintingQC;

const InsterHighFrequencyQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.InsterHighFrequencyQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.InsterHighFrequencyQC = InsterHighFrequencyQC;

const UpdateHighFrequencyQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.UpdateHighFrequencyQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdateHighFrequencyQC = UpdateHighFrequencyQC;

const GetHighFrequencyQC = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetHighFrequencyQC (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetHighFrequencyQC = GetHighFrequencyQC;


const FixTable4Percent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.FixTable4Percent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.FixTable4Percent = FixTable4Percent;

const ReturnTable6Total = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnTable6Total(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnTable6Total = ReturnTable6Total;

const ReturnCuttingQC = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnCuttingQC(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnCuttingQC = ReturnCuttingQC;

const GetCuttingReportAmount = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetCuttingReportAmount (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetCuttingReportAmount = GetCuttingReportAmount;

const GetPrintingReportAmount = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetPrintingReportAmount (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetPrintingReportAmount = GetPrintingReportAmount;

const GetHighFrequencyReportAmount = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetHighFrequencyReportAmount (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetHighFrequencyReportAmount = GetHighFrequencyReportAmount;

const GetPrintingQCPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetPrintingQCPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetPrintingQCPercent = GetPrintingQCPercent;

const GetPrintingQCPercentSection = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetPrintingQCPercentSection (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetPrintingQCPercentSection = GetPrintingQCPercentSection;

const GetHighFrequencyQCPercentSection = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetHighFrequencyQCPercentSection (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetHighFrequencyQCPercentSection = GetHighFrequencyQCPercentSection;

const GetHighFrequencyQCPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetHighFrequencyQCPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetHighFrequencyQCPercent = GetHighFrequencyQCPercent;

const GetModelID = (req, res) => {
  //const insertValues = req.query; //取得欄位值
  articleModule.GetModelID().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetModelID = GetModelID ;

const GetSizeID = (req, res) => {
  //const insertValues = req.query; //取得欄位值
  articleModule.GetSizeID().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetSizeID = GetSizeID ;

const ReturnShesLogo = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.ReturnShesLogo(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.ReturnShesLogo = ReturnShesLogo ;

const GetLogoInformation = (req, res) => {
  const insertValues = req.query;
  articleModule.GetLogoInformation (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetLogoInformation = GetLogoInformation;

const GetPrintingQCSize = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingQCSize (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingQCSize = GetPrintingQCSize;

const GetHighFrequencyQCSize = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyQCSize (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyQCSize = GetHighFrequencyQCSize;

const ReturnExcelTime = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnExcelTime (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnExcelTime = ReturnExcelTime;

const ReturnCuttingCompleteTime = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnCuttingCompleteTime (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnCuttingCompleteTime = ReturnCuttingCompleteTime;

const ReturnPrintingCompleteTime  = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnPrintingCompleteTime  (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnPrintingCompleteTime  = ReturnPrintingCompleteTime ;

const ReturnHighFrequencyCompleteTime  = (req, res) => {
  const insertValues = req.query;
  articleModule.ReturnHighFrequencyCompleteTime  (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.ReturnHighFrequencyCompleteTime  = ReturnHighFrequencyCompleteTime;

const GetNFCIDList = (req, res) => {
  const insertValues = req.query;

  articleModule.GetNFCIDList().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetNFCIDList = GetNFCIDList;

const insertNFCID  = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.insertNFCID  (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.insertNFCID  = insertNFCID;

const CheckNFCIDList  = (req, res) => {
  const insertValues = req.query;
  articleModule.CheckNFCIDList  (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.CheckNFCIDList  = CheckNFCIDList;

const CheckNFCIDListSearch  = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.CheckNFCIDListSearch  (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.CheckNFCIDListSearch  = CheckNFCIDListSearch;

const GetPrintingPercent = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingPercent(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetPrintingPercent = GetPrintingPercent;

const GetHighFrequencyPercent = (req, res) => {
  const insertValues = req.query;
  articleModule.GetHighFrequencyPercent(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetHighFrequencyPercent = GetHighFrequencyPercent;

//練習
const AddPunchIn = (req, res) => {
  const insertValues = req.query;
  articleModule.AddPunchIn(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};  
module.exports.AddPunchIn = AddPunchIn;

const GetsewingqcPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.GetsewingqcPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.GetsewingqcPercent = GetsewingqcPercent;


const postsewing = (req, res) => {
  const insertValues2 = req.query; //取得欄位值
  articleModule.postsewing (insertValues2).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

module.exports.postsewing = postsewing;

const getsewingsystem = (req, res) => {
  const insertValues = req.query;
  articleModule.getsewingsystem(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getsewingsystem = getsewingsystem;

//針車組合的派工進度
const getsewingPercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getsewingPercent().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getsewingPercent = getsewingPercent;

//針車系統的派工進度
const getsewingPercent1 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getsewingPercent().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getsewingPercent1 = getsewingPercent1;

const selectgetsewing = (req, res) => {

  const insertValues = req.query;
  articleModule.selectgetsewing(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.selectgetsewing = selectgetsewing;

const UpdatesewingTable = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.UpdatesewingTable (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatesewingTable = UpdatesewingTable;

const UpdatesewingPercent = (req, res) => {
  const insertValues = req.body; //取得欄位值
  articleModule.UpdatePrintingPercent (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.UpdatesewingPercent = UpdatesewingPercent;


const GetsewingTable = (req, res) => {
  const insertValues = req.query;
  articleModule.GetPrintingTable(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.GetsewingTable = GetsewingTable;

//大底監控
const getsewingmonitor = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getsewingmonitor (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getsewingmonitor = getsewingmonitor;
//大底
const getsewingmonitor2 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getsewingmonitor2().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getsewingmonitor2 = getsewingmonitor2;

const postoutsole = (req, res) => {
  const insertValues2 = req.query; //取得欄位值
  articleModule.postoutsole (insertValues2).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

module.exports.postoutsole = postoutsole;

//大底系統
const getoutsolesystem = (req, res) => {
  const insertValues = req.query;
  articleModule.getoutsolesystem(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.getoutsolesystem = getoutsolesystem;

const selectgetoutsole = (req, res) => {

  const insertValues = req.query;
 

  articleModule.selectgetoutsole(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.selectgetoutsole = selectgetoutsole;

const Updateoutsole = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.Updateoutsole (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.Updateoutsole = Updateoutsole;

//大底監控
const getoutsolemonitor = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getoutsolemonitor (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getoutsolemonitor = getoutsolemonitor;
//大底
const getoutsolemonitor2 = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getoutsolemonitor2().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getoutsolemonitor2 = getoutsolemonitor2;

//建立outsole的管理單

const Createoutsole = (req, res) => {
  const insertValues = req.body;
  articleModule.Createoutsole (insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.Createoutsole = Createoutsole;

//show order's percent, not dispatchwork
const getoutsolePercent = (req, res) => {
  const insertValues = req.query; //取得欄位值
  articleModule.getoutsolePercent().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};
module.exports.getoutsolePercent = getoutsolePercent;

const postsewingoutsole = (req, res) => {
  const insertValues2 = req.query; //取得欄位值
  articleModule.postsewingoutsole (insertValues2).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return console.log(err); }); // 失敗回傳錯誤訊息
};

module.exports.postsewingoutsole = postsewingoutsole;



const selectgettable31 = (req, res) => {

  const insertValues = req.query;
 

  articleModule.selectgettable31(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};  
module.exports.selectgettable31 = selectgettable31;
