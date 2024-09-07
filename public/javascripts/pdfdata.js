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
        for(var i = 0;i<urls.length;i++){
            console.log(urls[i]);
            ShowData(urls[i], "ID" + String(i));
        }
    }
    if (number == undefined) {
        number = '';
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
    $.get('http://' + ip + '/api/PrintCutting', {'number': number}, function (data,status) {
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
            `;
            $('#information').append(content);
            document.getElementById("information").setAttribute("id", "done");
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
        document.getElementById("trytry").setAttribute("id", String(amount));
    });

}

