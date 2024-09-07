$(function () {
    $('#form').validate({
        onkeyup: function (element, event) {
            //去除左側空白
            var value = this.elementValue(element).replace(/^\s+/g, "");
            $(element).val(value);
        },
        rules: {
            /*
            required:必填
            noSpace:空白
            minlength:最小長度
            maxlength:最大長度
            email:信箱格式
            number:數字格式
            url:網址格式https://www.minwt.com
            */
            id1: {
                required: true


            },
            id2: {
                required: true


            },
            id3: {
                required: true


            },
            id4: {
                required: true


            },
            id5: {
                required: true


            },
            id6: {
                required: true


            },
            id7: {
                required: true


            },

        },
        messages: {
            id1: {
                required: '請輸入NFC ID',


            },
            id2: {
                required: '請輸入品牌名稱'


            },
            id3: {
                required: '請輸入型號'


            },
            id4: {
                required: '請輸入尺寸'


            },
            id5: {
                required: '請輸入材質'


            },
            id6: {
                required: '請輸入製造商'


            },
            id7: {
                required: '請輸入出產地'


            },

        },
        submitHandler: function (form) {
            form.submit();
            var id1 = $("#id1").val();
            var id2 = $("#id2").val();
            var id3 = $("#id3").val();
            var id4 = $("#id4").val();
            var id5 = $("#id5").val();
            var id6 = $("#id6").val();
            var id7 = $("#id7").val();
            var msg = "確定輸入正確？";

            if (confirm(msg) == true) {
                $.post('http://' + ip + '/api/insertshoes', { 'id1': id1, 'id2': id2, 'id3': id3, 'id4': id4, 'id5': id5, 'id6': id6, 'id7': id7 }, function (res) {



                });

                $.post('http://' + ip + '/api/updatenfcid', { 'use': '已使用', 'nfcidno': id1 }, function (res) {
                });

                document.form.action;

                alert("寫入資料庫成功！");
                location.reload();

            }

        }
    });
});

function a() {
    var file = document.getElementById('input-files');
    file.value = '';
    var obj = document.getElementById("imgs");

    var imgParent = obj.parentNode;//获取img的父对象
    imgParent.removeChild(obj);
}


var s1 = 'http://' + ip + '/api/nfcid';
$.get(s1, function (data, status) {
    for (var i = 0; i < data.length; i++) {
        getnfcid(data[i]);
        //console.log(data[i].NFCID);

    }

});

var s2 = 'http://' + ip + '/api/shoesinformation2';
$.get(s2, function (data, status) {
    for (var i = 0; i < data.length; i++) {
        getlogo(data[i]);
        //console.log(data[i].NFCID);

    }

});

function select(value) {
    $.get('http://' + ip + '/api/shoesinformation3',function(data,status){
        for (var i = 0; i < data.length; i++){
            if (value == data[i].ID){
                document.getElementById('id2').value = data[i].品牌;
            }
        }
    });

}


function getnfcid(data) {

    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";

    if (data.使用狀態 == '未使用') {
        var content =
            `
        <option value="${data.NFCID}">${data.NFCID}</option>

        `;

    }

    $('#id1').append(content);


    /*
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
             
             
     
        }
        else{
            console.log('fuck');
        }
     
        */

}

function getlogo(data) {

    console.log(data.品牌);

    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";


    var content =
        `
        <option value="${data.品牌}">${data.品牌}</option>
        
        `;



    $('#id2').append(content);


    /*
     var option1 = "<option onmouseover='this.style.backgroundColor=\"#ffff66\";'onmouseout='this.style.backgroundColor=\"#fff\";'value="+data.品牌+">"+data.品牌+ "</option>";
     $(".on_changes2").append(option1);
 
     var display = $('.on_changes2');
     /*
         if (display.is(':hidden')) {//如果node是隐藏的则显示node元素，否则隐藏
             $(".on_changes2").show();
         } 
         else {
             $(".on_changes2").hide();
         }
         
 */




}