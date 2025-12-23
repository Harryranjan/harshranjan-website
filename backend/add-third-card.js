const mysql = require("mysql2/promise");

async function addMissingCard() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["about-team"]
  );

  let content = rows[0].content;

  // Find where to insert the third card (after the Holistic Approach card, before the closing </div>)
  const insertPoint = `                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-brain text-teal-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Holistic Approach</h3>
                        <p class="text-gray-600">We combine manual therapy, neurotherapy, and alternative treatments for comprehensive healing.</p>
                    </div>

                `;

  const thirdCard = `                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-brain text-teal-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Holistic Approach</h3>
                        <p class="text-gray-600">We combine manual therapy, neurotherapy, and alternative treatments for comprehensive healing.</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-chart-line text-green-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Evidence-Based Treatment</h3>
                        <p class="text-gray-600">Our therapies are backed by scientific research and proven clinical results.</p>
                    </div>

                `;

  content = content.replace(insertPoint, thirdCard);

  // Update database
  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "about-team"]
  );

  console.log("✅ Added the missing third card to Philosophy section");

  await connection.end();
}

addMissingCard().catch(console.error);
