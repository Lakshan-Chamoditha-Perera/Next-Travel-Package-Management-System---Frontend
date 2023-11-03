export function getLastOnGoingPackageId() {
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

export function addBooking(booking) {
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

export function getBookingCountByUserAndStatus(user, status) {
    return new Promise((resolve,reject)=>{
        let settings = {
            "url": "http://localhost:8095/api/v1/booking/get/bookingCount",
            "method": "GET",
            "timeout": 0,
            "headers":{
                "user_id":user,
                "status":status
            }
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            console.log(response)
            resolve( response.data)
        }).fail(function (jqXHR, textStatus, errorThrown) {
        });
    })
}

//--------------------------------------------------------------------------------------
//
export function bookingIsExists(bookingId) {
    return new Promise((resolve, reject)=>{
        let settings ={
            "url":"http://localhost:8095/api/v1/booking/get/isExists",
            "method": "GET",
            "timeout": 0,
            "headers":{
                "id":bookingId,
            }
        }

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            console.log(response)
            resolve( response.data)
        }).fail(function (jqXHR, textStatus, errorThrown) {
           reject(errorThrown)
        });
    })
}

//----------------------------------
export function getBookingById(bookingId) {
    return new Promise((resolve, reject)=>{
        let settings ={
            "url":"http://localhost:8095/api/v1/booking/get",
            "method": "GET",
            "timeout": 0,
            "headers":{
                "id":bookingId,
            }
        }

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {

        });
    })
}