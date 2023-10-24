import {getAll, getLastOngoingHotelId, save_hotel} from "../../hotel/model/HotelModel.js";

const hotel_name_regex = /^[a-zA-Z0-9\s]+$/;
const iframe_regex = /<\s*iframe\s*(?:[^>]*)>/i;
const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const double_regex = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
const contact_num_regex = /^\d{10}$/;
const description_regex = /^[a-zA-Z0-9\s]+$/

function createHotelCard(data) {
    const htmlElement = `<div class="col w-75 hotel_card">
            <div class="card ">
                <img class="card-img-top w-80 d-block fit-cover main_hotel_img"
                     src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1600"
                     style="height: 400px;"/>
                <div class="card-body p-4 ">
                    <p class="text-primary card-text mb-0">Article</p>
                    <h1 class="card-title hotel_card_name">${data.name}</h1>
                        <span class="fa fa-star size checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star hotel_card_star" style="font-size: 15px"></span>
                    </h1>
                    <p class="card-text hotel_card_description">
                        ${data.description}
                    </p>

                    <div class="d-flex col align-items-center justify-content-center">
                        <div class="hotel_card_email  me-3 w-25 rounded p-2"
                             style=" flex-direction:column; display: flex; align-items: center; justify-content: space-around">
                            <div class=" bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg class="bi bi-telephone-fill" fill="currentColor" height="2em"
                                     viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 8.5V3.707l.854-.853A.5.5 0 0 0 11.5 2.5v-2A.5.5 0 0 0 11 0H9.5a.5.5 0 0 0-.5.5v8h1.5Z"/>
                                    <path d="M4 3h4v1H6.646A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3V3a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4Zm.585 4.157C4.836 7.264 5 7.334 5 7a1 1 0 0 0-2 0c0 .334.164.264.415.157C3.58 7.087 3.782 7 4 7c.218 0 .42.086.585.157Z"/>
                                </svg>
                            </div>
                            <p class="w-100 flex-row align-items-center fw-bold mb-0 text-center ">
                                 ${data.email}</p>
                            <!--                            <p class="text-muted mb-0">Erat netus</p>-->
                        </div>

                        <div class="hotel_card_contact me-3 w-25 rounded p-2"
                             style=" flex-direction:column; display: flex; align-items: center; justify-content: space-around">
                            <div class=" bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg class="bi bi-telephone-fill" fill="currentColor" height="2em"
                                     viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                                          fill-rule="evenodd"></path>
                                </svg>
                            </div>
                            <p class="w-100 flex-row align-items-center fw-bold mb-0 text-center ">${data.contact_list[0]}</p>
                            <!--                            <p class="text-muted mb-0">Erat netus</p>-->
                        </div>

                        <div class=" me-3 w-25 rounded p-2 hotel_card_city"
                             style=" flex-direction:column; display: flex; align-items: center; justify-content: space-around">
                            <div class=" bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                                <svg class="bi bi-geo-alt fill" fill="currentColor" height="2em"
                                     viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                            </div>
                            <a class="w-100 flex-row align-items-center fw-bold mb-0 text-center " href="">${data.location} </a>
                            <!--                            <p class="text-muted mb-0">Erat netus</p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="hotel_card_iframe" style="height: 300px; width: 100%">
                    <iframe allowfullscreen=""
                            height="100%" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                            src="${data.geo_location}"
                            style="border:0;"
                            width="100%">
                    </iframe>
                </div>

                <div class="h-50 position-relative " style="top: -50px;">
                    <div class="row justify-content-evenly align-items-center">
                        <div class="col w-25 h-25 ">
                            <div class="card">
                                <div class="card-body pt-5">
                                    <div class="rounded-5 bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center position-absolute mb-5 bs-icon lg"
                                         style="top: 30px;">
                                        <svg class="bi bi-flag" fill="currentColor" height="1em"
                                             viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                                        </svg>
                                    </div>
                                    <div class="hotel_card_option">
                                        <h4 class="mt-3 card-title hotel_card_option">Option 1 </h4>
                                        <h6 class="text-muted card-subtitle mb-2 hotel_card_option_description">${data.room_type_price[0]}</h6>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                                <div class="card-footer bg-light p-2">Rs.
                                    <strong class="h5 hotel_opt_1_price">
                                        ${data.room_type_price[0].room_type_price}
                                    </strong>
                                    <!--<svg class="bi bi-arrow-right" fill="currentColor" height="1em"
                                         viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              fill-rule="evenodd"></path>
                                    </svg>--></a>
                                </div>
                            </div>
                        </div>

                        <div class="col w-25 ">
                            <div class="card">
                                <div class="card-body pt-5">
                                    <div class="rounded-5 bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center position-absolute mb-5 bs-icon lg"
                                         style="top: 30px;">
                                        <svg class="bi bi-flag" fill="currentColor" height="1em"
                                             viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                                        </svg>
                                    </div>
                                    <h4 class=" mt-3 card-title">Option 2</h4>
                                    <h6 class="text-muted card-subtitle mb-2">Half Board with A/C Luxury Room -
                                        Double</h6>
                                    <!-- <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                                         justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
                                         porta gravida at eget metus.</p>-->
                                </div>
                                <div class="card-footer bg-primary p-2 ">Rs.
                                    <strong class="h5 hotel_opt_2_price">60000 </strong>.00
                                    <!--<svg class="bi bi-arrow-right" fill="currentColor" height="1em"
                                         viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              fill-rule="evenodd"></path>
                                    </svg>-->
                                </div>
                            </div>
                        </div>
                        <div class="col w-25 ">
                            <div class="card">
                                <div class="card-body pt-5">
                                    <div class="rounded-5 bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center position-absolute mb-5 bs-icon lg"
                                         style="top: 30px;">
                                        <svg class="bi bi-flag" fill="currentColor" height="1em"
                                             viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                                        </svg>
                                    </div>
                                    <h4 class=" mt-3 card-title">Option 3</h4>
                                    <h6 class="text-muted card-subtitle mb-2">Full Board with A/C Luxury Room –
                                        Triple</h6>
                                    <!--<p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                                        justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
                                        porta gravida at eget metus.</p>-->
                                </div>
                                <div class="card-footer bg-primary p-2 ">Rs.
                                    <strong class="h5 hotel_opt_3_price">60000 </strong>.00
                                    <!--<svg class="bi bi-arrow-right" fill="currentColor" height="1em"
                                         viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              fill-rule="evenodd"></path>
                                    </svg>-->
                                </div>
                            </div>
                        </div>
                        <div class="col w-25 ">
                            <div class="card">
                                <div class="card-body pt-5">
                                    <div class="rounded-5 bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center position-absolute mb-5 bs-icon lg"
                                         style="top: 30px;">
                                        <svg class="bi bi-flag" fill="currentColor" height="1em"
                                             viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"></path>
                                        </svg>
                                    </div>
                                    <h4 class="mt-3 card-title">Option 4</h4>
                                    <h6 class="text-muted card-subtitle mb-2">Half Board with A/C Luxury Room -
                                        Triple</h6>
                                    <!--<p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                                        justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi
                                        porta gravida at eget metus.</p>-->
                                </div>
                                <div class="card-footer bg-primary p-2 ">Rs.
                                    <strong class="h5 hotel_opt_4_price">60000 </strong>.00
                                    <!--<svg class="bi bi-arrow-right" fill="currentColor" height="1em"
                                         viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              fill-rule="evenodd"></path>
                                    </svg>-->
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>`;
}

