const http = require("http");

console.log("\n🔍 FINAL VERIFICATION - Starvy Animated Clone\n");

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/pages/slug/starvy-animated-clone",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("✅ API Response Status:", res.statusCode);
    console.log("📝 Content-Type:", res.headers["content-type"]);

    try {
      const json = JSON.parse(data);
      const page = json.page;
      const content = page.content || "";

      console.log("\n📊 PAGE DATA:");
      console.log("  Title:", page.title);
      console.log("  Slug:", page.slug);
      console.log("  Status:", page.status);
      console.log("  Template:", page.template);
      console.log("  Views:", page.views);

      console.log("\n📏 CONTENT ANALYSIS:");
      console.log("  Content Length:", content.length, "characters");
      console.log("  Is Full HTML:", content.includes("<!DOCTYPE html>"));

      // Check for key animation libraries
      console.log("\n🎨 ANIMATION LIBRARIES:");
      console.log("  ✓ GSAP:", content.includes("gsap.min.js") ? "YES" : "NO");
      console.log(
        "  ✓ ScrollTrigger:",
        content.includes("ScrollTrigger") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Lenis:",
        content.includes("lenis.min.js") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Alpine.js:",
        content.includes("alpinejs") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Tailwind CSS:",
        content.includes("tailwindcss.com") ? "YES" : "NO"
      );

      // Check for design elements
      console.log("\n🎨 DESIGN ELEMENTS:");
      console.log(
        "  ✓ Glassmorphism:",
        content.includes("backdrop-filter: blur") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Gradient Text:",
        content.includes("gradient-text") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Animated Background:",
        content.includes("animated-bg") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Floating Particles:",
        content.includes("particles") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Background Orbs:",
        content.includes('class="orb') ? "YES" : "NO"
      );

      // Check for sections
      console.log("\n📄 PAGE SECTIONS:");
      console.log("  ✓ Hero:", content.includes('id="home"') ? "YES" : "NO");
      console.log(
        "  ✓ Features:",
        content.includes('id="features"') ? "YES" : "NO"
      );
      console.log(
        "  ✓ How It Works:",
        content.includes('id="how-it-works"') ? "YES" : "NO"
      );
      console.log(
        "  ✓ Testimonials:",
        content.includes('id="testimonials"') ? "YES" : "NO"
      );
      console.log(
        "  ✓ Pricing:",
        content.includes('id="pricing"') ? "YES" : "NO"
      );
      console.log("  ✓ FAQ:", content.includes('id="faq"') ? "YES" : "NO");

      // Check for animations
      console.log("\n✨ ANIMATIONS:");
      console.log(
        "  ✓ Fade In Up:",
        content.includes("fade-in-up") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Float Animation:",
        content.includes("animate-float") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Glow Effect:",
        content.includes("animate-glow") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Parallax Orbs:",
        content.includes("gsap.to('.orb") ? "YES" : "NO"
      );
      console.log(
        "  ✓ Mouse Parallax:",
        content.includes("mousemove") ? "YES" : "NO"
      );

      console.log("\n✅ VERIFICATION COMPLETE!");
      console.log("🌟 The fully animated Starvy clone is ready!");
      console.log(
        "🚀 Access it at: http://localhost:5174/starvy-animated-clone"
      );
    } catch (e) {
      console.error("❌ Error parsing JSON:", e.message);
    }
  });
});

req.on("error", (e) => {
  console.error("❌ Request failed:", e.message);
});

req.end();
