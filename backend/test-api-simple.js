const http = require("http");

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/pages/slug/starvy-animated-clone",
  method: "GET",
};

console.log(
  "🔍 Testing API: http://localhost:5000/api/pages/slug/starvy-animated-clone\n"
);

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const json = JSON.parse(data);

      console.log("✅ API WORKING!\n");
      console.log("📊 Status Code:", res.statusCode);
      console.log("📄 Title:", json.title);
      console.log("🔖 Slug:", json.slug);
      console.log("📝 Template:", json.template);
      console.log("📈 Status:", json.status);
      console.log(
        "📏 Content Length:",
        json.content?.length || 0,
        "characters\n"
      );

      if (json.content) {
        console.log("🔍 Content Analysis:");
        console.log(
          "  DOCTYPE:",
          json.content.includes("<!DOCTYPE html>") ? "✅" : "❌"
        );
        console.log("  GSAP:", json.content.includes("gsap") ? "✅" : "❌");
        console.log("  Lenis:", json.content.includes("lenis") ? "✅" : "❌");
        console.log(
          "  Tailwind:",
          json.content.includes("tailwindcss") ? "✅" : "❌"
        );
        console.log(
          "  Animations:",
          json.content.includes("animation") ? "✅" : "❌"
        );
        console.log(
          "  Alpine.js:",
          json.content.includes("alpinejs") ? "✅" : "❌"
        );

        console.log("\n📝 Content Preview (first 500 chars):");
        console.log(json.content.substring(0, 500));
        console.log("...\n");
      } else {
        console.log("❌ NO CONTENT IN RESPONSE!");
      }
    } catch (e) {
      console.error("❌ Error parsing JSON:", e.message);
      console.log("Raw response:", data.substring(0, 500));
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Request failed:", error.message);
  console.log("\n💡 Make sure:");
  console.log("  1. Backend server is running on port 5000");
  console.log("  2. Database is connected");
  console.log("  3. Page exists in database");
});

req.setTimeout(10000);
req.end();
