export function getLastGuideId(){
    return new Promise((resolve,reject)=>{
            let settings = {
                "url": "http://localhost:8089/api/v1/guide/get/lastId",
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response, textStatus, jqXHR) {
                resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                reject(errorThrown);
            });
        }
    )
}


export function getAll(){
    return new Promise((resolve,reject)=>{
            let settings = {
                "url": "http://localhost:8089/api/v1/guide/getAll",
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response, textStatus, jqXHR) {
                console.log("success")
                resolve(response);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                reject(errorThrown);
            });
        }
    )
}