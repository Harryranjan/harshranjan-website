const axios = require("axios");

async function checkPageAPI() {
  try {
    console.log("🔍 Checking animated Starvy clone page via API...\n");

    const response = await axios.get(
      "http://localhost:5000/api/pages/starvy-animated-clone"
    );

    console.log("📊 API Response Status:", response.status);
    console.log("\n📄 Page Data:");
    console.log("Title:", response.data.title);
    console.log("Slug:", response.data.slug);
    console.log("Template:", response.data.template);
    console.log("Status:", response.data.status);
    console.log("\n📝 Content Preview (first 500 chars):");
    console.log(response.data.content?.substring(0, 500));
    console.log(
      "\n📏 Content Length:",
      response.data.content?.length,
      "characters"
    );

    if (response.data.content && response.data.content.length > 1000) {
      console.log("✅ Content exists and has substantial length");

      // Check for key elements
      const hasHTML = response.data.content.includes("<!DOCTYPE html>");
      const hasAnimations =
        response.data.content.includes("gsap") ||
        response.data.content.includes("animation");
      const hasStyles = response.data.content.includes("<style>");
      const hasScripts = response.data.content.includes("<script>");

      console.log("\n🔍 Content Analysis:");
      console.log("Has HTML structure:", hasHTML ? "✅" : "❌");
      console.log("Has animations:", hasAnimations ? "✅" : "❌");
      console.log("Has styles:", hasStyles ? "✅" : "❌");
      console.log("Has scripts:", hasScripts ? "✅" : "❌");
    } else {
      console.log("❌ Content is missing or too short!");
    }

    console.log("\n🔗 Try accessing:");
    console.log("Frontend: http://localhost:5173/pages/starvy-animated-clone");
    console.log(
      "Backend:  http://localhost:5000/api/pages/starvy-animated-clone"
    );
  } catch (error) {
    console.error("❌ Error fetching page:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

checkPageAPI();
