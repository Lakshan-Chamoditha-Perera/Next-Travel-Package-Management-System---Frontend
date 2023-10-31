import {getHotelList} from "../Hotel/HotelModel.js";
import {getAllVehicleList} from "../Vehicle/VehicleModel.js";

$(document).ready(() => {
    loadHotelCardList();
    loadVehicleCardList();
});

//-------------------------------------------------------------------------------------------
function createHotelCard(data) {
    const htmlElement = `<div class="col w-75 hotel_card">
            <div class="card ">
                <img class="card-img-top w-80 d-block fit-cover main_hotel_img"
                     src="data:image/png;base64,${data.image_list[0]}"
                     style="height: 400px;"/>
                <div class="card-body p-4 ">
                    <p class="text-primary card-text mb-0">${data.id}</p>
                    <h1 class="card-title hotel_card_name">${data.name}
                        <span class="fa fa-star size checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star checked hotel_card_star" style="font-size: 15px"></span>
                        <span class="fa fa-star hotel_card_star" style="font-size: 15px"></span>
                    </h1>
                    <p class="card-text hotel_card_description">
                        Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                        justo odio, dapibus
                        ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
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
                            <p class="w-100 flex-row align-items-center fw-bold mb-0 text-center ">${data.email}</p>
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
                            <p class="w-100 flex-row align-items-center fw-bold mb-0 text-center ">${data.contact}</p>
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
                            <a class="w-100 flex-row align-items-center fw-bold mb-0 text-center " href="">${data.location}</a>
                            <!--                            <p class="text-muted mb-0">Erat netus</p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="hotel_card_iframe" style="height: 300px; width: 100%">
                    <!--<iframe allowfullscreen="" 
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120829.49971584947!2d79.81427439432068!3d6.630824700903716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae248ca9dfd4817%3A0xfc624cac52678315!2sThe%20Barnhouse%20-%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1698046596175!5m2!1sen!2slk">
                    </iframe>-->
                    ${data.geo_location}
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
                                        <h6 class="text-muted card-subtitle mb-2 hotel_card_option_description">Full
                                            Board with A/C Luxury Room –
                                            Double</h6>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                                <div class="card-footer bg-light p-2">Rs.
                                    <strong class="h5 hotel_opt_1_price">${data.options_list[0].price}</strong>.00
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
                                <div class="card-footer  p-2 ">Rs.
                                    <strong class="h5 hotel_opt_2_price">${data.options_list[1].price}</strong>.00
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
                                    <strong class="h5 hotel_opt_3_price">${data.options_list[2].price}</strong>.00
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
                                    <strong class="h5 hotel_opt_4_price">${data.options_list[3].price}</strong>.00
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
        </div>
        <hr>`;
    document.getElementById("hotel_list").innerHTML += htmlElement;

    /*let statList = document.querySelector("card-title hotel_card_name star_list");
    for (let i = 0; i < data.star_rate; i++) {
        statList[statList.length - 1].getElementsByClassName('hotel_card_star')[i].addClass('checked');
    }*/
}

function loadHotelCardList() {
    let promise = getHotelList();
    promise.then((data) => {
        console.log("array size: " + data.length)
        if (data.length > 0) {
            data.forEach((ele) => {
                createHotelCard(ele)
            });
        } else {
            Swal.fire('error', 'No hotels found !')
        }
    }).catch((e) => {
        // alert(e.message);
    });
}

//-------------------------------------------------------------------------------------------

function loadVehicleCardList() {
    let allVehicleList = getAllVehicleList();
    allVehicleList.then((data) => {
        data.forEach((vehicle) => {
            createVehicleCard(vehicle);
        })

        function createVehicleCard(data) {
            const elementHTML = ` 
            <div class="my_card">
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
            </div>`;
            document.getElementById("vehicle_list").innerHTML += elementHTML;
        }
    }).catch((e) => {
        Swal.fire('error', 'No vehicles found !', 'error')
    })
}