let chart;

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("weatherContent").classList.add("hidden");

  try {
    const response = await fetch(`/weather/${city}`);
    const data = await response.json();

    document.getElementById("cityName").innerText = data.city;
    document.getElementById("temperature").innerText = data.temperature;
    document.getElementById("description").innerText = data.description;
    document.getElementById("humidity").innerText = data.humidity + "%";
    document.getElementById("wind").innerText = data.forecast[0].wind.speed;
    document.getElementById("pressure").innerText = data.forecast[0].main.pressure;

    renderChart(data.forecast);

    document.getElementById("loading").classList.add("hidden");
    document.getElementById("weatherContent").classList.remove("hidden");

  } catch (error) {
    alert("City not found or server error");
    document.getElementById("loading").classList.add("hidden");
  }
}

function renderChart(forecast) {
  const labels = forecast.map(item => item.dt_txt.split(" ")[1]);
  const temps = forecast.map(item => item.main.temp);

  const ctx = document.getElementById("tempChart");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.2)",
        tension: 0.4,
        fill: true
      }]
    }
  });
}
