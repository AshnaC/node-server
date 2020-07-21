const request = require("postman-request");
const geoCode = (address, callback) => {
    request(
        {
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                address
            )}.json?access_token=pk.eyJ1IjoiYXNobmFjIiwiYSI6ImNrYzl5bzAyMDBoZHoyeGxrbDh1bzBmcGkifQ.nzDS-of8YTKtdflZbFsfXw&limit=1`,
            json: true
        },
        (err, response) => {
            const valid =
                !err && response.body.features && response.body.features[0];
            if (valid) {
                const [lat, long] = response.body.features[0].center;
                const place = response.body.features[0].place_name;
                callback(undefined, { lat, long, place });
            } else {
                callback(err);
            }
        }
    );
};

const getForecast = (coordintes, callback) => {
    const { lat, long } = coordintes;
    const url = `http://api.weatherstack.com/current?access_key=d7303ac9a5620d667077989d4b148745&query=${lat},${long}`;

    request({ url, json: true }, (err, response) => {
        const valid = !err && !response.body.error;
        if (valid) {
            const data = response.body.current;
            callback(undefined, data);
        } else {
            const error = err || response.body.error;
            callback(error);
        }
    });
};

module.exports = { geoCode, getForecast };
