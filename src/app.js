const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

// Define Path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Arshak Nersisyan",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Arshak Nersisyan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "This is help page",
    name: "Arshak Nersisyan",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "No address provided!",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("not-found", {
    message404: "Article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("not-found", {
    message404: "404",
  });
});

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
