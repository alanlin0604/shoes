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

var myChart, myChart2, myChart3;
$(document).ready(function() {
    // loading();
});

var HighFrequencySelectID = 'HotPress';

// select 選擇
async function Select(value){
  await myChart2.destroy();

  switch(states){
    case 'Cutting':
      await CuttingYield(value);
      break
    case 'Printing':
      await PrintingYieldData(value)
      break
    case 'HighFrequency':
      await HighFrequencyYieldData(value)
      break
  }
  
}
// 網站重新整理時
var states = 'Cutting';

async function preView(){
  var section = [];
  var percent = [];
  // document.getElementById('Informationbutton').hidden = true;

  document.getElementById('sectionselect').innerHTML = "";

  $.get('http://' + ip + '/api/getDB6', {'a': rid}, function (data,status) {
    for(var i = 0; i < data.length; i++){
      $.get('http://' + ip + '/api/FixCuttingQC', {'製令單號': rid, '部位名稱': data[i].部位名稱}, function (data,status) {
    
      })
    }
  })
  setTimeout(() => {
    $.get('http://' + ip + '/api/getDB6', {'a': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
        
          section.push(data[i].部位名稱)
            $.get('http://' + ip + '/api/GetCuttingQCSectionPercent', {'製令單號': rid, '部位名稱': data[i].部位名稱}, function (datas,status) {
              percent.push(datas[0].來料問題)
            })

          var sections = 
          `
            <option value="${data[i].部位名稱}">${data[i].部位名稱}</option>
          `
          $('#sectionselect').append(sections);
        }
      })
  }, 100)
  
  
  setTimeout(() => {
    CuttingMonitor(section, percent);
  }, 200)

  await CuttingYield('鞋身');
}
//----------------------------------------------------------------
async function CuttingButton(){
  // document.getElementById('Informationbutton').hidden = true;


  states = 'Cutting';
  document.getElementsByClassName('button-select')[0].className = "col-4 h-100";
  document.getElementById('CuttingButton').classList.add('button-select');
  myChart.destroy();
  myChart2.destroy();
  myChart3.destroy();
  document.getElementById('sectionselect').innerHTML = "";
  document.getElementById('sectionselect').disabled = false;

  await $.get('http://' + ip + '/api/getDB6', {'a': rid}, function (data,status) {
    for(var i = 0; i < data.length; i++){
      $.get('http://' + ip + '/api/FixCuttingQC', {'製令單號': rid, '部位名稱': data[i].部位名稱}, function (data,status) {
    
      })
    }
  })
  await CuttingData();
}
async function CuttingData() {
  
  var section = [];
  var percent = [];

  setTimeout(() => {
    $.get('http://' + ip + '/api/getDB6', {'a': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
        
          section.push(data[i].部位名稱)
            $.get('http://' + ip + '/api/GetCuttingQCSectionPercent', {'製令單號': rid, '部位名稱': data[i].部位名稱}, function (datas,status) {
              percent.push(datas[0].來料問題)
            })

          var sections = 
          `
            <option value="${data[i].部位名稱}">${data[i].部位名稱}</option>
          `
          $('#sectionselect').append(sections);
        }
      })
  }, 100)
  
  
  setTimeout(() => {
    CuttingMonitor(section, percent);
  }, 200)

  await CuttingYield('鞋身');
}


function CuttingMonitor(section, percent){
  var ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
      type: 'bar',

      data: {
          labels: section,
          datasets: [{
              label: '各部位品質檢驗圖表',
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1,
              data: percent
          }]
      },
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: "部位名稱",
                      font: {
                          size: 18
                      }
                  },
              },
              y: {
                beginAtZero: true,
                suggestedMax: 15,
                  title: {
                      display: true,
                      text: '不良數',
                      font: {
                          size: 18
                      }
                  }
              }
          }
      }
  });
}


