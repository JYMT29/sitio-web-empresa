// API de Rick and Morty
function cargarPersonajes() {
  cargarURL("https://rickandmortyapi.com/api/character");
}

function cargarPorEstado(estado) {
  cargarURL(`https://rickandmortyapi.com/api/character/?status=${estado}`);
}

function cargarURL(url) {
  const container = document.getElementById("rickmorty-container");

  // Mostrar loading
  container.innerHTML = `
        <div class="api-card" style="text-align: center;">
            <h3>⏳ Cargando personajes...</h3>
            <p>¡Wubba Lubba Dub Dub!</p>
            <div style="margin-top: 1rem; font-size: 2rem;">👽</div>
        </div>
    `;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los personajes");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        container.innerHTML = `
                    <div class="api-card" style="border-left: 4px solid #f39c12; text-align: center;">
                        <h3>🔍 No se encontraron personajes</h3>
                        <p>Prueba con otro filtro</p>
                        <button onclick="cargarPersonajes()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: #e94560; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            🔄 Ver todos
                        </button>
                    </div>
                `;
        return;
      }

      container.innerHTML = "";

      data.results.forEach((personaje) => {
        // Determinar color según estado
        const coloresEstado = {
          Alive: "#2ecc71",
          Dead: "#e74c3c",
          unknown: "#f39c12",
        };
        const colorEstado = coloresEstado[personaje.status] || "#888";

        // Determinar emoji según especie
        const emojisEspecie = {
          Human: "🧑",
          Alien: "👽",
          Humanoid: "🧬",
          Poopybutthole: "💩",
          Mythological: "🧙",
          Animal: "🐾",
          Robot: "🤖",
          Cronenberg: "🧟",
        };
        const emoji = emojisEspecie[personaje.species] || "👤";

        container.innerHTML += `
                    <div class="api-card" style="border-left: 4px solid ${colorEstado};">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <img src="${personaje.image}" alt="${personaje.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid ${colorEstado};">
                            <div>
                                <h3 style="margin: 0;">${personaje.name}</h3>
                                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                    <span style="background: ${colorEstado}; color: white; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                        ${personaje.status === "Alive" ? "✅" : personaje.status === "Dead" ? "💀" : "❓"} ${personaje.status}
                                    </span>
                                    <span style="background: #f0f0f0; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                        ${emoji} ${personaje.species}
                                    </span>
                                    <span style="background: #f0f0f0; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">
                                        ${personaje.gender === "Male" ? "♂️" : personaje.gender === "Female" ? "♀️" : "⚧️"} ${personaje.gender}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1rem; margin-top: 0.8rem;">
                            <p><strong>🌍 Origen:</strong> ${personaje.origin.name}</p>
                            <p><strong>📍 Ubicación:</strong> ${personaje.location.name}</p>
                            <p style="grid-column: 1 / -1;"><strong>📺 Episodios:</strong> ${personaje.episode.length}</p>
                        </div>
                        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${personaje.episode
                              .slice(0, 5)
                              .map(
                                (ep) =>
                                  `<span style="background: #1a1a2e; color: white; padding: 0.1rem 0.6rem; border-radius: 12px; font-size: 0.7rem;">${ep.split("/").pop()}</span>`,
                              )
                              .join("")}
                            ${personaje.episode.length > 5 ? `<span style="background: #888; color: white; padding: 0.1rem 0.6rem; border-radius: 12px; font-size: 0.7rem;">+${personaje.episode.length - 5}</span>` : ""}
                        </div>
                    </div>
                `;
      });

      // Mostrar información de paginación
      if (data.info) {
        container.innerHTML += `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                        <p style="margin: 0; color: #888;">
                            📊 Mostrando ${data.results.length} personajes 
                            ${data.info.prev ? `| ⬅️ Anterior` : ""} 
                            ${data.info.next ? `| Siguiente ➡️` : ""}
                        </p>
                    </div>
                `;
      }
    })
    .catch((error) => {
      container.innerHTML = `
                <div class="api-card" style="border-left: 4px solid #ff6b6b; text-align: center;">
                    <h3>❌ Error al cargar personajes</h3>
                    <p>No se pudieron obtener los personajes de Rick and Morty.</p>
                    <p style="color: #999; font-size: 0.9rem;">${error.message}</p>
                    <button onclick="cargarPersonajes()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: #e94560; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        🔄 Reintentar
                    </button>
                </div>
            `;
      console.error("Error al cargar personajes:", error);
    });
}

// Cargar personajes automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarPersonajes();
});
