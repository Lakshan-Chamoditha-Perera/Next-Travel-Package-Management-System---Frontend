import {getAll, getLastGuideId} from "../model/GuideModel.js";


const guide_id_regex = /^G\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const doublePattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
const contact_number = /^\d{10}$/;

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
// get all ---------------------------------------------------------------------------------
// const createGuideCard =

function loadCards(createGuideCard) {
    let promise = getAll();
    promise.then((data) => {
        console.log("array size: " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                createGuideCard(ele)
            });
        } else alert("No Guide found !")
    }).catch((e) => {
        // alert(e.message);
    });
}

// -----------------------------------------------------------------------------------------
// save ------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
$(document).ready(() => {
    loadCards(function createGuideCard(data) {
        const elementHTML = `<div class="grid-item flex align-content-center ">
            <div class="card">
                <img alt="product-image" class="card-img"
                     src="data:image/png;base64,${data.images_list[0]}">
                <div class="flex-row img_collection space-between">
                    <img class="guide_images" src="data:image/png;base64,${data.images_list[1]}">
                    <img class="guide_images" src="data:image/png;base64,${data.images_list[2]}">
                    <img class="guide_images" src="data:image/png;base64,${data.images_list[3]}">
                    <img class="guide_images" src="data:image/png;base64,${data.images_list[4]}">
                </div>
                <div class="flex-row space-between w-full mb-sm">
                    <p class="category">${data.id}</p>
                </div>
                <h1 class="product-name">${data.name} </h1>
                <div class="flex-row">
                    <p class="price strike">Man day value</p>
                    <p class="price">Rs. ${data.man_day_value}</p>
                </div>
                <div class="flex-row">
                    <p class="price strike">Contact : </p>
                    <p class="price">${data.contact_number}</p>
                </div>

                <div class="btn-col">
                    <a class="icon-link" href="#">View</a>
                </div>
            </div>
        </div>`;

        document.getElementsByClassName('guide_grid_container')[0].innerHTML += elementHTML;
    });
    getLastVehicleId();

})
