var url = location.search;
var number;  // 派工單編號
var urls; // 儲url分隔
var stringsss = ""
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    // str.split("=")[0] 為 userID
    urls = str.split("=");
    urls.shift();
    console.log(urls)
    number = str.split("=")[1];

    
}
if (number == undefined) {
    number = '';
}


$(document).ready(function() {
    for(var i = 0;i<urls.length;i++){
        loading(urls[i], "ID" + String(i))
    }

});

async function loading(number, amount) {
    //await printmultipleqrcode(number);
    await ShowData(number, amount);
}

async function changenfc(nfcid){
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
        var newurl = location.href.split("=");
        console.log(nfc, nfcid, newurl);
        newurl[newurl.indexOf(nfcid)] = nfc;

        var newlink = "";
        newlink = newurl.join("=")
        console.log(newlink)
        window.location.replace(
            newlink,
        );
    }, 500)
}


function ShowData(number, amount){
    
    
    // var url = location.search;
    // var number;  // 派工單編號
    // var urls; // 儲url分隔
    // if (url.indexOf("?") != -1) {
    //     var str = url.substr(1);
    //     // str.split("=")[0] 為 userID
    //     urls = str.split("=");
    //     number = str.split("=")[1];
    //     for(var i = 1;i<urls.length;i++){
    //         console.log(urls[i]);
    //     }
    // }
    // if (number == undefined) {
    //     number = '';
    // }
    setTimeout(() => {
        $.get('http://' + ip + '/api/PrintCutting', {'number': number}, function (data,status) {
            console.log(data)
        var rid = data[0].製令單號;       
        $.get('http://' + ip + '/api/getTable1Info', {'orderNumber': rid}, function (data,status) {

            var content = 
            `
            <div class="p-2 bd-highlight" style="font-size: 20px;">製令：${data[0].製令單號}</div>
            <div class="p-2 bd-highlight" style="font-size: 20px;">型體 #：${data[0].型體編號}</div>
            <div class="p-2 bd-highlight" style="font-size: 20px;">LOGO：${data[0].logo}</div>
            `;
            $('#ids').append(content);
            document.getElementById("ids").setAttribute("id", "done");

            var content =
            `
                <div class="p-2 bd-highlight" style="padding: 0%!important; font-size: 20px;">配色：${data[0].顏色}</div>
                <div class="p-2 bd-highlight" style="padding: 0%!important; font-size: 20px;">鞋型：${data[0].型體名稱}</div>
                <div class="p-2 bd-highlight" style="padding: 0%!important; font-size: 20px;">大底：${data[0].大底}</div>
                <div class="p-2 bd-highlight" style="padding: 0%!important; font-size: 20px;">楦頭：${data[0].楦頭}</div>
                <button type="button" class="btn btn-danger" name="${data[0].部位}" id="removebutton_${number}" value="${number}" onclick="delete_button(this.value)">刪除派工單</button>
                
            `;
            $('#information').append(content);
            document.getElementById("information").setAttribute("id", "done");

                if (number.length >= 5){
                    var nfc = 
                    `
                    <div class="col-12" style="font-size: 15px;">NFC TAG ${number}</div>
                    `;
                    document.getElementById("removebutton_" + number).style.display = "none";
                }else{
                    var nfc = 
                    `
                    <div class="col-5" style="font-size: 15px;">NFC TAG</div>
                    <div class="col-7" id="nfcarea">
                        <button type="button" class="btn btn-success" id="nfcbutton${number}" data-bs-toggle="modal" data-bs-target="#NFC${number}">綁定NFC</button>
                    </div>
            
                    <div class="modal fade" id="NFC${number}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <input type="text" class="form-control" placeholder="NFC ID" aria-label="Username" aria-describedby="addon-wrapping" id="NFCsearch${number}" onkeydown="inputtest(this.id)">
                                    </div>
                                    <thead style="background-color: #EDEDED;">
                                        <tr>
                                            <th scope="col">NFC ID</th>
            
                                        </tr>
                                    </thead>
                                    <tbody style="background-color: #F7F7F7;" id="NFCDATA${number}">
                                    
                                    
                                    </tbody>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" id="${number}" onclick="changenfc(this.id)" data-bs-dismiss="modal">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    `;
                }
                $('#area').append(nfc);
                document.getElementById("area").setAttribute("id", "done");

            });


        $.get('http://' + ip + '/api/getMaterial', {'orderNumber': data[0].製令單號, 'section':data[0].部位}, function (data,status) {
            var content = 
            `
            <div class="p-2 bd-highlight" style="font-size: 20px;">材料: ${data[0].材料}</div>
            `;
            $('#material').append(content);
            document.getElementById("material").setAttribute("id", "done");
        });
        for(var i=0;i < 15; i++){
            if(i < data.length){
                var content = 
                    `
                    <td style="width: 5.3333%;">${data[i].尺寸}</td>
                    `;
            }else{
                var content = 
                    `
                    <td style="width: 5.3333%;"></td>
                    `;
            }
            $('#SIZE').append(content);
        }
        var content = 
                    `
                    <td style="width: 5.3333%; text-align: center;">合計</td>
                    `;
        $('#SIZE').append(content);
        document.getElementById("SIZE").setAttribute("id", "done");
        var sum=0;
        for(var i=0;i < 15; i++){
            if(i < data.length){
                sum += parseInt(data[i].數量);
                var content = 
                    `
                    <td style="width: 5.3333%;">${data[i].數量}</td>
                    `;
            }else{
                var content = 
                    `
                    <td style="width: 5.3333%;"></td>
                    `;
            }
            
            $('#QTY').append(content);
        }
        var content = 
                    `
                    <td style="width: 5.3333%; text-align: center;">${sum}</td>
                    `;
        $('#QTY').append(content);
    
        document.getElementById("QTY").setAttribute("id", "done");
        for(var i=0;i < 16; i++){
            if(i < 1){
                var content = 
                    `
                    <td style="width: 10%;">${data[0].部位}</td>
                    `;
            }else{
                var content = 
                    `
                    <td style="width: 5.3333%;"></td>
                    `;
            }
            $('#section').append(content);
        }
        document.getElementById("section").setAttribute("id", "done");
        console.log(document.getElementById("trytry"))

        

        //printmultipleqrcode(number)
        document.getElementById("trytry").setAttribute("id", String(amount));
        });
    }, 70)
    
    setTimeout(() => {
        NFCID(number)
    }, 100);
        
}

