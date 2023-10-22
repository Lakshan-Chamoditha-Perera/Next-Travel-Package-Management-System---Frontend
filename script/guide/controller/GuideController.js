import {get_guide, getAll, getLastGuideId, save_guide} from "../model/GuideModel.js";


const guide_id_regex = /^G\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const double_pattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
const contact_number = /^\d{10}$/;
const address_pattern = /^\d+\s[A-z\s]+\s[A-z\s]+\s\d{5}(-\d{4})?$/

// -----------------------------------------------------------------------------------------
// get last ongoing vehicle id -------------------------------------------------------------
function getLastVehicleId() {
    let promise = getLastGuideId();
    promise.then((data) => {
        console.log(data);
        document.getElementById('guide_id').textContent = data;
    }).catch((e) => {
        alert("Error in getting Guide ID !");
    });
}

// -----------------------------------------------------------------------------------------
// get all ---------------------------------------------------------------------------------
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
function validateImagesInForm() {
    const inputIds = ['profile_img', 'nic_front', 'nic_back', 'id_front', 'id_back']; // Add the IDs of your file input fields
    for (const inputId of inputIds) {
        const input = document.getElementById(inputId);
        if (!input.files || input.files.length === 0) {
            return false; // At least one image input is empty
        }
    }
    return true; // All image inputs have files selected
}

function validateFormData() {
    if (guide_id_regex.test(document.getElementById('guide_id').textContent.trim())) {
        console.log(($('#guide_name').val()))
        if (name_pattern.test($('#guide_name').val())) {
            console.log($('#guide_man_day_value').val())
            if (double_pattern.test($('#guide_man_day_value').val())) {
                console.log($('#guide_contact').val())
                if (contact_number.test($('#guide_contact').val())) {
                    console.log($('#guide_age').val())
                    if ($('#guide_age').val() > 0) {
                        console.log($('#guide_address').val());
                        if (name_pattern.test($('#guide_address').val())) {
                            if ($("input[name='guide-gender-group']:checked").val() != null) {
                                if (validateImagesInForm()) {
                                    return true;
                                } else {
                                    alert("Please select images !");
                                }
                            } else {
                                alert("Please select gender !")
                            }
                        } else {
                            alert("Invalid Address !");
                        }
                    } else {
                        alert("Invalid Age !");
                    }
                } else {
                    alert("Invalid Contact Number !");
                }
            } else {
                alert("Invalid man day value!");
            }
        } else {
            alert("Invalid name!");
        }
    } else {
        alert("Invalid Guide ID !")
    }
    return false;
}

$('#btn_save_guide').click((e) => {
    e.preventDefault();
    if (validateFormData()) {
        let guide = {
            id: document.getElementById('guide_id').textContent,
            name: $('#guide_name').val(),
            address: $('#guide_address').val(),
            age: $('#guide_age').val(),
            gender: $("input[name='guide-gender-group']:checked").val(),
            contact_number: $('#guide_contact').val(),
            experience: $('#guide_experience').val(),
            man_day_value: $('#guide_man_day_value').val(),
            remark: $('#guide_remark').val()

        };
        let promise = save_guide(guide);
        promise.then((data) => {
            console.log(data);
            alert("Guide saved successfully !");
            location.reload();
        }).catch((e) => {
            alert("Error in saving Guide !");
        });
    }
});

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

// -----------------------------------------------------------------------------------------
// search ----------------------------------------------------------------------------------
$('#btn_search').on('click', (e) => {
    e.preventDefault();
    if (guide_id_regex.test($('#txt_search_guide').val())) {
        get_guide($('#txt_search_guide').val())
            .then((data) => {
                alert("Guide Found!");
                console.log(data);
                $('#guide_id').text(data.id);
                $('#guide_name').val(data.name);
                $('#guide_address').val(data.address);
                $('#guide_age').val(data.age);
                $('#guide_contact').val(data.contact_number);
                $('#guide_experience').val(data.experience);
                $('#guide_man_day_value').val(data.man_day_value);
                $('#guide_remark').val(data.remark);
                $('#guide_profile_img').attr('src', 'data:image/png;base64,' + data.images_list[0]);
                $('#guide_nic_front').attr('src', 'data:image/png;base64,' + data.images_list[1]);
                $('#guide_nic_back').attr('src', 'data:image/png;base64,' + data.images_list[2]);
                $('#guide_id_front').attr('src', 'data:image/png;base64,' + data.images_list[3]);
                $('#guide_id_back').attr('src', 'data:image/png;base64,' + data.images_list[4]);
                $(`input[name="guide-gender-group"][value="${data.gender}"]`).prop('checked', true);

                $('#btn_save_guide').prop('disabled', true);
            }).catch((e) => {
                alert("Error in getting Guide !");
        });
    }
});
// -----------------------------------------------------------------------------------------
// delete ----------------------------------------------------------------------------------
$('#btn_delete_guide').on('click', (e) => {
    e.preventDefault()
    if (guide_id_regex.test($('#txt_search_guide').val())) {
        delete_guide($('#txt_search_guide').val())
            .then((data) => {
                alert("Guide Deleted!");
                console.log(data);
                location.reload();
            }).catch((e) => {
            alert("Error in deleting Guide !");
        });
    }
});