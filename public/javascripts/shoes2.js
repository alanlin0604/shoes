
function newList(data){
    var status = (data.status)?"checked":"";
    var titleClass = (data.status)?"title2":"title";
    var messageClass = (data.status)?"message2":"message";
    var editClass = (data.status)?"none":"inline";
    //var time1 = new Date(data.上傳日期).format("yyyy-MM-dd hh:mm:ss");
    //var time2 = new Date(data.上次編輯日期).format("yyyy-MM-dd hh:mm:ss");
    if(data.品牌=="NIKE"){
        var content = 
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                    <img src="./images/nike.png" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                    <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                        <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                    </div>
                </div>
            </a>
        </div>
        `;

    }
    else if(data.品牌=="PUMA"){
        

        var content = 
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                    <img src="./images/puma.png" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                    <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                        <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
        
    }
    else if(data.品牌=="adidas"){
        

        var content = 
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                    <img src="./images/adidas.png" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                    <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                        <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
        
    }
    else if(data.品牌=="Converse"){
        

        var content = 
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                    <img src="./images/converse.png" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                    <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                        <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
        
    }
    else if(data.品牌=="New balance"){
        

        var content = 
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                  <img src="./images/nb.png" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                  <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                </div>
                </div>
            </a>
          </div>
        `;
        
    }else{
        var content =
        `
        <div class="p-3 bd-highlight">
            <a href="shoes3.html?logo=${data.品牌}" style="margin: auto; text-decoration:none">
                <div class="cards" style="width: 200px; height: 200px; background-color: #E3E3E3; text-align: center;border-radius: 7px;">
                    <img src="${data.圖片}" class="" alt="..." style="height: 100px; width: 100px; position: relative; top: 20%;">
                    <div class="w-100" style="background-color: white; position:relative; top: 32%; border-radius: 0px 0px 7px 7px">
                        <p class="card-text" style="color: #A3A3A3 ; text-align: center; font-size: 25px; ">${data.品牌}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
    }
   
    $('#x').append(content);
    
    

}
getList();

function getList(){ //顯示內容
    $.get('http://' + ip + '/api/shoesinformation3',function(data,status){
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



