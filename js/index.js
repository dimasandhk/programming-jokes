let start;
$("#start").on("click", function () {
  $("#stop").toggleClass("d-none");
  $("#start").toggleClass("d-none");

  // Request pertama tanpa waktu interval
  $.ajax({
    type: "GET",
    url: "https://v2.jokeapi.dev/joke/programming?format=json?safe-mode",
    success: (res) => {
      let isi = ``;
      if (res.hasOwnProperty("setup")) {
        isi = /*html*/ `
            <h5 class="card-title">${res.setup}</h5>
            <p class="card-text">
              ${res.delivery}
            </p>
          `;
      } else {
        isi = /*html*/ `
            <h5 class="card-title">${res.joke}</h5>
          `;
      }
      $(".card-body").html(isi);
    },
  });

  // Request berikutnya dengan waktu interval 7 detik
  start = setInterval(() => {
    $.ajax({
      type: "GET",
      url: "https://v2.jokeapi.dev/joke/programming?format=json?safe-mode",
      success: (res) => {
        let isi = ``;
        if (res.hasOwnProperty("setup")) {
          isi = /*html*/ `
            <h5 class="card-title">${res.setup}</h5>
            <p class="card-text">
              ${res.delivery}
            </p>
          `;
        } else {
          isi = /*html*/ `
            <h5 class="card-title">${res.joke}</h5>
          `;
        }
        $(".card-body").html(isi);
      },
    });
  }, 7 * 1000);
});

$("#stop").on("click", function () {
  clearInterval(start);
  $("#stop").toggleClass("d-none");
  $("#start").toggleClass("d-none");
  $(".card-body").html(/*html*/ `
  <p class="card-text text-muted">
    Will Generated when the button is Clicked | Jokes by jokeapi.dev
  </p>
  `);
});
