let a;
allnum = 0;
var progress1 = 0;
/*
$.post('http://' + ip + '/api/postDB',function(data){
   a=data;}); 

   */



// 按鈕會觸發這個 判斷完之後才繼續執行
function click0(){
   document.getElementById('x').innerHTML = "";
   var elem = document.getElementById("myBar");
   var elem2 = document.getElementById("prlabel");
   var width = 0;
   elem.style.width = width + "%";
   elem2.innerHTML= "<br>";
   while(document.getElementById("data_save") != null){
      document.getElementById("data_save").remove();
   }
      

   


   var fileInput = $('#input').get(0).files[0];
   console.info(fileInput);
   if (fileInput) {
      readXlsxFile(input.files[0]).then(function (data) {
      

         t11 = data[0][17];
         $.get('http://' + ip + '/api/gettable1',function(data,status){
            var check = true;
            for (var i = 0; i < data.length; i++){
               console.log('data' + i + '--' + data[i].製令單號);
               console.log('button_t11 ' + t11);
               if (t11 == data[i].製令單號){
                  var content =
                     `
                        <div class="alert alert-danger alert-dismissible" role="alert">
                           <strong>
                           匯入失敗，無法匯入相同檔案。
                           </strong>
                           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        `;
      
                        $('#x').append(content);
                  check = false;
               }
            };
            if (check == true){
              click1();
            }
         });
      });


   };
}

var sizeList = [];
var amountlist = [];
var orderlistid;

