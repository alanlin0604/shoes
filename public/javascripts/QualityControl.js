var url = location.search;
var rid;
var urls;

var work, workorderNumber;
// work 工作類別
// workorderNumber
if (url.indexOf("?") != -1) {
    var str = url.substr(1);

    //以下是將網址切割 QC.html?orderNumber=215082&Cutting=4 
    // orderNumber 是製令單號  Cutting 是工作內容 4是派工單編號
    // 經過切割完之後 僅會保留 215082 跟 4
    urls =  str;
    urls = urls.replace("&", "=")
    console.log()
    urls = urls.split("=");
    urls.shift();
    console.log(urls)
    work = urls[1];
    workorderNumber = urls[2];
    // str.split("=")[0] 為 userID
    rid = urls[0];
}
if (rid == undefined) {
    rid = '';
}



$(document).ready(function(){
  var sum = 0;
  var content =
  `
  <h5 style="padding-left: 10px;"><strong>品管回報</strong></h5>
    <div class="line" style="text-align: center; margin-top: -10px;">
      <span class="line w-100" style="display: inline-block; margin-bottom: 10px; border-top: 1px solid #C2C2C2;"></span>
    </div>
    
    <form id="department">
      <div class="form-group">
        <label for="exampleFormControlSelect1">製令單號</label>
        <select class="form-control" id="exampleFormControlSelect1" disabled>
          <option>215082</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">型體編號</label>
        <select class="form-control" id="exampleFormControlSelect1" disabled>
          <option>SP8190B-A-1</option>
        </select>
      </div>
    </form>
  `;
  $('#create').append(content);
  switch(work){
      case "Cutting":
        console.log(rid + " " + workorderNumber)
        $.get('http://' + ip + '/api/QCCutting', {'rid': rid, 'ID': workorderNumber}, function (data,status) {
          if(data.length == "0"){
            return clearweb()
          }
          sum = 0;
          for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i].數量)
            SizeAndAmount(data[i]);
          }
          var DispatchTime = new Date(data[0].派工時間).format("yyyy-MM-dd hh:mm:ss");
          var CompleteTime = new Date(data[0].完成時間).format("yyyy-MM-dd hh:mm:ss");
          var Time =
          `
          <div class="form-group">
                <label for="exampleFormControlSelect2">派工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${DispatchTime}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">完工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${CompleteTime}</option>
                </select>
              </div>
          `;
          $('#department').append(Time);
        })
        setTimeout(() =>{
          Cutting(sum);
        }, 100)
        break;
      case "Printing":
        console.log(rid + " " + workorderNumber)
        $.get('http://' + ip + '/api/QCPrinting', {'rid': rid, 'ID': workorderNumber}, function (data,status) {
          if(data.length == "0"){
            return clearweb()
          }  
          sum = 0;
          for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i].完成數量)
            SizeAndAmountPrintAndHigh(data[i]);
          }
          var DispatchTime = new Date(data[0].派工時間).format("yyyy-MM-dd hh:mm:ss");
          var CompleteTime = new Date(data[0].完成時間).format("yyyy-MM-dd hh:mm:ss");
          var Time =
          `
          <div class="form-group">
                <label for="exampleFormControlSelect2">派工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${DispatchTime}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">完工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${CompleteTime}</option>
                </select>
              </div>
          `;
          $('#department').append(Time);
        })
        
        setTimeout(() => {
          Printing(sum);
        }, 100)
        
        break;
      case "HighFrequency":
        $.get('http://' + ip + '/api/QCHighFrequency', {'rid': rid, 'ID': workorderNumber}, function (data,status) {
          if(data.length == "0"){
            return clearweb()
          }
          sum = 0;
          for (var i = 0; i < data.length; i++) {
            sum += parseInt(data[i].完成數量)
            SizeAndAmountPrintAndHigh(data[i]);
          }
          var DispatchTime = new Date(data[0].派工時間).format("yyyy-MM-dd hh:mm:ss");
          var CompleteTime = new Date(data[0].完成時間).format("yyyy-MM-dd hh:mm:ss");
          var Time =
          `
          <div class="form-group">
                <label for="exampleFormControlSelect2">派工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${DispatchTime}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect2">完工時間</label>
                <select class="form-control" id="exampleFormControlSelect1" disabled>
                  <option>${CompleteTime}</option>
                </select>
              </div>
          `;
          $('#department').append(Time);
        })
        setTimeout(() => {
          HighFrequency(sum);
        }, 100)
        break;
      default:
        clearweb();
  }
    
})