function loadHotelCardList() {
    let promise = getAll();
    promise.then((data) => {
        console.log("array size: " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                createHotelCard(ele)
            });
        } else alert("No Hotel found !")
    }).catch((e) => {
        // alert(e.message);
    });
}

// ---------------------------------------------------------------------------------------
// get hotel id --------------------------------------------------------------------------
function getLastHotelId() {
    let promise = getLastOngoingHotelId();
    promise.then((data) => {
        console.log("last id: " + data);
        document.getElementById('hotel_form_id').textContent = data;
    }).catch((e) => {
        alert("Error in getting hotel details !");
    });
}

// ---------------------------------------------------------------------------------------
$(document).ready(() => {
    getLastHotelId();
})

// ---------------------------------------------------------------------------------------
// save hotel ----------------------------------------------------------------------------

function validateImages(imageInputIds) {
    const invalidImages = [];
    imageInputIds.forEach(function (inputId) {
        const fileInput = document.getElementById(inputId);
        if (fileInput.files.length === 0) {
            invalidImages.push(inputId);
        }
    });

    if (invalidImages.length > 0) {
        alert("The following images are invalid: " + invalidImages.join(", "));
        return false;
    }
    return true;
}

function validateHotelData() {
    if (!hotel_name_regex.test($('#hotel_form_name').val())) {
        alert("Invalid hotel name !");
        return false;
    }
    if (!$('#hotel_form_iframe').val().match(iframe_regex)) {
        alert("Invalid iframe !");
        return false;
    }
    if (!email_regex.test($('#hotel_form_email').val())) {
        alert("Invalid email !")
        return false;
    }
    if (!contact_num_regex.test($('#hotel_form_contact').val())) {
        alert("Invalid contact number !")
        return false;
    }
    if (!hotel_name_regex.test($('#hotel_form_location').val())) {
        alert("Invalid location !")
        return false;
    }
    if (!($('#hotel_form_star_rate').val() >= 1 && $('#hotel_form_star_rate').val() <= 5)) {
        alert("Invalid star rate!")
        return false;
    }

    if ($("input[name='pets-allowed-group']:checked").val() == null) {
        alert("Invalid pets allowed !")
        return false;
    }
    if (!double_regex.test($('#hotel_form_cancellation_tax').val())) {
        alert("Invalid cancellation tax !")
        return false;
    }


    if (!double_regex.test($('#hotel_form_opt1_price').val())) {
        alert("Invalid option 1 price !")
        return false;
    }

    if (!double_regex.test($('#hotel_form_opt2_price').val())) {
        alert("Invalid option 2 price !")
        return false;
    }


    if (!double_regex.test($('#hotel_form_opt3_price').val())) {
        alert("Invalid option 3 price !")
        return false;
    }

    if (!double_regex.test($('#hotel_form_opt4_price').val())) {
        alert("Invalid option 4 price !")
        return false;
    }
    return validateImages(["hotel_form_img_1", "hotel_form_img_2", "hotel_form_img_3", "hotel_form_img_4",]);
}

