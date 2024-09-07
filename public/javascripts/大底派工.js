var z1, z2, z3;

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

function delete_button(name, time,value) {
    
    var msg = "將回復至尚未派工狀態，是否確認移除?";

    if (confirm(msg) == true) {
        $.get('http://' + ip + '/api/getTable4Info3', {'workorderNumber': rid,'location': name,'time': time}, function (data,status) {
            for(var i = 0;i< data.length;i++){
                console.log(data[i]);
                $.post('http://' + ip + '/api/updatesizenum', { 'num': data[i].數量, 'size': data[i].尺寸,'location': data[i].部位,'numlist':rid}, function (res) {
                    
                }); // UPDATE table3 SET 數量=? WHERE 尺寸=? AND 部位名稱 = ? AND 製令單號 = ?
            // 用於回復派工前的數量
            }
            $.post('http://' + ip + '/api/RemoveTable4', { 'id': rid, 'time': time}, function (res) {
                    
            });
        }); // SELECT * FROM table4 WHERE 製令單號 = ? AND 部位 = ? AND 派工時間 = ?
        
        setTimeout(function() {
            updateschedule(name, rid);
          }, 300);
        
        $("#" + value +".tab-content").remove();
        console.log("#" + value +".tab-content" + "被移除了");
    }

    
    
}

function updateschedule(name, rid){
    $.get('http://' + ip + '/api/selectgettable3', {'s': rid,'s1': name}, function (data,status) {
            var sum = 0;
            for(var i = 0;i<data.length;i++){
                console.log(data[i])
                sum += parseInt(data[i].數量);
                console.log("該筆資料總數為" + sum)
            }
            $.get('http://' + ip + '/api/getDB6total', {'a': rid,'b': name}, function (data,status) {
                // a 製令單號  b 部位名稱
                var schedule = parseInt(data[0].總數量);
                console.log("table6 總數量" + schedule);
                schedule = (1 - (sum / schedule).toFixed(2)) * 100;
                $.post('http://' + ip + '/api/updateschedule', {'派工進度': schedule.toFixed(0),'部位名稱': name,'製令單號': rid}, function (res) {
                    console.log('進度已更新為' + schedule.toFixed(0));
                });
            });
        });

    setTimeout(function() {
    $.get('http://' + ip + '/api/gettable2', {'s': rid}, function (data,status) {
        var schedulesum = 0;
        for(var i = 0; i < data.length; i++){
            schedulesum += parseInt(data[i].派工進度);
        }
        console.log("目前進度" + schedulesum + "總百分比" + data.length*100);
        schedulesum = (schedulesum / (data.length*100))*100;
        

        
            $.post('http://' + ip + '/api/updateschedule2', { '派工進度': schedulesum, '製令單號': rid }, function (res) {
            });
        
        
    });
    }, 400);
}
        
        

function newList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    var time1 = new Date(data.派工時間).format("yyyy-MM-dd hh:mm:ss");
    if(data.列印狀態 == "列印完成"){
        var content =
        `<div class="tab-content" id="${time1}">
        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 5%;">
                        <input type="checkbox" value="'${data.派工單編號}'" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px; cursor: not-allowed;" disabled>
                    </td> 
                    <td style="width: 10%; text-align: center; color:#888888;">${data.製令單號}</td>
                    <td style="width: 10%; text-align: center; color:#888888;">${data.部位}</td>
                    <td style="width: 20%; text-align: center; color:#888888;">${time1}</td>
                    <td style="width: 10%; text-align: center; color:#888888;">${data.列印狀態}</td>
                    <td style="width: 45%; text-align: center; cursor: not-allowed;" >
                        <button type="button" class="btn btn-outline-dark" disabled>預覽派工單</button>
                        <button type="button" class="btn btn-outline-danger" disabled>刪除派工單</button>
                        <button type="button" class="btn btn-outline-dark" hidden disabled>品質管理</button>
                    </a>                                                  
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
                    <td style="width: 5%;">
                    <input type="checkbox" value="${data.派工單編號}" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px;";>
                    </td> 
                    <td style="width: 10%; text-align: center;">${data.製令單號}</td>
                    <td style="width: 10%; text-align: center;">大底</td>
                    <td style="width: 20%; text-align: center;">${time1}</td>
                    <td style="width: 10%; text-align: center;">${data.列印狀態}</td>
                    <td style="width: 45%; text-align: center;">
                        <button class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#NFC${data.派工單編號}" hidden>
                            NFC綁定
                        </button>

                    <a href="大底派工pdf.html?nfcid=${data.派工單編號}" target="_blank" style="text-decoration:none;">
                        <button type="button" class="btn btn-outline-dark">預覽派工單</button>
                    </a>
                        
                    <button type="button" class="btn btn-outline-danger" name="${data.部位}" id="${time1}" value="${data.派工單編號}" onclick="delete_button(this.name, this.id, this.value)" >刪除派工單</button>
                    <!-- Modal -->
                    <a href="QualityControl.html?orderNumber=${rid}&Cutting=${data.派工單編號}" style="text-decoration:none;">
                        <button type="button" class="btn btn-outline-primary" hidden>品質管理</button>
                    </a>   
                          
                        
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
                        <div class="input-group flex-nowrap mb-2">
                            <span class="input-group-text" id="addon-wrapping">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" placeholder="NFC ID" aria-label="Username" aria-describedby="addon-wrapping" id="NFCsearch${data.派工單編號}" onkeydown="inputtest(this.id)">
                        </div>
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
                <td style="width: 5%;">
                <input type="checkbox" value="${data.派工單編號}" name="batch_print" style="height: 18px;width: 18px;margin-left: 10px;margin-right: 10px; margin-top: 3px;";>
                </td> 
                <td style="width: 10%; text-align: center;">${data.製令單號}</td>
                <td style="width: 10%; text-align: center;">大底</td>
                <td style="width: 20%; text-align: center;">${time1}</td>
                <td style="width: 10%; text-align: center;">${data.列印狀態}</td>
                <td style="width: 45%; text-align: center;">
                <span class="badge bg-success">NFC 已綁定</span>
                <a href="大底派工pdf.html?nfcid=${data.派工單編號}" target="_blank" style="text-decoration:none;">
                    <button type="button" class="btn btn-outline-dark">預覽派工單</button>
                </a>
                    
                <a style="cursor: not-allowed; text-decoration:none;">
                    <button type="button" class="btn btn-danger" name="${data.部位}" id="${time1}" value="${data.派工單編號}" onclick="delete_button(this.name, this.id, this.value)" disabled>刪除派工單</button>
                </a>
                <!-- Modal -->
                <a href="QualityControl.html?orderNumber=${rid}&大底=${data.派工單編號}" style="text-decoration:none;">
                    <button type="button" class="btn btn-outline-primary" hidden>品質管理</button>
                </a>   
                        
                    
                </td>
                </tr>
            
            </tbody>
    </table>


</div>`;
    }
    var nfcid = data.派工單編號;
    
    $('#xxx').append(content);

    console.log(nfcid)
    setTimeout(() => {
        NFCID(nfcid)
    }, 100);
        
        

}