// 單選 radio  多選 checkbox



function SizeAndAmount(data) { // 顯示尺寸和數量
    var size =
        `
        <th  class="fileDiv"scope="col" id="sizeo" style="width:100px;">${data.尺寸}</th>      
        `;
    $('#size').append(size);
    var amount =
        `
        <th  class="fileDiv1" scope="col"id="numo"style="width:100px;" >${data.數量}</th>
        `;
    $('#num').append(amount);
    var complete_amount =
        `
        <th  class="fileDiv1" scope="col"id="numo"style="width:100px;" >${data.完成數量}</th>
        `;
    $('#complete').append(complete_amount);
}

function SizeAndAmountPrintAndHigh(data) { // 顯示尺寸和數量
  var size =
      `
      <th  class="fileDiv"scope="col" id="sizeo" style="width:100px;">${data.尺寸}</th>      
      `;
  $('#size').append(size);
  var amount =
      `
      <th  class="fileDiv1" scope="col"id="numo"style="width:100px;" >${data.總數量}</th>
      `;
  $('#num').append(amount);
  var complete_amount =
      `
      <th  class="fileDiv1" scope="col"id="numo"style="width:100px;" >${data.完成數量}</th>
      `;
  $('#complete').append(complete_amount);
}


function clearweb(){
    document.getElementById("information").remove();
    document.getElementById("sumit").remove();
    document.getElementById("create").remove();
    document.getElementById("buttons").remove();
    var content=
    `
    <h5 style="margin-top: 120px; margin-left: 70px;">不好意思，你的網址有誤，請勿嘗試修改URL。</h5>
    `;
    $('#selectContainer').append(content);
}
function Cutting(sum){
  $.get('http://' + ip + '/api/GetCuttingQC', {'派工單編號': workorderNumber}, function (data,status) {
    if(data.length == 0){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertCutting()">提交</button>
      `;
      console.log('無資料 新增中')
    }else if(data[0].是否修改 == '0'){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertCutting()">修改</button>
      `;
      console.log('未修改')
    }else{
      var createbutton =
      `
      <a style="text-decoration: none; cursor: not-allowed;">
        <button type="button" class="btn btn-outline-danger" disabled>已回報</button>
      </a>
      `;
      console.log('已修改')
    }

    setTimeout(() => {
      $('#SumitButton').append(createbutton);
    }, 10)
  })
  
  var workselect = 
  `
  <h5 style="margin-top: 15px; margin-bottom: -10px;">工作內容: 剪裁</h5>
  `
  $('#workselect').append(workselect);
    var content = 
    `
    <ul class="nav nav-tabs" style="margin-bottom: 10px;">
        <li class="nav-item">
          <a class="nav-link active">剪裁</a>
        </li>
      </ul>

      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="CuttingMaterialRadio" value="" onchange="">
            <label class="form-check-label" for="CuttingMaterialRadio">來料是否有問題</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" max="${sum}" step="1" class="form-control" id="CuttingMaterial" oninput="CheckCutting(this.id, this.max)" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="CuttingMaterialText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="CuttingMaterialProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="CuttingMaterialBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
          </div>
        </div>
      </div>
    `;
    $('#department').append(content);
}
function Printing(sum){
  $.get('http://' + ip + '/api/GetPrintingQC', {'派工單編號': workorderNumber}, function (data,status) {
    if(data.length == 0){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertPrinting()">提交</button>
      `;
      console.log('無資料 新增中')
    }else if(data[0].是否修改 == '0'){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertPrinting()">修改</button>
      `;
      console.log('未修改')
    }else{
      var createbutton =
      `
      <a style="text-decoration: none; cursor: not-allowed;">
        <button type="button" class="btn btn-outline-danger" disabled>已回報</button>
      </a>
      `;
      console.log('已修改')
    }

    setTimeout(() => {
      $('#SumitButton').append(createbutton);
    }, 10)
  })
  
  var workselect = 
  `
  <h5 style="margin-top: 15px; margin-bottom: -10px;">工作內容: 印刷</h5>
  `
  $('#workselect').append(workselect);
    var content=
    `
    <ul class="nav nav-tabs" style="margin-bottom: 10px;">
        <li class="nav-item">
          <a class="nav-link active">印刷</a>
        </li>
      </ul>

      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="PrintingImageRadio" value="" onchange="getbuttonGroupdispatchsize()">
            <label class="form-check-label" for="PrintingImageRadio">圖案是否印製正確</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" step="1" class="form-control" id="PrintingImage" oninput="CheckPrinting(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="PrintingImageText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="PrintingImageProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="PrintingImageBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">品質：&nbsp;&nbsp;&nbsp;&nbsp;0%</div>
              </div>
              品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
            </div>
          </div>
      </div>
      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="PrintingColorRadio" value="" onchange="getbuttonGroupdispatchsize()">
            <label class="form-check-label" for="PrintingColorRadio">顏色是否正確</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" step="1" class="form-control" id="PrintingColor" oninput="CheckPrinting(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="PrintingColorText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="PrintingColorProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="PrintingColorBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">品質：&nbsp;&nbsp;&nbsp;&nbsp;0%</div>
              </div>
              品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
            </div>
          </div>
      </div>
      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="PrintingSizeRadio" value="" onchange="getbuttonGroupdispatchsize()">
            <label class="form-check-label" for="PrintingSizeRadio">是否印刷在正確的碼段上</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" step="1" class="form-control" id="PrintingSize" oninput="CheckPrinting(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="PrintingSizeText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="PrintingSizeProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="PrintingSizeBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">品質：&nbsp;&nbsp;&nbsp;&nbsp;0%</div>
              </div>
              品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
            </div>
          </div>
      </div>
      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="PrintingOilRadio" value="" onchange="getbuttonGroupdispatchsize()">
            <label class="form-check-label" for="PrintingOilRadio">印刷油墨是否牢固</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" step="1" class="form-control" id="PrintingOil" oninput="CheckPrinting(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="PrintingOilText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="PrintingOilProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="PrintingOilBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">品質：&nbsp;&nbsp;&nbsp;&nbsp;0%</div>
              </div>
              品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
            </div>
          </div>
      </div>
      <div class="form-check">
        <div class="row">
          <div class="col-3">
            <input class="form-check-input" type="checkbox" name="test1" id="PrintingCheckRadio" value="" onchange="getbuttonGroupdispatchsize()">
            <label class="form-check-label" for="PrintingCheckRadio">印刷效果 是否有達到 客人要求</label>
          </div>
          <div class="col-2">
            <input type="number" min="0" step="1" class="form-control" id="PrintingCheck" oninput="CheckPrinting(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
          </div>
          <div class="col-2" id="PrintingCheckText">
            完成數: 0 / ${sum}
          </div>
          <div class="col" id="PrintingCheckProgress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" id="PrintingCheckBar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">品質：&nbsp;&nbsp;&nbsp;&nbsp;0%</div>
              </div>
              品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
            </div>
          </div>
      </div>
    `;
    $('#department').append(content);
}
function HighFrequency(sum){
  $.get('http://' + ip + '/api/GetHighFrequencyQC', {'派工單編號': workorderNumber}, function (data,status) {
    if(data.length == 0){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertHighFrequency()">提交</button>
      `;
      console.log('無資料 新增中')
    }else if(data[0].是否修改 == '0'){
      var createbutton =
      `
      <button type="button" class="btn btn-outline-success" onclick="InsertHighFrequency()">修改</button>
      `;
      console.log('未修改')
    }else{
      var createbutton =
      `
      <a style="text-decoration: none; cursor: not-allowed;">
        <button type="button" class="btn btn-outline-danger" disabled>已回報</button>
      </a>
      `;
      console.log('已修改')
    }

    setTimeout(() => {
      $('#SumitButton').append(createbutton);
    }, 10)
  })

  var workselect = 
  `
  <h5 style="margin-top: 15px; margin-bottom: -10px;">工作內容: 高周波</h5>
  `
  $('#workselect').append(workselect);
    var content = 
    `
    <ul class="nav nav-tabs" id="myTab" role="tablist" style="margin-bottom: 10px;">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#HotPress" type="button" role="tab" aria-controls="HotPress" aria-selected="true">熱壓</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#Brand" type="button" role="tab" aria-controls="Brand" aria-selected="false">烙印</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#Weld" type="button" role="tab" aria-controls="Weld" aria-selected="false">熱切</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#ThermalTransfer" type="button" role="tab" aria-controls="ThermalTransfer" aria-selected="false">轉印</button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="HotPress" role="tabpanel" aria-labelledby="HotPress-tab">
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="HotPressGluingRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="HotPressGluingRadio">熱壓後的產品是否有開膠的問題</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="HotPressGluing" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="HotPressGluingText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="HotPressGluingProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="HotPressCheckRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="HotPressCheckRadio">熱壓後的產品是否同客人需求</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="HotPressCheck" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="HotPressCheckText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="HotPressCheckProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
      </div>
      <div class="tab-pane fade" id="Brand" role="tabpanel" aria-labelledby="Brand-tab">
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="BrandTextureRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="BrandTextureRadio">紋路是否夠深夠明顯</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="BrandTexture" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="BrandTextureText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="BrandTextureProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="BrandDamageRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="BrandDamageRadio">是否損傷材料</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="BrandDamage" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="BrandDamageText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="BrandDamageProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
      </div>
      <div class="tab-pane fade" id="Weld" role="tabpanel" aria-labelledby="Weld-tab">
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="WeldAdhesionRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="WeldAdhesionRadio">材料牢度是否達到標準</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="WeldAdhesion" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="WeldAdhesionText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="WeldAdhesionProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="WeldDamageRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="WeldDamageRadio">材料是否損傷</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="WeldDamage" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="WeldDamageText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="WeldDamageProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="WeldSlicedRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="WeldSlicedRadio">熱切分片是否在正確位置上</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="WeldSliced" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="WeldSlicedText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="WeldSlicedProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="WeldCheckRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="WeldCheckRadio">熱切效果否達到客人要求</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="WeldCheck" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="WeldCheckText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="WeldCheckProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="WeldLastingRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="WeldLastingRadio">是否有包風問題</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="WeldLasting" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="WeldLastingText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="WeldLastingProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
      </div>
      <div class="tab-pane fade" id="ThermalTransfer" role="tabpanel" aria-labelledby="ThermalTransfer-tab">
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="ThermalTransferCorrectRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="ThermalTransferCorrectRadio">圖形是否正確</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="ThermalTransferCorrect" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="ThermalTransferCorrectText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="ThermalTransferCorrectProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar"style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="ThermalTransferCheckRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="ThermalTransferCheckRadio">效果是否有達到客人要求</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="ThermalTransferCheck" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="ThermalTransferCheckText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="ThermalTransferCheckProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="ThermalTransferAdhesionRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="ThermalTransferAdhesionRadio">轉印的設計是否牢度足夠</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="ThermalTransferAdhesion" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="ThermalTransferAdhesionText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="ThermalTransferAdhesionProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
        <div class="form-check">
          <div class="row">
            <div class="col-3">
              <input class="form-check-input" type="checkbox" name="test1" id="ThermalTransferSizeRadio" value="" onchange="getbuttonGroupdispatchsize()">
              <label class="form-check-label" for="ThermalTransferSizeRadio">是否轉印在正確尺碼</label>
            </div>
            <div class="col-2">
              <input type="number" min="0" step="1" class="form-control" id="ThermalTransferSize" oninput="CheckHighFrequency(this.id, this.max)" max="${sum}" placeholder="請填入失誤數">
            </div>
            <div class="col-2" id="ThermalTransferSizeText">
              完成數: 0 / ${sum}
            </div>
            <div class="col" id="ThermalTransferSizeProgress">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                品質：&nbsp;&nbsp;&nbsp;&nbsp;0%
              </div>
            </div>
        </div>
      </div>
    </div>
    `;
    $('#department').append(content);
}





function CheckCutting(name, max){
  var CuttingMaterial = document.getElementById(name).value;
  if(CuttingMaterial == ""){
    CuttingMaterial = 0;
    document.getElementById(name).value = 0;
  }
  document.getElementById(name + "Text").innerHTML = "完成數: " + (max - CuttingMaterial) + " / " + max;
  var percent = 0
  percent = (((max - CuttingMaterial) / max)*100).toFixed(0);
  // console.log(percent)
  document.getElementById(name + "Progress").innerHTML = 
  `
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${percent}%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    品質：&nbsp;&nbsp;&nbsp;&nbsp;${percent}%

  `;
}

function InsertCutting(){
  var TextData = document.getElementById("CuttingMaterial").value;
  var AllAmount = 0;

  $.get('http://' + ip + '/api/GetCuttingQC', {'派工單編號': workorderNumber}, function (data,status) {
    setTimeout(() => {
      $.get('http://' + ip + '/api/PrintCutting', {'number': workorderNumber}, function (data,status) {
        for(var i = 0;i < data.length; i++){
          AllAmount += data[i].數量;
        }
      })
    } , 50)
    
    if(data.length == 0){

      setTimeout(() => {
        var percent;
        $.get('http://' + ip + '/api/PrintCutting', {'number': workorderNumber}, function (data,status) {
          for(var i = 0;i < data.length; i++){
            percent = ((TextData / AllAmount)*100).toFixed(0);
    
            $.get('http://' + ip + '/api/InsterCuttingQC', {'製令單號': rid, '工作內容': '剪裁', '部位名稱': data[i].部位, '尺寸': data[i].尺寸, '數量': data[i].數量, '派工單編號': workorderNumber, '來料問題': TextData, '是否修改': '0', '完成進度': percent}, function (res) {
                      //INSERT INTO cuttingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 來料問題, 是否修改, 完成進度) 
            });
        }
        })
      }, 100)

    }else if(data[0].是否修改 == '0'){
      console.log('可修改一次')
      setTimeout(() => {
        var percent;
        $.get('http://' + ip + '/api/PrintCutting', {'number': workorderNumber}, function (data,status) {
          for(var i = 0;i < data.length; i++){
            percent = ((TextData / AllAmount)*100).toFixed(0);
            console.log(TextData)
            $.get('http://' + ip + '/api/UpdateCuttingQC', {'來料問題': TextData, '是否修改': '1', '完成進度': percent,'製令單號': rid, '部位名稱': data[i].部位, '尺寸': data[i].尺寸, '派工單編號': workorderNumber}, function (res) {
              
            });
        }
        })
      }, 100)

  } 
  
  })
}



function CheckPrinting(name, max){
  var Printing = document.getElementById(name).value;
  if(Printing == ""){
    Printing = 0;
    document.getElementById(name).value = 0;
  }
  document.getElementById(name + "Text").innerHTML = "完成數: " + (max - Printing) + " / " + max;
  var percent = 0
  percent = (((max - Printing) / max)*100).toFixed(0);
  // console.log(percent)
  // console.log(name + "Progress")
  document.getElementById(name + "Progress").innerHTML = 
  `
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${percent}%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    品質：&nbsp;&nbsp;&nbsp;&nbsp;${percent}%

  `;
}

function InsertPrinting(){
  var PrintingImage = document.getElementById("PrintingImage").value;
  var PrintingColor = document.getElementById("PrintingColor").value;
  var PrintingSize = document.getElementById("PrintingSize").value;
  var PrintingOil = document.getElementById("PrintingOil").value;
  var PrintingCheck = document.getElementById("PrintingCheck").value;
  var section, AllAmount = 0;;
  $.get('http://' + ip + '/api/GetPrintingItem', {'rid': rid}, function (data,status) {
    section = data[0].部位;
  })

  $.get('http://' + ip + '/api/GetPrintingQC', {'派工單編號': workorderNumber}, function (data,status) {
    setTimeout(() => {
      $.get('http://' + ip + '/api/GetPrintingTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
        for(var i = 0;i < data.length; i++){
          AllAmount += data[i].總數量;
        }
      })
    } , 50)
    
    if(data.length == 0){

      setTimeout(() => {
        var percent;
        console.log(rid, workorderNumber)
        $.get('http://' + ip + '/api/GetPrintingTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
          
          for(var i = 0;i < data.length; i++){
            $.get('http://' + ip + '/api/InsterPrintingQC', {'製令單號': rid, '工作內容': '印刷', '部位名稱': section, '尺寸': data[i].尺寸, '數量': data[i].總數量, '派工單編號': workorderNumber, '正確圖案': PrintingImage, '正確顏色': PrintingColor, '正確段碼': PrintingSize, '油墨牢固': PrintingOil, '達到效果': PrintingCheck, '是否修改': '0'}, function (res) {
                      //INSERT INTO printingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 正確圖案, 正確顏色, 正確段碼, 油墨牢固, 達到效果, 是否修改, 完成進度) 
            });
        }
        })
      }, 100)

    }else if(data[0].是否修改 == '0'){
      console.log('可修改一次')
      setTimeout(() => {
        $.get('http://' + ip + '/api/GetPrintingTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
          console.log(data)
          for(var i = 0;i < data.length; i++){
            $.get('http://' + ip + '/api/UpdatePrintingQC', {'正確圖案': PrintingImage, '正確顏色': PrintingColor, '正確段碼': PrintingSize, '油墨牢固': PrintingOil, '達到效果': PrintingCheck, '是否修改': '1','製令單號': rid, '部位名稱': section, '尺寸': data[i].尺寸, '派工單編號': workorderNumber}, function (res) {
              
            });
        }
        })
      }, 100)
  } 
  })

}


function CheckHighFrequency(name, max){
  var HighFrequency = document.getElementById(name).value;
  if(HighFrequency == ""){
    HighFrequency = 0;
    document.getElementById(name).value = 0;
  }
  document.getElementById(name + "Text").innerHTML = "完成數: " + (max - HighFrequency) + " / " + max;
  var percent = 0
  percent = (((max - HighFrequency) / max)*100).toFixed(0);
  // console.log(percent)
  // console.log(name + "Progress")
  document.getElementById(name + "Progress").innerHTML = 
  `
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${percent}%; text-align: center;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    品質：&nbsp;&nbsp;&nbsp;&nbsp;${percent}%

  `;
}

function InsertHighFrequency(){
  var HotPressGluing = document.getElementById("HotPressGluing").value;
  var HotPressCheck = document.getElementById("HotPressCheck").value;

  var BrandTexture = document.getElementById("BrandTexture").value;
  var BrandDamage = document.getElementById("BrandDamage").value;

  var WeldAdhesion = document.getElementById("WeldAdhesion").value;
  var WeldDamage = document.getElementById("WeldDamage").value;
  var WeldSliced = document.getElementById("WeldSliced").value;
  var WeldCheck = document.getElementById("WeldCheck").value;
  var WeldLasting = document.getElementById("WeldLasting").value;

  var ThermalTransferCorrect = document.getElementById("ThermalTransferCorrect").value;
  var ThermalTransferCheck = document.getElementById("ThermalTransferCheck").value;
  var ThermalTransferAdhesion = document.getElementById("ThermalTransferAdhesion").value;
  var ThermalTransferSize = document.getElementById("ThermalTransferSize").value;

  var section, AllAmount = 0;;
  $.get('http://' + ip + '/api/GetHighFrequencyItem', {'rid': rid}, function (data,status) {
    section = data[0].部位;
  })

  $.get('http://' + ip + '/api/GetHighFrequencyQC', {'派工單編號': workorderNumber}, function (data,status) {
    setTimeout(() => {
      $.get('http://' + ip + '/api/GetHighFrequencyTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
        for(var i = 0;i < data.length; i++){
          AllAmount += data[i].總數量;
        }
      })
    } , 50)
    
    if(data.length == 0){

      setTimeout(() => {
        console.log(rid, workorderNumber)
        $.get('http://' + ip + '/api/GetHighFrequencyTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
          
          for(var i = 0;i < data.length; i++){
            $.get('http://' + ip + '/api/InsterHighFrequencyQC', {'製令單號': rid,'工作內容': '高周波', '部位名稱': section, '尺寸': data[i].尺寸, '數量': data[i].總數量, '派工單編號': workorderNumber, '熱壓開膠': HotPressGluing, '熱壓效果': HotPressCheck, '烙印紋路': BrandTexture, '烙印損傷': BrandDamage, '熱切牢度': WeldAdhesion, '熱切損傷': WeldDamage, '熱切分片': WeldSliced, '熱切效果': WeldCheck, '熱切包風': WeldLasting, '轉印圖案': ThermalTransferCorrect, '轉印效果': ThermalTransferCheck, '轉印牢度': ThermalTransferAdhesion, '轉印尺碼': ThermalTransferSize, '是否修改': '0'}, function (res) {
                      //INSERT INTO printingqc (製令單號, 工作內容, 部位名稱, 尺寸, 數量, 派工單編號, 正確圖案, 正確顏色, 正確段碼, 油墨牢固, 達到效果, 是否修改, 完成進度) 
            });
        }
        })
      }, 100)
      


    }else if(data[0].是否修改 == '0'){
      console.log('可修改一次')
      setTimeout(() => {
        $.get('http://' + ip + '/api/GetHighFrequencyTableList', {'製令單號': rid, '派工單編號': workorderNumber}, function (data,status) {
          console.log(data)
          for(var i = 0;i < data.length; i++){
            $.get('http://' + ip + '/api/UpdateHighFrequencyQC', {'熱壓開膠': HotPressGluing, '熱壓效果': HotPressCheck, '烙印紋路': BrandTexture, '烙印損傷': BrandDamage, '熱切牢度': WeldAdhesion, '熱切損傷': WeldDamage, '熱切分片': WeldSliced, '熱切效果': WeldCheck, '熱切包風': WeldLasting, '轉印圖案': ThermalTransferCorrect, '轉印效果': ThermalTransferCheck, '轉印牢度': ThermalTransferAdhesion, '轉印尺碼': ThermalTransferSize, '是否修改': '1', '製令單號': rid, '部位名稱': section, '尺寸': data[i].尺寸, '派工單編號': workorderNumber}, function (res) {
              
            });
        }
        })
      }, 100)
  } 
  })

}








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