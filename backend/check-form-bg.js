const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("harsh_ranjan_website", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    const [results] = await sequelize.query(
      "SELECT custom_code FROM forms WHERE id = 4"
    );
    const customCode = results[0].custom_code;

    // Look for background color in the code
    const bgMatches = customCode.match(
      /background[^;:]*:[^;]*(#[0-9a-fA-F]{3,6}|rgb[^)]+\)|[a-z]+)/gi
    );

    console.log("\n=== BACKGROUND COLOR FINDINGS ===\n");
    if (bgMatches) {
      bgMatches.forEach((match) => {
        console.log("Found:", match.trim());
      });
    } else {
      console.log("No explicit background colors found");
    }

    // Check for body background
    if (customCode.includes("body {") || customCode.includes("body{")) {
      console.log("\n✅ Body tag styling found");
      const bodySection = customCode.match(/body\s*{[^}]+}/gi);
      if (bodySection) {
        console.log(bodySection[0]);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