function CuttingYield(section){
  var newdata = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']
  var qty = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  SizeValues = []
  QTYValues = []
  $.get('http://' + ip + '/api/GetCuttingQCSection', {'製令單號': rid, '部位名稱': section}, function (data,status) {
    
    console.log(data)
    for(var i=0;i<data.length;i++){
      
      SizeValues.push(parseFloat(parseFloat(data[i].尺寸).toFixed(1)));
      QTYValues.push(parseFloat(data[i].來料問題))
      console.log("Size" + SizeValues + " " + i)
      console.log("QTY" + QTYValues)
    }

    for(var i=0;i<SizeValues.length;i++){
      qty[newdata.indexOf(SizeValues[i].toString())] = QTYValues[i]
      console.log(qty)
    }
  })

  setTimeout(() => {
    var ctx = document.getElementById('myChart2');
      myChart2 = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: newdata,
            datasets: [{
              backgroundColor: ['rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)'],
              label: '來料是否有問題',
              data: qty,
              borderWidth: 1,
              barThickness: 30
            }]
          },options:{
            scales: {
              x: {
                  title: {
                      display: true,
                      text: '尺寸',
                      font: {
                          size: 18
                      }
                  }
              },
              y: {
                beginAtZero: true,
                suggestedMax: 15,
                  title: {
                      display: true,
                      text: '不良數',
                      font: {
                          size: 18
                      }
                  }
              }
            }
            }
        
      });
  }, 150)

  var CuttingQCPercent = []
  $.get('http://' + ip + '/api/GetCuttingQCPercent', {'製令單號': rid}, function (data,status) {
    if (data[0].不良率 != null){
      CuttingQCPercent.push(data[0].不良率)
      CuttingQCPercent.push(100-data[0].不良率)
    }else{
      CuttingQCPercent.push(0)
      CuttingQCPercent.push(100)
    }
    
    
    console.log(CuttingQCPercent)
    document.getElementById("DoughNutPercent").innerText = CuttingQCPercent[0] + "%"
  })
  setTimeout(() => {
    myChart3 = new Chart("myChart3", {
        type: "doughnut",
        data: {
          labels: ['剪裁工作不良率'],
          datasets: [{
            backgroundColor: ['rgb(15, 181, 174, 1)', 'rgb(245, 242, 242)'],
            data: CuttingQCPercent,
          hoverOffset: 3
          }]
        },
        options: {      
          cutout: 135
        }
      });
  }, 150)
  

  
}


















































//----------------------------------------------------------------

async function PrintingButton(){
  // document.getElementById('Informationbutton').hidden = false;

  states = 'Printing';

  document.getElementsByClassName('button-select')[0].className = "col-4 h-100";
  document.getElementById('PrintingButton').classList.add('button-select');
  document.getElementById('sectionselect').innerHTML = "";
  $.get('http://' + ip + '/api/GetPrintingTableSection', {'rid': rid}, function (data,status) {
    // document.getElementById('sectionselect').disabled = true
    for(var i = 0; i <data.length; i++){
      var sections = 
      `
        <option value="${data[i].部位}">${data[i].部位}</option>
      `
      $('#sectionselect').append(sections);
    }
    
  })
  await PrintingYield();
  await PrintingData();
}

async function PrintingData() {
  // 刪除當前的圖表

  myChart.destroy();
  myChart2.destroy();
  myChart3.destroy();
  var section = [];
  var percent = [];

  // 重新繪製圖表
  await PrintingYield();
}

