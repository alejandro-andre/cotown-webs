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
