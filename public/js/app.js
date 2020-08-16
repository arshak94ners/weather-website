const getWeatherData = (str) => {
  msg2.textContent = "Loading...";
  msg1.textContent = "";
  fetch(`http://localhost:3000/weather?address=${str}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg2.textContent = `${data.error}`;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        msg1.textContent = `${data.location}`;
        msg2.textContent = `${data.forecast}`;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  getWeatherData(location);
});
