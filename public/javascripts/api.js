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

function click1() {
   var fileInput = $('#input').get(0).files[0];
   console.info(fileInput);
   if (fileInput) {



      readXlsxFile(input.files[0]).then(function (data) {
      

         t11 = data[0][17];
            t12 = data[1][13];
            t13 = data[2][13];
            t14 = data[3][13];
            t15 = data[4][3];
            t16 = data[1][3];
            t17 = data[13][24];
            // for(p=54;p<=63;p++){
            //    t18 = data[p][1];
            // }

            pix = data[1][22];
            var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
   
            console.log(pix);
             

            $.post('http://' + ip + '/api/postDB', { '製令單號': t11, '型體編號': t12, '楦頭': t13, '大底': t14, '型體名稱': t15, 'logo': t16, '顏色': t17, '派工進度': 0, '上次編輯日期':time2,'完成狀態': 0,'完成總數量': 0}, function (res) {
   
            });

            $.post('http://' + ip + '/api/CreatePrinting', {'製令單號': t11, '型體編號': t12, '部位': "鞋身", 'LOGO': t16, '顏色': t17, '可支配數': 0, '完成雙數': 0,  '總數量': 0, '上傳時間':time2, '派工進度': 0, '完成狀態': 0}, function (res) {
   
            });
            $.post('http://' + ip + '/api/CreateHighFrequency', {'製令單號': t11, '型體編號': t12, '部位': t18, 'LOGO': t16, '顏色': t17, '可支配數': 0, '完成雙數': 0,  '總數量': 0, '上傳時間':time2, '派工進度': 0, '完成狀態': 0}, function (res) {
   
            });
            // //outsole
            // $.post('http://' + ip + '/api/Createoutsole', {'製令單號': t11, '型體編號': t12, '部位': "鞋身", 'LOGO': t16, '顏色': t17, '可支配數': 0, '完成雙數': 0,  '總數量': 0, '上傳時間':time2, '派工進度': 0, '完成狀態': 0}, function (res) {
   
            // });
           

            

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



            for (i=1;i <26; i++){
               t32 = data[8][i];
               t35 = data[11][i];
               if (t35 == null) {
                  continue;
               }
               else {
                  $.post('http://' + ip + '/api/CreatePrintingTable', { 'id': t11, 'size': t32, 'amount': t35, 'allamount': t35, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
                  });

                  $.post('http://' + ip + '/api/CreateHighFrequencyTable', { 'id': t11, 'size': t32, 'amount': t35, 'allamount': t35, 'print': '尚未列印', 'percent': 0,}, function (res) {
                  
                  });
                     // INSERT INTO table7 (製令單號, 尺寸, 數量, 總數量, 列印狀態, 目前進度) values (?, ?, ?, ?, ?, ?)`,
                     //[insertValues.id, insertValues.size, insertValues.amount, insertValues.allamount, insertValues.time, insertValues.print, insertValues.percent
               }
            }
            //outsole
            for (i = 14; i < data.length; i++) {
   
               t24 = data[i][1];
   
               for (j = 1; j < 26; j++) {
   
   
                  t32 = data[8][j];
                  t35 = data[11][j];
                  t36 = data[39+j][15];
                  if (t35 == null) {
                     continue;
                  }
                  else {
                     allnum += t35;
                     $.post('http://' + ip + '/api/postDB3', { '製令單號': t11, '尺寸': t32, '型體名稱': t15, '部位名稱': t24, '數量': t35}, function (res) {
   
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
                           <a href="CuttingDispatch.html" style="text-decoration:none;">
                              <button type="button" class="btn btn-outline-dark" style="margin-top: 20px; margin-left: 10px;">進入派工畫面</button>
                           </a>
                           <button type="button" class="btn btn-outline-danger" style="margin-top: 20px;margin-left: 10px;" onclick="location.reload();">匯入下筆製令單</button>
                        </div>
                  `;
   
                     document.getElementById('into').innerHTML = "";
   
                     $('#into').append(content4);
   
   
   
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