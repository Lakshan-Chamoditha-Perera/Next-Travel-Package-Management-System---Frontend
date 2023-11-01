import {getLastOnGoingPackageId} from "./BookingModel.js";
import {getHotelList} from "../Hotel/HotelModel.js";
import {getAllGuides} from "../Guide/GuideModel.js";
import {getAllVehicleList} from "../Vehicle/VehicleModel.js";
// -------------------------------------------------------------------------------------------------------
let promise = getLastOnGoingPackageId();
promise.then((response) => {
    $('#booking_id').val(response.data);
}).catch((error) => {
    Swal.fire('Error!', 'An error occurred while getting the last booking id !', 'error')
})

//-------------------------------------------------------------------------------------------------------
let user_data = JSON.parse(localStorage.getItem("user"));
$('#username').val(user_data.user_id);
// -------------------------------------------------------------------------------------------------------
$('#package_form_ending_date').change(function () {
    if ($('#package_form_starting_date').val() != "" && $('#package_form_ending_date').val() != "") {
        if ($('#package_form_starting_date').val() > $('#package_form_ending_date').val()) {
            Swal.fire('Error!', 'Starting date must be less than ending date !', 'error')
            $('#package_form_ending_date').val("");
        } else {
            calculate_days_count();
        }
    } else {
        Swal.fire('Error!', 'Please select starting date first !', 'error')
        $('#package_form_ending_date').val("");
    }
});

function calculate_days_count() {
    let start_date = new Date($('#package_form_starting_date').val());
    let end_date = new Date($('#package_form_ending_date').val());
    let days_count = Math.abs(end_date - start_date) / (1000 * 60 * 60 * 24);
    document.getElementById('package_form_days_count').innerText = days_count;
    $('#package_form_no_of_night').val(days_count - 1);
}

// -------------------------------------------------------------------------------------------------------
//load hotel list ----------------------------------------------------------------------------------------
let hotel_list = [];
let promise_hotel_list = getHotelList();

promise_hotel_list.then((response) => {
    hotel_list = response;
    if (hotel_list.length != 0) {
        for (let i = 0; i < hotel_list.length; i++) {
            const hotelItem = $('<a class="dropdown-item"></a');
            hotelItem.attr('data-value', JSON.stringify(hotel_list[i])); // Use data-value for custom data

            hotelItem.text(hotel_list[i].name);

            hotelItem.on('click', function () {
                $('#selected_hotel_name').text($(this).text());
                const selectedHotel = JSON.parse($(this).attr('data-value'));
                // console.log(selectedHotel)
                $('#hotel_list_combobox').val(JSON.stringify(selectedHotel));
                document.getElementById("hotel_list_combobox").innerHTML = selectedHotel.id;

                document.getElementById("selected_hotel_opt_1_price").innerText = selectedHotel.options_list[0].price;
                document.getElementById("selected_hotel_opt_2_price").innerText = selectedHotel.options_list[1].price;
                document.getElementById("selected_hotel_opt_3_price").innerText = selectedHotel.options_list[2].price;
                document.getElementById("selected_hotel_opt_4_price").innerText = selectedHotel.options_list[3].price;
            });
            $('#hotel_combo_item_list').append(hotelItem);
        }

    } else Swal.fire('Error!', 'No hotel found !', 'error');
}).catch((error) => {
    Swal.fire('Error!', 'An error occurred while getting hotel list !', 'error');
});

// -------------------------------------------------------------------------------------------------------
let btnList = document.getElementsByClassName("select-option-btn");
let cartTableBody = document.getElementById("selected_options_table_body"); // Assuming you have a cart table to append rows to

function isRoomExists(id) {
    const tableBody = document.getElementById("selected_option_table_body");
    const rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const roomIdCell = row.querySelector(".col-room-id");
        if (roomIdCell) {
            if (id == roomIdCell.textContent.trim()) {
                return true;
            }
        }
    }
    return false;
}

