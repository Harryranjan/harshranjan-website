const http = require("http");

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/pages/slug/starvy-animated-clone",
  method: "GET",
};

console.log("🔍 Testing API with full response dump\n");

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", JSON.stringify(res.headers, null, 2));
    console.log("\nRaw Response:");
    console.log(data);

    try {
      const json = JSON.parse(data);
      console.log("\n\nParsed JSON:");
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log("Could not parse as JSON");
    }
  });
});

req.on("error", (error) => {
  console.error("Request failed:", error.message);
});

req.end();
