var url = location.search;
var rid;
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    // str.split("=")[0] 為 userID
    rid = str.split("=")[1];
    }
if (rid == undefined) {
    rid = '';
}

$(document).ready(function() {
    GetTable()
})

var DispatchList = [];

function GetTable(){
    $.get('http://' + ip + '/api/GetHighFrequencyTable', {'rid': rid}, function (data,status) {
        for(var i = 0; i < data.length; i++){
            DispatchList.push(data[i].派工單編號);
            console.log(data[i])
        }    
    
    })
    setTimeout(() => {
        console.log(DispatchList);
        DispatchList = DispatchList.filter(el => el);
        DispatchList = new Set(DispatchList);
        console.log(DispatchList)
        DispatchList.forEach(function(value) {
            $.get('http://' + ip + '/api/GetHighFrequencyTableList', {'製令單號': rid, '派工單編號': value}, function (data,status) {
                newList(data[0]);
            })
          });
    },100)
    
}

function newList(data){
    var time1 = new Date(data.派工時間).format("yyyy-MM-dd hh:mm:ss");
    if(data.列印狀態 == "列印完成"){
        var content =
        `<div class="tab-content" id="${time1}">

        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 4%;">
                        <input type="checkbox" value="${data.派工單編號}" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px; cursor: not-allowed;" disabled>
                    </td> 
                    <td style="width: 20%; text-align: center; color:#888888;">${data.製令單號}</td>
                    <td style="width: 24%; text-align: center; color:#888888;">${time1}</td>
                    <td style="width: 24%; text-align: center; color:#888888;">${data.列印狀態}</td>
                    <td style="width: 28%; text-align: center; cursor: not-allowed;" >
                        <button type="button" class="btn btn-outline-dark" disabled>預覽派工單</button>
                        <button type="button" class="btn btn-outline-danger" disabled>刪除派工單</button>
                        <!--<button type="button" class="btn btn-outline-primary" disabled>品質管理</button>-->
                          
                        
                    </td>
                    </tr>
                
                </tbody>
       </table>
    

    </div>`;
    }else if(parseInt(data.派工單編號) <= 1000){
            var content =
            `<div class="tab-content" id="${data.派工單編號}">
    
            <table class="table">
                        <tbody>
                        <tr>
                        <td style="width: 4%;">
                        <input type="checkbox" value="${data.派工單編號}" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px;";>
                        </td> 
                        <td style="width: 20%; text-align: center;">${data.製令單號}</td>
                        <td style="width: 24%; text-align: center;">${time1}</td>
                        <td style="width: 24%; text-align: center;">${data.列印狀態}</td>
                        <td style="width: 28%; text-align: center;">
                        <!--<button class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#NFC${data.派工單編號}">
                            NFC綁定
                        </button>-->

                        <a href="HighFrequencyDispatchListPDF.html?nfcid=${data.派工單編號}" target="_blank" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-dark">預覽派工單</button>
                        </a>
                            
                        <button type="button" class="btn btn-outline-danger" name="${data.部位}" id="${time1}" value="${data.派工單編號}" onclick="delete_WorkOrderNumber(this.value)" >刪除派工單</button>
                        <!-- Modal -->
                        <!--<a href="QualityControl.html?orderNumber=${rid}&HighFrequency=${data.派工單編號}" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-primary" >品質管理</button>
                        </a>->
                              
                            
                        </td>
                        </tr>
                    
                    </tbody>
           </table>
        
        
           <div class="modal fade" id="NFC${data.派工單編號}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollablemodal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4><strong>NFC綁定</strong></h4>
                        <div class="text-right">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div class="modal-body">
                    <table class="table table-bordered">
                        <thead style="background-color: #EDEDED;">
                            <tr>
                                <th scope="col">NFC ID</th>

                            </tr>
                        </thead>
                        <tbody style="background-color: #F7F7F7;" id="NFCDATA${data.派工單編號}">
                        
                        
                        </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-success" id="${data.派工單編號}" onclick="changenfc(this.id)" data-bs-dismiss="modal">確認</button>
                    </div>
                </div>
            </div>
        </div>

        </div>`;

    }else{
        var content =
        `<div class="tab-content" id="${data.派工單編號}">

        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 4%;">
                    <input type="checkbox" value="${data.派工單編號}" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px;";>
                    </td> 
                    <td style="width: 20%; text-align: center;">${data.製令單號}</td>
                    <td style="width: 24%; text-align: center;">${time1}</td>
                    <td style="width: 24%; text-align: center;">${data.列印狀態}</td>
                    <td style="width: 28%; text-align: center;">
                    <span class="badge bg-success">NFC 已綁定</span>

                    <a href="HighFrequencyDispatchListPDF.html?nfcid=${data.派工單編號}" target="_blank" style="text-decoration:none;">
                        <button type="button" class="btn btn-outline-dark">預覽派工單</button>
                    </a>
                        
                    <a style="cursor: not-allowed; text-decoration:none;">
                        <button type="button" class="btn btn-danger" name="${data.部位}" id="${time1}" value="${data.派工單編號}" onclick="delete_WorkOrderNumber(this.value)" disabled>刪除派工單</button>
                    </a>
                    <!-- Modal -->
                    <!--<a href="QualityControl.html?orderNumber=${rid}&HighFrequency=${data.派工單編號}" style="text-decoration:none;" hidden>
                        <button type="button" class="btn btn-outline-primary">品質管理</button>
                    </a>-->
                          
                        
                    </td>
                    </tr>
                
                </tbody>
       </table>
    

    </div>`;
    }
    
    var nfcid = data.派工單編號;
    
    $('#xxx').append(content);

    setTimeout(() => {
        NFCID(nfcid)
    }, 100);
    

}
function NFCID(nfcid){
    $.get('http://' + ip + '/api/GetNFCIDList', function (data, status) {
        for(var i = 0; i < data.length; i++){
            var content3 =
            `
            <tr>
                <td>
                <input class="form-check-input" type="radio" name="NFC${nfcid}" value="${data[i].NFCID}">
                    ${data[i].NFCID}
                </td>
            </tr>
            `
            $('#NFCDATA' + nfcid).append(content3);
        }
    })
    
}