function inputtest(id){
    var listid = id.replace("NFCsearch", ""); //用於抓取派工單編號
    var input = document.getElementById(id);
    var inputdata = input.value;
    if (inputdata == ""){
        $("#NFCDATA" + listid).empty();
        setTimeout(() => {
            NFCID(listid);
        }, 100);
    }else{
        $("#NFCDATA" + listid).empty();
        console.log(inputdata);
        setTimeout(() => {
            SearchNFCID(listid, inputdata)
        }, 100);
    }

    
    
    
}

function SearchNFCID(nfcid, search){
    $.get('http://' + ip + '/api/CheckNFCIDListSearch?ID='+search, function (data, status) {
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
            `;
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
    }, 500)
}
function printpdf(){
    var pdfip = 'http://'+ ip +'/大底派工pdf.html?nfcid';
    check = $("input[name='batch_print']:checked")
    for (var i = 0; i < check.length ; i++) {
    console.log(check[i].value)
    pdfip += '=' + check[i].value;
    // urls.push("http://127.0.0.1/CuttingDispatchListPDF.html");
    }
    if (check.length == 1) pdfip = "http://127.0.0.1/大底派工pdf.html?nfcid="+ check[0].value
    parent.open(pdfip);

}

function getbuttonBatchdispatch() { //顯示內容
    document.getElementById("nfctag").setAttribute("disabled", "disabled");

    document.getElementById('xxx').innerHTML = "";
    document.getElementById('size').innerHTML = "";
    document.getElementById('num').innerHTML = "";
    $(".on_changes option").remove();
    


    var s = 'http://' + ip + '/api/gettable2?s=' + rid;


    $.get(s, function (data, status) {

        for (var i = 0; i < data.length; i++) {
            getbuttonBatchdispatchList(data[i]);

        }

    });
    var s1 = 'http://' + ip + '/api/nfcid';
    $.get(s1, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getnfcid(data[i]);
            //console.log(data[i].NFCID);

        }

    });

}


function showlist(data1, data2, data3) {
    z1 = data1;
    z2 = data2;
    z3 = data3;

    document.getElementById('id1').innerHTML = "";
    document.getElementById('id2').innerHTML = "";
    document.getElementById('id3').innerHTML = "";
    document.getElementById('id4').innerHTML = "";
    document.getElementById('id5').innerHTML = "";
    document.getElementById('id6').innerHTML = "";


    buttondown(data1, data2, data3);


    console.log(data1, data2, data3);

    var s = 'http://' + ip + '/api/gettable1Info?orderNumber=' + data1;

    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            showlist1(data[i]);
        }
    });


    var s1 = 'http://' + ip + '/api/getMaterial1?orderNumber=' + data1 + "&section=" + data2;

    $.get(s1, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            showlist2(data[i]);
        }
    });

    var s2 = 'http://' + ip + '/api/getTable4Info3?workorderNumber=' + data1 + "&location=" + data2 + "&time=" + data3;

    $.get(s2, function (data, status) {
        showlist5();
        for (var i = 0; i < 15; i++) {
            showlist3(data[i]);
        }
        showlist4();
    });





}

function showlist1(data) {
    var content =
        `
        <div class="col" >
            製令：${data.製令單號}
        </div>
        <div class="col" style="white-space:nowrap;">
            型體＃：${data.型體編號}
        </div>
        <div class="col">
            LOGO：${data.logo}
        </div>

    `;
    $('#id1').append(content);

    var content1 =
        `
    <div class="col" style="padding-left:0px;">
        <div class="row">配色：${data.顏色}</div>
        <div class="row">鞋型：${data.型體名稱}</div>
        <div class="row">大底：${data.大底}</div>
        <div class="row">楦頭：${data.楦頭}</div>
                    
    </div>
 
    <div class="col" style="border-style:solid;">
        NFC TAG
    </div>
    `;
    $('#id3').append(content1);

}
function showlist2(data) {

    var content =
        `
    <div class="col">
    材料：${data.材料}
    </div>

    `;
    $('#id2').append(content);

    var content =
        `
    <td style="width: 10%;" >${data.部位名稱}</td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 5.3333%;"></td>
    <td style="width: 10%; text-align: center;"></td>


    `;
    $('#id6').append(content);






}

function showlist3(data) {

    if (data != undefined) {
        var content =
            `
        <td style="width: 5.3333%;">${data.尺寸}</td>
        `;
        $('#id4').append(content);


    }
    else {
        var content =
            `
        <td style="width: 5.3333%;"></td>
        `;
        $('#id4').append(content);

    }

    if (data != undefined) {
        var content =
            `
        <td style="width: 5.3333%;">${data.數量}</td>
        `;
        $('#id5').append(content);


    }
    else {
        var content =
            `
        <td style="width: 5.3333%;"></td>
        `;
        $('#id5').append(content);

    }



}
function showlist4() {

    var content =
        `
    <td style="width: 10%;" >合計</td>

    `;
    $('#id4').append(content);

    var content =
        `
    <td style="width: 10%;" ></td>

    `;
    $('#id5').append(content);

}

function showlist5() {

    var content =
        `
    <td style="width: 10%;" >SIZE#</td>

    `;
    $('#id4').append(content);

    var content =
        `
    <td style="width: 10%;" >QIY</td>

    `;
    $('#id5').append(content);

}


getList();
function getList() { //顯示內容
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

    var s = 'http://' + ip + '/api/getTable4Info2?workorderNumber=' + rid;
    $.get(s, function (data, status) {

        var x = 0;
        var y = 0;


        for (var i = 0; i < data.length; i++) {

            if (data[i].部位 != x) {
                newList(data[i]);
                x = data[i].部位;
                y = data[i].派工時間;
            }
            else {
                if (data[i].派工時間 != y) {
                    newList(data[i]);
                    y = data[i].派工時間;

                }
                else {
                    continue;

                }

            }
        }
    });
}

function print_end() {
    console.log(check_counter + ' ' + check.length);
    if (check_counter < check.length) {
        console.log(' check_counter' + check_counter + ' check.length' + check.length);
        console.log('執行batch');

        batch_print();



    } else {
        console.log('end button');
        location.reload();
    }
}

function printdiv
(printpage) {

    var msg = "是否列印此派工單？";

    if (confirm(msg) == true) {
        var newstr = printpage.innerHTML;
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = newstr;
        window.print();
        document.body.innerHTML = oldstr;

        console.log('print' + '列印完成' + 'no' + z1 + 'location' + z2 + 'time' + z3);
        $.post('http://' + ip + '/api/updateprint', { 'print': '列印完成', 'no': z1, 'location': z2, 'time': z3 }, function (res) {
        });
    }
    print_end();



}
function bt() {
    var div_print = document.getElementById("div_print");
    printdiv(div_print);


}

function reload(){
    location.reload();
}
/*
window.onload = function () {

    var bt = document.getElementById("bt");
    var div_print = document.getElementById("div_print");
    bt.onclick = function () {
        printdiv(div_print);
    }
}
*/
function buttondown(data1, data2, data3) {



    var s = 'http://' + ip + '/api/gettable4print?製令單號=' + data1 + '&部位=' + data2 + '&派工時間=' + data3;



    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            buttonList(data[i]);
        }
    });

}

function buttonList(data) {

    document.getElementById('buttondown').innerHTML = "";
    var toggle; //<---
    if(last)
        toggle='data-bs-dismiss="modal" onclick="batch_print()"';
    else
        toggle=' onclick="batch_print()"';   //<---

    if (data.列印狀態 == '尚未列印') {
        var content =
            `

            <button type="button" class="btn btn-secondary" ` + toggle + `>關閉</button> 
            <button type="button" class="btn btn-primary"  id="bt" onclick="bt();">列印</button>

    `;
        $('#buttondown').append(content);

    }
    else {

        var content =
            `

        <button type="button" class="btn btn-secondary" ` + toggle + `>關閉</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="bt" disabled>列印</button>

            `;
        $('#buttondown').append(content);



    }
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