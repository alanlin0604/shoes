var s;

var complete_amount, complete_percent;

gettable();


function gettable(){


    var api_data = 'http://' + ip + '/api/gettable1'

    var x = 0;
    $.get(api_data, function (s, status) {
        if (s.length != 0){            
            for(var i = 0; i < s.length; i++){
                console.log(s[i])
                if(s[i].完成狀態 == null){
                    $.post('http://' + ip + '/api/updateDB1', { '完成狀態': 0, '製令單號': s[i].製令單號 }, function (res) {
                        
                    });
                }
                a(s[i]);
            }  // data all save in the table1  // only use s[0]
        }
       

        


    });

    function a(data) {

        var ok = 0;
        var now;
        // 抓回報數量  
        // console.log(data.部位名稱);
        var c = 'http://' + ip + '/api/getDB4all?a=' + data.製令單號 ;

        $.get(c, function (s1, status) {
            if(s1.length != 0){
                for (var i = 0; i < s1.length; i++) {

                    console.log(i + " s1[i] " + s1[i].完成總數量);
                    if(s1[i].完成總數量 != null){
                        ok += parseInt(s1[i].完成總數量);
                    }
    
    
                  
                  console.log('new ' + now);
                  console.log("data.總數量 " + data.總數量 + " ok " + ok);
                  now = ok / data.總數量;
    
                  if(now != 0)
                    now = Math.round(now * 100);
                
                  console.log('百分比 ' + now);
                 

                  $.post('http://' + ip + '/api/updateDB1', { '完成狀態': now, '製令單號': data.製令單號 }, function (res) {
                    
                });  
            }
            
           


            }


            
        });

    }


    setTimeout(() => {
        bb();
    },100)
    
}


function bb(){
    var api_data = 'http://' + ip + '/api/gettable1'

    var x = 0;
    $.get(api_data, function (s, status) {
        for (var i = 0; i < s.length; i++) {
            newList(s[i]);


            // s = 製令單號
            $.get('http://' + ip + '/api/gettable2?s=' + s[i].製令單號, function (data, status) {
                
                for (var j = 0; j < data.length; j++) {
                    datas(data[j]);
                }

            });
         
        }




    });


}

var min = 0;
function mins(number){
    var cutting = 0, printing = 0, highfrequency = 0;

    $.get('http://' + ip + '/api/GetCuttingReportAmount', {'rid': number}, function (data,status) {
        if (data[0].回報數量 != null){
            cutting = data[0].回報數量;
        }
        
        console.log(data[0].回報數量)
    })

    $.get('http://' + ip + '/api/GetPrintingReportAmount', {'rid': number}, function (data,status) {
        if (data[0].回報數量 != null){
            printing = data[0].回報數量;
        }
        console.log(data[0].回報數量)
    })

    $.get('http://' + ip + '/api/GetHighFrequencyReportAmount', {'rid': number}, function (data,status) {
        if (data[0].回報數量 != null){
            highfrequency = data[0].回報數量;
        }
        console.log(data[0].回報數量)
    })

    setTimeout(() => {
        if (cutting <= printing){
            min = cutting;
        }else{
            min = printing;
        }
        if (highfrequency <= min){
            min = highfrequency;
        }
        
        
        console.log("min" + min)
    }, 100)

    
}

function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    var time1 = new Date(data.上傳日期).format("yyyy-MM-dd hh:mm:ss");
    var time2 = new Date(data.上次編輯日期).format("yyyy-MM-dd hh:mm:ss");
    mins(data.製令單號);
    setTimeout(() => {
    var content = 
        `<div class="tab-content" id="${data.製令單號}">
            <table class="table">
                <tbody>
                    <tr style="background: none">
                        <td style="width: 20%;">
                            
                            <button style="border-style: none; background-color:transparent;" type="button" data-bs-toggle="modal" data-bs-target="#Modal${data.製令單號}">
                                ${data.製令單號}
                            </button>
                        </td>
                        <td style="width: 20%; " > 
                            ${min}
                        </td>
                        <td style="width: 20%;">
                            ${time1}
                        </td>
                        <td style="width: 20%;">
                            <div class="container" >
                                <div class="row">
                                    <div class="col-sm-11" style="padding-left:0px;">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width:${data.完成狀態}% ; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-1" style="font-size:10px;padding-left:0px;">
                                        ${data.完成狀態}%
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td style="width: 20%; " >
                            <a href="QCanalyze.html?s=${data.製令單號}">
                                <button type="button"class="btn btn-outline-dark" >
                                    進入生產監控畫面
                                </button>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="modal fade" id="Modal${data.製令單號}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4><strong>物料清單</strong></h4>
                            <div class="text-right">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div class="container">
                                    <div class="row" style="margin-top: 5px;">
                                        <div class="col-8">
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">製令單號：&nbsp;${data.製令單號}</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">&nbsp;</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">型體編號：&nbsp;${data.型體編號}</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">型體名稱：&nbsp;${data.型體名稱}</div>
                                        </div>
                                        <div class="col-4" >
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">楦頭：&nbsp;${data.楦頭}</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">大底：&nbsp;${data.大底}</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">配色：&nbsp;${data.顏色}</div>
                                            <div class="p-2 bd-highlight" style="padding: 0%!important;">LOGO：&nbsp;${data.logo}</div>
                                        </div>
                                    </div>
                                    <table class="table table-bordered">
                                        <thead style="background-color: #EDEDED;">
                                            <tr>
                                                <th scope="col">部位名稱</th>
                                                <th scope="col">材料</th>
                                                <th scope="col">本批數量全</th>
                                                <th scope="col">單位</th>
                                            </tr>
                                        </thead>
                                        <tbody style="background-color: #F7F7F7;" id="datas${data.製令單號}">
                                        
                                        
                                        </tbody>
                                    </table>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        $('#xxx').append(content);
    }, 100)
    
}


function datas(data){
    var content3=
    `
    <tr>
        <td>${data.部位名稱}</td>
        <td>${data.材料}</td>
        <td>${data.本批數量全}</td>
        <td>${data.單位}</td>
      </tr>
    `
    $('#datas'+ data.製令單號).append(content3);
} //各製令單的材料細項






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