function click1() {
   var fileInput = $('#input').get(0).files[0];
   console.info(fileInput);
   if (fileInput) {



      readXlsxFile(input.files[0]).then(function (data) {
      
         t11 = data[0][17];
         orderlistid = t11
            t12 = data[1][13];
            t13 = data[2][13];
            t14 = data[3][13];
            t15 = data[4][3];
            t16 = data[1][3];
            t17 = data[13][24];

            pix = data[1][22];
            var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
   
            console.log(pix);

            // //練習 '名稱':'?'
            // $.get('http://' + ip + '/api/Sumsewing', {'製令單號': 1, '部位名稱': 2, '尺寸': 3, 'LOGO': 4, '總數量': 5},function(data,status) {
            //    console.log('aaaa')
            // });
            $.post('http://' + ip + '/api/postDB', { '製令單號': t11, '型體編號': t12, '楦頭': t13, '大底': t14, '型體名稱': t15, 'logo': t16, '顏色': t17, '派工進度': 0, '上次編輯日期':time2,'完成狀態': 0,'完成總數量': 0}, function (res) {
   
            });

            $.post('http://' + ip + '/api/CreatePrinting', {'製令單號': t11, '型體編號': t12, 'LOGO': t16, '顏色': t17, '可支配數': 0, '完成雙數': 0,  '總數量': 0, '上傳時間':time2, '派工進度': 0, '完成狀態': 0}, function (res) {
   
            });
            $.post('http://' + ip + '/api/CreateHighFrequency', {'製令單號': t11, '型體編號': t12, 'LOGO': t16, '顏色': t17, '可支配數': 0, '完成雙數': 0,  '總數量': 0, '上傳時間':time2, '派工進度': 0, '完成狀態': 0}, function (res) {
   
            });

            $.get('http://' + ip + '/api/shoesinformation2',function(data,status){
               var check = true;
               for (var i = 0; i < data.length; i++){
                  if(t16 == data[i].品牌){
                     console.log("已存在 " + t16)
                     check = false;
                     break;
                  }
                  
               }

               setTimeout(() => {
                  if(check == true){
                     $.post('http://' + ip + '/api/inputlogo', {'品牌': t16}, function (data,status) {
                        console.log("新增 " + t16);
                     });
                  }
               }, 10)
               
               

            });
            
            
   
            /*$.post('http://' + ip + '/api/postDB6', { '製令單號': t11,'上傳日期':time2}, function (res) {
   
            });*/
   
   
            for (i = 14; i < data.length; i++) {
   
   
               t24 = data[i][1];
               t25 = data[i][3];
               t26 = data[2][17];
               t27 = data[i][15];
   
               // console.log(t24);
               // console.log(i);
   
   
               $.post('http://' + ip + '/api/postDB2', { '製令單號': t11, '型體編號': t12, '型體名稱': t15, '部位名稱': t24, '材料': t25, '本批數量全': t26, '單位': t27, '派工進度': 0 }, function (res) {
   
               });
               
               
               


               console.log(t26);
   
               
   
   
   
   
            }

            //大底
            for (var g = 56; g < data.length; g++) {
               for(var j = 1;j<18;j++){

                  k11 = data[0][17];
                  k13 = data[8][j];
                  k24 = data[g][1];
                  k28 = data[3][13];
                  //3 13 大底編號
                  k29 = data[5][13];
                  //5 13大底廠商
                  k30 = data[12][23];
                  // 12 25 顏色
                  k31 = data[11][j];
                  // 數量


                  k32 = data[g][15];
                  /*for(p=1;p<=10;p++){
                     k32 = data[54+p][15];
            
                  }   // data[x][y]   直行橫列   x = 橫列  y = 直行*/
                 
                  // $.get('http://' + ip + '/api/postoutsole', { '製令單號': k11,'派工編號': '','尺寸': k13,'大底廠商': k29, '大底編號': k28, '顏色': k30, '派工數量': k31,'原本數量': k31,'完工數量': 0, '完成狀態': 0 ,'部位名稱': k24,'單位':k32,'上傳時間':time2,'上次編輯日期':time2}, function (res) {
      
                  // });
               }
   
               

               // console.log(t24);
               // console.log(i);
   
   
               
               
               
               


               console.log(t26);
   
               
   
   
   
   
            }
            //針車
            for(o=14;o<=53;o++){
               for(h=1;h<18;h++){
               // 針車部位名稱
               a01 = data[o][1];
               // 針車LOGO
               a02 = data[1][3];
               // 針車尺寸
               a04 = data[8][h];
               //數量
               a05 = data[11][h];
               a11 = data[0][17];
               a12 = data[2][13];
               a32 = data[o][15];
               a33 = data[o][3];
               
               // $.get('http://' + ip + '/api/postsewing', { '製令單號': a11,'楦頭編號': a12,'尺寸': a04,'原本數量':a05,'派工數量': a05,'完工數量':'0','上傳時間': time2,'上次編輯時間': time2, '完成狀態': 0,'派工時間':0,'總數量':a05}, function (res) {
   
               // });
               
               
               }
               console.log(t26);
            }
            
            //sewing and outsole
            for(x=1;x<18;x++){

               b04 = data[8][x];
               //數量
               b05 = data[11][x];
               b11 = data[0][17];
               b12 = data[2][13];


               $.get('http://' + ip + '/api/postsewing', { '製令單號': b11,'楦頭編號': b12,'尺寸': b04,'原本數量':b05,'派工數量': b05,'完工數量':'0','上傳時間': time2,'上次編輯時間': time2, '完成狀態': 0,'派工時間':0,'總數量':b05}, function (res) {
   
               });

               $.get('http://' + ip + '/api/postoutsole', { '製令單號': b11,'楦頭編號': b12,'尺寸': b04,'原本數量':b05,'派工數量': b05,'完工數量':'0','上傳時間': time2,'上次編輯時間': time2, '完成狀態': 0,'派工時間':0,'總數量':b05}, function (res) {
   
               });

               console.log(t26);
            }

            for (i=1;i <26; i++){
               t32 = data[8][i];
               t35 = data[11][i];
               if (t35 == null) {
                  continue;
               }
               else {
                  // $.post('http://' + ip + '/api/CreatePrintingTable', { 'id': t11, 'size': t32, 'amount': t35, 'allamount': t35, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
                  // });

                  // $.post('http://' + ip + '/api/CreateHighFrequencyTable', { 'id': t11, 'size': t32, 'amount': t35, 'allamount': t35, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
                  // });


                  sizeList.push(t32)
                  amountlist.push(t35)
                     // INSERT INTO table7 (製令單號, 尺寸, 數量, 總數量, 列印狀態, 目前進度) values (?, ?, ?, ?, ?, ?)`,
                     //[insertValues.id, insertValues.size, insertValues.amount, insertValues.allamount, insertValues.time, insertValues.print, insertValues.percent
               }
            }
            for (i = 14; i < data.length; i++) {
   
               t24 = data[i][1];
   
               for (j = 1; j < 26; j++) {
   
   
                  t32 = data[8][j];
                  t35 = data[11][j];
                  if (t35 == null) {
                     continue;
                  }
                  else {
                     allnum += t35;
                     $.post('http://' + ip + '/api/postDB3', { '製令單號': t11, '尺寸': t32, '型體名稱': t15, '部位名稱': t24, '數量': t35 }, function (res) {
   
                     });
                     
   
                //     console.log(t32);
                //     console.log(t35);
   
                  }
   
   
                  // console.log(j);
   
               }
   
            }
            $.post('http://' + ip + '/api/updateschedulenum1', { '製令單號': t11, '總數量': allnum }, function (res) {
   
            });  // UPDATE table1 SET 總數量=? WHERE   製令單號 = ?
            
            allnum = allnum / (data.length-14);
   
            for (i = 14; i < 64; i++) {
   
   
               t24 = data[i][1];
          //     console.log(t24);
           //    console.log(i);
           
               $.post('http://' + ip + '/api/UpdatePrintingTotal', {'總數量': allnum, '製令單號': t11}, function (res) {
                     
               });

               $.post('http://' + ip + '/api/UpdateHighFrequencyTotal', {'總數量': allnum, '製令單號': t11}, function (res) {

               });
               $.post('http://' + ip + '/api/updateschedulenum', { '製令單號': t11, '部位名稱': t24, '總數量': allnum }, function (res) {
   
               }); // UPDATE table2 SET 總數量=? WHERE  部位名稱 = ? AND 製令單號 = ?

               $.post('http://' + ip + '/api/postDB66', { '製令單號': t11,'部位名稱': t24,'目前進度': 0,'總數量': allnum,'回報數量': 0}, function (res) {
   
            });
   
   
   
   
            }
   
   
         //   console.log(allnum);
   
   
   
            if (progress1 == 0) {
               progress1 = 1;
               var elem = document.getElementById("myBar");
               var elem2 = document.getElementById("prlabel");
               var width = 10;
   
               var id = setInterval(frame, 20);
               function frame() {
                  if (width >= 100) {
                     document.getElementById("tablelist").style.removeProperty("display");
                     getbuttonGroupdispatch(t11);
                     clearInterval(id);
                     progress1 = 0;
                     var content3 =
                        `
                        <div class="alert alert-success alert-dismissible" role="alert">
                           <strong>
                              匯入成功
                           </strong>
                           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        
   
                     `;
   
                     //document.getElementById('x').innerHTML = "";
                     
                     $('#x').append(content3);
   
                     var content4 =
   
   
                        `
                        <div class="d-flex justify-content-end">
                           <a href="OrderList.html" style="text-decoration:none;">
                              <button type="button" class="btn btn-outline-dark" style="margin-top: 20px;">製令單管理</button>
                           </a>
                           
                              <a id="printingarea">
                              <button type="button" class="btn btn-outline-dark" style="margin-top: 20px; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#printing${orderlistid}" id = "printingbutton">選擇印刷部位</button>
                              </a>
                              <div class="modal fade" id="printing${orderlistid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div class="modal-content">
                                       <div class="modal-header">
                                             <h4><strong>選擇印刷部位</strong></h4>
                                             <div class="text-right">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                             </div>
                                       </div>
                                       <div class="modal-body">
                                             <div id="printingmodaldata${orderlistid}">
                                                
                                             </div>
                                       </div>
                                       <div class="modal-footer">
                                             <button type="button" class="btn btn-outline-success" id="${orderlistid}" onclick="PrintingSection(this.id)" data-bs-dismiss="modal">確認提交</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <a id="highfrequencyarea">
                              <button type="button" class="btn btn-outline-dark" style="margin-top: 20px; margin-left: 10px;" data-bs-toggle="modal" data-bs-target="#highfrequency${orderlistid}" id = "highfrequencybutton">選擇高周波部位</button>
                              </a>

                              <div class="modal fade" id="highfrequency${orderlistid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog modal-lg modal-dialog-scrollable">
                                    <div class="modal-content">
                                       <div class="modal-header">
                                             <h4><strong>選擇高周波部位</strong></h4>
                                             <div class="text-right">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                             </div>
                                       </div>
                                       <div class="modal-body">
                                             <div id="highfrequencymodaldata${orderlistid}">
                                                
                                             </div>
                                       </div>
                                       <div class="modal-footer">
                                             <button type="button" class="btn btn-outline-success" id="${orderlistid}" onclick="highfrequencySection(this.id)" data-bs-dismiss="modal">確認提交</button>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                           <button type="button" class="btn btn-outline-danger" style="margin-top: 20px;margin-left: 10px;" onclick="location.reload();">匯入下筆製令單</button>
                        </div>
                  `;
   
                     document.getElementById('into').innerHTML = "";
   
                     $('#into').append(content4);
   
                     CreateModal(orderlistid)
                     
                  } else {
                     width++;
                     elem.style.width = width + "%";
                     elem2.innerText=width+"%";
                     
                  
            
                  }
   
   
   
   
   
   
               }
            }
         








      });


      /*
   var input = document.getElementById('input');
   input.addEventListener('change', function() {
     readXlsxFile(input.files[0]).then(function(data){
       console.log(data);


     });

   });
   */

   } else {

      var content3 =
         `
         <div class="alert alert-danger alert-dismissible" role="alert">
            <strong>
            匯入失敗!
            </strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
   `;


      document.getElementById("x").innerHTML = "";


      $('#x').append(content3);


   }






}

