// restAPI here
let result = document.querySelector('.current-weather');
let selectCities = document.querySelector('.select-cities');

function loadData(city) {
    $.ajax({
        type: 'GET',
        url: `http://api.weatherapi.com/v1/current.json?key=ce310e230ce44b2c88d45908230302&q=${city}`,
        dataType: 'json',
        success: function(response) {
            // response data
            let current = response.current;
            let condition = current.condition;
            let location = response.location;

            // format date and time
            let formatDate = new Date(location.localtime);
            let lastUpdate = new Date(current.last_updated);
            let dayOption = { weekday: 'long' }
            let dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
            let day = formatDate.toLocaleDateString('en-US', dayOption);
            let date = formatDate.toLocaleDateString('en-US', dateOptions);
            let time = lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            let uvStatus = '';
            if (current.uv >= 1 && current.uv <= 10) {
                uvStatus = 'Low'
            } else if (current.uv > 10) {
                uvStatus = 'Extreme'
            }

            // dump data
            console.log(response);

            let html = `
                <div class="col-md-6 mb-3 mb-md-0">
                    <div class="card ${city} weather-info">
                        <div class="card-body">
                            <div class="top-info mb-7 mb-md-0">
                                <h5 class="mb-0">${day}</h5>
                                <p>${date}</p>
                                <div>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                                    <span>${location.name}, ${location.country}</span>
                                </div>
                            </div>

                            <div class="bottom-info">
                                <img src="${condition.icon}" alt="weather condition icon"/>
                                <div class="display-3">${current.temp_c}°C</div>
                                <p>${condition.text}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card weather-details">
                        <div class="card-body">
                            <div class="mb-1">
                                <small>Last update: <span class="fw-bold">${time}</span></small>
                            </div>
                            <div class="row">
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>UV Index</small>
                                        <h5 class="mb-0">${current.uv} <small>${uvStatus}</small></h5>
                                        
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>Wind</small>
                                        <h5 class="mb-0">${current.wind_kph} <small>km/h</small></h5>
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>Precip</small>
                                        <h5 class="mb-0">${current.precip_mm} <small>mm</small></h5>
                                        
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>Feels like</small>
                                        <h5 class="mb-0">${current.feelslike_c}°</h5>
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>Humidity</small>
                                        <h5 class="mb-0">${current.humidity}%</h5>
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="detail">
                                        <small>Visibility</small>
                                        <h5 class="mb-0">${current.vis_km}km</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            result.innerHTML = html;
        },
        error: function(error) {
            console.log(`Error message: ${error}`);
        }
    });
}

// run switchCity on change
function switchCity() {
    let option = this.options[this.selectedIndex];

    loadData(option.value);
}

// added event to selectCities
selectCities.addEventListener('change', switchCity);

// default loadData
loadData('manila');