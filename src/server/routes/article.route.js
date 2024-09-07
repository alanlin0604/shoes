
var express = require('express');
var router = express.Router();
var articleCtrl = require('../controllers/article.controller');

// 抓table5資訊
router.get('/getTable5Info',articleCtrl.getTable5Info);
// 抓table4派工單編號
router.get('/getTable4workorder',articleCtrl.getTable4workorder);
// 抓table1資訊
router.get('/getTable1Info',articleCtrl.getTable1Info);
// 抓table4資訊(APP)
router.get('/getTable4Info',articleCtrl.getTable4Info);
// 抓table4資訊(網頁用)
router.get('/getTable4Info2',articleCtrl.getTable4Info2);
// 抓table5回報數量
router.get('/getTable5reportNumber',articleCtrl.getTable5reportNumber);
// 抓table4回報數量
router.get('/getTable4reportNumber',articleCtrl.getTable4reportNumber);
// 抓table4資訊(列印派工單用)
router.get('/getTable4Info3',articleCtrl.getTable4Info3);
// 抓資料進table5(APP用)
router.get('/insertTable5',articleCtrl.insertTable5);
// 抓材料資訊
router.get('/getMaterial',articleCtrl.getMaterial);
// 抓材料資訊(網頁用)
router.get('/getMaterial1',articleCtrl.getMaterial1);
// 回傳完成數量及回報時間
router.get('/returnData',articleCtrl.returnData);
//派工畫面資料API
router.get('/gettable1fortittle',articleCtrl.gettable1fortittle);
//進入派工畫面抓取資料API
router.get('/gettable1',articleCtrl.gettable1);
//取得table2 API
router.get('/gettable2',articleCtrl.gettable2);
//取得選完後尺寸數量API
router.get('/selectgettable3',articleCtrl.selectgettable3);
//派工到table4
router.post('/insertintotable4',articleCtrl.insertintotable4);
//直接派工用API
router.get('/directdispatch',articleCtrl.directdispatch);
//抓取派工出去後的尺寸數量
router.get('/directdispatchsizenum',articleCtrl.directdispatchsizenum);
//抓取派工出去後的尺寸數量(分組派工用)
router.get('/directdispatchsizenum2',articleCtrl.directdispatchsizenum2);
//抓取派工出去後的數量
router.get('/directdispatchnum',articleCtrl.directdispatchnum);
//抓取對應部位總數量
router.get('/Sumtable3',articleCtrl.Sumtable3);
//加總table3部位數量
router.get('/totalnumberofparts',articleCtrl.totalnumberofparts);
//抓取對應部位總數量
router.get('/totalnumberofparts2',articleCtrl.totalnumberofparts2);
//抓取對應部位總數量
router.get('/gettable1totalnum',articleCtrl.gettable1totalnum);

//抓取table4列印狀態

router.get('/GetHighFrequencyTableSection',articleCtrl.GetHighFrequencyTableSection);
router.get('/GetHighFrequencyTableSectionInfo',articleCtrl.GetHighFrequencyTableSectionInfo);

router.get('/UndoPrintingTable',articleCtrl.UndoPrintingTable); // 用於重置 printingtable // 用在移除派工
router.get('/UndoHighFrequencyTable',articleCtrl.UndoHighFrequencyTable); // 用於重置 HighFrequencyTable // 用在移除派工



router.get('/gettable4print',articleCtrl.gettable4print);

router.get('/shoesinformation',articleCtrl.shoesinformation);

router.get('/shoesinformation2',articleCtrl.shoesinformation2);

router.get('/shoesinformation3',articleCtrl.shoesinformation3);
//抓取tabe4總數量
router.get('/gettable4totalnum',articleCtrl.gettable4totalnum);
//更新列印狀態
router.post('/updateprint',articleCtrl.updateprint);
//更新尺寸日期
router.post('/updatedatetime',articleCtrl.updatedatetime);
//更新尺寸API
router.post('/updatesizenum',articleCtrl.updatesizenum);
//更新table2派工進度API
router.post('/updateschedule',articleCtrl.updateschedule);
//更新nfcid派工進度
router.post('/updatenfcid',articleCtrl.updatenfcid);
//更新table1派工進度API
router.post('/updateschedule2',articleCtrl.updateschedule2);
//新增派工單到資料庫API
router.post('/postDB',articleCtrl.articlePost);
router.post('/postDB2',articleCtrl.articlePost2);
router.post('/postDB3',articleCtrl.articlePost3);
//更新table1總數量
router.post('/updateschedulenum1',articleCtrl.updateschedulenum1);
//更新table2總數量
router.post('/updateschedulenum',articleCtrl.updateschedulenum);

