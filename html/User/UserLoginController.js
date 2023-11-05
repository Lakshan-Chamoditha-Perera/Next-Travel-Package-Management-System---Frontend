import {login, signup} from "./UserModel.js";

const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const email_pattern = /^([a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;
const phone_pattern = /^\d{10}$/;
const id_pattern_old = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const id_pattern_new = /^(\d{4})(\d{3})(\d{4})(\d{1})$/;

/*

function checkPhotos() {
    const nicFrontInput = document.getElementById("nic_front");
    const nicBackInput = document.getElementById("nic_back");

    if (nicFrontInput.files.length === 0 && nicBackInput.files.length === 0) {
        alert("Please select images for both NIC Front and NIC Back.");
    } else if (nicFrontInput.files.length === 0) {
        alert("Please select an image for NIC Front.");
    } else if (nicBackInput.files.length === 0) {
        alert("Please select an image for NIC Back.");
    } else {
        return true;
    }
    return false;
}

function validateFormData() {
    if (name_pattern.test($('#username').val())) {
        if (email_pattern.test($('#email').val())) {
            if (id_pattern_old.test($('#nic').val()) || id_pattern_new.test($('#nic').val())) {
                if ($('#age').val() > 0 && $('#age').val() < 100) {
                    if ($("input[name='gender-group']:checked").val() != null) {
                        if (phone_pattern.test($('#contact_no').val())) {
                            if (checkPhotos()) {
                                return true;
                            } else {
                                alert("please upload photos");
                            }
                        } else {
                            alert("invalid contact no");
                        }
                    } else {
                        alert("invalid gender ");
                    }
                } else {
                    alert("invalid age!");
                }
            } else {
                alert("invalid nic type");
            }
        } else {
            alert("invalid email type");
        }
    } else {
        alert("invalid name type");
    }
    return false;
}

/!*
function userExistsByUsername(username) {
    let isExists = existsByUsername(username);
    isExists.then((data) => {
        return true;
    }).catch((error) => {
        return false;
    });
}*!/

$('#register_btn').on('click', (e) => {
    e.preventDefault();
    if (validateFormData()) {
        // console.log("validated...")
        let user = {
            username: $('#username').val(),
            nic_no: $('#nic').val(),
            age: $('#age').val(),
            gender:$("input[name='gender-group']:checked").val(),
            email:$('#email').val(),
            contact_number:$('#contact_no').val(),
            password:$('#signup_password').val(),
            remark:$('#remark').val()
        }
        let isSaved = signup(user);
        isSaved.then((data) => {
            console.log(data);
            alert("User saved successfully");
            $('#user_details_form_section').css('display','none');
            // window.location.href = "login.html";
        }).catch((error) => {
            console.log(error);
            alert("An error occurred while saving the user.");
        });
    }
})


function validateSignUpData() {
    if (name_pattern.test($('#signup_username').val())) {
        if (!$('#signup_password').val() == '' && !($('#signup_password_check').val() == '')) {
            // console.log($('#signup_password').val());
            // console.log($('#signup_password_check').val());
            if ($('#signup_password').val() == $('#signup_password_check').val()) {
                return true;
            } else {
                alert('Entered passwords does not match');
            }
        } else {
            alert('Please enter password');
        }
    } else {
        alert("invalid username");
    }
    return false;
}

$('#btn_check_user_availability').on('click', (e) => {
    console.log("btn_check_user_availability -> clicked");
    e.preventDefault();
    if (validateSignUpData()) {
        console.log("Done")
        let isRegistered = existsByUsername($('#signup_username').val());
        isRegistered.then((data) => {
            $('#username').val($('#signup_username').val());
            $('#user_details_form_section').css("display", "flex");
            $('#sign_in_section').css("display", "none");
            // $('#sign_in_section').css("display", "none");
            // $('#login_section').css("display", "none");
        }).catch((error) => {
            alert(error.toString());
        });

    }
})
*/

// ----------------------------------------------------------------------------------------------------
// signup ---------------------------------------------------------------------------------------------
function validateSignUpInfo() {
    console.log("validateSignUpInfo -> clicked");

    if (!name_pattern.test($('#txt_username').val())) {
        Swal.fire('Invalid username', 'Please enter a valid username', 'error')
        return false;
    }
    if (!email_pattern.test($('#txt_email').val())) {
        Swal.fire('Invalid email', 'Please enter a valid email', 'error')
        return false;
    }
    if ($('#txt_password').val() !== $('#txt_password_confirm').val()) {
        Swal.fire('Password mismatch', 'Please enter a valid password', 'error')
        return false;
    }

    return true;
}

$('#btn_register').on('click', (e) => {
    e.preventDefault()
    if (validateSignUpInfo()) {
        let user = {
            username: $('#txt_username').val(), email: $('#txt_email').val(), password: $('#txt_password').val()
        }
        let isSaved = signup(user);
        isSaved.then((data) => {
            if (data.data == true) {
                Swal.fire('User saved successfully', 'Please login to continue', 'success')
                $('#txt_username').val('')
                $('#txt_email').val('')
                $('#txt_password').val('')
                $('#txt_password_confirm').val('')
            } else {
                Swal.fire('An error occurred while saving the user!', data.message, 'error')
            }
        }).catch((error) => {
            console.log(error);
            Swal.fire('An error occurred while saving the user', 'error')
        });
    }
});

// ----------------------------------------------------------------------------------------------------
// login ----------------------------------------------------------------------------------------------

$('#btn_login').on('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    if (name_pattern.test($('#login_username').val()) && $('#login_password').val() != '') {
        let user = {
            username: $('#login_username').val(), password: $('#login_password').val()
        }
        console.log(user);
        let isSaved = login(user);
        isSaved.then((data) => {
            if (data.data != false) {
                // Swal.fire('Login success', 'You have successfully logged in', 'success')
                switch (data.data.role) {
                    case 'ADMIN':
                        // window.location.href = "admin_dashboard.html";
                        break;
                    case 'ROLE_USER':
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location.href = "../Booking/Booking.html";
                        break;
                    case 'ROLE_HOTEL_MANAGER':
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location.href = "../Hotel/Manage_Hotel_Page.html";
                        break;
                    case 'ROLE_VEHICLE_MANAGER':
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location.href = "../Vehicle/Manage_Vehicle_Page.html";
                        break;
                    case 'ROLE_GUIDE_MANAGER':
                        localStorage.setItem("user", JSON.stringify(data.data));
                        window.location.href = "../Guide/Manage_Guide.html";
                        break;
                    default:

                        Swal.fire('Login failed', 'Invalid ROLE', 'error');
                }
                // localStorage.setItem('user', JSON.stringify(data.data));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred while login',
                    text: 'Please try again',
                    confirmButtonText: 'Login as Guest',
                })
            }
        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'Login failed',
                title: 'An error occurred while login',
                text: 'Please try again',
                confirmButtonText: 'Login as Guest',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../Common/Common_Dashboard.html";
                }
            })
        });
    } else {
        Swal.fire({
            icon: 'warning', title: 'Invalid Inputs!', text: 'Username and password cannot be empty',
        })
    }
});