const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

async function updateAdmin() {
  const newEmail = "mr.harshranjan@gmail.com";
  const newPassword = "DrSubodh@2025!";

  console.log("Hashing password...");
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  console.log("Connecting to database...");
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "drsubodh_user",
    password: "Dr@Subodh2025!",
    database: "drsubodh_website",
  });

  console.log("Updating admin credentials...");
  const [result] = await connection.execute(
    "UPDATE users SET email = ?, password = ? WHERE role = ?",
    [newEmail, hashedPassword, "admin"]
  );

  console.log("✅ Admin credentials updated successfully!");
  console.log("New Email:", newEmail);
  console.log("New Password:", newPassword);
  console.log("Rows affected:", result.affectedRows);

  const [users] = await connection.execute(
    "SELECT id, email, role FROM users WHERE role = ?",
    ["admin"]
  );
  console.log("\nUpdated admin user:", users[0]);

  await connection.end();
}

updateAdmin().catch(console.error);
