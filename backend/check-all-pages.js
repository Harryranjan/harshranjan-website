const http = require("http");

function checkPage(slug) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: `/api/pages/${slug}`,
      method: "GET",
    };

    console.log(`🔍 Fetching: http://localhost:5000/api/pages/${slug}\n`);

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          console.log("✅ Response received!");
          console.log("\n📊 Status Code:", res.statusCode);
          console.log("📄 Title:", parsed.title);
          console.log("🔖 Slug:", parsed.slug);
          console.log("📝 Template:", parsed.template);
          console.log("📈 Status:", parsed.status);
          console.log(
            "\n📏 Content Length:",
            parsed.content?.length || 0,
            "characters"
          );

          if (parsed.content) {
            console.log("\n📝 Content Preview (first 300 chars):");
            console.log(parsed.content.substring(0, 300));
            console.log("...\n");

            // Check for key elements
            const hasDoctype = parsed.content.includes("<!DOCTYPE html>");
            const hasGSAP = parsed.content.includes("gsap");
            const hasLenis = parsed.content.includes("lenis");
            const hasStyles = parsed.content.includes("<style>");
            const hasTailwind = parsed.content.includes("tailwindcss");

            console.log("🔍 Content Analysis:");
            console.log("  DOCTYPE:", hasDoctype ? "✅" : "❌");
            console.log("  GSAP:", hasGSAP ? "✅" : "❌");
            console.log("  Lenis:", hasLenis ? "✅" : "❌");
            console.log("  Styles:", hasStyles ? "✅" : "❌");
            console.log("  Tailwind:", hasTailwind ? "✅" : "❌");
          } else {
            console.log("❌ NO CONTENT FOUND!");
          }

          resolve(parsed);
        } catch (e) {
          console.error("❌ Error parsing response:", e.message);
          console.log("Raw response:", data.substring(0, 500));
          reject(e);
        }
      });
    });

    req.on("error", (error) => {
      console.error("❌ Request error:", error.message);
      console.log("\n💡 Make sure the backend server is running on port 5000");
      reject(error);
    });

    req.setTimeout(5000, () => {
      console.error("❌ Request timeout");
      req.destroy();
    });

    req.end();
  });
}

async function main() {
  console.log("🚀 Checking all Starvy clone pages...\n");

  const slugs = [
    "starvy-animated-clone",
    "ai-developer-services",
    "ai-developer-portfolio",
  ];

  for (const slug of slugs) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Checking: ${slug}`);
    console.log("=".repeat(60));

    try {
      await checkPage(slug);
    } catch (error) {
      console.log(`Failed to check ${slug}`);
    }

    console.log("");
  }

  console.log("\n✅ Check complete!");
}

main();
