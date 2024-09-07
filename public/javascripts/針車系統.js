var total;
var total2;
var all1 = 0;
var all2;
var all3 = 0;

//分組派工畫面
function getGroupdispatchList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    if (data.派工進度 == 100) {
        var content =
            `
        <tr>
                    
                        <td style="width: 10%;">
                            <div class="form-check" style="cursor:not-allowed;">
                                <input class="form-check-input" type="radio" name="test1" id="flexRadioDefault1" value="${data.製令單號}" disabled>
                                <label class="form-check-label" for="flexRadioDefault1" style="color:#757575;">
                                    ${data.製令單號}
                             
                                </label>
                            </div>
                            
                        </td>
                        <td style="width: 10%;  text-align: center;">針車</td>
                        <td style="width: 20%; text-align: center;">${data.原本數量}</td>
                        <td style="width: 8%; text-align: center;">雙</td>
                        <td style="width: 10%; color:#8C8C8C; text-align: center;">${data.上傳時間}</td>
                        <td style="width: 10%;color:#8C8C8C; text-align: center;">${data.完成狀態}</td>
                        <td style="width: 25%;color:#8C8C8C;">
                        <div class="container" >
                        <div class="row">
                            <div class="col-sm-11" style="padding-left:0px;">
                                <div class="progress">
                                    <div class="progress-bar bg-success" role="myprogressbar" style="width:${data.派工進度}% ; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                                <div class="col-sm-1" id="progressbartext" style="font-size:10px;padding-left:0px;">${data.派工進度}%</div>
                        </div>
                    </div>    
                        </td>
                        <td style="width: 20%;">
                        <!--<button type="button" class="btn btn-dark disabled" onclick=Directdispatch()>直接派工</button>
                        <button type="button" class="btn btn-success disabled" onclick=getbuttonGroupdispatchsize() style="display:${editClass}"" id="edit${data.ID}">分組派工</button>
                        -->
                        </td>

                    </tr>
               
    `;

        $('#xxx').append(content);



    }
    else {
        var content =
            `
        <tr>
                    
                        <td style="width: 10%;">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="test1" id="flexRadioDefault1" value="${data.製令單號}" onchange="getbuttonGroupdispatchsize()">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    ${data.製令單號}
                             
                                </label>
                            </div>
                            
                        </td>
                        <td style="width: 10%;  text-align: center;">針車</td>
                        <td style="width: 20%; text-align: center;">${data.原本數量}</td>
                        <td style="width: 8%; text-align: center;">雙</td>
                        <td style="width: 25%;">
                        <div class="container" >
                    <div class="row">
                        <div class="col-sm-11" style="padding-left:0px;">
                            <div class="progress">
                                <div class="progress-bar" role="myprogressbar" style="width:${data.派工進度}% ; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                            <div class="col-sm-1" id="progressbartext" style="font-size:10px;padding-left:0px;">${data.派工進度}%</div>
                    </div>
                </div>    
                        </td>
                        <td style="width: 20%;">
                        <!--<button type="button" class="btn btn-dark" onclick=Directdispatch()>直接派工</button>
                        <button type="button" class="btn btn-success" onclick=getbuttonGroupdispatchsize() style="display:${editClass}"" id="edit${data.ID}">分組派工</button>
                        -->
                        </td>

                    </tr>
               
    `;

        $('#xxx').append(content);


    }



}

