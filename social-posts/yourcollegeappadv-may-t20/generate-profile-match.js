const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const W = 1080;
const H = 1920;

const c = {
  black: "#0b0b0b",
  gray: "#777777",
  softGray: "#f5f5f5",
  line: "#ececec",
  beige: "#f2eadc",
  beige2: "#e6d7bf",
  brown: "#665440",
  warm: "#fffaf2",
  blue: "#57c6ef",
};

function esc(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function t(v, x, y, size, weight = 700, fill = c.black, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Avenir Next, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(v)}</text>`;
}

function serif(v, x, y, size, weight = 700, fill = c.brown, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(v)}</text>`;
}

function centered(lines, x, y, size, gap, weight = 800, fill = c.black) {
  return lines.map((line, i) => t(line, x, y + i * gap, size, weight, fill, 'text-anchor="middle"')).join("\n");
}

function logo(cx, cy, s = 1) {
  return `
    <g transform="translate(${cx} ${cy}) scale(${s})">
      <circle cx="0" cy="0" r="112" fill="${c.warm}" stroke="${c.beige2}" stroke-width="4"/>
      <circle cx="0" cy="-8" r="72" fill="${c.beige}" opacity="0.75"/>
      <path d="M-48 -40 L0 -66 L52 -40 L0 -12 Z" fill="none" stroke="${c.brown}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-31 -22 L-31 42 L33 42 L33 -22" fill="none" stroke="${c.brown}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-14 -1 L16 -1 M-14 18 L16 18" stroke="${c.brown}" stroke-width="6" stroke-linecap="round"/>
      <path d="M50 -40 L72 -24 L72 14" fill="none" stroke="${c.brown}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="72" cy="20" r="8" fill="${c.brown}"/>
      ${serif("YOUR COLLEGE", -78, 91, 22, 800)}
      ${serif("APP ADVISOR", -74, 116, 22, 800)}
    </g>
  `;
}

function shell(inner, n) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="${W}" height="118" fill="#ffffff"/>
  ${t("@yourcollegeappadv", 70, 92, 33, 700, c.gray)}
  <rect x="890" y="48" width="112" height="54" rx="27" fill="${c.softGray}"/>
  ${t(`${n}/3`, 946, 84, 27, 800, c.black, 'text-anchor="middle"')}
  <line x1="0" y1="118" x2="${W}" y2="118" stroke="${c.line}" stroke-width="2"/>
  ${inner}
</svg>`;
}

function row(num, title, body, y) {
  return `
    <g>
      <circle cx="116" cy="${y - 18}" r="36" fill="${c.beige}"/>
      ${t(num, 116, y - 6, 28, 800, c.brown, 'text-anchor="middle"')}
      ${t(title, 180, y, 44, 800, c.black)}
      ${body.map((line, i) => t(line, 180, y + 51 + i * 42, 31, 600, c.gray)).join("\n")}
    </g>
  `;
}

const slides = [
  shell(`
    ${logo(540, 345, 0.92)}
    ${t("✨ college app prep", 540, 560, 33, 700, c.gray, 'text-anchor="middle"')}
    ${centered(["what to do", "in may"], 540, 742, 104, 116, 850)}
    <rect x="238" y="950" width="604" height="88" rx="44" fill="${c.beige}"/>
    ${t("if you're aiming for T20s", 540, 1006, 38, 800, c.brown, 'text-anchor="middle"')}
    ${t("start before senior year gets chaotic", 540, 1210, 41, 650, c.gray, 'text-anchor="middle"')}
    <rect x="198" y="1458" width="684" height="94" rx="47" fill="${c.black}"/>
    ${t("save this", 540, 1518, 38, 800, "#ffffff", 'text-anchor="middle"')}
  `, 1),
  shell(`
    ${t("may checklist", 70, 244, 76, 850, c.black)}
    ${row("1", "build your list", ["12-16 schools, not just reaches"], 440)}
    ${row("2", "find your angle", ["what do you want colleges to see?"], 645)}
    ${row("3", "audit your stats", ["transcript, rigor, testing, classes"], 850)}
    ${row("4", "start your brag doc", ["activities, impact, awards, context"], 1055)}
    <rect x="70" y="1378" width="940" height="150" rx="34" fill="${c.softGray}"/>
    ${t("goal:", 114, 1442, 35, 850, c.black)}
    ${t("know the story your application is telling", 114, 1490, 33, 650, c.gray)}
  `, 2),
  shell(`
    ${t("before school ends", 70, 244, 72, 850, c.black)}
    ${row("5", "ask recommenders", ["ask while teachers remember your work"], 470)}
    ${row("6", "essay seed list", ["write 10 real moments from your life"], 700)}
    ${row("7", "plan summer proof", ["project, job, research, service, portfolio"], 930)}
    <rect x="70" y="1285" width="940" height="212" rx="42" fill="${c.beige}"/>
    ${t("posting more senior year app strategy", 540, 1368, 38, 800, c.brown, 'text-anchor="middle"')}
    ${t("follow @yourcollegeappadv", 540, 1430, 36, 750, c.black, 'text-anchor="middle"')}
    ${logo(540, 1662, 0.55)}
  `, 3),
];

async function main() {
  for (let i = 0; i < slides.length; i += 1) {
    const base = `profile-match-slide-${String(i + 1).padStart(2, "0")}`;
    fs.writeFileSync(path.join(outDir, `${base}.svg`), slides[i]);
    await sharp(Buffer.from(slides[i])).png().toFile(path.join(outDir, `${base}.png`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
