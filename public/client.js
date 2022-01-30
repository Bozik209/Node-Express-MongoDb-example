console.log("Client-side code running");

const clickButton = document.getElementById("clickButton");
const removeButton = document.getElementById("removeButton");


clickButton.addEventListener("click", function (e) {
  fetch("/clicked", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("Click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});

removeButton.addEventListener("click", function (e) {  
    fetch("/clicked", { method: "DELETE" })
      .then(function (response) {
        if (response.ok) {
          console.log("Click was recorded");
          return;
        }
        throw new Error("Request failed.");
      })
      .catch(function (error) {
        console.log(error);
      });
  });




setInterval(function () {
  fetch("/clicks", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      document.getElementById(
        "counter"
      ).innerHTML = `Button was clicked ${data.length} times`;
    })
    .catch(function (error) {
      console.log(error);
    });
}, 100);
