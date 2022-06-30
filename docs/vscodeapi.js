var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function getJSONSync(url) {
    return new Promise(function (resolve, reject) {
        getJSON(url, function(err, data) {
            if (err != null)
                reject({
                    status: "unable to load sample data"
                });
            else
                resolve(data);
        });
    });
}

function acquireVsCodeApi(project) {
    return {
        postMessage: function(msgParam) {
            if (msgParam.command == 'vizzu-ready') {
                let data = null;
                let datasum = null;
                if (!project) project = 'vizzu-lib';
                let jsonfile = project+'-data.json';
                getJSONSync(jsonfile).then(
                    (d1) => {
                        data = d1;
                        let jsonfile = project+'-datasum.json';
                        getJSONSync(jsonfile).then(
                            (d2) => {
                                datasum = d2;
                                window.postMessage({
                                    command: 'refresh-data-table',
                                    dataTable: data,
                                    dataSummary: datasum
                                });                                            
                            }
                        );        
                    }
                );
            }
            else {
                console.log(msgParam);
            }
        }
    };
}
