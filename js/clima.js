// API de clima usando Open-Meteo
function cargarClima() {
  const select = document.getElementById("ciudad-select");
  const [lat, lon] = select.value.split(",");
  const ciudadNombre = select.options[select.selectedIndex].text;
  const container = document.getElementById("clima-container");

  // Mostrar loading
  container.innerHTML = `
        <div class="api-card" style="text-align: center;">
            <h3>⏳ Cargando datos del clima...</h3>
            <p>Por favor espera un momento</p>
        </div>
    `;

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((data) => {
      const clima = data.current_weather;

      // Mapeo de códigos de clima
      const weatherCodes = {
        0: "☀️ Despejado",
        1: "🌤️ Mayormente despejado",
        2: "⛅ Parcialmente nublado",
        3: "☁️ Nublado",
        45: "🌫️ Niebla",
        48: "🌫️ Niebla con escarcha",
        51: "🌧️ Llovizna ligera",
        53: "🌧️ Llovizna moderada",
        55: "🌧️ Llovizna densa",
        56: "🌧️ Llovizna congelante ligera",
        57: "🌧️ Llovizna congelante densa",
        61: "🌧️ Lluvia ligera",
        63: "🌧️ Lluvia moderada",
        65: "🌧️ Lluvia fuerte",
        66: "🌧️ Lluvia congelante ligera",
        67: "🌧️ Lluvia congelante fuerte",
        71: "❄️ Nieve ligera",
        73: "❄️ Nieve moderada",
        75: "❄️ Nieve fuerte",
        77: "❄️ Granizo",
        80: "🌧️ Chubascos ligeros",
        81: "🌧️ Chubascos moderados",
        82: "🌧️ Chubascos fuertes",
        85: "❄️ Nevada ligera",
        86: "❄️ Nevada fuerte",
        95: "⛈️ Tormenta eléctrica",
        96: "⛈️ Tormenta con granizo ligero",
        99: "⛈️ Tormenta con granizo fuerte",
      };

      const estado = weatherCodes[clima.weathercode] || "🌡️ Desconocido";
      const fecha = new Date(clima.time);

      container.innerHTML = `
                <div class="api-card" style="border-left: 4px solid #e94560;">
                    <h3>📍 ${ciudadNombre}</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem;">
                        <div style="background: #f8f9fa; padding: 0.8rem; border-radius: 8px; text-align: center;">
                            <p style="font-size: 2rem;">🌡️</p>
                            <p><strong>Temperatura</strong></p>
                            <p style="font-size: 1.5rem; font-weight: bold; color: #e94560;">${clima.temperature}°C</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 0.8rem; border-radius: 8px; text-align: center;">
                            <p style="font-size: 2rem;">💨</p>
                            <p><strong>Viento</strong></p>
                            <p style="font-size: 1.5rem; font-weight: bold; color: #1a1a2e;">${clima.windspeed} km/h</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 0.8rem; border-radius: 8px; text-align: center; grid-column: 1 / -1;">
                            <p style="font-size: 2rem;">${estado.split(" ")[0]}</p>
                            <p><strong>Estado</strong></p>
                            <p style="font-size: 1.2rem; font-weight: bold; color: #1a1a2e;">${estado}</p>
                        </div>
                    </div>
                    <p style="text-align: center; margin-top: 1rem; color: #888; font-size: 0.9rem;">
                        📅 Actualizado: ${fecha.toLocaleString()}
                    </p>
                </div>
            `;
    })
    .catch((error) => {
      container.innerHTML = `
                <div class="api-card" style="border-left: 4px solid #ff6b6b; text-align: center;">
                    <h3>❌ Error al cargar el clima</h3>
                    <p>No se pudo obtener la información. Por favor intenta más tarde.</p>
                    <p style="color: #999; font-size: 0.9rem;">${error.message}</p>
                    <button onclick="cargarClima()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: #e94560; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        🔄 Reintentar
                    </button>
                </div>
            `;
      console.error("Error al cargar clima:", error);
    });
}

// Cargar clima automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarClima();
});
