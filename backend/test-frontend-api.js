const http = require("http");

console.log("\n🔍 Testing Frontend API Request\n");

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/pages/slug/starvy-animated-clone",
  method: "GET",
  headers: {
    Accept: "application/json",
    Origin: "http://localhost:5174",
  },
};

const req = http.request(options, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", JSON.stringify(res.headers, null, 2));

  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      console.log("\n📊 Response Structure:");
      console.log("- Has page:", !!json.page);
      console.log("- Has seo:", !!json.seo);

      if (json.page) {
        const page = json.page;
        console.log("\n📄 Page Object:");
        console.log("- ID:", page.id);
        console.log("- Title:", page.title);
        console.log("- Slug:", page.slug);
        console.log("- Status:", page.status);
        console.log("- Template:", page.template);
        console.log(
          "- Content Length:",
          page.content ? page.content.length : 0
        );
        console.log("- Content Type:", typeof page.content);
        console.log(
          "- Has DOCTYPE:",
          page.content ? page.content.includes("<!DOCTYPE") : false
        );

        if (page.content && page.content.length > 0) {
          console.log("\n✅ Content is present in API response");
          console.log("First 200 chars:", page.content.substring(0, 200));
        } else {
          console.log("\n❌ NO CONTENT in page object!");
        }
      } else {
        console.log("\n❌ No page object in response!");
        console.log(
          "Response:",
          JSON.stringify(json, null, 2).substring(0, 500)
        );
      }
    } catch (e) {
      console.error("❌ Error parsing JSON:", e.message);
      console.log("Raw response:", data.substring(0, 500));
    }
  });
});

req.on("error", (e) => {
  console.error("❌ Request failed:", e.message);
});

req.end();