function Directdispatch() {

    var msg = "確定直接派工？";

    if (confirm(msg) == true) {

        obj = document.getElementsByName("test1");
        for (k in obj) {
            if (obj[k].checked)
                s1 = obj[k].value;

        }
        document.getElementById('size').innerHTML = "";
        document.getElementById('num').innerHTML = "";

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
        var s2 = 'http://' + ip + '/api/selectgettable31?s=' + rid + '&s1=' + s1;

        $.get(s2, function (data, status) {
            for (var i = 0; i < data.length; i++) {
                getGroupdispatchsizeList(data[i]);
            }

        });

        var s = 'http://' + ip + '/api/directdispatch?s=' + rid + '&s1=' + s1;

        $.get(s, function (data, status) {

            for (var i = 0; i < data.length; i++) {
                postdirectdispatch(data[i]);
            }

        });

        var s3 = 'http://' + ip + '/api/gettable4totalnum?s=' + rid;

        $.get(s3, function (data, status) {
            for (var i = 0; i < data.length; i++) {

                //gettable4totalnum(data[i]);
                num = num + parseInt(data[i].數量);
            }
            gettable4totalnum(num);
            console.log(num);
            num = 0;

        });


        var s4 = 'http://' + ip + '/api/gettable1totalnum?s=' + rid;

        $.get(s4, function (data, status) {
            for (var i = 0; i < data.length; i++) {

            }
            gettable1totalnum(data[0].總數量);
            console.log(data[0].總數量);
            num = 0;

        });
        
        var s5 = 'http://' + ip + '/api/getsewingPercent1?s=' + rid;

        $.get(s5, function (data, status) {
            for (var i = 0; i < data.length; i++) {

            }
            gettable1totalnum(data[0].總數量);
            console.log(data[0].總數量);
            num = 0;

        });
        
        

        var fileDivs = document.getElementById('ya');


        fileDivs.style.color = '#888888';


        alert("已派出全部數量及尺寸！");

    }

}

function postdirectdispatch(data) {

    var id1 = data.尺寸;
    var id2 = data.數量;
    var s1 = data.部位名稱;
    var num = id2 - id2;
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
    var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
    var time3 = new Date().format("yyyyMMddhhmm");
    var checkValue=$("#nfctag").val(); 
    var str = checkValue;

    $.post('http://' + ip + '/api/insertintotable4', { 'id': rid, 'id1': id1, 'id2': id2, 'finishedNumber': 0, 'notfinishedNumber': id2, 'all': 0, 's1': s1, 'time': time2, 's2': str, 's3': '尚未列印','s4': 0 ,'s5': 0}, function (res) {

    });
    $.post('http://' + ip + '/api/updatesizenum', { 'num': num, 'size': id1, 'location': s1, 'numlist': rid }, function (res) {
    });

    $.post('http://' + ip + '/api/updateschedule', { '派工進度': 100, '部位名稱': s1, '製令單號': rid }, function (res) {
    });

    $.post('http://' + ip + '/api/updatenfcid', { 'use': '已使用', 'nfcidno': checkValue}, function (res) {
    });



}


//顯示尺寸資訊(分組派工)

function getGroupdispatchsizeList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";


    if (data.派工數量 == 0) {
        var content2 =
            `
        
            <th  class="fileDiv"scope="col" id="sizeo" style="width:100px;color:#888888; cursor: not-allowed;">${data.尺寸}</th>
              
           `;
        $('#size').append(content2);
        var content3 =
            `
          <th  class="fileDiv1" scope="col"id="numo"style="width:100px;color:#888888; cursor: not-allowed;" >${data.派工數量}</th>
          
       `;
        $('#num').append(content3);

    }

    else {
        var content2 =
            `
            <th  class="fileDiv"scope="col" id="sizeo" style="width:100px;">${data.尺寸}</th>
              
           `;
        $('#size').append(content2);
        var content3 =
            `
          <th  class="fileDiv1" scope="col"id="numo"style="width:100px;" >${data.派工數量}</th>
          
       `;
        $('#num').append(content3);

    }


}

//顯示開頭製令單號及按鈕
function gettittleList(data) {
    
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";
    var content1 =
        `
        <div class=" p-2 bd-highlight">
            <div class="p-2 bd-highlight">製令單號：${data.製令單號}</div>
        </div>

        <div class="p-2 bd-highlight">
            <div class="p-2 bd-highlight">型體編號：${data.型體編號}</div>
        </div>

        <div class="p-2 bd-highlight">
            <div class="p-2 bd-highlight" hidden>選擇預派工NFC ID：</div>
        </div>
        <div class="p-2 bd-highlight">
            <select class="on_changes" style="margin-top:10px;" id="nfctag" disabled hidden>
   
            </select>
        </div>
       `;         
    $('#xx').append(content1);

    getbuttonGroupdispatch();
    




}
$(document).ready(function(){
    gettittle();
})




