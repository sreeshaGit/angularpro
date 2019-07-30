/**
* This function calls the service and returns the response.
* @param url - service url.
* @param method - service method(GET,POST)
* @param params - parameter to be passed to the service
*/
export function apiCaller(url, method, params) {
    var error = "Please try after sometime";
    var headers= {
         Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    var options = {};
    options.method = method;
    options.headers = headers;
    if(params){
        options.body = JSON.stringify(params);
    }
    return new Promise( (resolve, reject) => {
        fetch(url,options).then( response => {
            if (response.status === 200 ){
                response.json().then( json => {
                  resolve(json);
                });
            } else if(response.status === 400) {
                response.json().then( json => {
                    reject(json.error);
                });
            } else  {
                reject(error);
            }
        }).catch( err => {
            reject(err);
        })
    });
}
