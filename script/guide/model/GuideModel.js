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