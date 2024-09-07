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


$(document).ready(function() {
    datafix()
    
    
});


async function loading() {
    await datacheck();

    await setTimeout(() => {
        aa();
    }, 100)

    await setTimeout(() => {
        getbuttonGroupdispatch1();
    }, 120)
    
}

var number = 0;
/*function datacheck(){
    
    $.get('http://' + ip + '/api/getTable4Info2', {'workorderNumber': rid}, function (data,status) {
         // 用於計算
        for (var i = 0; i < data.length; i) {
            number = parseInt(data[i].完成數量);
            console.log(data[i].部位 + 'number=' + number)
            $.get('http://' + ip + '/api/getDB6total', {'a': rid, 'b': data[i].部位}, function (data,status) {
                console.log('db6 + number ' + number)
                number += parseInt(data[0].回報數量);
                console.log(data[0].部位名稱 + ' aa ' + number);
                $.post('http://' + ip + '/api/updateDB6', { '回報數量': number, '製令單號': rid, '部位名稱': data[0].部位名稱}, function (data) {
                    console.log(data)
                    
                });

            });
            // 完成數量
            

            i++;
        }

    });

}*/
function datacheck(){
    console.log('datackeck')
    $.get('http://' + ip + '/api/getDB6', {'a': rid}, function (data,status) {
        for (var i = 0; i < data.length; i++){
            $.get('http://' + ip + '/api/getDB4', {'a': rid,'b': data[i].部位名稱}, function (data,status) {
                var allsum = 0;
                for (var i = 0; i < data.length; i++){
                    allsum += parseInt(data[i].完成總數量);
                    console.log(data[i].部位 + ' 完成數量 ' + data[i].完成總數量)
                     // UPDATE table6 SET 回報數量 = ? WHERE 製令單號 = ? AND 部位名稱=? 
                     console.log(allsum)
                    // $.post('http://' + ip + '/api/updateDB6', {'回報數量': allsum,'製令單號': data[i].製令單號,'部位名稱': data[i].部位}, function (res) {
                    //     console.log('回報數量' + allsum)
                    // }); 
                }
                

            });// SELECT * FROM table4  WHERE 製令單號 = ? AND 部位 = ?
            


            for (var i = 0; i < data.length; i++){
                percent = parseFloat(data[i].回報數量/data[i].總數量);
                
                percent = (percent*100).toFixed(0);
                console.log(percent, data[i].部位名稱)
                UpdateDB6(percent, data[i].部位名稱)
                
                
                
            }
        

        }

        

    }); // SELECT * FROM table6 WHERE 製令單號 = ?
    
    
    


}

function UpdateDB6(percent, section){
    console.log(section, percent)
    $.post('http://' + ip + '/api/updateDB6now', {'目前進度': percent,'製令單號': rid,'部位名稱': section}, function (res) {
        console.log(section + " " + percent);

    });

}

