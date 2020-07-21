const path = require("path");

const express = require("express");
const app = express();
const hbs = require("hbs");
const { geoCode, getForecast } = require("./utils/utils.js");
// port provided by HEROKU
const port = process.env.PORT || 3000;

console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDir));

// Configure hbs as html template => Set up handle bar engines
app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

// template files are placed in view folder in the root dir
app.get("", (reg, res) => {
    // Only name of hbs file is required
    res.render("index", {
        title: "Weather app",
        name: "Ashna"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ashna"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "HELP ME",
        name: "Ashna"
    });
});

// app.get("", (req, res) => {
//     res.send("<h1>Hello express</h1>");
// });

// app.get("/help", (req, res) => {
//     res.send([{ text: "Hello help" }]);
// });

// app.get("/about", (req, res) => {
//     res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
    const { address } = req.query;
    geoCode(address, (err, { lat, long, place } = {}) => {
        if (err) {
            return res.send({ error: true });
        }
        getForecast({ lat, long }, (err, data) => {
            if (err) {
                return res.send({ error: true });
            }
            return res.send({ ...data, place });
        });
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        msg: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`Sever up on port ${port}`);
});
