// API de usuarios con JSONPlaceholder
function cargarUsuarios() {
  const container = document.getElementById("users-container");

  // Mostrar loading
  container.innerHTML = `
        <div class="api-card" style="text-align: center;">
            <h3>⏳ Cargando usuarios...</h3>
            <p>Por favor espera un momento</p>
        </div>
    `;

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((users) => {
      container.innerHTML = "";

      users.forEach((user) => {
        container.innerHTML += `
                    <div class="api-card" style="border-left: 4px solid #e94560;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 2rem;">👤</span>
                            <h3 style="margin: 0;">${user.name}</h3>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1rem;">
                            <p><strong>📧 Email:</strong> ${user.email}</p>
                            <p><strong>📱 Teléfono:</strong> ${user.phone}</p>
                            <p><strong>🏙️ Ciudad:</strong> ${user.address.city}</p>
                            <p><strong>🏢 Empresa:</strong> ${user.company.name}</p>
                            <p style="grid-column: 1 / -1;"><strong>🌐 Web:</strong> ${user.website}</p>
                        </div>
                    </div>
                `;
      });
    })
    .catch((error) => {
      container.innerHTML = `
                <div class="api-card" style="border-left: 4px solid #ff6b6b; text-align: center;">
                    <h3>❌ Error al cargar usuarios</h3>
                    <p>No se pudo obtener la información.</p>
                    <p style="color: #999; font-size: 0.9rem;">${error.message}</p>
                    <button onclick="cargarUsuarios()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: #e94560; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        🔄 Reintentar
                    </button>
                </div>
            `;
      console.error("Error al cargar usuarios:", error);
    });
}

// Cargar usuarios automáticamente al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();
});
