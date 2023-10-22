export function getLastGuideId() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8089/api/v1/guide/get/lastId", "method": "GET", "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}

export function getAll() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8089/api/v1/guide/getAll", "method": "GET", "timeout": 0,
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

export function save_guide(guide){
    console.log(guide)
    return new Promise((resolve, reject) => {
        const guideBlob = new Blob([JSON.stringify(guide)], {type: 'application/json'});
        let form = new FormData();

        form.append("guide", guideBlob);
        form.append("nic_front", $('#nic_front')[0].files[0],);
        form.append("nic_back", $('#nic_back')[0].files[0],);
        form.append("guide_id_front", $('#id_front')[0].files[0],);
        form.append("guide_id_back", $('#id_back')[0].files[0],);
        form.append("profile", $('#profile_img')[0].files[0],);


        let settings = {
            "url": "http://localhost:8089/api/v1/guide/save",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
            console.log(response)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}