$(document).ready(function () {

    click2();

});


var x = 0;
var y = 0;
var myChart;
var sele;
function newList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    //console.log(data.目前進度)

    var content =

        `

                   
        <tr>
        <td style="width: 15%;">${data.製令單號}</td>
        <td style="width:  20%;;">${data.部位}</td>
        <td style="width:  15%;;"> ${data.尺寸}</td>


        <td style="width:  20%;">
        ${data.數量}
      
        </td>
        <td style="width:  20%">
        ${data.回報數量}
        </td>
      
       
        </tr>
  
    
       `;
    $('#exceltable').append(content);


    document.getElementById('x').innerHTML = "";
    var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");

    var content =
        `
               <lable>最後更新時間：${time1}</lable>
        `;




    $('#x').append(content);





}


function newlist2(data1) {
    var url = location.search;
    var one, two, rid, datee, three;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        //console.log(str);
        // str.split("=")[0] 為 userID

        one = str.split("&");
        two = one[0].split("=");
        three = one[1].split("=");
        rid = two[1];

   



    }


    var ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {

           

            labels: [data1],
            datasets: [{
                label: decodeURI(rid)+'今日總生產數量圖表',
                backgroundColor: [
                    'rgb(255, 205, 86)',


                ],
                borderColor: [
                    'rgb(54, 162, 235)',



                ],
                borderWidth: 1,

                data: [data1]
            }]
        }
    });


}
function numm(data) {

    console.log(data);
    var url = location.search;
    var one, two, rid, datee, three;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        //console.log(str);
        // str.split("=")[0] 為 userID

        one = str.split("&");
        two = one[0].split("=");
        three = one[1].split("=");
        rid = two[1];

        datee = three[1];
        var time1 = new Date(datee).format("yyyy-MM-dd");
        console.log(time1, rid, data);




    }

    $.post('http://' + ip + '/api/updatepeople', { 'allnumm': data, 'people': rid, 'date': time1 }, function (res) {

    });

    var s = 'http://' + ip + '/api/newgetallpunch?name=' + rid + '&datee=' + time1;

    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            newlist2(data[i].當日生產總數量);
            console.log(data[i].當日生產總數量);

        }



    });
    myChart.destroy();
}



var allnum = 0;
function click2() {
    x = 0;
    y = 0;
    document.getElementById('exceltable').innerHTML = "";
    var url = location.search;
    var one, two, rid, datee, three;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        //console.log(str);
        // str.split("=")[0] 為 userID

        one = str.split("&");
        two = one[0].split("=");
        three = one[1].split("=");
        rid = two[1];
        datee = three[1];
        console.log(datee, rid);


    }
    if (rid == undefined) {
        rid = '未抓到';
    }

    //chart.clear();
    var s = 'http://' + ip + '/api/getpeople?name=' + rid + '&datee=' + datee;
    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            newList(data[i]);
            allnum += parseInt(data[i].回報數量);
            console.log(allnum);
        }
        numm(allnum);

    });




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



