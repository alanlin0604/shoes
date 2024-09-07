var s;



function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    var time1 = new Date(data.上傳時間).format("yyyy-MM-dd hh:mm:ss");

    // $("#"+button_id+".tab-content").remove();
    var content = 
    `
    <div class="tab-content" id="${data.製令單號}">
        
        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 10%;  text-align: center;">${data.製令單號}</td>
                    <td style="width: 10%;  text-align: center;">高周波</td>
                    <td style="width: 15%;  text-align: center;">${data.型體編號}</td>
                    <!--<td style="width: 15%;  text-align: center;">
                        <button style="border-style: none; background-color:transparent;" type="button" data-bs-toggle="modal" data-bs-target="#Modal${data.製令單號}">
                            ${data.部位}
                        </button>
                    </td>-->
                    <td style="width: 15%;  text-align: center;">${time1}</td>
                    <td style="width: 25%; text-align: center;">
                    <div class="container" style="align-items: center;">
                        <div class="row">
                            <div class="col-sm-11">
                                <div class="progress">
                                    <div id="myprogressbar" class="progress-bar" role="progressbar" style="width:${data.派工進度}% ; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div id="progressbartext" class="col-sm-1" style="font-size:10px;padding-left:0px;">${data.派工進度}%</div>
                        </div>
                    </div>    
                    </td>
                    <td style="width: 25%; text-align: center;" >
                        <a href="HighFrequencyMonitor2.html?workorderNumber=${data.製令單號}" style="text-decoration:none; text-align: center;">
                            <button type="button" class="btn btn-outline-primary" >生產監控</button>
                        </a>
                    </td>
                    </tr>
                
                </tbody>
       </table>

       <div class="modal fade" id="Modal${data.製令單號}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4><strong>更換部位</strong></h4>
                        <div class="text-right">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div id="modaldata${data.製令單號}">
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-success" id="${data.製令單號}" onclick="section(this.id)" data-bs-dismiss="modal">確認更換</button>
                    </div>
                </div>
            </div>
        </div>
 

    </div>`;
    $('#xxx').append(content);


    console.log(data.製令單號)
    setTimeout(() => {
        $.get('http://' + ip + '/api/getTable1Info', {'orderNumber': data.製令單號}, function (data,status) {
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
                    <tbody style="background-color: #F7F7F7;" id="datas${data[0].製令單號}">
                    
                    
                    </tbody>
                </table>
            </div>
            `;
            $('#modaldata' + data[0].製令單號).append(modaldata);
        })
        setTimeout(() => {
        $.get('http://' + ip + '/api/gettable2?s=' + data.製令單號, function (data, status) {
            console.log(data)
            for (var j = 0; j < data.length; j++) {
                datas(data[j]);
            }

        });
        }, 500)
    }, 300)
    
    
}
$( document ).ready(function() {
    DataCheck();
    setTimeout(() => {
        getList();
    }, 500)
    
});

function datas(data){
    var content=
    `
    <tr>
        <td>
        <input class="form-check-input" type="radio" name="${data.製令單號}" value="${data.部位名稱}">
        ${data.部位名稱}
        </td>
        <td>${data.材料}</td>
      </tr>
    `
    $('#datas' + data.製令單號).append(content);
}

function getList(){ //顯示內容
    $.get('http://' + ip + '/api/GetHighFrequency',function(data,status){
        for (var i = 0; i < data.length; i++){
            console.log(data[i]);
            newList(data[i]);
        }
    });
}

function section(rid){
    var obj = document.getElementsByName(rid);
	var selected=[];
	for (var i=0; i<obj.length; i++) {
		if (obj[i].checked) {
                selected.push(obj[i].value);
        }
    }
    var sections = selected.join();
    if(selected.length != 0){
        $.post('http://' + ip + '/api/UpdateHighFrequencySection', { '部位': sections, '製令單號': rid }, function (res) {

        });
    }
    
    setTimeout(() => {
        location.reload()
    }, 500)
}

function DataCheck(){
    $.get('http://' + ip + '/api/gettable1', function (data,status) {
        for(var i = 0; i < data.length; i++){
            $.get('http://' + ip + '/api/GetHighFrequencyTable', {'rid': data[i].製令單號}, function (data,status) {
                var percent = 0;
                var total = 0;
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    percent += parseInt(data[i].數量);
                    total += parseInt(data[i].總數量);
                }
                percent = total - percent;
                percent = ((percent / total)*100).toFixed(0);

                setTimeout(() => {
                    $.post('http://' + ip + '/api/UpdateHighFrequencyPercent', { '派工進度': percent, '製令單號': data[0].製令單號 }, function (res) {
                        console.log("製令單" + data[0].製令單號 + " 派工進度" + percent + " 已更新")
                    });
                }, 100)
                

            })
        }
    })
    
}

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



