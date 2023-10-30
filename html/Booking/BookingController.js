import {getLastOnGoingPackageId} from "./BookingModel.js";

let promise = getLastOnGoingPackageId();
promise.then((response) => {
    $('#booking_id').val(response.data);
}).catch((error) => {
    Swal.fire('Error!', 'An error occurred while getting the last booking id !', 'error')
})


let user_data = JSON.parse(localStorage.getItem("user"));
$('#username').val(user_data.user_id);