//取得各部位尺寸(分組派工)
async function getbuttonGroupdispatchsize() {
    document.getElementById("nfctag").removeAttribute("disabled");
    selectedEls = [];

    obj = document.getElementsByName("test1");

    for (k in obj) {
        if (obj[k].checked)
            s1 = obj[k].value;

    }


    document.getElementById('size').innerHTML = "";
    document.getElementById('num').innerHTML = "";
    // document.getElementById('ya').innerHTML = "";


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
    var s = 'http://' + ip + '/api/selectgettable3?s=' + rid + '&s1=' + s1;

    await $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getGroupdispatchsizeList(data[i]);

        }


    });
    var s1 = 'http://' + ip + '/api/selectgetsewing?s=' + rid + '&s1=' + s1;

    await $.get(s1, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getGroupdispatchsizeList(data[i]);

        }


    });

    document.getElementById('ya').style.color = 'black';

    var content3 =

        `
                <button type="button" id='button' class="btn btn-outline-danger" onclick=getbuttonGroupdispatchsize() style="margin-right: 15px;">清除</button>

                <button type="button" id='button' class="btn btn-outline-dark"  data-bs-toggle="modal"
                data-bs-target="#exampleModal" onclick=bns()  >確認派工</button>
                
              

            `;

    document.getElementById("bn").innerHTML = "";

    $('#bn').append(content3);





}

//取得各部位尺寸(批次分組派工) //多選派工

/*function getbuttonGroupdispatchsize1(id, s1) {
    selectedEls = [];
    document.getElementById("nfctag").removeAttribute("disabled");
    
    obj = document.getElementsByName("test");

    for (k in obj) {
        if (obj[k].checked)
            s1 = obj[k].value;

    }


    document.getElementById('size').innerHTML = "";
    document.getElementById('num').innerHTML = "";
    // document.getElementById('ya').innerHTML = "";
    if(!document.getElementById(id).checked){
        return;
    }

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
    var s = 'http://' + ip + '/api/selectgettable3?s=' + rid + '&s1=' + s1;

    $.get(s, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getGroupdispatchsizeList1(data[i]);

        }


    });
    var s1 = 'http://' + ip + '/api/selectgetsewing?s=' + rid + '&s1=' + s1;

    $.get(s1, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getGroupdispatchsizeList(data[i]);

        }


    });

    document.getElementById('ya').style.color = 'black';

    var content3 =

        `
                <button type="button" id='button' class="btn btn-outline-danger" onClick="clears()" style="margin-right: 15px;">清除</button>


                <button type="button" id='button' class="btn btn-outline-dark"  data-bs-toggle="modal"
                data-bs-target="#exampleModal" onclick=bns2()>確認派工</button>
                
              

            `;

    document.getElementById("bn").innerHTML = "";

    $('#bn').append(content3);





}
*/
function clears(){
    document.getElementById('button_' + items_name_select).remove();
    document.getElementById(items_name_select).checked = false;
    getbuttonGroupdispatchsize1();
}

var num = 0;
var tt2 = [];

function gettable4totalnum(data) {  // 讀取table 4  已派工的總數  底下 sc = tt2[0] / tt2[1] => sc = 已派工數 / 總數 用於推算整張派工單 % 數
    tt2[0] = data;
    //console.log(tt2[0]);
}

function gettable1totalnum(data) {
    tt2[1] = data;
    var sc = tt2[0] / tt2[1];
    console.log(tt2[0] + '  ' + tt2[1]);

    sc = Math.round(sc * 100);
    tt2[3] = sc;
    //console.log(tt2[3]);
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
    $.post('http://' + ip + '/api/updateschedule2', { '派工進度': tt2[3], '製令單號': rid }, function (res) {
    });

}  // UPDATE table1 SET 派工進度=? WHERE  製令單號 = ?


//開頭製令單號及按鈕事件
function gettittle() {

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


    var s = 'http://' + ip + '/api/gettable1fortittle?s=' + rid;

    $.get(s, function (data, status) {

        for (var i = 0; i < data.length; i++) {
            gettittleList(data[i]);
        }
    });


}

//分組派工點選時取得部位資訊
function getbuttonGroupdispatch() { //顯示內容
    document.getElementById("nfctag").setAttribute("disabled", "disabled");
    while (document.getElementById('button')) document.getElementById('button').remove();

    mul = false;

    document.getElementById('size').innerHTML = "";
    document.getElementById('num').innerHTML = "";
    document.getElementById('xxx').innerHTML = "";
    $(".on_changes option").remove();

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

    
    $.get('http://' + ip + '/api/getsewingsystem', { 's': rid}, function (data, status) {
        
      for (var i = 0; i < data.length; i++) {
           getGroupdispatchList(data[i]);

       }

 });

    $.get('http://' + ip + '/api/UpdatesewingTable', { 's': rid}, function (data, status) {
        
      for (var i = 0; i < data.length; i++) {
           getGroupdispatchList(data[i]);

       }

 });
 //var s = 'http://' + ip + '/api/gettable2?s=' + rid;
    // $.get(s, function (data, status) {

    //     for (var i = 0; i < data.length; i++) {
    //         getGroupdispatchList(data[i]);

    //     }

    // });


    var s1 = 'http://' + ip + '/api/nfcid';
    $.get(s1, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            getnfcid(data[i]);
            //console.log(data[i].NFCID);

        }

    });



}

