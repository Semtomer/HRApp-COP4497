// Font file generator

const fs = require("node:fs");

const FONTS = [
  {
    name: "Poppins",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Montserrat",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Calibri",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    alternative: {
      name: "Carlito",
      availableWeights: [400, 700]
    }
  },
  {
    name: "Roboto",
    availableWeights: [100, 300, 400, 500, 700, 900]
  },
  {
    name: "Barlow",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Lato",
    availableWeights: [100, 300, 400, 700, 900]
  },
  {
    name: "Open Sans",
    availableWeights: [300, 400, 600, 700, 800]
  },
  {
    name: "Prompt",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Roboto Mono",
    availableWeights: [100, 200, 300, 400, 500, 600, 700]
  },
  {
    name: "Work Sans",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Concert One",
    availableWeights: [400]
  },
  {
    name: "Nunito Sans",
    availableWeights: [200, 300, 400, 600, 700, 800, 900]
  },
  {
    name: "Noto Sans",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Roboto Slab",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Roboto Condensed",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Barlow Condensed",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  },
  {
    name: "Barlow Semi Condensed",
    availableWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
  }
];

let preloads = "";

FONTS.forEach((font) => {
  const fontName = font.alternative ? font.alternative.name : font.name;
  const kebabCaseFontName = fontName.toLowerCase().replaceAll(" ", "-");
  const fontUrlBase = `/assets/fonts/${kebabCaseFontName}/${kebabCaseFontName}`;
  const weights = font.alternative ? font.alternative.availableWeights : font.availableWeights;

  weights.forEach((weight) => {
    preloads += `<link rel="preload" href="${fontUrlBase}-latin-${weight}.woff2" as="font" type="font/woff2" crossorigin />\n`;
    preloads += `<link rel="preload" href="${fontUrlBase}-latin-ext-${weight}.woff2" as="font" type="font/woff2" crossorigin />\n`;
  });
});

fs.writeFileSync("./preloads.html", preloads);
