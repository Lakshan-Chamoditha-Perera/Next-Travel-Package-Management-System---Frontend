import {getLastOnGoingPackageId} from "./BookingModel.js";
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
    }else{
        Swal.fire('Error!', 'Please select starting date first !', 'error')
        $('#package_form_ending_date').val("");
    }
});
function calculate_days_count() {
    let start_date = new Date($('#package_form_starting_date').val());
    let end_date = new Date($('#package_form_ending_date').val());
    let days_count = Math.abs(end_date - start_date) / (1000 * 60 * 60 * 24);
    document.getElementById('package_form_days_count').innerText = days_count;
    $('#package_form_no_of_night').val(days_count - 1) ;
}
// -------------------------------------------------------------------------------------------------------