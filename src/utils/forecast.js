const request = require("request");

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=5c0fd9e556ff15d2c8f5c58fec035206&query=${lat},${long}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      cb("Unable to connect to wetaher service", undefined);
    } else if (body.error) {
      cb("Unable to find location", undefined);
    } else {
      cb(
        undefined,
        `
        The weather is ${body.current.weather_descriptions[0]},
       the temperature is  ${body.current.temperature}`
      );
    }
  });
};

module.exports = forecast;
