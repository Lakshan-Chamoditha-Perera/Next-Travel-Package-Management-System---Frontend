import {getLastOnGoingPackageId} from "./BookingModel.js";
import {getHotelList} from "../Hotel/HotelModel.js";
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
        const selectedHotel = JSON.parse($('#hotel_list_combobox').val());
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

                let price_cell = document.createElement('td');

                room_qty_input.addEventListener('input', function () {
                    let quantity = parseInt(room_qty_input.value);
                    let price = selectedOption.price;

                    // Check if quantity is a valid number
                    if (!isNaN(quantity)) {
                        let total = price * quantity;
                        price_cell.textContent = total;
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
            Swal.fire(
                'Error!',
                'No room found !'
            );
        }
    });
}
//-------------------------------------------------------------------------------------------------------