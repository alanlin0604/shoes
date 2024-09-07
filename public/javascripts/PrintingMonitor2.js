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

function size(size, qty){
    new Chart("myCharts", {
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
                    text: '已完成數量',
                    font: {
                        size: 18
                    }
                }
            }
        }
    }
  });
}

function information(rid){
    $.get('http://' + ip + '/api/GetPrintingItem', {'rid': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
            var content = 
            `
            <div class="row" style="margin-left: 50px;margin-top:8px;font-size: 20px;text-align: center;">
                <div class="col-2"><strong>製令單號：${data[0].製令單號}</strong></div>
                <div class="col-2"><strong>部位：${data[0].部位}</strong></div>
                <div class="col-2"><strong>工作內容：印刷</strong></div>
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
    Days()
  },150)
    
});

function PercentReload(){
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