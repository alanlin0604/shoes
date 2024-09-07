var url = location.search;
var rid;
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    //console.log(str);
    // str.split("=")[0] 為 userID
    rid = str.split("=")[1];
}
if (rid == undefined) {
    rid = '';
}
    //console.log(rid);

var mychart;
/*
function Days(){
  
  

  $.get('http://' + ip + '/api/GetPrintingTable', {'rid': rid}, function (data,status) {
    
    var DateValues = [];
    var SizeValues = [];
    var QTYValues = [];
    for(var i = 0;i < data.length; i++){
      var DateData = new Date(data[i].派工時間).format("MM月dd日");
      DateValues.push(DateData);
      SizeValues.push(parseFloat(parseFloat(data[i].尺寸).toFixed(1)));
      QTYValues.push(parseInt(data[i].完成數量))
    }

    setTimeout(() =>{


      // 将 arr 和 test 打包成对象数组
      const combinedArr = SizeValues.map((value, index) => ({ value, QTYValues: QTYValues[index] }));

      // 对对象数组按照 value 属性排序
      combinedArr.sort((a, b) => (a.value > b.value ? 1 : -1));

      // 解包回数组
      const sortedArr = combinedArr.map((obj) => obj.value);
      const sortedTest = combinedArr.map((obj) => obj.QTYValues);

      console.log(sortedArr);
      console.log(sortedTest);



      console.log(SizeValues)
      DateValues = Array.from(new Set(DateValues));  // 移除重複的

      DateValues.sort(function(a, b) {
        return a > b ? 1 : -1
      })  // 重新排列

      var DayProduct = [];  // 每日總數量
      var AllProduct = [];  // 每日完成數量
      var DayPercent = []; //每日的完成百分比
      var AllPercent = []; // 全部百分比
      var temp = 0;
      for(var i = 0; i < DateValues.length; i ++){
        DayProduct[i] = 0;
        AllProduct[i] = 0;
        DayPercent[i] = 0;
        AllPercent[i] = 0;
      }  // 用於歸零陣列

      for(var i = 0;i < data.length; i++){
        var DateData = new Date(data[i].派工時間).format("MM月dd日");
        console.log(DateValues.length)
        for(var j = 0; j < DateValues.length; j ++){
          if(DateData == DateValues[j]){
            temp += parseInt(data[i].總數量);
            DayProduct[j] = parseInt(DayProduct[j]) + parseInt(data[i].總數量); // 計算出每日的總數量
            AllProduct[j] = parseInt(AllProduct[j]) + parseInt(data[i].完成數量); // 計算出每日的完成量
          } // 判斷日期相同就加總在一起
        }
      }

      for(var i = 0;i < DayProduct.length; i ++){
        DayPercent[i] = parseFloat((AllProduct[i] / DayProduct[i])*100).toFixed(1);
        if(i == 0){
          AllPercent[i] = parseFloat(((AllProduct[i] / temp)*100).toFixed(1));
          AllProduct[i] = parseInt(AllProduct[i]);
        }else{
          AllPercent[i] = parseFloat(AllPercent[i-1].toFixed(1)) + parseFloat(((AllProduct[i] / temp)*100).toFixed(1));
          AllProduct[i] = parseInt(AllProduct[i-1]) + parseInt(AllProduct[i]);
        }
        ;
      }
      total(DateValues, DayProduct, AllProduct, DayPercent, AllPercent);
      //DateValues 日期資料
      //DayProduct 每日的總數量
      //AllProduct 每日的完成量
      //DayPercent 每日的總數量(百分比)
      //AllPercent 每日的完成量(百分比)
      size(sortedArr, sortedTest)
    },100)

    

  })
  
    
  
  
}*/

var sectionlist = [];

