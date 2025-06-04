import { formulas, recomendarCable } from './formulas.js';

const params = new URLSearchParams(window.location.search);
const formulaId = params.get("formula");

const container = document.getElementById("calculo-form");
const title = document.getElementById("formula-title");
const resultado = document.getElementById("resultado");

if (!formulaId || !formulas[formulaId]) {
  container.innerHTML = "<p>Fórmula no encontrada</p>";
} else {
  const formula = formulas[formulaId];
  title.textContent = formula.nombre;

  // Selección de variable a calcular
  const select = document.createElement("select");
  select.id = "objetivo";
  formula.variables.forEach(v => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = `Calcular ${v}`;
    select.appendChild(option);
  });
  container.appendChild(select);

  const camposDiv = document.createElement("div");
  camposDiv.id = "inputs";
  container.appendChild(camposDiv);

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Calcular";
  container.appendChild(btn);

  const renderInputs = () => {
    camposDiv.innerHTML = "";
    const objetivo = select.value;
    const campos = formula.campos[objetivo];
    campos.forEach(c => {
      const label = document.createElement("label");
      label.textContent = `${c}: `;

      // Selector para material
      if (c === "material") {
        const input = document.createElement("select");
        input.name = c;
        ["cobre", "aluminio"].forEach(opt => {
          const option = document.createElement("option");
          option.value = opt;
          option.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);
          input.appendChild(option);
        });
        camposDiv.appendChild(label);
        camposDiv.appendChild(input);
        camposDiv.appendChild(document.createElement("br"));
      }
      // Selector para fase
      else if (c === "fase") {
        const input = document.createElement("select");
        input.name = c;
        [
          { value: "monofasico", label: "Monofásico" },
          { value: "trifasico", label: "Trifásico" }
        ].forEach(opt => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          input.appendChild(option);
        });
        camposDiv.appendChild(label);
        camposDiv.appendChild(input);
        camposDiv.appendChild(document.createElement("br"));
      }
      // Inputs normales
      else {
        const input = document.createElement("input");
        input.type = "number";
        input.required = true;
        input.name = c;
        camposDiv.appendChild(label);
        camposDiv.appendChild(input);
        camposDiv.appendChild(document.createElement("br"));
      }
    });
  };

  renderInputs();
  select.addEventListener("change", renderInputs);

  container.addEventListener("submit", e => {
    e.preventDefault();
    const objetivo = select.value;
    const campos = formula.campos[objetivo];
    const valores = {};
    campos.forEach(c => {
      valores[c] = parseFloat(container[c].value);
    });
    const resultadoValor = formula.calcular(objetivo, valores);
    if (formulaId === "seccion_cable") {
      const S = formula.calcular(objetivo, valores);
      const cable = recomendarCable(S);
      resultado.innerHTML = `
        <div>
          <strong>Sección calculada:</strong> ${S.toFixed(2)} mm²<br>
          <strong>Sección comercial recomendada:</strong> ${cable.seccion} mm²<br>
          <strong>Ampacidad:</strong> ${cable.ampacidad} A
        </div>
      `;
    } else {
      resultado.textContent = `${objetivo} = ${resultadoValor.toFixed(2)}`;
    }
  });
}
