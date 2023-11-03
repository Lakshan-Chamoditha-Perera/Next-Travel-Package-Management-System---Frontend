export function getPaymentId(){
    return new Promise((resolve, reject)=>{
        let settings ={
            "url":"http://localhost:8095/api/v1/payment/get/onGoingPaymentId",
            "method": "GET",
            "timeout": 0,
        }
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response.data)
        }).fail(function (jqXHR, textStatus, errorThrown) {
           reject(errorThrown)
        });
    })
}