for (let i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", function (e) {
        e.preventDefault();
        let val1 = $('#hotel_list_combobox').val();
        if (val1 != null && val1 != '') {
            const selectedHotel = JSON.parse(val1);
            if (selectedHotel.options_list != null && selectedHotel.options_list.length > i) {
                let selectedOption = selectedHotel.options_list[i];
                if (!isRoomExists(selectedOption.id)) {

                    let hotel_id_cell = document.createElement('td');
                    hotel_id_cell.textContent = selectedHotel.id;
                    hotel_id_cell.className = 'col-hotel-id';

                    let hotel_name_cell = document.createElement('td');
                    hotel_name_cell.textContent = selectedHotel.name;
                    hotel_name_cell.className = 'col-hotel-name';

                    let room_description_cell = document.createElement('td');
                    room_description_cell.textContent = selectedOption.description;
                    room_description_cell.className = 'col-room-description';

                    let room_id_cell = document.createElement('td');
                    room_id_cell.textContent = selectedOption.id;
                    room_id_cell.className = 'col-room-id';

                    let option_price_cell = document.createElement('td');
                    option_price_cell.textContent = selectedOption.price;
                    option_price_cell.className = 'col-option-price';

                    let room_qty_input = document.createElement('input');
                    room_qty_input.classList.add('w-50');
                    room_qty_input.classList.add('form-control');
                    room_qty_input.setAttribute('type', 'number');
                    room_qty_input.setAttribute('min', '1');
                    room_qty_input.setAttribute('value', '1');
                    room_qty_input.innerHTML = '1';

                    let price_cell = document.createElement('td');
                    price_cell.textContent = selectedOption.price;

                    room_qty_input.addEventListener('input', function () {
                        let quantity = parseInt(room_qty_input.value);
                        let price = selectedOption.price;

                        // Check if quantity is a valid number
                        if (!isNaN(quantity)) {
                            let total = price * quantity;
                            price_cell.textContent = total;
                            price_cell.className = 'col-option-total'
                            calculate_package_rental()
                        } else {
                            price_cell.textContent = ''; // Clear the total if the input is not a valid number
                        }
                    });

                    let room_qty_cell = document.createElement('td');
                    room_qty_cell.appendChild(room_qty_input);

                    let cart_row = document.createElement('tr');
                    cart_row.appendChild(hotel_id_cell);
                    cart_row.appendChild(hotel_name_cell);

                    cart_row.appendChild(room_id_cell);
                    cart_row.appendChild(room_description_cell);
                    cart_row.appendChild(option_price_cell);
                    cart_row.appendChild(room_qty_cell);
                    cart_row.appendChild(price_cell);

                    document.getElementById("selected_option_table_body").appendChild(cart_row);
                } else {
                    Swal.fire('Warning', 'This room is already selected !', 'warning');
                }
            } else {
                Swal.fire('Error!', 'No room found !');
            }
        } else {
            Swal.fire('Error!', 'Please select a hotel first !', 'error');
        }
    });
}
//-------------------------------------------------------------------------------------------------------
const guideYes = document.getElementById("custom_guide_radio1");
const guideNo = document.getElementById("custom_guide_radio2");
const guideDetailsContainer = document.getElementById("guide_details_container");

function updateGuideDetailsDisplay() {
    if (guideYes.checked) {
        guideDetailsContainer.style.display = "flex";
    } else if (guideNo.checked) {
        guideDetailsContainer.style.display = "none";
    }
}

guideYes.addEventListener("change", updateGuideDetailsDisplay);
guideNo.addEventListener("change", updateGuideDetailsDisplay);
updateGuideDetailsDisplay();
//-------------------------------------------------------------------------------------------------------
const vehicleYes = document.getElementById("custom_vehicle_radio1");
const vehicleNo = document.getElementById("custom_vehicle_radio2");
const vehicleDetailsContainer = document.getElementById("vehicle_details_container");

function updateVehicleDetailsDisplay() {
    if (vehicleYes.checked) {
        vehicleDetailsContainer.style.display = "flex";
    } else if (vehicleNo.checked) {
        vehicleDetailsContainer.style.display = "none";
    }
}

vehicleYes.addEventListener("change", updateVehicleDetailsDisplay);
vehicleNo.addEventListener("change", updateVehicleDetailsDisplay);
updateVehicleDetailsDisplay();

//-------------------------------------------------------------------------------------------------------