async function Section(){
  $.get('http://' + ip + '/api/UpdatePrintingCompletePercentx', {'rid': rid}, function (data,status) {
  })

  console.log(sectionlist)

  var sizeArray = [];
  var qtyArray = [];
  
  for(var i = 0; i < sectionlist.length; i++){


    $.get('http://' + ip + '/api/GetPrintingPercent', {'rid': rid, 'section': sectionlist[i]}, function (data,status) {
      getList(rid, data[0].部位, data[0].進度)
    })
    

    var sections = 
    `
      <option value="${sectionlist[i]}">${sectionlist[i]}</option>
    `
    $('#sectionselect').append(sections);
    
  }

  setTimeout(() => {
    $.get('http://' + ip + '/api/GetPrintingTableSectionInfo', {'rid': rid, 'section': sectionlist[0]}, function (data,status) {
        for (var i = 0;i < data.length; i++){
          sizeArray.push(data[i].尺寸)
          if (data[i].完成數量 == null){
            qtyArray.push(0)
          }else{
            qtyArray.push((parseFloat(data[i].完成數量/data[i].總數量)*100).toFixed(1))
          }
        }
      })

    
  }, 100)

  setTimeout(() => {
    sizes(sizeArray, qtyArray)
  }, 150)
}

async function getList(rid, section, percent) {
  console.log(section, percent);
  if (percent == null) {
    var content =
    `
    <tr>
      <td style="width: 15%;">${rid}</td>
      <td style="width:  15%;">${section}</td>
      
      <td style="width:  30%;">
            <div class="container">
              <div class="row">
                <div class="col-sm-11" style="padding-left:0px">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                
                <div class="col-sm-1" style="font-size:10px;padding-left:0px;">0%</div>
              </div>
            </div>
          </td>

      <td style="width: 30%; text-align: center;">
        <button type="button" class="btn btn-dark" style="width:100px;" disabled>詳細資訊</button>
      </td>
    </tr>
        `;
      $('#exceltable').append(content);


  }
  else {
      var content =
      `
        <tr>
          <td style="width: 15%;">${rid}</td>
          <td style="width:  15%;">${section}</td>

          <td style="width:  30%;">
            <div class="container">
              <div class="row">
                <div class="col-sm-11" style="padding-left:0px">
                  <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                
                <div class="col-sm-1" style="font-size:10px;padding-left:0px;">${percent}%</div>
              </div>
            </div>
          </td>

          <td style="width:  30%; text-align: center;">
            <button type="button" class="btn btn-outline-dark" id="nfcbutton${section}" data-bs-toggle="modal" data-bs-target="#NFC${section}">詳細資訊</button>

            <div class="modal fade" id="NFC${section}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-scrollablemodal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4><strong>${section} 詳細資訊</strong></h4>
                    <div class="text-right">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                  </div>

                  <div class="modal-body">
                    <table class="table">
                      <thead style="background-color: #EDEDED;">
                        <tr>
                          <th scope="col" style="text-align: center;">製令單號</th>
                          <th scope="col" style="text-align: center;">部位名稱</th>
                          <th scope="col" style="text-align: center;">尺寸</th>
                          <th scope="col" style="text-align: center;">數量</th>
                          <th scope="col" style="text-align: center;">完成數量</th>
                          <th scope="col" style="text-align: center;">目前進度</th>
                        </tr>
                      </thead>

                      <tbody style="background-color: #F7F7F7;" id="NFCDATA${section}">
                    
                      </tbody>
                      
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </td>
        </tr>

        
      `;
      $('#exceltable').append(content);

  }

  await SectionInformation(section)

}

async function SectionInformation(section){

  $.get('http://' + ip + '/api/GetPrintingTableSectionInfo', {'rid': rid, 'section': section},function (data, status) {
      for(var i = 0; i < data.length; i++){
        var amount = data[i].完成數量;
        if(amount == null){
          amount = 0
        }
        var content3 =
        `
        <tr>
          <td style="text-align: center;">${data[i].製令單號}</td>
          <td style="text-align: center;">${data[i].部位}</td>
          <td style="text-align: center;">${data[i].尺寸}</td>
          <td style="text-align: center;">${data[i].總數量}</td>
          <td style="text-align: center;">${amount}</td>
          <td style="text-align: center;">
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width:${data[i].目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${data[i].目前進度}%</div>
            </div>
          </td>
        </tr>
        `;
      $('#NFCDATA' + section).append(content3);
      }
  })
  
}