function PrintingYield(){
  var ctx = document.getElementById('myChart');
  var ctx2 = document.getElementById('myChart2');
  var ctx3 = document.getElementById('myChart3');

  // var QCData = []
  // $.get('http://' + ip + '/api/GetPrintingQCPercent', {'製令單號': rid}, function (data,status) {
  //   QCData.push(((data[0].正確圖案 / data[0].數量)*100).toFixed(2))
  //   QCData.push(((data[0].正確顏色 / data[0].數量)*100).toFixed(2))
  //   QCData.push(((data[0].正確段碼 / data[0].數量)*100).toFixed(2))
  //   QCData.push(((data[0].油墨牢固 / data[0].數量)*100).toFixed(2))
  //   QCData.push(((data[0].達到效果 / data[0].數量)*100).toFixed(2))
  //   console.log(QCData)
  // })

  var PrintingSeciton = [];
  var PrintingSecitonPercent = [];
  var PrintingSecitonPercentColor = [];
  var PrintingSecitonPercentBorder = [];
  $.get('http://' + ip + '/api/GetPrintingTableSection', {'rid': rid}, function (data,status) {
    for(var i = 0 ; i < data.length ; i++){
      PrintingSeciton.push(data[i].部位)
    }
    PrintingYieldData(data[0].部位)
  })

  setTimeout(() => {
    for(var i = 0 ; i < PrintingSeciton.length ; i++){
      $.get('http://' + ip + '/api/GetPrintingQCPercentSection', {'製令單號': rid, '部位名稱': PrintingSeciton[i]}, function (datas,status) {
      PrintingSecitonPercent.push(datas[0].不良數)
      if(datas[0].不良率 < 3){
        PrintingSecitonPercentColor.push('rgba(34, 177, 76, 0.2)')
        PrintingSecitonPercentBorder.push('rgba(34, 177, 76, 1)') //綠
      }else if(datas[0].不良率 < 5){
        PrintingSecitonPercentColor.push('rgba(255, 242, 4, 0.3)')
        PrintingSecitonPercentBorder.push('rgba(255, 242, 4, 1)') //黃
      }else if(datas[0].不良率 <= 7){
        PrintingSecitonPercentColor.push('rgba(255, 127, 39, 0.2)')
        PrintingSecitonPercentBorder.push('rgba(255, 127, 39, 1)') //橘
      }else{
        PrintingSecitonPercentColor.push('rgba(255, 52, 52, 0.2)')
        PrintingSecitonPercentBorder.push('rgba(255, 52, 52, 1)') //紅
      }
    })
    }
    
  }, 70)

  setTimeout(() => {
    console.log(PrintingSecitonPercent)
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
  
        data: {
            labels: PrintingSeciton,
            datasets: [{
                label: '各部位品質檢驗圖表',
                backgroundColor: PrintingSecitonPercentColor,
                borderColor: PrintingSecitonPercentBorder,
                borderWidth: 1,
                data: PrintingSecitonPercent
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "部位名稱",
                        font: {
                            size: 18
                        }
                    },
                },
                y: {
                  beginAtZero: true,
                  suggestedMax: 15,
                    title: {
                        display: true,
                        text: '不良數',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

  //   myChart = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['圖案是否印製正確', '顏色是否正確', '是否印刷在正確的碼段上', '印刷油墨是否牢固', '印刷效果是否有達到客人要求'],
  //     datasets: [{
  //       backgroundColor: ['rgba(54, 162, 235, 0.2)'],
  //       borderColor: ['rgba(54, 162, 235, 1)'],
  //       label: '不良率',
  //       data: QCData,
  //       borderWidth: 1,
  //       barThickness: 50
  //     }]
  //   },options:{
  //     indexAxis: 'y',
  //     scales: {
  //         x: {
  //             title: {
  //                 display: true,
  //                 text: "不良率",
  //                 font: {
  //                     size: 18
  //                 },
  //             },
  //             min: 0,
  //             max: 100,
  //         }
  //     }
  // }
  // });
  }, 100);
  //-----------------------------------------
  


  var PrintingQCPercent = []
  $.get('http://' + ip + '/api/GetPrintingQCPercent', {'製令單號': rid}, function (data,status) {
    PrintingQCPercent.push((((parseInt(data[0].正確圖案) + parseInt(data[0].正確顏色) + parseInt(data[0].正確段碼) + parseInt(data[0].油墨牢固) + parseInt(data[0].達到效果)) / 5).toFixed(2) / parseInt(data[0].數量)*100).toFixed(2))
    PrintingQCPercent.push(100-PrintingQCPercent[0])
    document.getElementById("DoughNutPercent").innerText = PrintingQCPercent[0] + "%"
    console.log(PrintingQCPercent)
  })
  setTimeout(() => {
    myChart3 = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: ['印刷工作不良率'],
        datasets: [{
          backgroundColor: ['rgba(54, 162, 235, 1)', 'rgb(245, 242, 242)'],
          data: PrintingQCPercent,
        }]
      },
      options: {
        title: {
          display: true,
          text: ""
        },
        cutout: 135
      }
    });
  }, 100)

  
}

