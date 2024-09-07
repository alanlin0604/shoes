function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    var content = 
    `<div class="content" id="${data._id}">
        <div class="${titleClass}">
           <input type="checkbox" onclick="changeStatus('${data._id}',this)"/>
           <text id="title${data._id}">${data.tittle}</text>
           <button class="i_btn" onclick="removeList('${data._id}')">刪除</button>
           <button class="i_btn" id="edit${data._id}" style="display:${editClass}" onclick="ediList('${data._id}')">修改</button>
           <button class="i_btn" id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
        </div>
        <div class="${messageClass}">
          <text id="message${data._id}">${data.content}</text>
        <div>  
    </div>`;
    $('body').append(content);

}

function ediList(id){ //提供修改文字框
    $('#edit' + id).css("display","none");
    $('#update' + id).css("display","inline");
    

    var input = document.createElement("input");
    input.type = "text";
    input.id = "edit_title" + id;
    input.value = $('#title' + id).text();
    input.size = Math.max(20 / 4 * 3, 4);

    $('#title' + id ).css("display","none");
    $('#title' + id).parent().append(input);

    var message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message" + id;
    message_input.value = $('#message' + id).text();
    message_input.size = Math.max(50 / 4 * 3, 4);

    $('#message' + id).css("display","none");
    $('#message' + id).parent().append(message_input);
}

function updateList(id){ //修改狀態
    var title = $('#edit_title' + id).val();
    var message = $('#edit_message' + id).val();

    $.post('http://' + ip + '/api/updateList',{'id':id,'title':title,'content':message},function(res){
   
    if(res.status==0){

    $('#title' + id).text(title);
    $('#message' + id).text(message);

    $('#edit' + id).css("display","inline");
    $('#update' + id).css("display","none");

    $('#title' + id).css("display","inline");
    $('#message' + id).css("display","inline");

    $('#edit_title' + id).remove();
    $('#edit_message' + id).remove();
}
});
location.reload();
}

function removeList(id){ //刪除內容
    $.post('http://' + ip + '/api/removeList',{'id':id},function(res){
    if(res.status==0){
        $('#'+id).remove();
    }
    });
    location.reload();
}

function changeStatus(id,btnstatus){ //修改狀態
    var title = btnstatus.parentNode;
    var message= title.nextElementSibling;

    $.post('http://' + ip + '/api/changeStatus',{'id':id,'status':btnstatus.checked},function(res){

    if(res.status == 0){
        if(btnstatus.checked){
        title.className="title2";
        message.className="message2";
        $('#edit'+id).css("display","none");
        $('#update'+id).css("display","none");

        if(document.getElementById("edit_title" + id)){
            $('#title'+id).css("display","inline");
            $('#message'+id).css("display","inline");
            $('#edit_title'+id).remove();
            $('#edit_message' + id).remove();
        }
    }
    else{
        title.className="title";
        message.className="message";
        $('#edit'+id).css("display","inline");
    }
}
});
location.reload();
}

function addList(){ //新增內容
    var _title = $('#title').val();
    var _message = $('#message').val();

    if(_title =="" || _message ==""){
        alert("請輸入內容和標題!");
    }else{
        $.post('http://' + ip + '/api/addList',{'title':_title,'content':_message},function(res){
            newList(res.data);
            $('#title').val('');
            $('#message').val('');
        });
    }
    location.reload();
}


getList();
function getList(){ //顯示內容
    $.get('http://' + ip + '/api/getList',function(data,status){
        for (var i = 0; i < data.length; i++){
            newList(data[i]);
        }
    });
}

