import {getLastGuideId} from "../model/GuideModel.js";


const guide_id_regex = /^G\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const doublePattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
const contact_number = /^\d{10}$/;
$(document).ready(()=>{
    getLastVehicleId();
})


// -----------------------------------------------------------------------------------------
// get last ongoing vehicle id -------------------------------------------------------------
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

// -----------------------------------------------------------------------------------------
// save ------------------------------------------------------------------------------------