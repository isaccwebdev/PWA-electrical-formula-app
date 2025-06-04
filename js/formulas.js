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
