/*
P = Potencia (W)
V = Tensión (V)
I = Corriente (A)
R = Resistencia (Ω) 
L = Longitud (m)
S = Sección del cable (mm²)
material = Material del cable (cobre, aluminio)
fase = Tipo de fase (monofásico, trifásico)
caida = Caída de tensión (en porcentaje)
factor_de_potencia = Factor de potencia (cos φ) 

*/

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
    S: ["P", "V", "L", "material", "fase", "caida", "factor_de_potencia"]
  },
  calcular: function (objetivo, valores) {
    let { P, V, L, material, fase, caida, factor_de_potencia } = valores;
    P = parseFloat(P);
    V = parseFloat(V);
    L = parseFloat(L);
    caida = parseFloat(caida);
    factor_de_potencia = parseFloat(factor_de_potencia);

    // Resistividad en Ω·mm²/m
    const resistividad = material === "cobre" ? 0.0175 : 0.0282;
    const I = P / (V * factor_de_potencia);
    const deltaV = (V * caida) / 100; // Caída de tensión en voltios

    let S;
    if (fase === "monofasico") {
      S = (2 * L * I * resistividad) / deltaV;
    } else {
      S = (Math.sqrt(3) * L * I * resistividad) / deltaV;
    }

    return S;
  }
};

export const cablesComerciales = [
  { seccion: 1.5, ampacidad: 14 },
  { seccion: 2.5, ampacidad: 20 },
  { seccion: 4, ampacidad: 25 },
  { seccion: 6, ampacidad: 32 },
  { seccion: 10, ampacidad: 40 },
  { seccion: 16, ampacidad: 63 },
  { seccion: 25, ampacidad: 80 },
  { seccion: 35, ampacidad: 100 },
  { seccion: 50, ampacidad: 125 },
  { seccion: 70, ampacidad: 160 }
];

export function recomendarCable(S) {
  return cablesComerciales.find(c => c.seccion >= S) || cablesComerciales[cablesComerciales.length - 1];
}