function changenfc(nfcid){
    var obj = document.getElementsByName("NFC" + nfcid);
	var selected = [];
	for (var i=0; i<obj.length; i++) {
		if (obj[i].checked) {
                selected.push(obj[i].value);
        }
    }
    var nfc = selected.join();

    if(selected.length != 0){
        $.get('http://' + ip + '/api/NFCRegister', { 'new': nfc, 'old': nfcid}, function (res) {

        });
    }

    setTimeout(() => {
        location.reload()
    }, 100)
}

function printpdf(){
    var pdfip = 'http://'+ ip +'/HighFrequencyMultiplepdf.html?nfcid';
    check = $("input[name='batch_print']:checked")
    for (var i = 0; i < check.length ; i++) {
    console.log(check[i].value)
    pdfip += '=' + check[i].value;
    // urls.push("http://127.0.0.1/CuttingDispatchListPDF.html");
    }
    if (check.length == 1) pdfip = "http://127.0.0.1/HighFrequencyDispatchListPDF.html?nfcid="+ check[0].value
    parent.open(pdfip);

}

function delete_WorkOrderNumber(WorkOrderNumber){
    $.get('http://' + ip + '/api/GetHighFrequencyTableList', {'製令單號': rid, '派工單編號': WorkOrderNumber}, function (data,status) {
        for(var i = 0; i < data.length;i++){
            $.post('http://' + ip + '/api/UpdateHighFrequencyTable', { '數量': data[i].總數量,'完成數量': 0,'派工時間': null,'派工單編號': null,'製令單號': rid,'尺寸': data[i].尺寸,'總數量': data[i].總數量}, function (res) {

            });
        }
        

        
    })
    setTimeout(() => {
        $.get('http://' + ip + '/api/GetHighFrequencyTable', {'rid': rid}, function (data,status) {
            var percent = 0;
            var total = 0;
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                percent += parseInt(data[i].數量);
                total += parseInt(data[i].總數量);
            }
            percent = total - percent;
            percent = ((percent / total)*100).toFixed(0);
            $.post('http://' + ip + '/api/UpdateHighFrequencyPercent', { '派工進度': percent, '製令單號': rid }, function (res) {
                console.log("製令單" + rid + " 派工進度" + percent + " 已更新")
            });
        })
    }, 200)
    $("#" + WorkOrderNumber +".tab-content").remove();
        console.log("#" + WorkOrderNumber +".tab-content" + "被移除了");
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
