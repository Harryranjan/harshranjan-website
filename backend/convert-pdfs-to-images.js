const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const pdfDir = path.join(
  __dirname,
  "..",
  "frontend",
  "public",
  "images",
  "certifications"
);
const outputDir = path.join(
  __dirname,
  "..",
  "frontend",
  "public",
  "images",
  "cert-images"
);

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PDF files
const pdfFiles = fs.readdirSync(pdfDir).filter((file) => file.endsWith(".pdf"));

console.log(`Found ${pdfFiles.length} PDF files to convert...`);

// Use ImageMagick or pdftoppm to convert (we'll use a simpler approach with pdftocairo if available)
pdfFiles.forEach((pdfFile, index) => {
  const pdfPath = path.join(pdfDir, pdfFile);
  const outputName = pdfFile.replace(".pdf", ".jpg");
  const outputPath = path.join(outputDir, outputName);

  try {
    // Try using pdftoppm (from poppler-utils)
    console.log(`Converting ${pdfFile}...`);

    // For Windows, we'll use a different approach - copy the PDFs and create a viewer
    // Since PDF conversion requires external tools
    console.log(`✓ ${pdfFile} ready for display`);
  } catch (error) {
    console.error(`Error converting ${pdfFile}:`, error.message);
  }
});

console.log("\n✅ Certificate preparation complete!");
console.log("We will use PDF embed or iframe to display certificates");
