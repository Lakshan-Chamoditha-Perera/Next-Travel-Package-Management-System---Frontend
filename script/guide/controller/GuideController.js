import {getLastGuideId} from "../model/GuideModel.js";

$(document).ready(()=>{
    getLastVehicleId();
})
function getLastVehicleId() {
    let promise = getLastGuideId();
    promise.then((data) => {
        console.log(data);
        $('#guide_id').val(data);
    }).catch((e) => {
        alert("Error in getting Guide ID !");
    });
}
$('#btn_save_guide').onclick = function () {
    console.log('save guide');
}