function aa() {




    document.getElementById('exceltable').innerHTML = "";


    



    var b = 'http://' + ip + '/api/getDB6?a=' + rid;

    var x = 0;
    $.get(b, function (s, status) {
        for (var i = 0; i < s.length; i++) {
            a(s[i]);
            /*

            var c;

            c = s[i].總數量;
            console.log(c);
            x0(c);

            //tal(s[i].回報數量);           
            //console.log(s[i].回報數量);
            
            //x = x + parseInt(s[i].回報數量);
            */


        }




    });

    function a(data) {

        var all = 0;

        // 抓回報數量  
        //  console.log(data.部位名稱);
        var b = 'http://' + ip + '/api/getDB5?a=' + data.製令單號 + '&b=' + data.部位名稱;

        $.get(b, function (s1, status) {

            for (var i = 0; i < s1.length; i++) {
                aaa(s1[i]);
                var q;

                q = s1[i].回報數量;
                console.log(s1[i].部位);
                console.log(all);
                all = all + parseInt(s1[i].回報數量);
                console.log(all);


                $.post('http://' + ip + '/api/updateDB6', { '回報數量': all, '製令單號': data.製令單號, '部位名稱': data.部位名稱 }, function (res) {

                });

            }

        });

    }

    function aaa(data) {

        var c = 'http://' + ip + '/api/getDB2?a=' + data.製令單號 + '&b=' + data.部位;
        //抓對應總數量
        $.get(c, function (s2, status) {
            for (var i = 0; i < s2.length; i++) {




                var x, t;
                x = s2[i].總數量;
                // console.log(s2[i]);

                aaaa(s2[i]);


                $.post('http://' + ip + '/api/updateDB6total', { '總數量': x, '製令單號': data.製令單號, '部位名稱': data.部位 }, function (res) {

                });



            }


        });

    }




    function aaaa(data) {
        console.log(data);
        var d = 'http://' + ip + '/api/sumtable4?rid=' + data.製令單號 + '&部位=' + data.部位名稱;
        //抓對應總數量
        $.get(d, function (s3, status) {
            for (var i = 0; i < s3.length; i++) {

                //console.log(s3[i]);
                //console.log(data);

                var x, c, p;
                // x = s3[i].完成數量;

                //console.log(x);
                //console.log(c);


                p = x / 5800;
                p = Math.round(p * 100);
                //console.log(p);


                $.post('http://' + ip + '/api/updateDB6now', { '目前進度': s3[0].完成數量, '製令單號': data.製令單號, '部位名稱': data.部位名稱 }, function (res) {

                });





            }


        });


    }

    getbuttonGroupdispatch();

    function getbuttonGroupdispatch() { //顯示內容  就是這裡 no會等於製令單號



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



        var b = 'http://' + ip + '/api/getDB6?a=' + rid;


        $.get(b, function (s4, status) {

            for (var i = 0; i < s4.length; i++) {
                getList(s4[i]);

                // newlist(s4[i]);

                //console.log(s4[i]);
                
                

            }

        });


    }



    // setTimeout("aa()", "10000");
    // setTimeout("getbuttonGroupdispatch1()", "10000");







    function getList(data) {

        var status = (data.status) ? "checked" : "";
        var titleClass = (data.status) ? "title2" : "title";
        var messageClass = (data.status) ? "message2" : "message";
        var editClass = (data.status) ? "none" : "inline";
        //console.log(data.目前進度);
        if (data.目前進度 == null) {

            var content =

                `

                   
        <tr>
        <td style="width: 25%;">${data.製令單號}</td>
       


        <td style="width:  25%;">
        <div class="container">
        <div class="row">
        <div class="col-sm-11" style="padding-left:0px">

            <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${data.目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="col-sm-1" style="font-size:10px;padding-left:0px;">0%</div>
            </div>
            </div>
            </div>
        </td>
        <td style="width: 25%">

        
        <button type="button" class="btn btn-dark"style="width:100px;height:;"disabled>詳細資訊</button>
        
        
        </td>
  
   
  
        
    
       `;
        /*
        <a href="monitor2_2.html?a=${data.製令單號}&b=${data.部位名稱}">
                <button type="button" class="btn btn-dark"style="width:100px;height:;">詳細資訊</button>
            </a>
        */
            $('#exceltable').append(content);


        }
        else {
            var content =
                `
                   
                       
        <tr>
        <td style="width: 25%;">${data.製令單號}</td>
        


        <td style="width:  25%;">
        <div class="container">
        <div class="row">
        <div class="col-sm-11" style="padding-left:0px">

            <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${data.目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="con-sm-1" style="font-size:10px;padding-left:0px;"> ${data.目前進度}%</div>
            </div>
            </div>
            </div>
        </td>
        <td style="width:  25%;">
            <a href="針車監控2.html?a=${data.製令單號}&b=${data.部位名稱}">
                <button type="button" class="btn btn-outline-dark"style="width:100px;height:;">詳細資訊</button>
            </a>
        </td>
  
        
    
        `;
            $('#exceltable').append(content);

        }



    }













}

var ss = [];
var ss1 = [];

function getbuttonGroupdispatch1() { //圖表



    var k = 'http://' + ip + '/api/getDB6all2?orderNumber=' + rid;

    console.log(k)
    $.get(k, function (s4, status) {

        for (var i = 0; i < s4.length; i++) {
            console.log(s4[i].製令單號 + " " + s4[i].部位名稱 + " " + s4[i].目前進度)

            //newlist(s4[i]);
            ss1[i] = s4[i].部位名稱;

            ss[i] = s4[i].目前進度;


            //console.log(s4[i]);
            //console.log(ss1);


        }
        sss();


    });




}

console.log(ss);
var ss2 = [];
var str = "";
var str2;
var str3 = "";
function sss() {

    for (var i = 0; i < ss.length; i++) {

        if (ss[i] != null) {
            str2 = ss[i];

            str2.toString();
            console.log(str2);
            str = str + str2 + ",";

            ss2[i] = ss1[i];





        }
        else {
            break;
        }




    }

    console.log(str);

    newlist(ss, ss2);










}







function newlist(data1, data2) {

    var ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',

        data: {

            labels: data2,

            datasets: [{
                label: '各部位生產進度圖表',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,

                data: data1

            }]
        },options:{
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



    document.getElementById('x').innerHTML = "";
    var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");

    var content =
        `
       <lable>最後更新時間：${time1}</lable>
       


`;




    $('#x').append(content);

}

async function datafix(){

    await $.get('http://' + ip + '/api/gettable2', {'s': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
            $.get('http://' + ip + '/api/sumtable4', {'製令單號': rid, '部位': data[i].部位名稱}, function (datas,status) {
                $.post('http://' + ip + '/api/updateDB6', {'回報數量': datas[0].完成數量, '製令單號': rid, '部位名稱': datas[0].部位}, function (datas,status) {
                    console.log('完成'  + datas[0].部位 + " 更新 " + datas[0].完成數量)
                })
            })
        }
        
    })


    await loading();

}







































































































function newList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    var time1 = new Date(data.上傳日期).format("yyyy-MM-dd hh:mm:ss");
    var time2 = new Date(data.上次編輯日期).format("yyyy-MM-dd hh:mm:ss");
    var content =
        `
        <tr>
        <td style="width: 10%;">${data.製令單號}</td>
        <td style="width: 15%;">
        <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${data.目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${data.目前進度}%</div>
        </div>
        </td>
        <td style="width: 15%;">${data.完成狀態}</td>
        <td style="width: 15%;">${time1}</td>
  
        </tr>

`;
    $('#exceltable').append(content);

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