async function delete_button(numbers) {
    
    var msg = "將回復至尚未派工狀態，是否確認移除?";
    var percent = 0
    if (confirm(msg) == true) {
        $.get('http://' + ip + '/api/getTable4Info', {'workorderNumber': numbers}, function (data,status) {
            for(var i = 0;i< data.length;i++){
                console.log(data[i]);
                $.post('http://' + ip + '/api/updatesizenum', { 'num': data[i].數量, 'size': data[i].尺寸,'location': data[i].部位,'numlist':data[i].製令單號}, function (res) {
                    
                }); // UPDATE table3 SET 數量=? WHERE 尺寸=? AND 部位名稱 = ? AND 製令單號 = ?
            // 用於回復派工前的數量
            }
            
            $.get('http://' + ip + '/api/getMaterial1', {'orderNumber': data[0].製令單號, 'section': data[0].部位}, function (sum,status) {
                percent = sum[0].總數量
                console.log('getMaterial1  ' + percent)
                $.get('http://' + ip + '/api/Sumtable3', {'rid': sum[0].製令單號, 'section': sum[0].部位名稱}, function (dataa,status) {
                    console.log(dataa[0].數量)
                    percent = ((1-(dataa[0].數量 / percent)) * 100).toFixed(0)
                    console.log(percent)
                })
                setTimeout(() => {
                    $.post('http://' + ip + '/api/updateschedule', {'派工進度': percent, '部位名稱': sum[0].部位名稱, '製令單號': sum[0].製令單號}, function (dataa,status) {
                    })

                    
                }, 100)
            })
            

            
            $.get('http://' + ip + '/api/RemoveTable4FromWorkorderNumber', { 'id': data[0].製令單號, 'WorkorderNumber': numbers}, function (datas,status) {
               console.log(datas)     
            });

        }); // SELECT * FROM table4 WHERE 製令單號 = ? AND 部位 = ? AND 派工時間 = ?
        
        
        console.log("#" + number +".tab-content" + "被移除了");

        
        setTimeout(() => {
            alert("已完工刪除!")
            
            if(urls.length == 1){
                window.close()
            }else{
                $("#ID" + urls.indexOf(numbers)).remove()
            }
                
            
        }, 200)
    }
    
    
}


// async function printmultipleqrcode(queue){
//     console.log(queue)
//     var url = "http://"+ ip + "CuttingDispatchListPDF.html?nfcid=" + queue;

//     var getqrcode = new QRCode(document.getElementById("qrcode"), {
//     text: url,
//     width: 128,
//     height: 128,
//     colorDark : "#000",
//     colorLight : "#fff",
//     correctLevel : QRCode.CorrectLevel.H
//     });

//     await document.getElementById("qrcode").setAttribute("id", "done");
// }

async function NFCID(nfcid){
    await $.get('http://' + ip + '/api/GetNFCIDList', function (data, status) {
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
    
    await document.getElementById("NFCDATA"+nfcid).setAttribute("id", "done");
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