async function PrintingYieldData(section){
  console.log(section)
  var PrintingYieldData = []
  $.get('http://' + ip + '/api/GetPrintingQCPercentSection', {'製令單號': rid, '部位名稱': section}, function (data,status) {
    PrintingYieldData.push(data[0].正確圖案);
    PrintingYieldData.push(data[0].正確顏色);
    PrintingYieldData.push(data[0].正確段碼);
    PrintingYieldData.push(data[0].油墨牢固);
    PrintingYieldData.push(data[0]. 達到效果);
  })
  
  var ctx = document.getElementById('myChart2');
  setTimeout(() => {
    myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['圖案是否印製正確', '顏色是否正確', '是否印刷在正確的碼段上', '印刷油墨是否牢固', '印刷效果是否有達到客人要求'],
          datasets: [{
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            label: '不良數',
            data: PrintingYieldData,
            borderWidth: 1,
            barThickness: 50
          }]
        },options:{
          indexAxis: 'y',
          scales: {
              x: {
                  title: {
                      display: true,
                      text: "不良數",
                      font: {
                          size: 18
                      },
                  },
                  min: 0,
                  max: 16,
              }
          }
      }
      });
  }, 30)
  
}































//----------------------------------------------------------------

async function HighFrequencyButton(){
  // document.getElementById('Informationbutton').hidden = false;

  states = 'HighFrequency';

  document.getElementsByClassName('button-select')[0].className = "col-4 h-100";
  document.getElementById('HighFrequencyButton').classList.add('button-select');
  document.getElementById('sectionselect').innerHTML = "";
  $.get('http://' + ip + '/api/GetHighFrequencyTableSection', {'rid': rid}, function (data,status) {
    for(var i = 0; i < data.length ; i++) {
      var sections = 
      `
        <option selected value="${data[i].部位}">${data[i].部位}</option>
      `
      $('#sectionselect').append(sections);
    }
    // document.getElementById('sectionselect').disabled = true
    
  })
  //myChart2.destroy();
  await HighFrequencyData();
}


async function HighFrequencyData() {
  // 刪除當前的圖表
  myChart.destroy();
  myChart2.destroy();
  myChart3.destroy();
  var section = [];
  var percent = [];

  // 重新繪製圖表
  await HighFrequencyQCYield(HighFrequencySelectID);
  await HighFrquencyYield();
}

async function HighFrequencySelect(value){
  
  HighFrequencySelectID = value;
  await myChart.destroy();
  await HighFrequencyQCYield(HighFrequencySelectID);
}

function HighFrequencyQCYield(value){
  


  // var ChartData;
  // var ChartPercent = [];
  // var HotPress = ['熱壓後的產品是否有開膠的問題', '熱壓後的產品是否同客人需求'];
  // var Brand = ['紋路是否夠深夠明顯', '是否損傷材料'];
  // var Weld = ['材料牢度是否達到標準', '材料是否損傷', '熱切分片是否在正確位置上', '熱切效果否達到客人要求', '是否有包風問題'];
  // var ThermalTransfer = ['圖形是否正確', '效果是否有達到客人要求', '轉印的設計是否牢度足夠', '是否轉印在正確尺碼'];

  

  // switch (value) {
  //   case 'HotPress':
  //     ChartData = HotPress;
  //     $.get('http://' + ip + '/api/GetHighFrequencyQCPercent', {'製令單號': rid}, function (data,status) {
  //       ChartPercent.push(parseFloat(data[0].熱壓開膠).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].熱壓效果).toFixed(2))
  //     })
  //     break;
  //   case 'Brand':
  //     ChartData = Brand;
  //     $.get('http://' + ip + '/api/GetHighFrequencyQCPercent', {'製令單號': rid}, function (data,status) {
  //       ChartPercent.push(parseFloat(data[0].烙印紋路).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].烙印損傷).toFixed(2))
  //     })
  //     break;
  //   case 'Weld':
  //     ChartData = Weld;
  //     $.get('http://' + ip + '/api/GetHighFrequencyQCPercent', {'製令單號': rid}, function (data,status) {
  //       ChartPercent.push(parseFloat(data[0].熱切牢度).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].熱切損傷).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].熱切分片).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].熱切效果).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].熱切包風).toFixed(2))
  //     })
  //     break;
  //   case 'ThermalTransfer':
  //     ChartData = ThermalTransfer;
  //     $.get('http://' + ip + '/api/GetHighFrequencyQCPercent', {'製令單號': rid}, function (data,status) {
  //       ChartPercent.push(parseFloat(data[0].轉印圖案).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].轉印效果).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].轉印牢度).toFixed(2))
  //       ChartPercent.push(parseFloat(data[0].轉印尺碼).toFixed(2))
  //     })
  //     break;
  // }

  // setTimeout(() => {
  //   myChart = new Chart("myChart", {
  //       type: 'bar',
  //       data: {
  //         labels: ChartData,
  //         datasets: [{
  //           backgroundColor: ['rgba(54, 162, 235, 0.2)'],
  //           borderColor: ['rgba(54, 162, 235, 1)'],
  //           label: '不良率',
  //           data: ChartPercent,
  //           borderWidth: 1,
  //           barThickness: 50
  //         }]
  //       },options:{
  //         indexAxis: 'y',
  //         scales: {
  //           x: {
  //             title: {
  //               display: true,
  //               text: "不良率",
  //               font: {
  //                 size: 18
  //               },
                
  //             },
  //             min: 0,
  //             max: 100, // 設定最大值
  //           },
  //         }
  //       }
  //     });
  // }, 100)
  



}

