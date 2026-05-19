const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const W = 1080;
const H = 1920;

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
  <rect x="70" y="98" width="940" height="1724" rx="46" fill="#fffdf8" filter="url(#shadow)" opacity="0.94"/>
  <rect x="108" y="138" width="864" height="1644" rx="34" fill="none" stroke="#6b5843" stroke-width="2" opacity="0.16"/>
  ${line("@yourcollegeappadv", 132, 218, 30, 800, "#6e655b")}
  ${pill(`${pageNum}/3`, 838, 178, 104, 54, "#6b5843", "#ffffff")}
  ${inner}
</svg>`;
}

const slides = [
  frame(`
    ${pill("MAY CHECKLIST", 132, 346, 318, 64, "#efe3cf", "#6b5843")}
    ${multiline(["Targeting", "T20 schools?", "Start now."], 132, 540, 110, 120, 900, "#16213d")}
    <path d="M132 1018 C260 968, 368 1087, 502 1029 C638 970, 724 890, 912 948" fill="none" stroke="#ff715b" stroke-width="17" stroke-linecap="round" opacity="0.92"/>
    ${multiline(["What to do in May before", "college app season gets loud."], 132, 1160, 50, 68, 650, "#54505b")}
    <rect x="132" y="1486" width="384" height="92" rx="46" fill="#16213d"/>
    ${line("save this", 324, 1544, 38, 850, "#ffffff", 'text-anchor="middle"')}
    <rect x="540" y="1486" width="264" height="92" rx="46" fill="#ff715b"/>
    ${line("swipe", 672, 1544, 38, 850, "#ffffff", 'text-anchor="middle"')}
  `, 1),
  frame(`
    ${line("Your May moves", 132, 392, 78, 900, "#16213d")}
    ${checkItem("1", "Build the list", ["12-16 schools. Know why each", "one fits beyond ranking."], 132, 545, "#ff715b")}
    ${checkItem("2", "Pick your angle", ["Choose 2-3 academic interests", "and the story connecting them."], 132, 770, "#69bfae")}
    ${checkItem("3", "Audit your stats", ["Transcript, rigor, testing plan,", "senior classes, weak spots."], 132, 995, "#5d73d8")}
    ${checkItem("4", "Make the brag doc", ["Activities, impact numbers,", "awards, projects, context."], 132, 1220, "#f2b84b")}
    <rect x="132" y="1548" width="812" height="84" rx="42" fill="#f7efe4"/>
    ${line("Goal: know what story your app is telling.", 538, 1602, 31, 750, "#16213d", 'text-anchor="middle"')}
  `, 2),
  frame(`
    ${line("Before school ends", 132, 390, 72, 900, "#16213d")}
    ${checkItem("5", "Ask recommenders", ["Ask in May while teachers still", "remember your best work."], 132, 560, "#ff715b")}
    ${checkItem("6", "Essay seed list", ["Write 10 moments that changed", "how you think, act, or lead."], 132, 820, "#69bfae")}
    ${checkItem("7", "Plan summer proof", ["Research, job, project, service,", "portfolio. Make impact visible."], 132, 1080, "#5d73d8")}
    <rect x="132" y="1480" width="812" height="110" rx="55" fill="#16213d"/>
    ${line("Follow for senior year app strategy", 538, 1549, 36, 850, "#ffffff", 'text-anchor="middle"')}
    ${line("@yourcollegeappadv", 538, 1665, 37, 850, "#ff715b", 'text-anchor="middle"')}
  `, 3),
];

async function main() {
  for (let i = 0; i < slides.length; i += 1) {
    const base = `tiktok-slide-${String(i + 1).padStart(2, "0")}`;
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