$('#btn_save_hotel').on('click', (e) => {
    e.preventDefault();
    if (validateHotelData()) {
        console.log("validated -> hotel details");
        let hotel = {
            id: document.getElementById('hotel_form_id').textContent,
            name: $('#hotel_form_name').val(),
            geo_location: $('#hotel_form_iframe').val(),
            email: $('#hotel_form_email').val(),
            contact: $('#hotel_form_contact').val(),
            location: $('#hotel_form_location').val(),
            star_rate: $('#hotel_form_star_rate').val(),
            is_pet_allowed: $("input[name='pets-allowed-group']:checked").val(),
            description: $('#hotel_form_description').val(),
            cancellation_criteria: $('#hotel_form_cancellation_criteria').val(),
            tax: $('#hotel_form_cancellation_tax').val(),
            options_list: [{
                description: $('#hotel_form_opt1_description').val(), price: $('#hotel_form_opt1_price').val()
            }, {
                description: $('#hotel_form_opt2_description').val(), price: $('#hotel_form_opt2_price').val()
            }, {
                description: $('#hotel_form_opt3_description').val(), price: $('#hotel_form_opt3_price').val()
            }, {
                description: $('#hotel_form_opt4_description').val(), price: $('#hotel_form_opt4_price').val()
            }],
        }

        console.log(hotel)
        let promise = save_hotel(hotel);
        promise.then((data) => {
            alert("Hotel details saved successfully !")
        }).catch((e) => {
            alert("Error in saving hotel details !")
        });
    }
});
// ---------------------------------------------------------------------------------------
// delete hotel --------------------------------------------------------------------------
$('#btn_delete_hotel').on('click', (e) => {
    e.preventDefault();
    let id = document.getElementById('hotel_form_id').textContent;
    let promise = delete_hotel(id);
    promise.then((data) => {
        alert("Hotel deleted successfully !")
    }).catch((e) => {
        alert("Error in deleting hotel !")
    });
}