let allGuides = getAllGuides();
allGuides.then((data) => {
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            const guideItem = $('<a class="dropdown-item"></a');
            guideItem.attr('data-value', JSON.stringify(data[i])); // Use data-value for custom data
            guideItem.text(data[i].name);
            guideItem.on('click', function () {
                $('#selected_guide_name').text($(this).text());
                const selectedGuide = JSON.parse($(this).attr('data-value'));
                // console.log(selectedHotel)
                $('#guide_list_combobox').val(JSON.stringify(selectedGuide));
                document.getElementById("guide_list_combobox").innerHTML = selectedGuide.id;

                const element = `<div class="flex align-content-center py-md-5 w-50"
                                         style="display: flex; align-items: center; justify-content: space-around">
                                        <div class="card p-4">
                                            <img alt="guide-image" class="card-img"
                                                 src="https://www.stryx.com/cdn/shop/articles/man-looking-attractive.jpg?v=1666662774">
                                            <div class="flex-row px-2 space-between w-full mb-sm">
                                                <h3 class="category" <span id="selected_guide_card_id">${selectedGuide.id}</span></h3>
                                            </div>
                                            <h1 class="product-name">${selectedGuide.name} </h1>
                                            <div class="flex-row">
                                                <p class="price strike">Man day value</p>
                                                <h2 class="price" >Rs. <span id="selected_guide_card_man_day_value">${selectedGuide.man_day_value}</span></h2>
                                            </div>
                                            <div class="flex-row">
                                                <p class="price strike">Contact : </p>
                                                <p class="price">${selectedGuide.contact_number}</p>
                                            </div>
                                            <div class="row justify-content-end d-flex">
                                                <button class="btn btn-primary rounded me-3  col-xl-4 btn-sm"
                                                        type="submit">Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>`
                document.getElementById('guide_card').innerHTML = element;
            });
            $('#guide_combo_item_list').append(guideItem);
        }
        Swal.fire('Success!', 'Guide list loaded !', 'success')
    }

}).catch((error) => {
    Swal.fire('Error!', 'An error occurred while getting guide list !', 'error');
});
//-------------------------------------------------------------------------------------------------------
let allVehicles = getAllVehicleList();
allVehicles.then((data) => {
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            const vehicleItem = $('<a class="dropdown-item"></a');
            vehicleItem.attr('data-value', JSON.stringify(data[i])); // Use data-value for custom data
            vehicleItem.text(data[i].id);

            vehicleItem.on('click', function () {
                const selectedVehicle = JSON.parse($(this).attr('data-value'));
                // console.log(selectedHotel)
                $('#vehicle_list_combobox').val(JSON.stringify(selectedVehicle));
                document.getElementById("vehicle_list_combobox").innerHTML = selectedVehicle.brand;

                const element = ` <div class="flex align-content-center py-md-5 w-50">
            <div class="card p-3">
                <img alt="product-image" class="card-img" src="data:image/png;base64,${selectedVehicle.imageList[0]}">
                <div class="flex-row img_collection space-between">
                    <img class="vehicle_images1" src="data:image/png;base64,${selectedVehicle.imageList[1]}">
                    <img class="vehicle_images2" src="data:image/png;base64,${selectedVehicle.imageList[2]}">
                    <img class="vehicle_images3" src="data:image/png;base64,${selectedVehicle.imageList[3]}">
                    <img class="vehicle_images4" src="data:image/png;base64,${selectedVehicle.imageList[4]}">
                </div>
                <div class="flex-row space-between w-full mb-sm">
                    <p class="category">${selectedVehicle.id}</p>
                </div>
                <h1 class="product-name">${selectedVehicle.brand} </h1>
                <div class="flex-row">
                    <p class="price strike">per day value</p>
                    <p class="price">Rs. ${selectedVehicle.fee_per_day}</p>
                </div>
                <div class="flex-row">
                    <p class="price strike">per day km</p>
                    <p class="price">Rs. ${selectedVehicle.fee_per_km}</p>
                </div>
                <div class="flex-row">
                    <p class="price strike">Fuel type</p>
                    <p class="price"><span>${selectedVehicle.fuel_type}</span></p>
                </div>
                <div class="flex-row">
                    <p class="price strike">Seat capacity</p>
                    <p class="price"><span>${selectedVehicle.seat_capacity}</span></p>
                </div>
                <div class="row justify-content-end d-flex">
                    <button class="btn btn-primary rounded me-3 col-xl-4 btn-sm" id="btn_add_vehicle_to_cart">
                        Add +
                    </button>
                </div>
            </div>
        </div>`;
                document.getElementById('vehicle_card').innerHTML = element;


                function isVehicleExists(id) {
                    const tableBody = document.getElementById("vehicle_data_table_body");
                    const rows = tableBody.getElementsByTagName("tr");
                    for (let i = 0; i < rows.length; i++) {
                        const row = rows[i];
                        const vehicleIdCell = row.querySelector(".col-vehicle-id");
                        if (vehicleIdCell) {
                            if (id == vehicleIdCell.textContent.trim()) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                document.getElementById('btn_add_vehicle_to_cart').addEventListener('click', function (e) {
                    e.preventDefault();
                    let val = JSON.parse($('#vehicle_list_combobox').val());
                    if (!isVehicleExists(val.id)) {
                        let vehicle_id_cell = document.createElement('td');
                        vehicle_id_cell.textContent = val.id;
                        vehicle_id_cell.className = 'col-vehicle-id';

                        let vehicle_brand_cell = document.createElement('td');
                        vehicle_brand_cell.textContent = val.brand;
                        vehicle_brand_cell.className = 'col-vehicle-brand';

                        let vehicle_fee_per_day_cell = document.createElement('td');
                        vehicle_fee_per_day_cell.textContent = val.fee_per_day;
                        vehicle_fee_per_day_cell.className = 'col-vehicle-fee-per-day';

                        let vehicle_total_cell = document.createElement('td');
                        vehicle_total_cell.textContent = val.fee_per_day * parseInt($('#package_form_days_count').val()) + '';
                        vehicle_total_cell.className = 'col-vehicle-total';

                        let cart_row = document.createElement('tr');
                        cart_row.appendChild(vehicle_id_cell);
                        cart_row.appendChild(vehicle_brand_cell);
                        cart_row.appendChild(vehicle_fee_per_day_cell);
                        cart_row.appendChild(vehicle_total_cell);

                        document.getElementById("vehicle_data_table_body").appendChild(cart_row);
                    } else {
                        Swal.fire('Warning', 'This vehicle is already selected !', 'warning')
                    }
                })
            });
            $('#vehicle_combo_item_list').append(vehicleItem);
        }
    }
});

// -------------------------------------------------------------------------------------------------------
function calculate_package_rental() {
    let selected_hotel_list = document.getElementById("selected_option_table_body").getElementsByTagName("tr");
    let total = 0;
    for (let i = 0; i < selected_hotel_list.length; i++) {
        let row = selected_hotel_list[i];
        let priceCell = row.querySelector(".col-option-total");
        if (priceCell) total += parseInt(priceCell.textContent);
    }
    document.getElementById("hotel_sub_total").innerText = total + '';


    // guide total-------------------------------------------------------------------
    if ($("input[name='guideRadio']:checked").val() == 'yes') {
        // console.log($("#guide_list_combobox").val()=='')
        if ($("#guide_list_combobox").val() != '') {
            let guide = JSON.parse($('#guide_list_combobox').val());
            let numberOfDays = parseInt($("#package_form_days_count").text());
            let subtotal = guide.man_day_value * numberOfDays;
            $('#guide_sub_total').text(subtotal);
        } else {
            Swal.fire('Error!', 'Please select a guide !', 'error')
        }
    } else {
        $('#guide_sub_total').text(0);
    }


    //
    if ($("input[name='vehicleRadio']:checked").val() == 'yes') {
        let selected_vehicles_tr_list = document.getElementById("selected_vehicle_table_body").getElementsByTagName("tr");
        let total = 0;
        for (let i = 0; i < selected_vehicles_tr_list.length; i++) {
            let row = selected_vehicles_tr_list[i];
            let priceCell = row.querySelector(".col-vehicle-total");
            if (priceCell) total += parseFloat(priceCell.textContent) * parseInt($("#package_form_days_count").text());
        }
        document.getElementById("vehicle_sub_total").innerText = total + '';
    }else{
        $('#vehicle_sub_total').text(0);
    }

    let package_sub_total = parseFloat(document.getElementById("hotel_sub_total").textContent) + parseFloat(document.getElementById("guide_sub_total").textContent) + parseFloat(document.getElementById("vehicle_sub_total").textContent);
    document.getElementById("package_sub_total").innerText = package_sub_total + '';
}

document.getElementById('btn_calculate_total').onclick = function (e) {
    e.preventDefault();
    calculate_package_rental();
}
// -------------------------------------------------------------------------------------------------------