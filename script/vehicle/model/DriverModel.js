export function save_driver(driver) {
    console.log("save_driver " + JSON.stringify(driver));
    return new Promise((resolve, reject) => {
        const driverBlob = new Blob([JSON.stringify(driver)], {type: "application/json"});
        let formData = new FormData();
        formData.append("driver", driverBlob);
        formData.append("license_back", $('#img10')[0].files[0]);
        formData.append("license_front", $('#img11')[0].files[0]);

        let settings = {
            "url": "http://localhost:8087/api/v1/driver/save",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(true);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while saving driver");
        });
    });
}


export function getLastOnGoingDriverId() {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8087/api/v1/driver/get/lastId", "method": "GET", "timeout": 0,
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            reject(errorThrown);
        });
    })
}

export function update_driver(driver) {
    console.log("update driver " + JSON.stringify(driver));
    return new Promise((resolve, reject) => {
        const driverBlob = new Blob([JSON.stringify(driver)], {type: "application/json"});
        let formData = new FormData();
        formData.append("driver", driverBlob);
        formData.append("license_back", $('#img10')[0].files[0]);
        formData.append("license_front", $('#img11')[0].files[0]);

        let settings = {
            "url": "http://localhost:8087/api/v1/driver/update",
            "method": "PATCH",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(true);
            console.log(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject("Error while saving driver");
        });
    });
}
