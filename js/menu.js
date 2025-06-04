// Referencias globales a elementos del DOM
const formulaSelect = document.getElementById('formula-select');
const formContainer = document.getElementById('form-container');
const resultadoDiv = document.getElementById('resultado');

// Funciones de cálculo

// Cálculo sección cable (simplificado, para ejemplo)
function calcularSeccionCable(I, V, L, material, tensionAislamiento) {
  const resistividad = material === "aluminio" ? 0.028 : 0.0175;
  // Fórmula simplificada
  const S = (2 * resistividad * L * I) / (V * 0.03); // Suponiendo caída 3%
  return S.toFixed(2);
}

// Cálculo caída de tensión
function calcularCaidaTension(I, L, S, material, V) {
  const resistividad = material === "aluminio" ? 0.028 : 0.0175;
  const caida = (2 * resistividad * L * I) / S;
  const porcentaje = (caida / V) * 100;
  return { caida: caida.toFixed(2), porcentaje: porcentaje.toFixed(2) };
}

// Función para renderizar formulario según fórmula
function renderFormulario(formula) {
  let html = '';
  if (formula === 'ohm') {
    html = `
      <form id="form-ohm">
        <label for="longitud">Longitud (m):</label>
        <input type="number" id="longitud" required min="0.1" step="0.01">
        
        <label for="corriente">Corriente (A):</label>
        <input type="number" id="corriente" required min="0.1" step="0.01">

        <label for="material">Material:</label>
        <select id="material">
          <option value="cobre">Cobre</option>
          <option value="aluminio">Aluminio</option>
        </select>

        <label for="tension-aislamiento">Tensión aislamiento:</label>
        <select id="tension-aislamiento">
          <option value="450/750">450/750 V</option>
          <option value="0.6/1kV">0.6/1 kV</option>
        </select>

        <button type="submit">Calcular sección</button>
      </form>
    `;
  } else if (formula === 'caida') {
    html = `
      <form id="form-caida">
        <label for="longitud">Longitud (m):</label>
        <input type="number" id="longitud" required min="0.1" step="0.01">

        <label for="corriente">Corriente (A):</label>
        <input type="number" id="corriente" required min="0.1" step="0.01">

        <label for="seccion">Sección (mm²):</label>
        <input type="number" id="seccion" required min="0.1" step="0.01">

        <label for="material">Material:</label>
        <select id="material">
          <option value="cobre">Cobre</option>
          <option value="aluminio">Aluminio</option>
        </select>

        <label for="tension-nominal">Tensión nominal (V):</label>
        <input type="number" id="tension-nominal" value="230" required>

        <button type="submit">Calcular caída de tensión</button>
      </form>
    `;
  } else {
    html = '<p>Seleccione una fórmula válida.</p>';
  }
  formContainer.innerHTML = html;
  resultadoDiv.textContent = '';

  // Añadir listener al formulario generado
  if (formula === 'ohm') {
    document.getElementById('form-ohm').addEventListener('submit', e => {
      e.preventDefault();
      const L = parseFloat(document.getElementById('longitud').value);
      const I = parseFloat(document.getElementById('corriente').value);
      const material = document.getElementById('material').value;
      const tensionAislamiento = document.getElementById('tension-aislamiento').value;

      try {
        const S = calcularSeccionCable(I, 230, L, material, tensionAislamiento);
        resultadoDiv.textContent = `Sección requerida: ${S} mm²`;
      } catch (error) {
        resultadoDiv.textContent = `Error: ${error.message}`;
      }
    });
  } else if (formula === 'caida') {
    document.getElementById('form-caida').addEventListener('submit', e => {
      e.preventDefault();
      const L = parseFloat(document.getElementById('longitud').value);
      const I = parseFloat(document.getElementById('corriente').value);
      const S = parseFloat(document.getElementById('seccion').value);
      const material = document.getElementById('material').value;
      const V = parseFloat(document.getElementById('tension-nominal').value);

      try {
        const res = calcularCaidaTension(I, L, S, material, V);
        resultadoDiv.textContent = `Caída de tensión: ${res.caida} V (${res.porcentaje}%)`;
      } catch (error) {
        resultadoDiv.textContent = `Error: ${error.message}`;
      }
    });
  }
}

// Inicialización
formulaSelect.addEventListener('change', () => {
  const formula = formulaSelect.value;
  renderFormulario(formula);
});

// Carga inicial: formulario vacío o mensaje
renderFormulario(formulaSelect.value);
