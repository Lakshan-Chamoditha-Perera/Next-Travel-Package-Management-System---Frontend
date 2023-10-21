import {getLastOnGoingDriverId, save_driver, update_driver} from "../model/DriverModel.js";
import {
    delete_vehicle,
    get_vehicle,
    getAll,
    getLastOnGoingVehicleId,
    save_vehicle,
    update_vehicle
} from "../model/VehicleModel.js";

const vehicle_id_regex = /^V\d{3,}$/;
const vehicle_brand_regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

const driver_id_regex = /^D\d{3,}$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const doublePattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
const contact_number = /^\d{10}$/;

// -----------------------------------------------------------------------------------------
// get last ongoing vehicle id -------------------------------------------------------------
function getLastVehicleId() {
    let promise = getLastOnGoingVehicleId();
    promise.then((data) => {
        $('#vehicle_id').val(data);
    }).catch((e) => {
        alert("Error in getting vehicle details !");
    });
}
function getLastDriverId() {
    let promise = getLastOnGoingDriverId();
    promise.then((data) => {
        $('#driver_id').val(data);
    }).catch((e) => {
        alert("Error in getting driver details !");
    });
}
$(document).ready(() => {
    getLastVehicleId();
    getLastDriverId();
})
// -----------------------------------------------------------------------------------------
// save vehicle & driver -------------------------------------------------------------------
function checkImages() {
    let fileInputs = document.querySelectorAll('.vehicleImage');
// Check if all five file inputs are used (have a selected file)
    for (let i = 0; i < fileInputs.length; i++) {
        if (fileInputs[i].files.length === 0) {
            return false; // At least one file input has no selected file
        }
    }
    return true; // All file inputs have selected files
}

function validate_Vehicle_details() {
    if (vehicle_id_regex.test($('#vehicle_id').val())) {
        if (vehicle_brand_regex.test($('#vehicle_brand').val())) {
            if ($('#category').val() != null) {
                if ($('#fuel_type').val() != null) {
                    if ($("input[name='radio-group-type']:checked").val() != null) {
                        if ($('#fuel_usage').val() > 0) {
                            if (checkImages()) {
                                if ($("#vehicle_type").val() != null) {
                                    if ($("input[name='vehicle-availability-group']:checked").val() != null) {
                                        if ($("#seat_capacity").val() > 0 & $("#seat_capacity").val() < 15) {
                                            if ($("input[name='transmission-group']:checked").val() != null) {

                                                return true;
                                            } else {
                                                alert("Select Transmission type!");
                                            }
                                        } else {
                                            alert("Invalid seat capacity!");
                                        }
                                    } else {
                                        alert("Select vehicle availability!");
                                    }
                                } else {
                                    alert("Select type of your vehicle!");
                                }
                            } else {
                                alert("Select photos of your vehicle!")
                            }
                        } else {
                            alert("Input Vehicle Fuel usage!")
                        }
                    } else {
                        alert("Select Vehicle Type!")
                    }
                } else {
                    alert("Select Fuel Type!")
                }
            } else {
                alert("Select Vehicle Category !");
            }
        } else {
            alert("Invalid Vehicle Brand !");
        }
    } else {
        alert("Invalid Vehicle ID Pattern !");
    }
    return false;
}

function validate_driver_details() {
    if (driver_id_regex.test($('#driver_id').val())) {
        if (name_pattern.test(($('#driver_name').val()))) {
            if (contact_number.test($('#driver_contact').val())) {
                if (document.getElementById('img10').files.length !== 0 && document.getElementById('img11').files.length !== 0) {
                    return true;
                } else {
                    alert("select driver images first ! ")
                }
            } else {
                alert("invalid driver contact number ! ")
            }
        } else {
            alert("invalid driver name ! ")
        }
    } else {
        alert("invalid driver id type! ")
    }
    return false;
}

