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

export function save_hotel(hotel) {
    console.log(hotel)
    return new Promise((resolve, reject) => {
        const guideBlob = new Blob([JSON.stringify(hotel)], {type: 'application/json'});
        let form = new FormData();

        form.append("hotel", guideBlob);
        form.append("img1", $('#hotel_form_img_1')[0].files[0],);
        form.append("img2", $('#hotel_form_img_2')[0].files[0],);
        form.append("img3", $('#hotel_form_img_3')[0].files[0],);
        form.append("img4", $('#hotel_form_img_4')[0].files[0],);

        let settings = {
            "url": "http://localhost:8091/api/v1/hotel/save",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };""

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}
//----------------------------------------------------------------------------------------------------
// delete --------------------------------------------------------------------------------------------
export function delete_hotel(hotel_id) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8091/api/v1/hotel/delete/" + hotel_id,
            "method": "DELETE",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}