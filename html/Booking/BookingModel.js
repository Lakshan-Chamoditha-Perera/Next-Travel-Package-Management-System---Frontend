export function getLastOnGoingPackageId(){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8095/api/v1/booking/get/onGoingBookingId",
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}

export function addBooking(booking){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8095/api/v1/booking/save",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(booking),
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            console.log(response.message)
            resolve(response.message);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}