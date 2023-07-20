
// Post contact
function post(event) {
  
  // Prevent default submit
  event.preventDefault();

  // Spinner
  document.getElementById('overlay').style.display = 'flex';

  // Request
  var xhr = new XMLHttpRequest();

  // Error, remove spinner
  xhr.onerror = function() {
    document.getElementById('overlay').style.display = 'none';
  }

  // Ok, remove spinner, show ok message
  xhr.onload = function() {
    document.getElementById('overlay').style.display = 'none';
    if (xhr.status == 200) {
      document.getElementById('div-ok').style.display = 'block';
      document.getElementById('div-send').style.display = 'none';
    } else {
      document.getElementById('div-ok').style.display = 'block';
      document.getElementById('div-send').style.display = 'none';
    };
  }

  // Post data
  formData = new FormData(event.target);
  const file = document.getElementById('file')
  if (file)
    formData.append('file', file.files[0]);
  xhr.open('POST', "https://back.cotown.com/api/v1/form", true);
  xhr.send(formData);
}