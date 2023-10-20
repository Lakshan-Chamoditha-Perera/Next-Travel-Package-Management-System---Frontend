


import {existsByUsername, signup} from "/js/model/user/UserModel.js";

const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const email_pattern = /^([a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;
const phone_pattern = /^\d{10}$/;
const id_pattern_old = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const id_pattern_new = /^(\d{4})(\d{3})(\d{4})(\d{1})$/;

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

/*
function userExistsByUsername(username) {
    let isExists = existsByUsername(username);
    isExists.then((data) => {
        return true;
    }).catch((error) => {
        return false;
    });
}*/

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
