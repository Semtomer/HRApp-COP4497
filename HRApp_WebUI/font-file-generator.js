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

const FONT_FAMILY_KEY = "{FONT_FAMILY}";
const FONT_WEIGHT_KEY = "{FONT_WEIGHT}";
const FONT_URL_KEY = "{FONT_URL}";
const LOCAL_FONT_FAMILY_KEY = "{LOCAL_FONT_FAMILY}";

const FONT_FACE_PRESET = `
@font-face {
font-family: '{FONT_FAMILY}';
font-style: normal;
font-weight: {FONT_WEIGHT};
font-display: swap;
src: local({LOCAL_FONT_FAMILY}), url({FONT_URL}) format('woff2');
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
font-family: '{FONT_FAMILY}';
font-style: normal;
font-weight: {FONT_WEIGHT};
font-display: swap;
src: local({LOCAL_FONT_FAMILY}), url({FONT_URL}) format('woff2');
unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
`;

let fileContent = "";

FONTS.forEach((font) => {
  const fontName = font.alternative ? font.alternative.name : font.name;
  const kebabCaseFontName = fontName.toLowerCase().replaceAll(" ", "-");
  const fontUrlBase = `./fonts/${kebabCaseFontName}/${kebabCaseFontName}`;
  const weights = font.alternative ? font.alternative.availableWeights : font.availableWeights;

  weights.forEach((weight) => {
    const fontFace = FONT_FACE_PRESET.replaceAll(FONT_FAMILY_KEY, font.name)
      .replaceAll(FONT_WEIGHT_KEY, weight)
      .replace(FONT_URL_KEY, `${fontUrlBase}-latin-${weight}.woff2`)
      .replace(FONT_URL_KEY, `${fontUrlBase}-latin-ext-${weight}.woff2`)
      .replaceAll(LOCAL_FONT_FAMILY_KEY, font.name);

    fileContent += fontFace;
  });
});

if (!fs.existsSync("./fonts")) {
  fs.mkdirSync("./fonts");
}

fs.writeFileSync("./fonts.css", fileContent);
