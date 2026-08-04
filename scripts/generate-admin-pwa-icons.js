const sharp = require("sharp");
const fs = require("fs");

const src = "public/logos/op-institute-logo.png";

async function run() {
  fs.mkdirSync("public/admin-pwa", { recursive: true });
  for (const size of [192, 512]) {
    await sharp(src)
      .resize(size, size, {
        fit: "contain",
        background: { r: 29, g: 41, b: 81, alpha: 1 },
      })
      .png()
      .toFile(`public/admin-pwa/icon-${size}.png`);
  }
  console.log("Admin PWA icons created");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
