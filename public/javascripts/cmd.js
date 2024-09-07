function nfctag_create() {
    $.get('http://' + ip + '/api/nfcid',function(data,status){
        var max = 0;
        var sum = 0;
        if(data.length != 0)
            max = parseInt(data[data.length-1].NFCID);
        for(let i = 1 ;i <= 100;i++){
            sum = max + i;
            nfc_summon(sum);
        }
    });
}

function nfc_summon(data){
    $.post('http://' + ip + '/api/insertNFCIDList', { 'nfcid': data, 'ID': '0', 'usingstate': "未使用"}, function (res) {
        console.log('生成了' + data);
    });
}

function nfctag_change() {
    $.post('http://' + ip + '/api/ReloadNFC', {'使用狀態': "未使用"} ,function(data,status){

    });
    

}

function nfctag_delete() {
    $.post('http://' + ip + '/api/deleteNFC', function (res) {

    });

}

//cmd.html 

function Return(){
   
    var Username = document.getElementById('Username').value;  //抓取欄位的文字
    
    $.get('http://'+ ip + '/api/AddPunchIn', {'Username':Username}, function(res) {
        console.log('新增' + Username);
    });
}