function total(DateValues, DayProduct, AllProduct, DayPercent, AllPercent){
  console.log(DateValues)
    // 百分比
    var BarValues = DayPercent;
    var LineValues = AllPercent;

    //數量
    // var BarValues = DayProduct;
    // var LineValues = AllProduct;
    
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: DateValues,
        datasets: [{
        type: 'bar',
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
          barThickness: 50,
          label: '每日完成量(百分比)',
          data: BarValues
        }, {
          type: 'line',
          label: '總產量(百分比)',
          data: LineValues
        }]
      },options:{
        scales: {
            x: {
                title: {
                    display: true,
                    text: "每天日期",
                    font: {
                        size: 18
                    }
                },
            },
            y: {
                max: 100,
                min: 0,
                title: {
                    display: true,
                    text: '目前進度',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
});

}


function sizes(size, qty){
  mychart = new Chart("myCharts", {
      type: 'bar',
      data: {
        labels: size,
        datasets: [{
        type: 'bar',
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
          label: '尺寸完成數',
          data: qty
        }]
      },options:{
        scales: {
            x: {
                title: {
                    display: true,
                    text: "尺寸",
                    font: {
                        size: 18
                    }
                },
            },
            y: {
                title: {
                    display: true,
                    text: '已完成進度',
                    font: {
                        size: 18
                    },
                },
                
                beginAtZero: true,
                suggestedMax: 100, // 設定最大值
                
            }
        }
    }
  });
}

async function Select(section){
  var size = [];
  var qty = [];
  await $.get('http://' + ip + '/api/GetPrintingTableSectionInfo', {'rid': rid, 'section': section}, function (data,status) {
    for (var i = 0;i < data.length; i++){
      size.push(data[i].尺寸)
      if (data[i].完成數量 == null){
        qty.push(0)
      }else{
        qty.push((parseFloat(data[i].完成數量/data[i].總數量)*100).toFixed(1))
      }
    }
  })

  await mychart.destroy();
  await sizes(size, qty)
}



function information(rid){
    

    $.get('http://' + ip + '/api/GetPrintingItem', {'rid': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
            var content = 
            `
            <div class="row" style="margin-left: 50px;margin-top:8px;font-size: 19px;text-align: center;">
                <div class="col-2"><strong>製令單號：${data[0].製令單號}</strong></div>
                <div class="col-2"><strong>工作內容：印刷</strong></div>
                <div class="col-1"><strong>完成進度:</strong></div>
                <div class="col-5">
                    <div class="progress" style="margin-top: 3px;">
                        <div class="progress-bar" role="progressbar" style="width: ${data[0].完成狀態}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="col-1" style="font-size:15px;padding-left:0px; text-align: start;">${data[0].完成狀態}%</div>
            </div>
            `;
        }
        $('#information').append(content);
    });
    
    
}
$(document).ready(function() {
  PercentReload();
  setTimeout(() => {
    information(rid);
    //Days()
    Section()
  },150)
    
});

function PercentReload(){
  $.get('http://' + ip + '/api/GetPrintingTableSection', {'rid': rid}, function (data,status) {
      for(var i = 0; i < data.length; i++){
        sectionlist.push(data[i].部位)
      }
  })
  var total = 0;
  var sum = 0;
  $.get('http://' + ip + '/api/GetPrintingTable', {'rid': rid}, function (data,status) {
    for(var i = 0;i<data.length;i++){
      if (data[i].完成數量 != null) total += parseInt(data[i].完成數量);
      sum += parseInt(data[i].總數量);
    }
  })

  setTimeout(() => {
    sum = ((total/sum)*100).toFixed(0);
    console.log(sum)
    $.post('http://' + ip + '/api/UpdatePrintingCompletePercent', { '完成狀態': sum, '製令單號': rid}, function (res) {
    
    });
  },100)
  
}

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1,                 //月份 
      "d+": this.getDate(),                    //日 
      "h+": this.getHours(),                   //小时 
      "m+": this.getMinutes(),                 //分 
      "s+": this.getSeconds(),                 //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}