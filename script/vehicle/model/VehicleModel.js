export function save_vehicle(vehicle) {
    return new Promise((resolve, reject) => {
        const vehicleBlob = new Blob(
            [JSON.stringify(vehicle)],
            {type: 'application/json'}
        );
        let form = new FormData();

        form.append("vehicle", vehicleBlob);
        form.append("vehicle_img1", $('#img1')[0].files[0],);
        form.append("vehicle_img2", $('#img2')[0].files[0],);
        form.append("vehicle_img3", $('#img3')[0].files[0],);
        form.append("vehicle_img4", $('#img4')[0].files[0],);
        form.append("vehicle_img5", $('#img5')[0].files[0],);
        form.append("driver_id",$('#driver_id').val(),);
        console.log($('#driver_id').val())
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/save",
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

export function delete_vehicle(vehicle_id) {
    console.log(vehicle_id)
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/delete",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "id": vehicle_id,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function get_vehicle(vehicle_id) {
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/get",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "vehicle_id": vehicle_id,
            },
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            // get data from response & return vehicle + driver objects
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function getAll(){
    return new Promise((resolve,reject)=>{
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/getAll",
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

export function getLastOnGoingVehicleId(){
    return new Promise((resolve,reject)=>{
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/get/lastId",
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

export function existsById(vehicle_id){
    return new Promise((resolve, reject) => {
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/check/",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "vehicle_id": vehicle_id,
            },
        };
        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    })
}

export function update_vehicle(vehicle){
    return new Promise((resolve, reject) => {
        const vehicleBlob = new Blob([JSON.stringify(vehicle)], {type: 'application/json'});
        let form = new FormData();

        form.append("vehicle", vehicleBlob);
        form.append("vehicle_img1", $('#img1')[0].files[0],);
        form.append("vehicle_img2", $('#img2')[0].files[0],);
        form.append("vehicle_img3", $('#img3')[0].files[0],);
        form.append("vehicle_img4", $('#img4')[0].files[0],);
        form.append("vehicle_img5", $('#img5')[0].files[0],);
        form.append("driver_id",$('#driver_id').val(),);
        console.log($('#driver_id').val())
        let settings = {
            "url": "http://localhost:8087/api/v1/vehicle/update",
            "method": "PATCH",
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