$('#save_vehicle_data').on('click', (e) => {
    console.log("save vehicle data")
    e.preventDefault()
    // validate_Vehicle_details()
    if (validate_Vehicle_details()) {
        console.log("validated -> vehicle details")
        if (validate_driver_details()) {
            console.log("validated -> driver details")
            let driver = {
                id: $('#driver_id').val(), name: $('#driver_name').val(), contact_no: $('#driver_contact').val()
            }
            let isSaved = save_driver(driver);
            isSaved.then((resolve) => {
                console.log("saved -> driver details")
                let vehicle = {
                    id: $('#vehicle_id').val(),
                    brand: $('#vehicle_brand').val(),
                    category: $('#category').val(),
                    fuel_type: $('#fuel_type').val(),
                    hybrid_or_non: $("input[name='radio-group-type']:checked").val(),
                    fuel_usage: $('#fuel_usage').val(),
                    transmission_type: $("input[name='transmission-group']:checked").val(),
                    vehicle_type: $("#vehicle_type").val(),
                    seat_capacity: $("#seat_capacity").val(),
                    availability: $("input[name='vehicle-availability-group']:checked").val(),
                    fee_per_day: $('#fee_per_day').val(),
                    fee_per_km: $('#fee_per_km').val(),
                }
                save_vehicle(vehicle).then((resolve) => {
                    console.log("saved -> vehicle details")
                    // window.location.href = "index.html"; //redirect to home page
                    alert("Vehicle details saved successfully !");
                }).catch((e) => {
                    console.log(e.message)
                    alert(e.message)
                });
            }).catch((e) => {
                alert(e.message)
            });
        }
    }
})

// -----------------------------------------------------------------------------------------
// delete vehicle & driver -----------------------------------------------------------------
$('#delete').on('click', (e) => {
    e.preventDefault()
    let vehicle_id = $('#vehicle_id').val()
    if (vehicle_id_regex.test(vehicle_id)) {
        let isDeleted = delete_vehicle(vehicle_id);
        isDeleted.then((resolve) => {
            alert(resolve)
            // window.location.href = "index.html"; //redirect to home page
        }).catch((e) => {
            alert("Error in deleting vehicle details !")
        });
        document.getElementById('save_vehicle_data').disabled = true;
    } else {
        alert("Invalid vehicle id or driver id !")
    }
})

//------------------------------------------------------------------------------------------
// get all vehicles ------------------------------------------------------------------------
function createVehicleCard(data) {
    const elementHTML = ` <div class="grid-item flex align-content-center">
            <div class="card">
                <img alt="product-image" class="card-img" src="data:image/png;base64,${data.imageList[0]}">
                <div class="flex-row img_collection space-between">
                    <img class="vehicle_images1" src="data:image/png;base64,${data.imageList[1]}">
                    <img class="vehicle_images2" src="data:image/png;base64,${data.imageList[2]}">
                    <img class="vehicle_images3" src="data:image/png;base64,${data.imageList[3]}">
                    <img class="vehicle_images4" src="data:image/png;base64,${data.imageList[4]}">
                </div>
                <div class="flex-row space-between w-full mb-sm">
                    <p class="category">${data.id}</p>
                </div>
                <h1 class="product-name">${data.brand} </h1>
                <div class="flex-row">
                    <p class="price strike">per day value</p>
                    <p class="price">Rs. ${data.fee_per_day}</p>
                </div>
                <div class="flex-row">
                    <p class="price strike">per day km</p>
                    <p class="price">Rs. ${data.fee_per_km}</p>
                </div>
                <div class="flex-row">
                    <p class="price strike">Fuel type</p>
                    <p class="price"><span>${data.fuel_type}</span></p>
                </div>
                <div class="flex-row">
                    <p class="price strike">Seat capacity</p>
                    <p class="price"><span>${data.seat_capacity}</span></p>
                </div>
                <!--            <div class="btn-col">-->
                <!--                <a class="icon-link" href="#">View</a>-->
                <!--            </div>-->
            </div>
        </div>`;

    document.getElementsByClassName('vehicle_grid_container')[0].innerHTML += elementHTML;
}

$(document).ready(() => {
    let promise = getAll();
    promise.then((data) => {
        // console.log("array size: "+data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                createVehicleCard(ele)
            });
        } else alert("No vehicles found !")
    }).catch((e) => {
        // alert(e.message);
    });
})

