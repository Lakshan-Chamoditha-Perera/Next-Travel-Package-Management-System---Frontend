export function getAll() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8091/api/v1/hotel/getAll", "method": "GET", "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            console.log("success")
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}


export function getLastOngoingHotelId() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8091/api/v1/hotel/get/lastId", "method": "GET", "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}