router.post('/insertshoes',articleCtrl.insertshoes);

router.get('/getimg',articleCtrl.getimg);


// 打卡API
router.get('/insertpunchin',articleCtrl.insertpunchin);
router.get('/updatepunchout',articleCtrl.updatepunchout);
router.get('/getallpunchdata',articleCtrl.getAllPunchData);
router.get('/getallpunch',articleCtrl.getAllPunch);
router.get('/getallpunch1',articleCtrl.getAllPunch1);
router.get('/nfcid',articleCtrl.nfcid);


// 新的
router.post('/insertNFCIDList',articleCtrl.insertNFCIDList);
router.post('/deleteNFC',articleCtrl.deleteNFC);
router.get('/updatetable4state',articleCtrl.updatetable4state);
router.get('/updatetable5state',articleCtrl.updatetable5state);
router.get('/updateNFCIDlistUsingstate',articleCtrl.updateNFCIDlistUsingstate);

router.get('/getDB1',articleCtrl.articlegetDB1);
router.get('/getDB2',articleCtrl.articlegetDB2);
router.get('/getDB4',articleCtrl.articlegetDB4);
router.get('/getDB5',articleCtrl.articlegetDB5);
router.get('/getDB5ok',articleCtrl.articlegetDB5ok);
router.get('/getDB6',articleCtrl.articlegetDB6);
router.get('/getDB6all',articleCtrl.articlegetDB6all);
router.get('/getDB6total',articleCtrl.articlegetDB6total);
router.post('/postDB66',articleCtrl.articlePost66);



router.post('/postDB66',articleCtrl.articlePost66);


router.post('/updateDB6',articleCtrl.articlePost6);
router.post('/updateDB4',articleCtrl.articlePost4);
router.post('/updateDB6total',articleCtrl.articlePost6total);
router.post('/updateDB6now',articleCtrl.articlePost6now);

router.get('/sumtable4',articleCtrl.sumtable4);

//new
router.post('/updatepeople',articleCtrl.updatepeople);
router.get('/getpeople',articleCtrl.getpeople);
router.get('/newgetallpunch',articleCtrl.newgetallpunch);
router.get('/getDB4all',articleCtrl.articlegetDB4all);
router.post('/updateDB1',articleCtrl.articlePost1);  //NewArticle1



// 新的(08/15)
router.get('/getTable5',articleCtrl.getTable5);
router.get('/getDB6all2',articleCtrl.articlegetDB6all2);

router.post('/removetable1',articleCtrl.removetable1);  //移除派工單


router.post('/inputlogo',articleCtrl.inputlogo);  //派工單寫入logo

router.get('/members',articleCtrl.members);  //比對資料庫
router.post('/register',articleCtrl.register);  //註冊

router.get('/editTable4',articleCtrl.editTable4); //編輯table4 完成數量 


router.get('/PrintCutting',articleCtrl.PrintCutting);

router.post('/logo',articleCtrl.logo);  //派工單寫入logo
router.get('/nfcidNFCID',articleCtrl.nfcidNFCID); //用於驗證NFCID (QC code)
router.get('/NFCRegister',articleCtrl.NFCRegister);  //NFC註冊  // app用需要 get而不是post

router.post('/RemoveTable4',articleCtrl.RemoveTable4); //編輯table4 完成數量 
router.get('/RemoveTable4FromWorkorderNumber',articleCtrl.RemoveTable4FromWorkorderNumber); //編輯table4 完成數量 

router.post('/CreatePrinting',articleCtrl.CreatePrinting);  // 建立Printing的管理單
router.post('/UpdatePrintingTotal',articleCtrl.UpdatePrintingTotal); //修正Printing
router.get('/GetPrinting',articleCtrl.GetPrinting); //取得Printing
router.get('/GetPrintingItem',articleCtrl.GetPrintingItem); //透過製令單號取得Printing 部位
// router.post('/UpdatePrintingSection',articleCtrl.UpdatePrintingSection);  // 更換 Printing 部位  //不需要更換 但要新增
router.post('/UpdatePrintingPercent',articleCtrl.UpdatePrintingPercent);  // 修正 Printing 派工進度
router.post('/UpdatePrintingCompletePercent',articleCtrl.UpdatePrintingCompletePercent);

router.get('/UpdatePrintingCompletePercentx',articleCtrl.UpdatePrintingCompletePercentx);
router.get('/UpdateHighFrequencyCompletePercentx',articleCtrl.UpdateHighFrequencyCompletePercentx);

