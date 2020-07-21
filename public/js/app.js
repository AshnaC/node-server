console.log("Client side js");

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const errorElt = document.getElementById("error_para");
const dataElt = document.getElementById("data_para");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    errorElt.textContent = "";
    const text = searchInput.value;
    if (!text) {
        return (errorElt.textContent = "Give me input");
    }
    dataElt.textContent = "Loading";
    fetch(`http://localhost:3000/weather?address=${text}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                errorElt.textContent = "Error";
                dataElt.textContent = "";
            } else {
                console.log("data", data);
                const { place, weather_descriptions } = data;
                dataElt.textContent = `${place} -- ${weather_descriptions[0]}`;
            }
        });
    });
});
