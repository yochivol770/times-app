document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const sunsetTime = new Date(data.results.sunset);
            const sunriseTime = new Date(data.results.sunrise);
            console.log("Sunset:", sunsetTime);
            console.log("Sunrise:", sunriseTime);
            calculateShabbatTimes(sunsetTime, sunriseTime);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function calculateShabbatTimes(sunsetTime, sunriseTime) {
    const shabbatStart = new Date(sunsetTime);
    shabbatStart.setMinutes(shabbatStart.getMinutes() - 18); // 18 minutes before sunset

    const shabbatEnd = new Date(sunsetTime);
    shabbatEnd.setMinutes(shabbatEnd.getMinutes() + 42); // 42 minutes after sunset

    displayTimes(shabbatStart, shabbatEnd);
}

function displayTimes(shabbatStart, shabbatEnd) {
    document.getElementById('shabbatStart').textContent = shabbatStart.toLocaleTimeString();
    document.getElementById('shabbatEnd').textContent = shabbatEnd.toLocaleTimeString();
}

function showError(error) {
    alert(`Error: ${error.message}`);
}