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
        
        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 10%;">${data.製令單號}</td>
                    <td style="width: 10%; text-align: center;">${data.型體編號}</td>
                    <td style="width: 18%; text-align: center;">${time1}</td>
                    <td style="width: 18%; text-align: center;">${time2}</td>
                    <td style="width: 24%; text-align: center;">
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
                    <td style="width: 20%; text-align: center;" >
                        <a href="CuttingDispatchSystem.html?s=${data.製令單號}" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-dark" >進入派工畫面</button>
                        </a>

                        <a href="CuttingDispatchList.html?workorderNumber=${data.製令單號}" style="text-decoration:none;">
                            <button type="button" class="btn btn-outline-success" >管理派工單</button>
                        </a>
                        <!--<button type="button" class="btn btn-outline-danger" onClick="button_remove(this.id)" id="${data.製令單號}">刪除派工單</button>-->

                    </td>
                    </tr>
                
                </tbody>
       </table>

 

    </div>`;
    $('#xxx').append(content);

}
getList();

function getList(){ //顯示內容
    $.get('http://' + ip + '/api/gettable1',function(data,status){
        for (var i = 0; i < data.length; i++){
            console.log(data[i]);
            newList(data[i]);
        }
    });
}


/* <script>
function button_remove(button_id) {
    
    var msg = "是否移除製令單號: " + button_id + " 派工單？";

    if (confirm(msg) == true) {
        $("#"+button_id+".tab-content").remove();
        console.log("#"+button_id+".tab-content" + "被移除了");

        $.post('http://' + ip + '/api/removetable1', {'id': button_id},function(data,status){

            console.log(data);
        });
    }
    
}

</script> */

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



