# ⚡ Calculadora Eléctrica Modular (PWA-ready)

Una aplicación web progresiva (PWA) desarrollada con **HTML5, CSS3 y JavaScript Vanilla** para realizar **cálculos eléctricos básicos**: Ley de Ohm, cálculo de sección de cable, caída de tensión y más. Pensada para ser ligera, usable sin conexión, responsive, instalable y fácilmente extensible.

---

## 📐 Funcionalidades

- 📋 Menú de selección de fórmula (Ley de Ohm, sección de cable, etc.).
- 🔢 Formulario dinámico según la fórmula seleccionada.
- ⚡ Cálculo de sección mínima del conductor según REBT.
- 📉 Cálculo de caída de tensión (en voltios y en %).
- ⚙️ Selección de material (Cobre o Aluminio) y tipo de fase.
- 🧮 Recomendación automática de sección comercial de cable.
- 📱 Diseño responsive y minimalista estilo *clay UI*.
- 📴 Funciona offline (PWA).
- 🛠️ Fácilmente ampliable con nuevas fórmulas eléctricas.

---

## 🚀 Despliegue

La aplicación se despliega automáticamente mediante **CI/CD con GitHub Actions** en **GitHub Pages**:

🔗 [Ver aplicación en línea](https://isaccwebdev.github.io/PWA-electrical-formula-app/)

---

## 🧱 Estructura del proyecto

```
/PWA-electrical-formula-app
├── index.html                # Página principal (menú)
├── form.html                 # Formulario dinámico de cálculo
├── css/
│   └── styles.css            # Estilos principales
├── js/
│   ├── formulas.js           # Lógica y datos de fórmulas eléctricas
│   ├── form-handler.js       # Generación dinámica de formularios y resultados
│   └── menu.js               # Lógica del menú principal
├── sw.js                     # Service Worker para PWA
├── manifest.webmanifest      # Manifest para PWA
├── icons/                    # Iconos para PWA
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD con GitHub Actions
└── README.md
```

---

## 🛠️ Tecnologías

- **HTML5** + **CSS3**
- **JavaScript** (Vanilla)
- **GitHub Pages** (hosting)
- **GitHub Actions** (CI/CD)
- **Progressive Web App** (PWA)

---

## 🧩 Cómo contribuir

1. Haz fork del repositorio.
2. Clona tu fork en local.
3. Crea una rama para tu funcionalidad.
4. Haz tus cambios y push.
5. Abre un Pull Request.

**Ideas para contribuir:**
- Añadir más fórmulas eléctricas (potencia, energía, ley de Watt, etc.).
- Mejorar la interfaz o accesibilidad.
- Añadir soporte para más tipos de cables o normativas.
- Implementar almacenamiento offline de cálculos (IndexedDB).
- Mejorar el Service Worker para caché avanzado.

---

## 📲 Instalación y uso local

1. Clona el repositorio:
   ```sh
   git clone https://github.com/isaccwebdev/PWA-electrical-formula-app.git
   cd PWA-electrical-formula-app
   ```
2. Sirve la app con un servidor local (necesario para PWA):
   ```sh
   npx serve .
   # o
   python3 -m http.server
   ```
3. Abre `http://localhost:5000` (o el puerto que indique tu servidor) en tu navegador.

---

## 🧠 Autor y mantenimiento

Desarrollado por [isaccwebdev](https://github.com/isaccwebdev) como base para una calculadora eléctrica modular y educativa, siguiendo el REBT y buenas prácticas de desarrollo web moderno.

---

## 📜 Licencia

MIT License. Libre para uso, modificación y distribución.

---

## 📚 Referencias

- [REBT - Reglamento Electrotécnico de Baja Tensión (España)](https://www.boe.es/eli/es/rd/2002/08/02/842/con)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/es/actions)
- [MDN Web Docs](https://developer.mozilla.org/es/)

