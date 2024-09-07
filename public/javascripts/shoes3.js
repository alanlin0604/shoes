var s;


function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
  
    var content = 
    `<div class="tab-content" id="${data.製令單號}">
        <table class="table">
                    <tbody>
                    <tr>
                    <td style="width: 14.2%;">${data.品牌}</td>
                    <td style="width: 14.2%;">${data.型號}</td>
                    <td style="width: 14.2%;">${data.尺寸}</td>
                    <td style="width: 14.2%;">${data.材質}</td>
                    <td style="width: 14.2%;">${data.製造商}</td>
                    <td style="width: 14.2%; " >${data.出產地}</td>
                    <td style="width: 14.2%; " >
                                      
                        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        預覽圖片
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
   
                            <div class="modal-body">
                                <img src="${data.圖片}" style="width:70%;height:70%;margin-left:90px">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                            </div>
                            </div>
                        </div>
                        </div>
                   




                    </td>
                    </tr>
                
                </tbody>
       </table>
    

    </div>`;
    $('#xxx').append(content);

}
getList();

function getList(){ //顯示內容
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
    $.get('http://' + ip + '/api/shoesinformation?logo='+rid,function(data,status){
        for (var i = 0; i < data.length; i++){
            newList(data[i]);
        }
    });
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