// -----------------------------------------------------------------------------------------
// get vehicle & driver --------------------------------------------------------------------
function setImages(dataImageList) {
    let fileInputs = document.querySelectorAll('.vehicleImage');

    if (dataImageList.length >= fileInputs.length) {
        dataImageList.slice(0, fileInputs.length).forEach((imageData, index) => {
            // Create a Blob object from the image data
            const blob = new Blob([imageData], {type: 'image/png'});

            // Create a File object from the Blob
            const file = new File([blob], 'image.png', {type: 'image/png'});

            // Simulate setting the selected file in the file input
            fileInputs[index].files = new FileList([file]);
        });
        return true; // All file inputs have selected files
    } else {
        return false; // Not enough images for all file inputs
    }
}

$('#btn_search').on('click', (e) => {
    e.preventDefault()
    if (vehicle_id_regex.test($('#txt_search_vehicle').val())) {
        get_vehicle($('#txt_search_vehicle').val()).then(data => {

            // Set the vehicle data into form elements
            $('#vehicle_id').val(data.id);
            $('#vehicle_brand').val(data.brand);
            $('#category').val(data.category);
            $('#fee_per_day').val(data.fee_per_day);
            $('#fee_per_km').val(data.fee_per_km);
            $('#fuel_type').val(data.fuel_type);
            $('#fuel_usage').val(data.fuel_usage);
            $('input[name="radio-group-type"]').filter(`[value="${data.hybrid_or_non}"]`).prop('checked', true);
            $('#seat_capacity').val(data.seat_capacity);
            $(`#transmission_${data.transmission_type.toLowerCase()}`).prop('checked', true);
            $('#vehicle_type').val(data.vehicle_type);
            $(`input[name="vehicle-availability-group"][value="${data.availability}"]`).prop('checked', true);
            for (let i = 0; i < data.imageList.length; i++) {
                $(`#imagePreview${i + 1}`).attr('src', `data:image/png;base64,${data.imageList[i]}`);
                // $(`#img${i + 1}`).attr('value', data.imageList[i]);
            }

            const driverData = data.driver;

            // Set the driver data into the form elements
            $('#driver_id').val(driverData.id);
            $('#driver_name').val(driverData.name);
            $('#driver_contact').val(driverData.contact_no);
            $('#remark').val(driverData.remark);

            // Set driver availability radio buttons
            $(`input[name="driver-availability-group"][value="${driverData.availability}"]`).prop('checked', true);

            // Set driver image previews
            $('#imagePreview10').attr('src', `data:image/png;base64,${driverData.license_front}`);
            $('#imagePreview11').attr('src', `data:image/png;base64,${driverData.license_back}`);

            $('#save_vehicle_data').prop('disabled', true);
            alert("Vehicle found !");
        }).catch(e => {
            alert("Error in getting vehicle details !");
        })
    } else {
        alert("Invalid vehicle id !");
        $('#save_vehicle_data').prop('disabled', false);
    }
});

//------------------------------------------------------------------------------------------
// update vehicle details ------------------------------------------------------------------
$('#update_btn').on('click', (e) => {
    e.preventDefault()
    if (validate_Vehicle_details()) {
        if (validate_driver_details()) {
            let driver = {
                id: $('#driver_id').val(), name: $('#driver_name').val(), contact_no: $('#driver_contact').val()
            }
            let isUpdated = update_driver(driver);
            isUpdated.then((resolve) => {
                let vehicle = {
                    id: $('#vehicle_id').val(),
                    brand: $('#vehicle_brand').val(),
                    category: $('#category').val(),
                    fuel_type: $('#fuel_type').val(),
                    hybrid_or_non: $("input[name='radio-group-type']:checked").val(),
                    fuel_usage: $('#fuel_usage').val(),
                    transmission_type: $("input[name='transmission-group']:checked").val(),
                    vehicle_type: $("#vehicle_type").val(),
                    seat_capacity: $("#seat_capacity").val(),
                    availability: $("input[name='vehicle-availability-group']:checked").val(),
                    fee_per_day: $('#fee_per_day').val(),
                    fee_per_km: $('#fee_per_km').val(),
                }
                update_vehicle(vehicle).then((resolve) => {
                    alert(resolve)
                    // window.location.href = "index.html"; //redirect to home page
                    alert("Vehicle details updated successfully !");
                }).catch((e) => {
                    console.log(e.message)
                    alert(e.message)
                });
            }).catch((e) => {
                alert(e.message)
            });
        }
    }
});