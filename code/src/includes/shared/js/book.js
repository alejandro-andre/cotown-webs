// Button BOOK 
// /booking/3?lang=en&segment=1&book_building_id=1&book_flat_type_id=1&book_place_type_id=100&book_checkin=2023-11-01&book_checkout=2024-03-31
function go_book(type) {
    radio = document.querySelector('input[name="radio-' + type + '"]:checked');
    flat  = radio.getAttribute('data-flat');
    place = radio.getAttribute('data-place');
    sessionStorage.setItem('city', '{{building.District.Location.Name}}');
    sessionStorage.setItem('building', '{{building.Name}}');
    sessionStorage.setItem('book_city_id', '{{building.District.Location.id}}');
    sessionStorage.setItem('book_building_id', '{{building.id}}');
    sessionStorage.setItem('book_type', type);
    //location.href = '/booking/3?'
    //  + 'lang={{L}}&segment={{siteid}}&book_building_id={{building.id}}'
    //  + '&book_flat_type_id=' + flat 
    //  + '&book_place_type_id=' + place 
    //  + '&book_checkin=' + sessionStorage.getItem('book_checkin') 
    //  + '&book_checkout=' + sessionStorage.getItem('book_checkout');
    location.href = "{{root}}{{langs[L].folder}}/{{langs[L].pages['book'].url}}.html";
}

// Button VISIT
function go_visit(type) {
    sessionStorage.setItem('city', '{{building.District.Location.Name}}');
    sessionStorage.setItem('book_city_id', '{{building.District.Location.id}}');
    sessionStorage.setItem('building', '{{building.Name}}');
    sessionStorage.setItem('book_building_id', '{{building.id}}');
    sessionStorage.setItem('book_type', type);
    location.href = "{{root}}{{langs[L].folder}}/{{langs[L].pages['visit'].url}}.html";
}

// Tour
function open_tour() {
    document.getElementById("tourframe").src="{{building.Tour}}" 
    document.getElementById("tour").style.display = "block";
}
function close_tour() {
    document.getElementById("tour").style.display = "none";
}

// Show selected dates block
dates = sessionStorage.getItem('book_dates') || '';
if (dates != '') {
  document.getElementById("selected-dates").classList.remove("hidden");
  document.getElementById("checkin").textContent = dates.split(" - ")[0];
  document.getElementById("checkout").textContent = dates.split(" - ")[1];
}
else {
  document.getElementById("selected-dates").classList.add("hidden");
}