async function CreateModal(orderlistid){
   $.get('http://' + ip + '/api/getTable1Info', {'orderNumber': orderlistid}, function (data,status) {
      console.log(data)
      var modaldata = 
      `
      <div class="container">
         <div class="row" style="margin-top: 5px;">
            <div class="col-8">
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">製令單號：&nbsp;${data[0].製令單號}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">&nbsp;</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">型體編號：&nbsp;${data[0].型體編號}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">型體名稱：&nbsp;${data[0].型體名稱}</div>
            </div>
            <div class="col-4" >
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">楦頭：&nbsp;${data[0].楦頭}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">大底：&nbsp;${data[0].大底}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">配色：&nbsp;${data[0].顏色}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">LOGO：&nbsp;${data[0].logo}</div>
            </div>
         </div>
         <table class="table table-bordered">
            <thead style="background-color: #EDEDED;">
                  <tr>
                     <th scope="col" style="width: 35%;">部位名稱</th>
                     <th scope="col" style="width: 65%;">材料</th>
                  </tr>
            </thead>
            <tbody style="background-color: #F7F7F7;" id="printingdatas${data[0].製令單號}">
            
            
            </tbody>
         </table>
      </div>
      `;
      $('#printingmodaldata' + data[0].製令單號).append(modaldata);

      var modaldata1 = 
      `
      <div class="container">
         <div class="row" style="margin-top: 5px;">
            <div class="col-8">
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">製令單號：&nbsp;${data[0].製令單號}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">&nbsp;</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">型體編號：&nbsp;${data[0].型體編號}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">型體名稱：&nbsp;${data[0].型體名稱}</div>
            </div>
            <div class="col-4" >
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">楦頭：&nbsp;${data[0].楦頭}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">大底：&nbsp;${data[0].大底}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">配色：&nbsp;${data[0].顏色}</div>
                  <div class="p-2 bd-highlight" style="padding: 0%!important;">LOGO：&nbsp;${data[0].logo}</div>
            </div>
         </div>
         <table class="table table-bordered">
            <thead style="background-color: #EDEDED;">
                  <tr>
                     <th scope="col" style="width: 35%;">部位名稱</th>
                     <th scope="col" style="width: 65%;">材料</th>
                  </tr>
            </thead>
            <tbody style="background-color: #F7F7F7;" id="highfrequencydatas${data[0].製令單號}">
            
            
            </tbody>
         </table>
      </div>
      `;

      $('#highfrequencymodaldata' + data[0].製令單號).append(modaldata1);
   })
   
   await Modal2();
}

