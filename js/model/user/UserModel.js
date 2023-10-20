//signup new user
export function signup(user) {
    console.log("signup called");

    return new Promise((resolve, reject) => {

        const userBlob = new Blob([JSON.stringify(user)], {type: 'application/json'});
        let form = new FormData();

        form.append("user", userBlob);
        form.append("nic_front", $('#nic_front')[0].files[0], "Screenshot from 2023-10-09 18-29-55.png");
        form.append("nic_back", $('#nic_back')[0].files[0], "ModelMapperConfig.java");

        let settings = {
            "url": "http://localhost:8085/api/v1/user/register",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response, textStatus, jqXHR) {
            resolve(response);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}


export function existsByUsername(username) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:8085/api/v1/user/check/' + username, type: 'GET', success: (data) => {
                resolve(true);
            }, error: (err) => {
                reject(false);
            }
        });
    });
}