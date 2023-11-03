export function getPaymentId() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8095/api/v1/payment/get/onGoingPaymentId", "method": "GET", "timeout": 0,
        }
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response.data)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown)
        });
    })
}

export function getPaymentTotalByBookingId(id) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8095/api/v1/payment/get/sum_by_booking_id",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "id": id,
            }
        }
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown)
        });
    })
}

export function save_payment(payment) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([JSON.stringify(payment)], {type: 'application/json'});

        let formData = new FormData();
        formData.append("payment", blob);
        formData.append("receipt", $('#payment_slip_input')[0].files[0]);

        let settings = {
            "url": "http://localhost:8095/api/v1/payment/save",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown)
        });
    })
}