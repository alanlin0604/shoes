var urls = [];
      $(document).ready(function() {
        var url = location.search;
        var number;  // 派工單編號
        var fuck; // 儲url分隔
        var stringsss = ""
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            // str.split("=")[0] 為 userID
            fuck = str.split("=");
            number = str.split("=")[1];
            fuck.shift();
        }
        if (number == undefined) {
            number = '';
        }


        for (var i = 0; i < fuck.length ; i++) {
          console.log(fuck)
          urls.push("http://" + ip + "/PrintingDispatchListPDF.html");
        }


      var requests = [];
      for (var i = 0; i < urls.length; i++) {
        requests.push($.get(urls[i]));
      }

      $.when.apply($, requests).done(function() {
        var fileContents = [];
        for (var i = 0; i < arguments.length; i++) {
          fileContents.push(arguments[i][0]);
        }

        $("#result").html(fileContents.join(""));
      });
    });