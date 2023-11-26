// Availability
function availability(lang, option) {
  // Clear texts
  const divs = document.querySelectorAll('.text-red');
  divs.forEach((div) => { div.firstChild.textContent = " "; });

  // Check dates
  const date_from = sessionStorage.getItem('book_checkin');
  const date_to = sessionStorage.getItem('book_checkout');

  // Get availability
  url = 'https://back.cotown.com/api/v1/availability/' + option + '/{{building.id}}?date_from=' + date_from + '&date_to=' + date_to;
  if (date_from && date_to) {
    fetch(url).then(resp => resp.text()).then(data => {
      // Parse response
      json = JSON.parse(data);

      // Loop thru all resources
      document.querySelectorAll('.text-red').forEach(function(div) {
        // Get availability
        const avail = json.find((e) => (e.id === div.id));
        const qty = avail ? avail.Qty : 0;
        document.getElementById('radio-' + div.id).setAttribute('data-qty', qty);

        // Not available? show sold out and disable buttons
        if (qty == 0) {
          try { document.getElementById('radio-' + div.id).disabled = true; } catch {}
          try { document.getElementById('radio-' + div.id).checked = false; } catch {}
          div.firstChild.textContent = lang == 'en' ? "SOLD OUT" : "AGOTADO";
        }

        // Available? show quantity and enable buttons
        else {
          try { document.getElementById('radio-' + div.id).disabled = false; } catch {}
          if (qty == 1) {
            div.firstChild.textContent = lang == 'en' ? "ONLY " + avail.Qty + " LEFT" : "SÓLO QUEDA " + avail.Qty;
          } else if (qty <= 5) {
            div.firstChild.textContent = lang == 'en' ? "ONLY " + avail.Qty + " LEFT" : "SÓLO QUEDAN " + avail.Qty;
          }
        }
      });
    });
  }
}

// Button BOOK 
// /booking/3?lang=en&segment=1&book_building_id=1&book_flat_type_id=1&book_place_type_id=100&book_checkin=2023-11-01&book_checkout=2024-03-31
function go_book(id, code) {
  // Save in session
  sessionStorage.setItem('city', '{{building.District.Location.Name}}');
  sessionStorage.setItem('building', '{{building.Name}}');
  sessionStorage.setItem('book_city_id', '{{building.District.Location.id}}');
  sessionStorage.setItem('book_building_id', '{{building.id}}');
  sessionStorage.setItem('book_type', code);

  // Rooms?
  radio = document.querySelector('input[name="radio-' + code + '"]:checked');
  if (radio) { 
    qty  = radio.getAttribute('data-qty');
    console.log(qty);
    if (!qty) {
      location.href = "{{root}}{{langs[L].folder}}/{{langs[L].pages['book'].url}}.html";
      return;
    }
    flat = radio.getAttribute('data-flat');
    location.href = '/booking/3?'
      + 'lang={{L}}&segment={{siteid}}&book_building_id={{building.id}}'
      + '&book_flat_type_id=' + flat
      + '&book_place_type_id=' + id
      + '&book_checkin=' + sessionStorage.getItem('book_checkin') 
      + '&book_checkout=' + sessionStorage.getItem('book_checkout');
    return;
  }

  // Flats
  location.href = "{{root}}{{langs[L].folder}}/{{langs[L].pages['book'].url}}.html";
}

// Button VISIT
function go_visit(id, code) {
  sessionStorage.setItem('city', '{{building.District.Location.Name}}');
  sessionStorage.setItem('book_city_id', '{{building.District.Location.id}}');
  sessionStorage.setItem('building', '{{building.Name}}');
  sessionStorage.setItem('book_building_id', '{{building.id}}');
  sessionStorage.setItem('book_type', code);
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
function show_dates() {
  dates = sessionStorage.getItem('book_dates') || '';
  if (dates != '') {
    document.getElementById("selected-dates").classList.remove("hidden");
    document.getElementById("checkin").textContent = dates.split(" - ")[0];
    document.getElementById("checkout").textContent = dates.split(" - ")[1];
  }
  else {
    document.getElementById("selected-dates").classList.add("hidden");
  }
}