router.get('/GetPrintingTableList',articleCtrl.GetPrintingTableList);
router.post('/CreatePrintingTable',articleCtrl.CreatePrintingTable);  //新增Printing (剪裁的印刷工作)
router.get('/GetPrintingTable',articleCtrl.GetPrintingTable); //取得Printing
router.post('/UpdatePrintingTable',articleCtrl.UpdatePrintingTable); 

router.get('/GetPrintingTableSection',articleCtrl.GetPrintingTableSection); 
router.get('/GetPrintingTableSize',articleCtrl.GetPrintingTableSize); 
router.get('/GetPrintingTableSectionInfo',articleCtrl.GetPrintingTableSectionInfo); 


router.get('/GetPrintingTableInfo',articleCtrl.GetPrintingTableInfo);

router.get('/GetHighFrequencyTableInfo',articleCtrl.GetHighFrequencyTableInfo);

router.get('/GetHighFrequencyTableList',articleCtrl.GetHighFrequencyTableList);
router.post('/CreateHighFrequency',articleCtrl.CreateHighFrequency);   // 建立HighFrequency的管理單
router.post('/UpdateHighFrequencyTotal',articleCtrl.UpdateHighFrequencyTotal); //HighFrequency的派工
router.get('/GetHighFrequency',articleCtrl.GetHighFrequency); //取得HighFrequency
router.get('/GetHighFrequencyItem',articleCtrl.GetHighFrequencyItem); 
router.post('/UpdateHighFrequencySection',articleCtrl.UpdateHighFrequencySection); // 更換 HighFrequency 部位
router.post('/UpdateHighFrequencyPercent',articleCtrl.UpdateHighFrequencyPercent); // 修正 HighFrequency 派工進度
router.post('/UpdateHighFrequencyCompletePercent',articleCtrl.UpdateHighFrequencyCompletePercent); 

router.post('/CreateHighFrequencyTable',articleCtrl.CreateHighFrequencyTable);  //新增HighFrequency (HighFrequency部門)
router.get('/GetHighFrequencyTable',articleCtrl.GetHighFrequencyTable); //取得HighFrequency
router.post('/UpdateHighFrequencyTable',articleCtrl.UpdateHighFrequencyTable); //HighFrequency的派工


router.get('/ReturnPrintingTable',articleCtrl.ReturnPrintingTable);
router.get('/ReturnHighFrequencyTable',articleCtrl.ReturnHighFrequencyTable);


router.get('/QCCutting',articleCtrl.QCCutting); //QC 剪裁(Cutting)
router.get('/QCPrinting',articleCtrl.QCPrinting); //QC 印刷(Printing)
router.get('/QCHighFrequency',articleCtrl.QCHighFrequency); //QC 印刷(Printing)


router.post('/ReloadNFC',articleCtrl.ReloadNFC); //把NFC改成未使用


router.get('/InsterCuttingQC',articleCtrl.InsterCuttingQC); //新增 剪裁工作 QC
router.get('/FixCuttingQC',articleCtrl.FixCuttingQC); //更新 剪裁工作 QC
router.get('/UpdateCuttingQC',articleCtrl.UpdateCuttingQC); //編輯 剪裁工作 QC
router.get('/GetCuttingQC',articleCtrl.GetCuttingQC); //查詢 剪裁工作 QC
router.get('/GetCuttingQCSection',articleCtrl.GetCuttingQCSection); //查詢 剪裁工作 QC (選 部位)

router.get('/GetCuttingQCSectionPercent',articleCtrl.GetCuttingQCSectionPercent); //查詢 剪裁工作 QC (選 部位)

router.get('/GetCuttingQCPercent',articleCtrl.GetCuttingQCPercent); //查詢 剪裁工作 QC





router.get('/InsterPrintingQC',articleCtrl.InsterPrintingQC); //新增 印刷工作 QC
router.get('/UpdatePrintingQC',articleCtrl.UpdatePrintingQC); //新增 印刷工作 QC
router.get('/GetPrintingQC',articleCtrl.GetPrintingQC); //新增 印刷工作 QC

router.get('/InsterHighFrequencyQC',articleCtrl.InsterHighFrequencyQC); //新增 高周波工作 QC
router.get('/UpdateHighFrequencyQC',articleCtrl.UpdateHighFrequencyQC); //新增 高周波工作 QC
router.get('/GetHighFrequencyQC',articleCtrl.GetHighFrequencyQC); //新增 高周波工作 QC

router.post('/FixTable4Percent',articleCtrl.FixTable4Percent); // 修正Table4的完成總數量以及進度



