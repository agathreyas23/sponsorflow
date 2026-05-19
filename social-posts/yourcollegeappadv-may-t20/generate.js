const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const W = 1080;
const H = 1350;

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function line(text, x, y, size, weight = 700, color = "#16213d", extra = "") {
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${esc(text)}</text>`;
}

function multiline(lines, x, y, size, gap, weight = 650, color = "#16213d") {
  return lines
    .map((text, i) => line(text, x, y + i * gap, size, weight, color))
    .join("\n");
}

function pill(text, x, y, w, h, fill, color = "#16213d") {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>
    ${line(text, x + w / 2, y + h / 2 + 13, 31, 800, color, 'text-anchor="middle"')}
  `;
}

function checkItem(num, title, body, x, y, accent) {
  return `
    <g>
      <circle cx="${x + 32}" cy="${y + 32}" r="32" fill="${accent}"/>
      ${line(num, x + 32, y + 44, 31, 900, "#ffffff", 'text-anchor="middle"')}
      ${line(title, x + 88, y + 18, 38, 850, "#16213d")}
      ${multiline(body, x + 88, y + 67, 28, 39, 560, "#485065")}
    </g>
  `;
}

function frame(inner, pageNum) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbf7ef"/>
      <stop offset="0.46" stop-color="#f7fbf8"/>
      <stop offset="1" stop-color="#edf4ff"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#17213d" flood-opacity="0.14"/>
    </filter>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
      <path d="M 54 0 L 0 0 0 54" fill="none" stroke="#16213d" stroke-width="1" opacity="0.055"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="955" cy="96" r="164" fill="#ff715b" opacity="0.19"/>
  <circle cx="112" cy="1192" r="214" fill="#69d2c1" opacity="0.22"/>
  <rect x="74" y="74" width="932" height="1202" rx="42" fill="#fffdf8" filter="url(#shadow)" opacity="0.92"/>
  <rect x="108" y="108" width="864" height="1134" rx="34" fill="none" stroke="#16213d" stroke-width="2" opacity="0.12"/>
  ${line("@yourcollegeappadv", 132, 168, 30, 800, "#485065")}
  ${pill(`${pageNum}/3`, 838, 128, 104, 54, "#16213d", "#ffffff")}
  ${inner}
</svg>`;
}

const slides = [
  frame(`
    ${pill("MAY CHECKLIST", 132, 246, 318, 64, "#d9f2eb")}
    ${multiline(["Targeting", "T20 schools?", "Start now."], 132, 402, 103, 110, 900, "#16213d")}
    <path d="M132 748 C260 698, 368 817, 502 759 C638 700, 724 620, 912 678" fill="none" stroke="#ff715b" stroke-width="17" stroke-linecap="round" opacity="0.92"/>
    ${multiline(["What to do in May before", "college app season gets loud."], 132, 846, 47, 62, 650, "#485065")}
    <rect x="132" y="1058" width="384" height="88" rx="44" fill="#16213d"/>
    ${line("save this", 324, 1113, 38, 850, "#ffffff", 'text-anchor="middle"')}
    <rect x="540" y="1058" width="264" height="88" rx="44" fill="#ff715b"/>
    ${line("swipe", 672, 1113, 38, 850, "#ffffff", 'text-anchor="middle"')}
  `, 1),
  frame(`
    ${line("Your May moves", 132, 282, 78, 900, "#16213d")}
    ${checkItem("1", "Build the list", ["12-16 schools. Know why each", "one fits beyond ranking."], 132, 382, "#ff715b")}
    ${checkItem("2", "Pick your angle", ["Choose 2-3 academic interests", "and the story connecting them."], 132, 565, "#69bfae")}
    ${checkItem("3", "Audit your stats", ["Transcript, rigor, testing plan,", "senior classes, weak spots."], 132, 748, "#5d73d8")}
    ${checkItem("4", "Make the brag doc", ["Activities, impact numbers,", "awards, projects, context."], 132, 931, "#f2b84b")}
    <rect x="132" y="1132" width="812" height="76" rx="38" fill="#f3f5ff"/>
    ${line("Goal: know what story your app is telling.", 538, 1182, 31, 750, "#16213d", 'text-anchor="middle"')}
  `, 2),
  frame(`
    ${line("Before school ends", 132, 278, 72, 900, "#16213d")}
    ${checkItem("5", "Ask recommenders", ["Ask in May while teachers still", "remember your best work."], 132, 386, "#ff715b")}
    ${checkItem("6", "Essay seed list", ["Write 10 moments that changed", "how you think, act, or lead."], 132, 585, "#69bfae")}
    ${checkItem("7", "Plan summer proof", ["Research, job, project, service,", "portfolio. Make impact visible."], 132, 784, "#5d73d8")}
    <rect x="132" y="1024" width="812" height="104" rx="52" fill="#16213d"/>
    ${line("Follow for senior year app strategy", 538, 1089, 36, 850, "#ffffff", 'text-anchor="middle"')}
    ${line("@yourcollegeappadv", 538, 1190, 37, 850, "#ff715b", 'text-anchor="middle"')}
  `, 3),
];

async function main() {
  for (let i = 0; i < slides.length; i += 1) {
    const base = `slide-${String(i + 1).padStart(2, "0")}`;
    const svgPath = path.join(outDir, `${base}.svg`);
    const pngPath = path.join(outDir, `${base}.png`);
    fs.writeFileSync(svgPath, slides[i]);
    await sharp(Buffer.from(slides[i])).png().toFile(pngPath);
  }

  const caption = `POV: you're targeting T20 schools and waiting until August is already too late.

May checklist:
1. Build a balanced 12-16 school list.
2. Pick the academic angle your application will prove.
3. Audit transcript, rigor, testing, and senior year classes.
4. Make a brag doc with activities, awards, impact numbers, and context.
5. Ask recommenders before school ends.
6. Start an essay seed list with 10 real moments.
7. Plan one summer project, job, research experience, or service commitment that shows proof.

Save this and follow @yourcollegeappadv for senior year college app strategy.

#collegeapps #collegeadmissions #classof2027 #risingsenior #t20schools #commonapp #collegeapplicationtips #highschoolsenior`;

  fs.writeFileSync(path.join(outDir, "caption.txt"), caption);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
