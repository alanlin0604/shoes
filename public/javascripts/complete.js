gettable();

var rid;

function gettable(){
    var url = location.search;
    
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        //console.log(str);
        // str.split("=")[0] 為 userID
        rid = str.split("=")[1];
    }
    if (rid == undefined) {
        rid = '';
    }
    
    console.log(rid);
    // number 是指製令單號

   

    $.get('http://' + ip + '/api/getTable4Info2?workorderNumber=' + rid, function (data, status) {
        for(var i = 0; i < data.length ; i++){
            var percent;
            percent = (( data[i].完成數量 / data[i].數量 ) *100).toFixed(1);
            $.post('http://' + ip + '/api/updateDB4', { '完成總數量': data[i].完成數量, '目前進度': percent, '製令單號': rid, '部位': data[i].部位, '尺寸': data[i].尺寸 }, function (res) {
                    //UPDATE table4 SET 完成總數量 = ? , 目前進度 = ? WHERE 製令單號 = ? AND 部位 = ? AND 尺寸 = ?
            });

            $.get('http://' + ip + '/api/editTable4', { '完成數量': data[i].完成數量, '完成總數量': data[i].完成數量, '未完成數量': data[i].數量 - data[i].完成數量, '派工單編號': rid, '部位': data[i].部位, '尺寸': data[i].尺寸}, function (res) {
                //UPDATE table4 SET 完成數量 = ? , 完成總數量 = ? , 未完成數量 = ? WHERE 派工單編號 = ? AND 部位 = ? AND 尺寸 = ?
            });

            newList(data[i]);
        }
        
    });
}

function editTable4(id, value){
    var amount = 0;  
    amount = parseInt(prompt("請輸入完成數量"));
    
    $.get('http://' + ip + '/api/editTable4', { '完成數量': amount, '未完成數量': amount,'製令單號': rid, '部位': id, '尺寸': value}, function (res) {

    });
    
    location.reload();
}

function newList(data){
    var content = 
        `<div class="tab-content" id="${data.製令單號}">




            <table class="table">
                        <tbody>
                        <tr>
                        <td style="width: 15%;">${data.製令單號}</td>
                        <td style="width: 10%;">${data.部位}</td>
                        <td style="width: 10%;">${data.尺寸}</td>
                        <td style="width: 10%;">${data.數量}</td>
                        <td style="width: 10%;">${data.完成數量}</td>
                        <td style="width: 10%;">${data.未完成數量}</td>

                        <td style="width: 20%; " >
                        <div class="container">
                        <div class="row">
                        <div class="col-sm-8" style="padding-left:0px">
                
                            <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${data.目前進度}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </div>
                            <div class="con-sm-4" style="font-size:10px;padding-left:0px;"> ${data.目前進度}%</div>
                            </div>
                            </div>
                            </div>
                        </td>
                    
                        <td style="width: 15%;" >
                                <button type="button" id="${data.部位}" value="${data.尺寸}" class="btn btn-warning" onClick="editTable4(this.id, this.value)">編輯</button>


                    
                            
                        </td>
                        </tr>
                    
                    </tbody>
        </table>
        

        </div>`;
        $('#xxx').append(content);
}