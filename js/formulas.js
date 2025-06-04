export const formulas = {
  ley_ohm: {
    nombre: "Ley de Ohm",
    variables: ["V", "I", "R"],
    campos: {
      V: ["I", "R"],
      I: ["V", "R"],
      R: ["V", "I"]
    },
    calcular: function (objetivo, valores) {
      const { V, I, R } = valores;
      switch (objetivo) {
        case "V": return I * R;
        case "I": return V / R;
        case "R": return V / I;
        default: return null;
      }
    }
  }
};

formulas['seccion_cable'] = {
  nombre: "Cálculo sección de cable",
  variables: ["S"],
  campos: {
    S: ["P", "V", "L", "material", "fase", "caida", "coseno"]
  },
  calcular: function (objetivo, valores) {
    let { P, V, L, material, fase, caida, coseno } = valores;
    P = parseFloat(P);
    V = parseFloat(V);
    L = parseFloat(L);
    caida = parseFloat(caida);
    coseno = parseFloat(coseno);

    const resistividad = material === "cobre" ? 0.0175 : 0.0282;
    const I = P / (V * coseno);
    const deltaV = V * (caida / 100);

    let S;
    if (fase === "monofasico") {
      S = (2 * L * I * resistividad) / deltaV;
    } else {
      S = (Math.sqrt(3) * L * I * resistividad) / deltaV;
    }

    return S;
  }
};
