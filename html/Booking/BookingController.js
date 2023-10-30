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