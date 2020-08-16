const request = require("request");

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/ ${address} .json?access_token=pk.eyJ1Ijoic29mdHllcmV2YW4iLCJhIjoiY2tkc2k2ZTFrMXAweDJ0cGE1a2I4bjFrZSJ9.TJsGSQQo8L3TKKIChU2nbQ`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      cb("Unable to connect to wetaher services!", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find location try another search", undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