router.get('/ReturnTable6Total',articleCtrl.ReturnTable6Total);
router.get('/ReturnCuttingQC',articleCtrl.ReturnCuttingQC);

router.get('/GetCuttingReportAmount',articleCtrl.GetCuttingReportAmount);
router.get('/GetPrintingReportAmount',articleCtrl.GetPrintingReportAmount);
router.get('/GetHighFrequencyReportAmount',articleCtrl.GetHighFrequencyReportAmount);


router.get('/GetPrintingQCPercent',articleCtrl.GetPrintingQCPercent); //取得印刷qc 百分比
router.get('/GetPrintingQCPercentSection',articleCtrl.GetPrintingQCPercentSection); //取得印刷qc 百分比

router.get('/GetHighFrequencyQCPercentSection',articleCtrl.GetHighFrequencyQCPercentSection); //取得印刷qc 百分比
router.get('/GetHighFrequencyQCPercent',articleCtrl.GetHighFrequencyQCPercent); //取得高周波qc 百分比

router.get('/GetModelID',articleCtrl.GetModelID);
router.get('/GetSizeID',articleCtrl.GetSizeID);
router.get('/ReturnShesLogo',articleCtrl.ReturnShesLogo);
router.get('/GetLogoInformation',articleCtrl.GetLogoInformation);

router.get('/GetPrintingQCSize',articleCtrl.GetPrintingQCSize);
router.get('/GetHighFrequencyQCSize',articleCtrl.GetHighFrequencyQCSize);

router.get('/ReturnExcelTime',articleCtrl.ReturnExcelTime);
router.get('/ReturnCuttingCompleteTime',articleCtrl.ReturnCuttingCompleteTime);
router.get('/ReturnPrintingCompleteTime',articleCtrl.ReturnPrintingCompleteTime);
router.get('/ReturnHighFrequencyCompleteTime',articleCtrl.ReturnHighFrequencyCompleteTime);

router.get('/GetNFCIDList',articleCtrl.GetNFCIDList);

router.get('/insertNFCID',articleCtrl.insertNFCID);
router.get('/CheckNFCIDList',articleCtrl.CheckNFCIDList);


router.get('/CheckNFCIDListSearch',articleCtrl.CheckNFCIDListSearch);

router.get('/GetPrintingPercent',articleCtrl.GetPrintingPercent);
router.get('/GetHighFrequencyPercent',articleCtrl.GetHighFrequencyPercent);


//cmd.html
router.get('/AddPunchIn',articleCtrl.AddPunchIn);

//針車
router.get('/postsewing',articleCtrl.postsewing);
//針車系統
router.get('/getsewingsystem',articleCtrl.getsewingsystem);
//用滑鼠選擇要分派的部位
router.get('/selectgetsewing',articleCtrl.selectgetsewing);
//針車修改資料
router.get('/UpdatesewingTable',articleCtrl.UpdatesewingTable);
//修改進度條
router.get('/UpdatesewingPercent',articleCtrl.UpdatesewingPercent);

//針車監控
router.get('/getsewingmonitor',articleCtrl.getsewingmonitor);
//針車裡的所有的值
router.get('/getsewingmonitor2',articleCtrl.getsewingmonitor2);

//針車組合的派工進度
router.get('/getsewingPercent',articleCtrl.getsewingPercent);

//針車系統的派工進度
router.get('/getsewingPercent1',articleCtrl.getsewingPercent1);

router.get('/GetsewingTable',articleCtrl.GetsewingTable); //取得sewing




//大底
router.get('/postoutsole',articleCtrl.postoutsole);
//大底系統
router.get('/getoutsolesystem',articleCtrl.getoutsolesystem);
//用滑鼠選擇要分派的部位
router.get('/selectgetoutsole',articleCtrl.selectgetoutsole);
//大底修改資料
router.get('/Updateoutsole',articleCtrl.Updateoutsole);
//大底監控
router.get('/getoutsolemonitor',articleCtrl.getoutsolemonitor);
//大底裡的所有的值
router.get('/getoutsolemonitor2',articleCtrl.getoutsolemonitor2);
// 建立outsole的管理單
router.post('/Createoutsole',articleCtrl.Createoutsole);

router.get('/getoutsolePercent',articleCtrl.getoutsolePercent); //check three file, name must all the same 
//抓outsole time
// router.get('/getoutsoletime',articleCtrl.getoutsoletime);

router.get('/postsewingoutsole',articleCtrl.postsewingoutsole);//抓Sewing outsole 的資料


//取得選完後尺寸數量API outsole and sewing
router.get('/selectgettable31',articleCtrl.selectgettable31);

module.exports = router;