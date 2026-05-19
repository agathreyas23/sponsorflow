const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const W = 1080;
const H = 1920;

const colors = {
  ink: "#332718",
  brown: "#6b5843",
  tan: "#d8c3a3",
  paleTan: "#f1e7d5",
  cream: "#fffaf1",
  paper: "#fdf8ef",
  muted: "#746a5f",
  coral: "#c9795c",
};

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(value, x, y, size, weight = 700, fill = colors.ink, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(value)}</text>`;
}

function sans(value, x, y, size, weight = 600, fill = colors.muted, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Avenir Next, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(value)}</text>`;
}

function lines(items, x, y, size, gap, weight = 700, fill = colors.ink, kind = text) {
  return items.map((item, i) => kind(item, x, y + i * gap, size, weight, fill)).join("\n");
}

function logoMark(cx, cy, scale = 1) {
  const s = scale;
  return `
    <g transform="translate(${cx} ${cy}) scale(${s})">
      <circle cx="0" cy="0" r="128" fill="#f4ead8" stroke="#d9cab5" stroke-width="6"/>
      <circle cx="0" cy="-8" r="82" fill="#efe0c6" opacity="0.55"/>
      <path d="M-54 -42 L0 -72 L58 -42 L0 -13 Z" fill="none" stroke="${colors.brown}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-34 -24 L-34 46 L35 46 L35 -24" fill="none" stroke="${colors.brown}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-16 2 L18 2 M-16 22 L18 22" stroke="${colors.brown}" stroke-width="6" stroke-linecap="round"/>
      <path d="M55 -42 L78 -25 L78 16" fill="none" stroke="${colors.brown}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="78" cy="21" r="8" fill="${colors.brown}"/>
      ${text("YOUR COLLEGE", -86, 102, 25, 800, colors.brown)}
      ${text("APP ADVISOR", -82, 130, 25, 800, colors.brown)}
    </g>
  `;
}

function pageShell(inner, n) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#5f4b36" flood-opacity="0.11"/>
    </filter>
    <pattern id="grain" width="120" height="120" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="22" r="1.1" fill="#7d6b55" opacity="0.08"/>
      <circle cx="86" cy="58" r="0.9" fill="#7d6b55" opacity="0.07"/>
      <circle cx="44" cy="101" r="0.8" fill="#7d6b55" opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${colors.cream}"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <circle cx="985" cy="118" r="210" fill="#f3d9cf" opacity="0.55"/>
  <circle cx="58" cy="1684" r="244" fill="#e3f0e7" opacity="0.62"/>
  <rect x="72" y="94" width="936" height="1732" rx="54" fill="${colors.paper}" filter="url(#softShadow)"/>
  <rect x="116" y="142" width="848" height="1636" rx="38" fill="none" stroke="${colors.tan}" stroke-width="3" opacity="0.75"/>
  ${sans("@yourcollegeappadv", 140, 222, 31, 700, colors.muted)}
  <rect x="828" y="178" width="108" height="56" rx="28" fill="${colors.brown}"/>
  ${sans(`${n}/3`, 882, 216, 28, 800, "#ffffff", 'text-anchor="middle"')}
  ${inner}
</svg>`;
}

function note(number, heading, body, x, y) {
  return `
    <g>
      <circle cx="${x + 24}" cy="${y - 10}" r="24" fill="${colors.paleTan}" stroke="${colors.tan}" stroke-width="2"/>
      ${sans(number, x + 24, y, 24, 800, colors.brown, 'text-anchor="middle"')}
      ${text(heading, x + 68, y, 39, 800, colors.ink)}
      ${lines(body, x + 68, y + 49, 28, 39, 600, colors.muted, sans)}
    </g>
  `;
}

const slides = [
  pageShell(`
    ${logoMark(540, 438, 0.94)}
    ${sans("MAY COLLEGE APP PREP", 540, 690, 30, 800, colors.brown, 'text-anchor="middle" letter-spacing="3"')}
    ${lines(["Targeting", "T20 schools?"], 540, 836, 102, 118, 800, colors.ink, (v, x, y, s, w, f) => text(v, x, y, s, w, f, 'text-anchor="middle"'))}
    <path d="M254 1106 C360 1060, 454 1150, 560 1104 C660 1061, 730 1011, 838 1046" fill="none" stroke="${colors.coral}" stroke-width="13" stroke-linecap="round" opacity="0.75"/>
    ${lines(["What to do in May", "before app season gets loud."], 540, 1266, 46, 62, 600, colors.muted, (v, x, y, s, w, f) => sans(v, x, y, s, w, f, 'text-anchor="middle"'))}
    <rect x="240" y="1510" width="600" height="92" rx="46" fill="${colors.brown}"/>
    ${sans("save this checklist", 540, 1568, 34, 800, "#ffffff", 'text-anchor="middle"')}
  `, 1),
  pageShell(`
    ${text("Your May moves", 140, 384, 78, 800, colors.ink)}
    ${note("01", "Build the list", ["12-16 schools. Know why each", "one fits beyond ranking."], 150, 594)}
    ${note("02", "Find your angle", ["Choose 2-3 interests and the", "story connecting them."], 150, 824)}
    ${note("03", "Audit your stats", ["Transcript, rigor, testing plan,", "senior classes, weak spots."], 150, 1054)}
    ${note("04", "Make the brag doc", ["Activities, impact numbers,", "awards, projects, context."], 150, 1284)}
    <rect x="160" y="1538" width="760" height="108" rx="54" fill="${colors.paleTan}"/>
    ${sans("Goal: know the story your application is telling.", 540, 1604, 29, 800, colors.brown, 'text-anchor="middle"')}
  `, 2),
  pageShell(`
    ${text("Before school ends", 140, 384, 72, 800, colors.ink)}
    ${note("05", "Ask recommenders", ["Ask in May while teachers still", "remember your best work."], 150, 634)}
    ${note("06", "Start essay seeds", ["List 10 moments that changed", "how you think, act, or lead."], 150, 904)}
    ${note("07", "Plan summer proof", ["Research, job, service, project,", "portfolio. Make impact visible."], 150, 1174)}
    <rect x="160" y="1502" width="760" height="104" rx="52" fill="${colors.brown}"/>
    ${sans("follow for senior year app strategy", 540, 1568, 32, 800, "#ffffff", 'text-anchor="middle"')}
    ${text("@yourcollegeappadv", 540, 1690, 41, 800, colors.coral, 'text-anchor="middle"')}
  `, 3),
];

async function main() {
  for (let i = 0; i < slides.length; i += 1) {
    const base = `brand-tiktok-slide-${String(i + 1).padStart(2, "0")}`;
    fs.writeFileSync(path.join(outDir, `${base}.svg`), slides[i]);
    await sharp(Buffer.from(slides[i])).png().toFile(path.join(outDir, `${base}.png`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
