//window.location.reload(); 

var url = location.search;
var one, two, rid, section, three;
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    //console.log(str);
    // str.split("=")[0] 為 userID

    one = str.split("&");
    two = one[0].split("=");
    three = one[1].split("=");
    rid = two[1];
    section = decodeURI(three[1]);
    //console.log(typeof (section));
    console.log(section);


}
if (rid == undefined) {
    rid = '未抓到';
}



$(document).ready(function() {
    loading();
});

function loading() {
    $.get('http://' + ip + '/api/getDB4', {'a': rid, 'b': section}, function (data,status) {
        var amount,Complete,Percent;
        for(var i = 0;i < data.length; i++){
            amount = parseInt(data[i].數量) - parseInt(data[i].完成總數量);
            Complete = parseInt(data[i].完成總數量);
            Percent = (parseInt(data[i].完成總數量)/parseInt(data[i].數量))*100
            Percent = Percent.toFixed(0);
            //console.log('未完成數量'+ amount+ ' 完成狀態'+ '1'+ ' 完成總數量'+ Complete + ' 目前進度'+ Percent+ ' 製令單號'+ rid+ ' 部位'+ section+ ' 尺寸'+ data[i].尺寸 )
            $.post('http://' + ip + '/api/FixTable4Percent', { '未完成數量': amount, '完成狀態': '1', '完成總數量': Complete , '目前進度': Percent, '製令單號': rid, '部位': section, '尺寸': data[i].尺寸}, function (res) {
                
            });
        }
    })
    setTimeout(() => {
        secondloading();
    }, 100) 
}

async function secondloading() {
    await aa();
    await getbuttonGroupdispatch1();
}

function aa() {


    document.getElementById('exceltable').innerHTML = "";


    


    //console.log(section);


    //console.log(rid);



    var b = 'http://' + ip + '/api/getDB4?a=' + rid + '&b=' + section;

    var x = 0;
    $.get(b, function (s, status) {
        for (var i = 0; i < s.length; i++) {

            //FixPercent(s[i].尺寸, s[i].數量, s[i].完成數量, s[i].部位);


            a(s[i]);
            
            //console.log(s[i]);

        }


    });




    



}


function a(data) {

        //document.getElementById('exceltable').innerHTML = "";
    // 抓回報數量加總  
    //console.log(data);
    var all = 0;
    var x;
    var b = 'http://' + ip + '/api/getDB5ok?a=' + rid + '&b=' + section + '&c=' + data.尺寸;

    $.get(b, function (s1, status) {

        for (var i = 0; i < s1.length; i++) {
            //console.log(data.尺寸,data.部位);

            //console.log(data);

            all = all + parseInt(s1[i].回報數量);
            //console.log(all,s1[i].部位,s1[i].尺寸);

            x = s1[i].數量;

            p = all / x;
            p = Math.round(p * 100);
            console.log(s1[i].尺寸, x, all, p);

            $.post('http://' + ip + '/api/updateDB4', { '完成總數量': all, '目前進度': p, '製令單號': rid, '部位': s1[i].部位, '尺寸': s1[i].尺寸 }, function (res) {

            });


        }
       

    });


    showdata(data);

    
    
}



// setTimeout("aa()", "10000");
// setTimeout("getbuttonGroupdispatch1()", "10000");




function showdata(data) {
    

    setTimeout(() => {
        var content =
        `
        <tr>
            <td style="width: 15%;">${data.製令單號}</td>
            <td style="width: 15%;padding-left:20px;">${data.部位}</td>
            <td style="width: 10%;padding-left:20px;">${data.尺寸}</td>
            <td style="width: 15%;padding-left:20px;">${data.數量}</td>
            <td style="width: 15%;padding-left:20px;" >${data.完成總數量}</td>
            
            <td style="width: 20%;">
                <div class="progress">
                <div class="progress-bar" role="progressbar" style="width:${data.目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${data.目前進度}%</div>
                </div>
            </td>
        
        </tr>
        `;
        $('#exceltable').append(content);
    },100)
    



}




var ss = [];//目前進度
var ss1 = [];//尺寸



function getbuttonGroupdispatch1() { //圖表

    document.getElementById('exceltable').innerHTML = "";

    var k = 'http://' + ip + '/api/getDB4?a=' + rid + '&b=' + section;


    $.get(k, function (s4, status) {

        for (var i = 0; i < s4.length; i++) {




            //newlist(s4[i]);
            ss1[i] = s4[i].尺寸;

            ss[i] = s4[i].目前進度;


            //console.log(s4[i]);
            //console.log(section);
            //console.log(ss);


        }
        sss();


    });



}





function sss() {

    for (var i = 0; i < ss.length; i++) {

        if (ss[i] != null) {
            /*str2 = ss[i];

            str2.toString();
            console.log(str2);
            str = str + str2 +",";

            ss2[i]=ss1[i];*/

            console.log(ss);
            console.log(ss1);




        }
        else {
            break;
        }


    }


    newlist(ss, ss1);



}

//ss1尺寸 ss目前進度

function newlist(data1, data2) {

    console.log(data1);
    var ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {


            labels: data2,
            datasets: [{
                label: decodeURI(section) + '各尺寸生產進度圖表',
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
                        text: "尺寸",
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



function FixPercent(SIZE, Dispach, Complete, sectionname){
    //SIZE 尺寸
    //Dispach 數量
    //Complete 完成數量
    // sectionname 部位
    //UPDATE table4 SET 未完成數量 = ?, 完成狀態 = ?, 完成總數量 = ?, 目前進度 = ? WHERE 製令單號 = ? AND 部位 = ? AND 尺寸 = ?'
    var Percent;
    Dispach = parseInt(Dispach);
    Complete = parseInt(Complete);
    Percent = (parseFloat(Complete / Dispach).toFixed(2))*100

    var UnComplete = parseInt(Complete) - parseInt(Dispach);


    
    setTimeout(() => {
        console.log('派工數量' + Dispach + ' 完成數量 ' + Complete + ' 進度' + Percent + ' 未完成' + UnComplete)
        $.post('http://' + ip + '/api/FixTable4Percent', { '未完成數量': UnComplete, '完成狀態': '1', '完成總數量': Complete , '目前進度': Percent, '製令單號': rid, '部位': sectionname, '尺寸': SIZE }, function (res) {
            console.log(res)
            console.log('未完成數量'+ UnComplete+ ' 完成狀態'+ '1'+ ' 完成總數量'+ Complete + ' 目前進度'+ Percent+ ' 製令單號'+ rid+ ' 部位'+ sectionname+ ' 尺寸'+ SIZE )
        });
    },10)
    

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



