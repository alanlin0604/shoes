var x = 0;
var y = 0;
var myChart;
var sele;
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
                    <td style="width: 10%;">${data.員工}</td>
                    <td style="width: 15%;">${data.上班時間}</td>
                    <td style="width: 15%;">${data.下班時間}</td>
                    <td style="width: 15%;">${data.出勤狀況}</td>
                    <td style="width: 15%;">${data.日期}</td>
                    </tr>

`;
    $('#exceltable').append(content);

    if (data.出勤狀況 == "準時") {
        x += 10;
    }
    else {
        y += 10;
    }





}
function newList1(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    var time1 = new Date(data.上傳日期).format("yyyy-MM-dd hh:mm:ss");
    var time2 = new Date(data.上次編輯日期).format("yyyy-MM-dd hh:mm:ss");
    var content =
        `
                    <tr>
                    <td style="width: 10%;">${data.員工}</td>
                    <td style="width: 15%;">${data.上班時間}</td>
                    <td style="width: 15%;">${data.下班時間}</td>
                    <td style="width: 15%;">${data.出勤狀況}</td>
                    <td style="width: 15%;">${data.日期}</td>
                    </tr>

`;
    $('#exceltable').append(content);

    if (data.出勤狀況 == "準時") {
        x += 10;
    }
    else {
        y += 10;
    }





}


function newlist2(data1, data2) {


    var ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {

            labels: ['準時', '遲到'],
            datasets: [{
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'

                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                  

                ],
                borderWidth: 1,

                data: [data1, data2]
            }]
        }
    });


}


function click1() {
    x = 0;
    y = 0;
    document.getElementById('exceltable').innerHTML = "";

    //chart.clear();
    var s = 'http://' + ip + '/api/getallpunch?date=' + $('#date').val();
    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            newList(data[i]);
        }
        newlist2(x, y);

        console.log(x, y);
    });

    console.log($('#date').val());

    myChart.destroy();

}


function click2(data) {
    x = 0;
    y = 0;
    document.getElementById('exceltable').innerHTML = "";

    //chart.clear();
    var s = 'http://' + ip + '/api/getallpunch1?d=' + data + '&date=' + $('#date').val();
    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            newList1(data[i]);
        }



    });

    console.log($('#date').val());



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