function getnfcid(data){



   if(data.使用狀態 =='未使用'){
    console.log(data.使用狀態);

    var option = "<option onmouseover='this.style.backgroundColor=\"#ffff66\";'onmouseout='this.style.backgroundColor=\"#fff\";'value="+data.NFCID+">"+data.NFCID+ "</option>";
    $(".on_changes").append(option);
    var display = $('.on_changes');
    /*
        if (display.is(':hidden')) {//如果node是隐藏的则显示node元素，否则隐藏
            $(".on_changes").show();
        } 
        else {
            $(".on_changes").hide();
        }
        */

   }
   else{
       console.log('fuck');
   }

   

}

//批次分組派工按鈕點選觸發事件
function getbuttonBatchdispatch() { //顯示內容
    document.getElementById("nfctag").setAttribute("disabled", "disabled");
    while (document.getElementsByName('button')) document.getElementsByName('button').remove();

    mul = true;

    document.getElementById('xxx').innerHTML = "";
    document.getElementById('size').innerHTML = "";
    document.getElementById('num').innerHTML = "";
    $(".on_changes option").remove();
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
var selectedEls = [];
var selectedEls1 = [];
var selectedEls3 = [];
var selectedEls4 = [];
var selectedEls2 = [];
var inum = [];
//var selectedEls3 = [];
var fileDivs = document.getElementsByClassName('fileDiv');
var fileDivs1 = document.getElementsByClassName('fileDiv1');

var q = 0;
var q1 = 0;
var msg = "確定派工數量、尺寸及派工單編號正確？";
//分組派工
$(function () {
    var mouseStopId;
    var mouseOn = false;
    var startX = 0;
    var startY = 0;
    // 获取容器元素
    var selectContainer = document.getElementById('selectContainer');
    selectContainer.onmousedown = function (e) {
        clearEventBubble(e);
        if (e.buttons !== 1 || e.which !== 1) return;
        mouseStopId = setTimeout(function () {
            mouseOn = true;
            // 调整坐标原点为容器左上角
            startX = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
            startY = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
            var selDiv = document.createElement('div');
            selDiv.style.cssText = 'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #888888;background-color:#aaa;z-index:1000;opacity:0.6;display:none;';
            selDiv.id = 'selectDiv';
            // 添加框选元素到容器内
            document.getElementById('selectContainer').appendChild(selDiv);
            selDiv.style.left = startX + 'px';
            selDiv.style.top = startY + 'px';
        }, 20);
        document.onmousemove = function (e) {
            if (!mouseOn) return;
            clearEventBubble(e);
            var selectContainer = document.getElementById('selectContainer');
            var _x = e.clientX - selectContainer.offsetLeft + selectContainer.scrollLeft;
            var _y = e.clientY - selectContainer.offsetTop + selectContainer.scrollTop;
            var _H = selectContainer.offsetWidth
            // 鼠标移动超出容器内部，进行相应的处理
            // 向右拖拽
            if (e.clientX > selectContainer.offsetLeft + selectContainer.offsetWidth) {
                let maxLeft = selectContainer.scrollWidth - selectContainer.offsetWidth
                let step = selectContainer.scrollLeft + 20
                if (step >= maxLeft) {
                    selectContainer.scrollLeft = maxLeft
                } else {
                    selectContainer.scrollLeft = step
                }
            }
            // 向左拖拽
            if (e.clientX < selectContainer.offsetLeft) {
                let minLeft = 0
                let step = selectContainer.scrollLeft - 20
                if (step <= minLeft) {
                    selectContainer.scrollLeft = minLeft
                } else {
                    selectContainer.scrollLeft = step
                }
            }

            var selDiv = document.getElementById('selectDiv');
            selDiv.style.display = 'block';
            selDiv.style.left = Math.min(_x, startX) + 'px';
            selDiv.style.top = Math.min(_y, startY) + 'px';
            if ((Math.min(_x, startX) + Math.abs(_x - startX)) <= selectContainer.scrollWidth) {
                selDiv.style.width = Math.abs(_x - startX) + 'px';
            }
            selDiv.style.height = Math.abs(_y - startY) + 'px';


        };
        document.onmouseup = function (e) {
            if (!mouseOn) return;
            clearEventBubble(e);
            var selDiv = document.getElementById('selectDiv');

            //var selectedEls = [];
            var l = selDiv.offsetLeft;
            var t = selDiv.offsetTop;
            var w = selDiv.offsetWidth;
            var h = selDiv.offsetHeight;

            for (var i = 0; i < fileDivs.length; i++) {
                var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
                var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;
                if (sl > l && st > t && fileDivs[i].offsetLeft < l + w && fileDivs[i].offsetTop < t + h) {
                    //fileDivs[i].style['border'] = '2px red dotted';
                    //fileDivs1[i].style['border'] = '2px red dotted';

                    fileDivs[i].style['border-top'] = '2px red dotted';
                    fileDivs[i].style['border-right'] = '2px red dotted';
                    fileDivs[i].style['border-left'] = '2px red dotted';
                    fileDivs1[i].style['border-bottom'] = '2px red dotted';
                    fileDivs1[i].style['border-right'] = '2px red dotted';
                    fileDivs1[i].style['border-left'] = '2px red dotted';
                    inum.push(i);
                    //console.log(inum);

                    if (mul == true){
                        items_size_stack.push(fileDivs[i].textContent);   //將資料push 進去
                        document.getElementById('button_' + items_name_select).value = items_size_stack; 
                    }
                    //items_size_stack.push(fileDivs[i].textContent);   //將資料push 進去
                    //document.getElementById('button_' + items_name_select).value = items_size_stack; 
                    //items_amount_stack.push(fileDivs1[i].textContent);  //將資料push 進去
                    //document.getElementById('button_' + items_name_select).value = items_amount_stack;



                    selectedEls.push(fileDivs[i]); //尺寸
                    selectedEls1.push(fileDivs1[i]);//數量
                    selectedEls2[q] = i;
                    q = q + 1;
                    //selectedEls3[i] = i;
                    //console.log(selectedEls2);
                    //console.log(selectedEls3);

                }

            }
            //console.log(selectedEls2);
            selDiv.style.display = 'none';
            mouseOn = false;
        };
    }

    function clearEventBubble(e) {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }

});


var items_name_select;
var items_size_stack = []; // save size

// 顯示按鈕
function items_button(id, value){ 
    if (document.getElementById(id).checked){
        items_name_select = id; // select items
        items_size_stack = [];
        console.log(items_name_select);
        var content = 
        `
        <button type="button" name="button" class="btn btn-secondary" style="color: white;" id="button_${id}"; onClick="button_print_items(this.value)">${value}</button>
        `;
    }else{
        document.getElementById('button_' + id).remove();  // 移除部位按鈕(上方)  //這個目前是可以的(這是移除按鈕)
    }
    
    $('#items').append(content);

}

function button_print_items(select){
    console.log('select ' + select);
    console.log(selectedEls1);
    alert('已選取尺寸: ' + select );

}


//分組派工
function bns() {

    if (confirm(msg) == true) {
        

        var count = 0;
        console.log(selectedEls.length);

        for (var i = 0; i < selectedEls.length; i++) {

            //var n = selectedEls.length / 2;
            //var j = i + n;
            obj = document.getElementsByName("test1");
            for (k in obj) {
                if (obj[k].checked) {
                    s1 = obj[k].value;//部位
                }


            }
            var id1 = selectedEls[i].lastChild.data;//尺寸
            var id2 = selectedEls1[i].lastChild.data;//數量
            var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
            var time3 = new Date().format("yyyyMMddhhmm");
            var checkValue=$("#nfctag").val(); 
            count = count + 1;
            var num = id2 - id2;
            total += parseInt(id2);
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

            //var str = rid + time3 + s1;
            var str = checkValue;

            console.log(selectedEls[i].lastChild.data);
            console.log(selectedEls1[i].lastChild.data);
            if (id2 != "0"){
            $.post('http://' + ip + '/api/insertintotable4', { 'id': rid, 'id1': id1, 'id2': id2, 'finishedNumber': 0, 'notfinishedNumber': id2, 'all': 0, 's1': s1, 'time': time2, 's2': str, 's3': '尚未列印','s4':0 ,'s5': 0}, function (res) {
            });
            }
            
            $.post('http://' + ip + '/api/updatesizenum', { 'num': num, 'size': id1, 'location': s1, 'numlist': rid }, function (res) {
            });
            $.post('http://' + ip + '/api/updatenfcid', { 'use': '已使用', 'nfcidno': checkValue}, function (res) {
                console.log(checkValue)
            });

        }
        selectedEls = [];
        selectedEls1 = [];


        var s = 'http://' + ip + '/api/totalnumberofparts?s=' + rid + '&s1=' + s1;


        $.get(s, function (data, status) {
            for (var i = 0; i < data.length; i++) {
                add(data[0].總數量);
                 //total2 = data[0].總數量;
             }
           //console.log(total2);
        });


         var s2 = 'http://' + ip + '/api/totalnumberofparts2?s=' + rid + '&s1=' + s1;
         $.get(s2, function (data, status) {
             for (var i = 0; i < data.length; i++) {
            　　all1 += parseInt(data[i].數量);
                //console.log(all1);
            }
            add2(all1);
            //加總歸零
            all1 = 0;
            add3(s1);

        });

        var s3 = 'http://' + ip + '/api/gettable4totalnum?s=' + rid;

        $.get(s3, function (data, status) {
            for (var i = 0; i < data.length; i++) {

                //gettable4totalnum(data[i]);
                num = num + parseInt(data[i].數量);
            }
        　   gettable4totalnum(num);
            //console.log(num);
            num = 0;

        });


        var s4 = 'http://' + ip + '/api/gettable1totalnum?s=' + rid;

        $.get(s4, function (data, status) {
            for (var i = 0; i < data.length; i++) {

            }
        　   gettable1totalnum(data[0].總數量);
            //console.log(data[0].總數量);
            num = 0;

        });

        
        //原本的
        // setTimeout(() => {
        //     // location.reload()
        // }, 100)
        
        setTimeout(() => {
            $.post('http://' + ip + '/api/UpdatesewingPercent', { '派工進度': percent, '製令單號': rid }, function (res) {console.log("製令單" + rid + " 派工進度" + percent + " 已更新")
            });
        }, 200)

        
        for (var i = 0; i < selectedEls2.length; i++) {

            console.log("2222",selectedEls2,fileDivs[selectedEls2[i]])
            fileDivs[selectedEls2[i]].style.color = '#888888';
            fileDivs1[selectedEls2[i]].style.color = '#888888';
            fileDivs[selectedEls2[i]].style['border'] = '';
            fileDivs1[selectedEls2[i]].style['border'] = '';


        }
        console.log("1111")
        alert("派工成功！");
        q = 0;
        selectedEls2 = [];


    }
    else {

        for (var i = 0; i < selectedEls2.length; i++) {

            //fileDivs[selectedEls2[i]].style['border'] = '1px gray solid  ';
            //fileDivs1[selectedEls2[i]].style['border'] = '1px gray solid ';

            fileDivs[selectedEls2[i]].style['border'] = '';
            fileDivs1[selectedEls2[i]].style['border'] = '';


        }
        q = 0;
        selectedEls2 = [];


    }
    
    //從這除錯
    var tt = [];

    function add(data) {
        total2 = data;
        tt[0] = data;
        
    }


    function add2(data) {
        console.log('tt[0] ' + tt[0] + ' data ' + data );  // tt[0] 總數  data
        var sc = data / tt[0];   // 單項派工數 / 單部位總數  可以計算出
        sc = Math.round(sc * 100);
        tt[1] = sc;  // 計算單部位 進度
       console.log('sc = '+sc)

    }
    //目前有問題 
    console.log("break");
    function add3(data) {


        var url = location.search;
        //rid=製令單號
        var rid;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            // str.split("=")[0] 為 userID
            rid = str.split("=")[1];
        }
        if (rid == undefined) {
            rid = '';
        }
        console.log('add3  ' + tt[1]);//顯示NaN
        console.log("tt[0] = "+tt[0]);//顯示undefined
        console.log("break");
        if(tt[1] >= 100){
            $.post('http://' + ip + '/api/updateschedule', { '派工進度': 100, '部位名稱': data, '製令單號': rid }, function (res) {
            });  // UPDATE table2 SET 派工進度=? WHERE  部位名稱 = ? AND 製令單號 = ? 
        }else{
            $.post('http://' + ip + '/api/updateschedule', { '派工進度': tt[1], '部位名稱': data, '製令單號': rid }, function (res) {
            });  // UPDATE table2 SET 派工進度=? WHERE  部位名稱 = ? AND 製令單號 = ? 
        }
        
        

    }
    
    getbuttonGroupdispatch() //有問題

}

