const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function createSvgImage(filename, width, height, title, subtitle, iconType) {
  let iconSvg = "";
  if (iconType === "scales") {
    iconSvg = `
      <g stroke="#B29A68" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3v17M5 7l7-3 7 3M5 7a3.5 3.5 0 0 0 7 0M19 7a3.5 3.5 0 0 0 7 0" transform="scale(3.5) translate(18, 12)" />
        <path d="M6 21h12" transform="scale(3.5) translate(18, 12)" />
      </g>
    `;
  } else if (iconType === "building") {
    iconSvg = `
      <g stroke="#B29A68" stroke-width="2" fill="none">
        <path d="M50 70 L250 20 L450 70 Z" fill="#15374C" stroke="#B29A68" stroke-width="3" />
        <line x1="80" y1="70" x2="80" y2="240" stroke="#B29A68" stroke-width="12" />
        <line x1="160" y1="70" x2="160" y2="240" stroke="#B29A68" stroke-width="12" />
        <line x1="250" y1="70" x2="250" y2="240" stroke="#B29A68" stroke-width="12" />
        <line x1="340" y1="70" x2="340" y2="240" stroke="#B29A68" stroke-width="12" />
        <line x1="420" y1="70" x2="420" y2="240" stroke="#B29A68" stroke-width="12" />
        <rect x="40" y="240" width="420" height="25" fill="#0D2635" stroke="#B29A68" stroke-width="3" />
      </g>
    `;
  } else if (iconType === "person") {
    iconSvg = `
      <g fill="none" stroke="#B29A68" stroke-width="2">
        <circle cx="200" cy="140" r="50" fill="#15374C" stroke="#B29A68" stroke-width="3" />
        <path d="M120 280 C120 200, 280 200, 280 280" fill="#081B28" stroke="#B29A68" stroke-width="3" />
        <path d="M170 230 L200 270 L230 230" stroke="#B29A68" stroke-width="2" fill="#E9E2D2" />
      </g>
    `;
  } else {
    iconSvg = `
      <g stroke="#B29A68" stroke-width="2.5" fill="none">
        <rect x="140" y="80" width="120" height="150" rx="6" fill="#15374C" />
        <line x1="160" y1="120" x2="240" y2="120" stroke="#E9E2D2" />
        <line x1="160" y1="150" x2="240" y2="150" stroke="#E9E2D2" />
        <line x1="160" y1="180" x2="210" y2="180" stroke="#E9E2D2" />
      </g>
    `;
  }

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081B28" />
      <stop offset="60%" stop-color="#0D2635" />
      <stop offset="100%" stop-color="#143447" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9E2D2" />
      <stop offset="50%" stop-color="#B29A68" />
      <stop offset="100%" stop-color="#8E774A" />
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(178, 154, 104, 0.07)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <rect width="100%" height="100%" fill="url(#gridPattern)" />

  <g transform="translate(${(width - 400) / 2}, 30)">
    ${iconSvg}
  </g>

  <g text-anchor="middle" transform="translate(${width / 2}, ${height - 60})">
    <text font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="600" fill="#F7F5EF" letter-spacing="1">
      ${title}
    </text>
    <text y="28" font-family="'Inter', sans-serif" font-size="13" fill="#B29A68" letter-spacing="2">
      ${subtitle.toUpperCase()}
    </text>
  </g>

  <rect x="15" y="15" width="${width - 30}" height="${height - 30}" fill="none" stroke="#B29A68" stroke-width="1" opacity="0.3" rx="4" />
</svg>`;

  fs.writeFileSync(path.join(imagesDir, filename), svgContent);
}

// Generate all assets
createSvgImage("hero-legal.jpg", 1400, 800, "Supreme Court & Legal Architecture", "Firma Hukum Swa Law", "building");
createSvgImage("about-legal.jpg", 800, 600, "Integritas & Kepastian Hukum", "Tentang Kantor Kami", "scales");
createSvgImage("why-us.jpg", 800, 600, "Komitmen Pelayanan Hukum Prima", "Nilai Strategis", "scales");

createSvgImage("team-agus.jpg", 600, 600, "Agus Mulyana, S.H., M.H.", "Managing Partner", "person");
createSvgImage("team-rahmat.jpg", 600, 600, "Rahmat Hidayat, S.H.", "Senior Associate", "person");
createSvgImage("team-deni.jpg", 600, 600, "Deni Saturnus, S.H.", "Associate Lawyer", "person");
createSvgImage("team-kartika.jpg", 600, 600, "Kartika Sari, S.H., LL.M.", "Partner", "person");

createSvgImage("article-1.jpg", 800, 500, "Mitigasi Klausul Kontrak Bisnis", "Hukum Bisnis & Korporasi", "doc");
createSvgImage("article-2.jpg", 800, 500, "Penyelesaian Sengketa Mediasi", "Hukum Perdata & Kontrak", "scales");
createSvgImage("article-3.jpg", 800, 500, "Regulasi Ketenagakerjaan UU Cipta Kerja", "Ketenagakerjaan & HR", "doc");
createSvgImage("article-4.jpg", 800, 500, "Kepatuhan Hukum Perlindungan Data (UU PDP)", "Regulasi & Kepatuhan", "doc");
createSvgImage("article-5.jpg", 800, 500, "Restrukturisasi Utang & PKPU", "Hukum Bisnis & Korporasi", "scales");
createSvgImage("article-6.jpg", 800, 500, "Pengalihan Aset Properti Komersial", "Hukum Perdata & Kontrak", "doc");

console.log("Successfully generated all placeholder legal assets!");
