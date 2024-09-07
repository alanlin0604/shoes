var s;



function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    var time1 = new Date(data.上傳日期).format("yyyy-MM-dd hh:mm:ss");
    var time2 = new Date(data.上次編輯日期).format("yyyy-MM-dd hh:mm:ss");

    // $("#"+button_id+".tab-content").remove();
    var content = 
    `
    <div class="tab-content" id="${data.製令單號}">
        
        <table class="table"">
                    <tbody>
                    <tr style="background-color: transparent;">
                    <td style="width: 10%;">
                        <button style="border-style: none; background-color: transparent; color: red" type="button" data-bs-toggle="modal" data-bs-target="#Modal${data.製令單號}">
                            &lt;${data.製令單號}&gt;
                        </button>
                    </td>
                    <td style="width: 10%; text-align: center;">${data.型體編號}</td>
                    <td style="width: 15%; text-align: center;">${time1}</td>
                    <td style="width: 15%; text-align: center;">${time2}</td>
                    <td style="width: 20%; text-align: center;">
                    <div class="container" >
                        <div class="row">
                            <div class="col-sm-11" style="padding-left:0px;">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width:${data.派工進度}% ; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1" style="font-size:10px;padding-left:0px;">${data.派工進度}%</div>
                        </div>
                    </div>    
                    </td>
                    <td style="width: 30%; text-align: center;" >
                        <a href="CuttingDispatchSystem.html?s=${data.製令單號}" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-dark" >進入剪裁派工</button>
                        </a>

                        <a href="CuttingDispatchList.html?workorderNumber=${data.製令單號}" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-success" >管理派工單</button>
                        </a>

                        <button type="button" class="btn btn-outline-danger" onClick="button_remove(this.id)" id="${data.製令單號}">刪除派工單</button>

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
                                       <th scope="col" style=" text-align: center;">單位</th>
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
}

getList();

function getList(){ //顯示內容
    $.get('http://' + ip + '/api/gettable1',function(data,status){
        for (var i = 0; i < data.length; i++){
            console.log(data[i]);
            newList(data[i]);

            $.get('http://' + ip + '/api/gettable2?s=' + data[i].製令單號, function (data, status) {
                
                for (var j = 0; j < data.length; j++) {
                    datas(data[j]);
                }

            });
        }
    });
}

function button_remove(button_id) {
    
    var msg = "是否移除製令單號: " + button_id + " 派工單？";

    if (confirm(msg) == true) {
        $("#"+button_id+".tab-content").remove();
        console.log("#"+button_id+".tab-content" + "被移除了");

        $.post('http://' + ip + '/api/removetable1', {'ids': button_id},function(data,status){

            console.log(data);
        });
    }
    
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