//批次分組派工
var nnn = 0;

function bns2() {

    if (confirm(msg) == true) {

        var count = 0;
        //console.log(selectedEls.length);

        obj = document.getElementsByName("test");

        for (p in obj) {
            if (obj[p].checked == true) {
                s1 = obj[p].value;//部位
                selectedEls3.push(s1);
            }
        }

       

        for (var o = 0; o < selectedEls3.length; o++) {

            for (var i = 0; i < selectedEls.length; i++) {

                //var n = selectedEls.length / 2;
                //var j = i + n;

                var id1 = selectedEls[i].lastChild.data;//尺寸
                var id2 = selectedEls1[i].lastChild.data;//數量
                var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
                var time3 = new Date().format("yyyyMMddhhmm");
                var checkValue=$("#nfctag").val(); 
                count = count + 1;
                var num = id2 - id2;
                total += parseInt(id2);
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
                //var str = rid + time3 + selectedEls3[o];
                //console.log(selectedEls[i].lastChild.data);
                //console.log(selectedEls1[i].lastChild.data);

                var s9 = 'http://' + ip + '/api/directdispatchsizenum2?s=' + rid + '&s1=' + selectedEls3[o] + '&s2=' + id1;

                $.get(s9, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
                        judgmenttable3num(data);
                    }

                });

                function judgmenttable3num(data) {
               //     console.log(data);
           
                    if (data[0].數量 == 0) {
                        alert('尺寸'+data[0].尺寸+'，'+data[0].部位名稱+'數量為0，系統自動取消派出!')
                        //msg1='尺寸'+data[0].尺寸+'的'+data[0].部位名稱+'數量為0以自動取消派出!';
                       // if (confirm(msg1) == true) {
                    

                       // }

                    }
                    else {
                        var str = checkValue;
                        //var str = rid + time3 + data[0].部位名稱;

                        $.post('http://' + ip + '/api/insertintotable4', { 'id': rid, 'id1': data[0].尺寸, 'id2': data[0].數量, 'finishedNumber': 0, 'notfinishedNumber': data[0].數量, 'all': 0, 's1': data[0].部位名稱, 'time': time2, 's2': str, 's3': '尚未列印','s4':0 ,'s5': 0}, function (res) {

                        });
                        $.post('http://' + ip + '/api/updatesizenum', { 'num': num, 'size': data[0].尺寸, 'location':data[0].部位名稱, 'numlist': rid }, function (res) {
                        });

                        $.post('http://' + ip + '/api/updatenfcid', { 'use': '已使用', 'nfcidno': checkValue}, function (res) {
                        });

                        //alert('尺寸'+data[0].尺寸+'，'+data[0].部位名稱+'派工成功！');

                        $.post('http://' + ip + '/api/UpdatesewingTable', { '原本數量': 0,'完成數量': 0,'派工時間': time2,'派工單編號': str,'製令單號': rid,'尺寸': size,'總數量': amount}, function (res) {
                        });

                    }
                
                    aaa(data[0].部位名稱);
        



                }

            }
        }


        /*
        var s7 = [];
        var nnn = 0;
        */
        selectedEls = [];
        selectedEls1 = [];

        function aaa(data2){

  

        

           // for (var o = 0; o < data2.length; o++) {
    


                var s = 'http://' + ip + '/api/totalnumberofparts?s=' + rid + '&s1=' + data2;
    
                console.log(data2);
                $.get(s, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
                        addd(data[0].總數量);
                        //total2 = data[0].總數量;
                    //    console.log(data[0].總數量)
                    }
                    //console.log(total2);
                });
    
    
                var s2 = 'http://' + ip + '/api/totalnumberofparts2?s=' + rid + '&s1=' + data2;
        
             

    
            
                $.get(s2, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
                        all1 += parseInt(data[i].數量);
                        //console.log(data);
               
                    }
                    addd2(all1);
                    console.log(all1);
                    //加總歸零
                    all1 = 0;
                   
                   // addd3(s7[nnn]);
                    addd3(data2);
                 

    
                });
    
    
                var s3 = 'http://' + ip + '/api/gettable4totalnum?s=' + rid;
    
                $.get(s3, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
    
                        //gettable4totalnum(data[i]);
                        num = num + parseInt(data[i].數量);
                    }
                    gettable4totalnum(num);
                  //  console.log(num);
                    num = 0;
    
                });
    
    
                var s4 = 'http://' + ip + '/api/gettable1totalnum?s=' + rid;
    
                $.get(s4, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
    
                    }
                    gettable1totalnum(data[0].總數量);
               //     console.log(data[0].總數量);
                    num = 0;
    
                });
    
           // }
            /*


            for (var o = 0; o < selectedEls3.length; o++) {


                var s = 'http://' + ip + '/api/totalnumberofparts?s=' + rid + '&s1=' + selectedEls3[o];
    
    
                $.get(s, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
                        addd(data[0].總數量);
                        //total2 = data[0].總數量;
                    //    console.log(data[0].總數量)
                    }
                    //console.log(total2);
                });
    
    
                var s2 = 'http://' + ip + '/api/totalnumberofparts2?s=' + rid + '&s1=' + selectedEls3[o];
    
                s7[o] = selectedEls3[o];
    
                $.get(s2, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
                        all1 += parseInt(data[i].數量);
                        console.log(data);
               
                    }
                    addd2(all1);
                    console.log(all1);
                    //加總歸零
                    all1 = 0;
                   
                    addd3(s7[nnn]);
                 
                    nnn = nnn + 1;
    
                });
    
    
                var s3 = 'http://' + ip + '/api/gettable4totalnum?s=' + rid;
    
                $.get(s3, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
    
                        //gettable4totalnum(data[i]);
                        num = num + parseInt(data[i].數量);
                    }
                    gettable4totalnum(num);
                  //  console.log(num);
                    num = 0;
    
                });
    
    
                var s4 = 'http://' + ip + '/api/gettable1totalnum?s=' + rid;
    
                $.get(s4, function (data, status) {
                    for (var i = 0; i < data.length; i++) {
    
                    }
                    gettable1totalnum(data[0].總數量);
               //     console.log(data[0].總數量);
                    num = 0;
    
                });
    
            }
            */

        }

        
     

        //alert("派工成功！");

        for (var i = 0; i < selectedEls2.length; i++) {


            fileDivs[selectedEls2[i]].style.color = '#888888';
            fileDivs1[selectedEls2[i]].style.color = '#888888';
            fileDivs[selectedEls2[i]].style['border'] = '';
            fileDivs1[selectedEls2[i]].style['border'] = '';


        }
        q = 0;
        selectedEls2 = [];
        selectedEls3 = [];


    }
    else {

        for (var i = 0; i < selectedEls2.length; i++) {

            //fileDivs[selectedEls2[i]].style['border'] = '1px gray solid  ';
            //fileDivs1[selectedEls2[i]].style['border'] = '1px gray solid ';

            fileDivs[selectedEls2[i]].style['border'] = '';
            fileDivs1[selectedEls2[i]].style['border'] = '';


        }
        q = 0;
        selectedEls2 = [];
        selectedEls3 = [];


    }


    var tt1 = [];

    function addd(data) {
        total2 = data;
        tt1[0] = data;
    }


    function addd2(data) {
        var sc = data / tt1[0];
        sc = Math.round(sc * 100);
        tt1[1] = sc;

    }

    function addd3(data) {


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

        console.log('addd3  ' + tt1[1]);
        $.post('http://' + ip + '/api/updateschedule', { '派工進度': tt1[1], '部位名稱': data, '製令單號': rid }, function (res) {
        });  // UPDATE table2 SET 派工進度=? WHERE  部位名稱 = ? AND 製令單號 = ? 

    }



}



function finish() {

    var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");
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

    $.post('http://' + ip + '/api/updatedatetime', { 'datetime': time2, '製令單號': rid }, function (res) {
    });



    location.reload();



}


//設定日期及時間的格式

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