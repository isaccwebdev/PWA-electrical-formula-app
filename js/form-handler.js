import { formulas } from './formulas.js';

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
      const input = document.createElement("input");
      input.type = "number";
      input.required = true;
      input.name = c;
      camposDiv.appendChild(label);
      camposDiv.appendChild(input);
      camposDiv.appendChild(document.createElement("br"));
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
    resultado.textContent = `${objetivo} = ${resultadoValor.toFixed(2)}`;
  });
}