async function Modal2(){
   await $.get('http://' + ip + '/api/gettable2?s=' + orderlistid, function (data, status) {
      console.log(data)
      for (var j = 0; j < data.length; j++) {
         datas(data[j]);
      }
   });
}

async function PrintingSection(id){
   var obj = document.getElementsByName("printingsection" + id);
   var selected=[];
   for (var i=0; i<obj.length; i++) {
      if (obj[i].checked) {
          selected.push(obj[i].value);
        }
    }
   console.log(sizeList)
   console.log(amountlist)
   


   if (confirm("是否確認印刷工作內容派工?\n選擇的部位: " + selected) == true) {

      for(var i = 0; i < selected.length; i++){
         for(var j = 0; j < sizeList.length; j++){
            console.log("派工單編號: " + orderlistid + " 部位:" + selected[i] + "  尺寸:" + sizeList[j] + " 數量:" + amountlist[j])

            await PrintingSectionInput(orderlistid, selected[i], sizeList[j], amountlist[j])
         }
      }

      document.getElementById("printingbutton").classList.remove('btn-outline-dark');
      document.getElementById("printingbutton").classList.add('btn-dark');
      document.getElementById("printingbutton").setAttribute("disabled", "disabled");
      document.getElementById("printingarea").style.cursor = "not-allowed";

   }
}

