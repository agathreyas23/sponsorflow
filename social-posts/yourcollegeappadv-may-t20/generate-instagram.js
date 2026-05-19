const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = __dirname;
const W = 1080;
const H = 1350;

const c = {
  black: "#080808",
  gray: "#767676",
  softGray: "#f7f7f7",
  line: "#eeeeee",
  cream: "#fffaf2",
  beige: "#f0e6d5",
  beigeDeep: "#dfcfb8",
  brown: "#665440",
  brown2: "#8b7358",
  blue: "#59c5eb",
};

function esc(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(v, x, y, size, weight = 700, fill = c.black, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Avenir Next, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(v)}</text>`;
}

function serif(v, x, y, size, weight = 700, fill = c.brown, extra = "") {
  return `<text x="${x}" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(v)}</text>`;
}

function centered(lines, x, y, size, gap, weight = 850, fill = c.black) {
  return lines.map((line, i) => text(line, x, y + i * gap, size, weight, fill, 'text-anchor="middle"')).join("\n");
}

function logo(cx, cy, s = 1) {
  return `
    <g transform="translate(${cx} ${cy}) scale(${s})">
      <circle cx="0" cy="0" r="100" fill="${c.cream}" stroke="${c.beigeDeep}" stroke-width="4"/>
      <circle cx="0" cy="-8" r="66" fill="${c.beige}" opacity="0.82"/>
      <path d="M-44 -36 L0 -60 L48 -36 L0 -10 Z" fill="none" stroke="${c.brown}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-28 -20 L-28 38 L30 38 L30 -20" fill="none" stroke="${c.brown}" stroke-width="6" stroke-linecap="round"/>
      <path d="M-12 -1 L14 -1 M-12 16 L14 16" stroke="${c.brown}" stroke-width="5" stroke-linecap="round"/>
      <path d="M46 -36 L66 -22 L66 12" fill="none" stroke="${c.brown}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="66" cy="17" r="7" fill="${c.brown}"/>
      ${serif("YOUR COLLEGE", -70, 82, 19, 800)}
      ${serif("APP ADVISOR", -67, 104, 19, 800)}
    </g>
  `;
}

function shell(inner, n) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#6b5843" flood-opacity="0.10"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <circle cx="934" cy="146" r="170" fill="${c.beige}" opacity="0.7"/>
  <circle cx="92" cy="1228" r="190" fill="#edf7f2" opacity="0.9"/>
  <rect x="54" y="50" width="972" height="1250" rx="46" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="82" y="78" width="916" height="1194" rx="34" fill="none" stroke="${c.line}" stroke-width="2"/>
  ${text("@yourcollegeappadv", 112, 140, 30, 700, c.gray)}
  <rect x="860" y="102" width="96" height="50" rx="25" fill="${c.softGray}"/>
  ${text(`${n}/3`, 908, 136, 25, 850, c.black, 'text-anchor="middle"')}
  ${inner}
</svg>`;
}

function card(num, title, body, x, y, w = 394) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="178" rx="28" fill="${c.softGray}"/>
      <circle cx="${x + 50}" cy="${y + 52}" r="28" fill="${c.beige}"/>
      ${text(num, x + 50, y + 62, 24, 850, c.brown, 'text-anchor="middle"')}
      ${text(title, x + 92, y + 62, 32, 850, c.black)}
      ${body.map((line, i) => text(line, x + 34, y + 116 + i * 34, 25, 600, c.gray)).join("\n")}
    </g>
  `;
}

const slides = [
  shell(`
    ${logo(540, 268, 0.76)}
    ${text("✨ MAY PREP FOR RISING SENIORS", 540, 455, 27, 800, c.brown, 'text-anchor="middle"')}
    ${centered(["if T20s are", "on your list..."], 540, 602, 82, 92, 900)}
    <rect x="244" y="805" width="592" height="74" rx="37" fill="${c.beige}"/>
    ${text("do these before summer starts", 540, 854, 31, 800, c.brown, 'text-anchor="middle"')}
    ${text("your August self will thank you", 540, 1010, 38, 650, c.gray, 'text-anchor="middle"')}
    <rect x="246" y="1134" width="588" height="82" rx="41" fill="${c.black}"/>
    ${text("save + swipe", 540, 1187, 34, 850, "#ffffff", 'text-anchor="middle"')}
  `, 1),
  shell(`
    ${text("start here", 112, 244, 70, 900, c.black)}
    ${text("the May checklist colleges won't see, but your app will feel", 112, 306, 29, 600, c.gray)}
    ${card("1", "school list", ["12-16 schools:", "reach, target, likely"], 112, 404)}
    ${card("2", "your angle", ["what story are you", "building toward?"], 574, 404)}
    ${card("3", "stats audit", ["grades, rigor,", "testing, senior classes"], 112, 632)}
    ${card("4", "brag doc", ["impact numbers,", "awards, activities"], 574, 632)}
    <rect x="112" y="905" width="856" height="198" rx="34" fill="${c.cream}" stroke="${c.beigeDeep}" stroke-width="2"/>
    ${text("tiny but important:", 154, 970, 31, 850, c.brown)}
    ${text("write down the why behind every school.", 154, 1024, 31, 700, c.black)}
    ${text("ranking is not a reason.", 154, 1070, 28, 650, c.gray)}
  `, 2),
  shell(`
    ${text("before school ends", 112, 244, 64, 900, c.black)}
    ${card("5", "recs", ["ask teachers while", "you're still fresh"], 112, 360)}
    ${card("6", "essay seeds", ["10 moments that", "show who you are"], 574, 360)}
    ${card("7", "summer proof", ["project, job, research,", "service, portfolio"], 112, 588, 856)}
    <rect x="112" y="858" width="856" height="188" rx="38" fill="${c.beige}"/>
    ${text("hot take:", 540, 928, 32, 900, c.brown, 'text-anchor="middle"')}
    ${text("T20 apps are easier when your story is clear", 540, 982, 32, 800, c.black, 'text-anchor="middle"')}
    <rect x="158" y="1116" width="764" height="82" rx="41" fill="${c.black}"/>
    ${text("follow for senior year app strategy", 540, 1169, 31, 850, "#ffffff", 'text-anchor="middle"')}
    ${text("@yourcollegeappadv", 540, 1244, 30, 800, c.brown2, 'text-anchor="middle"')}
  `, 3),
];

async function main() {
  for (let i = 0; i < slides.length; i += 1) {
    const base = `instagram-slide-${String(i + 1).padStart(2, "0")}`;
    fs.writeFileSync(path.join(outDir, `${base}.svg`), slides[i]);
    await sharp(Buffer.from(slides[i])).png().toFile(path.join(outDir, `${base}.png`));
  }

  fs.writeFileSync(
    path.join(outDir, "instagram-caption.txt"),
    `If T20s are on your college list, May matters more than you think.

Do these before summer starts:
1. Build a balanced 12-16 school list
2. Pick the story your application is going to tell
3. Audit grades, rigor, testing, and senior year classes
4. Start a brag doc with impact numbers and context
5. Ask recommenders while school is still in session
6. Make an essay seed list with 10 real moments
7. Plan one summer experience that proves your interests

Save this for later and follow @yourcollegeappadv for senior year app strategy.

#collegeapps #collegeadmissions #commonapp #risingsenior #classof2027 #t20schools #collegeapplicationtips`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
