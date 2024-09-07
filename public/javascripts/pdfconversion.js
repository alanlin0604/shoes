var url = location.search;
    var number;  // 派工單編號
    var urls; // 儲url分隔
    var stringsss = ""
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        // str.split("=")[0] 為 userID
        urls = str.split("=");
        number = str.split("=")[1];
        urls.shift();
    }
    if (number == undefined) {
        number = '';
    }


//$(window).on("load", function () {
    async function pdf() {

    if (document.getElementById('nfcarea')){
      console.log(document.getElementById('nfcarea').style.display )
      document.getElementById('nfcarea').style.display = "none";
    }
        // for (var i = 0; i < urls.length; i++) {
        //   await generatePDF(i);
        // }
    // const doc = new jsPDF('l', 'pt');  
    const doc = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: [900, 550],
        compress: true
    });  
    for (let i = 0; i < urls.length; i++) {
        const rename = "ID" + String(i);
        const downloading = document.getElementById(rename);
        
        await html2canvas(downloading, {
          width: 1850
        }).then((canvas) => {
          doc.addImage(canvas.toDataURL("image/png",0.8), 'JPEG', 5, 5, 1000, 550);
          if (i !== urls.length - 1) {
            doc.addPage();
          }
        });
      }
    
      doc.save("Document.pdf");
    
      if (document.getElementById('nfcarea')){
        document.getElementById('nfcarea').style.display = ""
      }
    }   
//)