async function HighFrquencyYield(){
  var ctx2 = document.getElementById('myChart2');
  var ctx3 = document.getElementById('myChart3');

  var HighFrequencySeciton = [];
  var HighFrequencySecitonPercent = [];
  var HighFrequencySecitonPercentColor = [];
  var HighFrequencySecitonPercentBorder = [];

    await $.get('http://' + ip + '/api/GetHighFrequencyTableSection', {'rid': rid}, function (data,status) {

      for(var i = 0 ; i < data.length ; i++){
        HighFrequencySeciton.push(data[i].部位)
      }

      HighFrequencyYieldData(data[0].部位)
    })

    setTimeout(() => {
      for(var i = 0; i < HighFrequencySeciton.length;i++){
        $.get('http://' + ip + '/api/GetHighFrequencyQCPercentSection', {'製令單號': rid, '部位名稱': HighFrequencySeciton[i]}, function (datas,status) {
        console.log(datas)
        HighFrequencySecitonPercent.push(datas[0].不良數)
        if(datas[0].不良率 < 3){
          HighFrequencySecitonPercentColor.push('rgba(34, 177, 76, 0.2)')
          HighFrequencySecitonPercentBorder.push('rgba(34, 177, 76, 1)') //綠
        }else if(datas[0].不良率 < 5){
          HighFrequencySecitonPercentColor.push('rgba(255, 242, 4, 0.3)')
          HighFrequencySecitonPercentBorder.push('rgba(255, 242, 4, 1)') //黃
        }else if(datas[0].不良率 <= 7){
          HighFrequencySecitonPercentColor.push('rgba(255, 127, 39, 0.2)')
          HighFrequencySecitonPercentBorder.push('rgba(255, 127, 39, 1)') //橘
        }else{
          HighFrequencySecitonPercentColor.push('rgba(255, 52, 52, 0.2)')
          HighFrequencySecitonPercentBorder.push('rgba(255, 52, 52, 1)') //紅
        }
      })
      }
      
    }, 80)
     
    

    // PrintingYieldData(data[0].部位)
  

  setTimeout(() => {
    var ctx = document.getElementById('myChart');
        myChart = new Chart(ctx, {
            type: 'bar',
      
            data: {
                labels: HighFrequencySeciton,
                datasets: [{
                    label: '各部位品質檢驗圖表',
                    backgroundColor: HighFrequencySecitonPercentColor,
                    borderColor: HighFrequencySecitonPercentBorder,
                    borderWidth: 1,
                    data: HighFrequencySecitonPercent
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "部位名稱",
                            font: {
                                size: 18
                            }
                        },
                    },
                    y: {
                      beginAtZero: true,
                      suggestedMax: 15,
                        title: {
                            display: true,
                            text: '不良數',
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            }
        });
  }, 120)
    

  // if (typeof myChart == 'object') {
  //   // 如果已經被定義，則刪除它
  //   myChart.destroy();
  // }


 

  // var QCHighFrequencySize = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];
  // var QCHighFrequencyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // $.get('http://' + ip + '/api/GetHighFrequencyTableSection', {'rid': rid}, function (data,status) {
  //   for(var i = 0;i<data.length;i++){
  //     QCHighFrequencyData[QCHighFrequencySize.indexOf(data[i].尺寸)] = data[i].不良率
  //   }
  // })

  // setTimeout(() => {
  //   myChart2 = new Chart(ctx2, {
  //     type: 'bar',
  //     data: {
  //       labels: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'],
  //       datasets: [{
  //         backgroundColor: ['rgba(54, 162, 235, 0.2)'],
  //         borderColor: ['rgba(54, 162, 235, 1)'],
  //         label: '不良率',
  //         data: QCHighFrequencyData,
  //         borderWidth: 1,
  //         barThickness: 30
  //       }]
  //     },options:{
  //       scales: {
  //           x: {
  //               title: {
  //                 display: true,
  //                 text: "尺寸",
  //                 font: {
  //                     size: 15
  //                 }
  //               }
  //           },
  //           y: {
  //             title: {
  //               display: true,
  //               text: "不良率",
  //               font: {
  //                   size: 15
  //               }
  //             },
  //             beginAtZero: true,
  //             suggestedMax: 100,
  //           }
  //       }
  //     }
  //   });
  // }, 100)
    

    var HighFrequencyQCPercent = []
  $.get('http://' + ip + '/api/GetHighFrequencyQCPercent', {'製令單號': rid}, function (data,status) {
    HighFrequencyQCPercent.push((((parseInt(data[0].熱壓開膠) + parseInt(data[0].熱壓效果) + parseInt(data[0].烙印紋路) + parseInt(data[0].烙印損傷) + parseInt(data[0].熱切牢度) + parseInt(data[0].熱切損傷) + parseInt(data[0].熱切分片) + parseInt(data[0].熱切效果) + parseInt(data[0].熱切包風) + parseInt(data[0].轉印圖案) + parseInt(data[0].轉印效果) + parseInt(data[0].轉印牢度) + parseInt(data[0].轉印尺碼)) / 13).toFixed(2) / parseInt(data[0].數量)*100).toFixed(2))
    HighFrequencyQCPercent.push(100-HighFrequencyQCPercent[0])
    document.getElementById("DoughNutPercent").innerText = HighFrequencyQCPercent[0] + "%"
    console.log(HighFrequencyQCPercent)
  })

  setTimeout(() => {
    myChart3 = new Chart(ctx3, {
          type: "doughnut",
          data: {
            labels: ['高周波工作不良率'],
            datasets: [{
              backgroundColor: ['rgba(54, 162, 235, 1)', 'rgb(245, 242, 242)'],
              data: HighFrequencyQCPercent
            }]
          },
          options: {
            title: {
              display: true,
              text: ""
            },
            cutout: 135
          }
    });
  }, 50)
    
}


async function HighFrequencyYieldData(section){
  console.log(section)
  var HighFrequencyYieldData = []
  $.get('http://' + ip + '/api/GetHighFrequencyQCPercentSection', {'製令單號': rid, '部位名稱': section}, function (data,status) {
    HighFrequencyYieldData.push(data[0].熱壓開膠);
    HighFrequencyYieldData.push(data[0].熱壓效果);

    HighFrequencyYieldData.push(data[0].烙印紋路);
    HighFrequencyYieldData.push(data[0].烙印損傷);

    HighFrequencyYieldData.push(data[0].熱切牢度);
    HighFrequencyYieldData.push(data[0].熱切損傷);
    HighFrequencyYieldData.push(data[0].熱切分片);
    HighFrequencyYieldData.push(data[0].熱切效果);
    HighFrequencyYieldData.push(data[0].熱切包風);

    HighFrequencyYieldData.push(data[0].轉印圖案);
    HighFrequencyYieldData.push(data[0].轉印效果);
    HighFrequencyYieldData.push(data[0].轉印牢度);
    HighFrequencyYieldData.push(data[0].轉印尺碼);
  })
  
  var ctx = document.getElementById('myChart2');
  setTimeout(() => {
    myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['熱壓開膠', '熱壓效果', '烙印紋路', '烙印損傷', '熱切牢度', '熱切分片', '熱切結果', '熱切包風', '轉印圖案', '轉印效果', '轉印牢度', '轉印尺碼'],
          datasets: [{
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            label: '不良數',
            data: HighFrequencyYieldData,
            borderWidth: 1,
            barThickness: 10
          }]
        },options:{
          indexAxis: 'y',
          scales: {
              x: {
                  title: {
                      display: true,
                      text: "不良數",
                      font: {
                          size: 18
                      },
                  },
                  min: 0,
                  max: 16,
              }
          }
      }
      });
  }, 50)
  
}



//----------------------------------------------------------------

$(document).ready(function() {
  preView()
    // Printing();
    // HighFrequency();
    // setTimeout(() => {
    //     Printing_myChar();
    //     HighFrequency_myChar();
    // }, 100)
});