(async () => {

    // Load index
    const searchIndex = await fetch("/json/" + L + "/index.json").then((res) =>
      res.json()
    );
    const idx = lunr(function () {
      this.ref("url");
      this.field("question");
      searchIndex.forEach((doc) => {
        this.add(doc);
      });
    });

    // Search event
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        const results = idx.search(query);
        searchResults.innerHTML = results
          .map((result) => {
            const item = searchIndex.find((i) => i.url === result.ref);
            return `<li><a href="${item.url}">${item.question}</a></li>`;
          })
          .join("");
      } else {
        searchResults.innerHTML = "";
      }
    });
  }
)();

const bookingFrame = (event) => {
  const hotel   = $("#hotel_select").val();
  let arrival   = $("#in").val();
  let departure = $("#out").val();
  const ad      = $("#ad").val();
  const ch      = 0 //$("#ch").val();
  const rooms   = 1 //$("#rooms").val();

  window.location.href=`https://clickandbook.net/${hotel}/rooms?in=${parseDate(arrival)}&out=${parseDate(departure)}&ad=${ad}&ch=${ch}&rooms=${rooms}`;
};

// BOTONES RESERVAS CALENDARIO
const parseDate = (input) => {
  if(input == "" || input[0]!="2" && input[4]!="-" && input[7]!="-"){input = "2020-01-14"}
  dateArray = input.split("-");
  dateArray[0] = dateArray[0].substr(2, 2);
  return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
};

const parsead = (inputad) => {
  if (inputad == ""){inputad=2;}
  return inputad
}

const parsech = (inputch) => {
  if (inputch == ""){inputch=0;}
  return inputch
}

const parseroom = (inputroom) => {
  if (inputroom == ""){inputroom=1;}
  return inputroom
}

$(document).ready(() => {
  $("#reservar").click(bookingFrame);
});