async function PrintingSectionInput(orderNumber, section, size, amount){
   await $.post('http://' + ip + '/api/CreatePrintingTable', { 'id': orderNumber, 'section': section, 'size': size, 'amount': amount, 'allamount': amount, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
   });
}

                  // $.post('http://' + ip + '/api/CreateHighFrequencyTable', { 'id': t11, 'size': t32, 'amount': t35, 'allamount': t35, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
                  // });
async function highfrequencySection(id){
   var obj = document.getElementsByName("highfrequencysection" + id);
   var selected=[];
   for (var i=0; i<obj.length; i++) {
      if (obj[i].checked) {
          selected.push(obj[i].value);
        }
    }
   
    if (confirm("是否確認高周波工作內容派工?\n選擇的部位: " + selected) == true) {
      for(var i = 0; i < selected.length; i++){
         for(var j = 0; j < sizeList.length; j++){
            console.log("派工單編號: " + orderlistid + " 部位:" + selected[i] + "  尺寸:" + sizeList[j] + " 數量:" + amountlist[j])
            
            await HighFrequencySectionInput(orderlistid, selected[i], sizeList[j], amountlist[j])
         }
      }
      
      document.getElementById("highfrequencybutton").classList.remove('btn-outline-dark');
      document.getElementById("highfrequencybutton").classList.add('btn-dark');
      document.getElementById("highfrequencybutton").setAttribute("disabled", "disabled");
      document.getElementById("highfrequencyarea").style.cursor = "not-allowed";
   }

}

async function HighFrequencySectionInput(orderNumber, section, size, amount){
   await $.post('http://' + ip + '/api/CreateHighFrequencyTable', { 'id': orderNumber, 'section': section, 'size': size, 'amount': amount, 'allamount': amount, 'print': '尚未列印', 'percent': 0,}, function (res) {

   });
}

function datas(data){
   var content=
   `
   <tr>
       <td>
       <input class="form-check-input" type="checkbox" name="printingsection${data.製令單號}" value="${data.部位名稱}">
       ${data.部位名稱}
       </td>
       <td>${data.材料}</td>
     </tr>
   `
   $('#printingdatas' + data.製令單號).append(content);

   var content1=
   `
   <tr>
       <td>
       <input class="form-check-input" type="checkbox" name="highfrequencysection${data.製令單號}" value="${data.部位名稱}">
       ${data.部位名稱}
       </td>
       <td>${data.材料}</td>
     </tr>
   `
   $('#highfrequencydatas' + data.製令單號).append(content1);
}


function getGroupdispatchList(data) {
   var status = (data.status) ? "checked" : "";
   var titleClass = (data.status) ? "title2" : "title";
   var messageClass = (data.status) ? "message2" : "message";
   var editClass = (data.status) ? "none" : "inline";

   // <tr class="datastore"> 用於清空顯示欄
   var content =
      `
         <tr id="data_save">
                   
                       <td style="width: 10%;">
                           <div class="form-check" style="padding-left:0%">
                              
                               <label class="form-check-label" for="flexRadioDefault1">
                                   ${data.部位名稱}
                               </label>
                           </div>
                           
                       </td>
                       <td style="width: 15%;">${data.型體名稱}</td>
                       <td style="width: 25%;">${data.材料}</td>
                       <td style="width: 10%; ">${data.本批數量全}</td>
                       <td style="width: 5%;">${data.單位}</td>
                    
                    
                      
                     

         </tr>
   `;

   $('#exceltable').append(content);





}

function getbuttonGroupdispatch(no) { //顯示內容  就是這裡 no會等於製令單號



   var s = 'http://' + ip + '/api/gettable2?s=' + no;


   $.get(s, function (data, status) {

      for (var i = 0; i < data.length; i++) {
         getGroupdispatchList(data[i]);

      }

   });


}

/*
 for (var i=1;i>a;){
if (i >a){
continue;
}
else {
let b = [0][0];
console.log(b);
}};
*/

Date.prototype.format = function(fmt) { 
   var o = { 
      "M+" : this.getMonth()+1,                 //月份 
      "d+" : this.getDate(),                    //日 
      "h+" : this.getHours(),                   //小时 
      "m+" : this.getMinutes(),                 //分 
      "s+" : this.getSeconds(),                 //秒 
      "q+" : Math.floor((this.getMonth()+3)/3), //季度 
      "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
   for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
       }
   }
  return fmt; 
}   