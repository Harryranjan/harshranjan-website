require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function createAdminUser() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to database\n');

    // Hash the password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin user exists
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@example.com']);

    if (users.length > 0) {
      console.log('⚠️  Admin user already exists');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      // Create admin user
      const [result] = await connection.query(
        'INSERT INTO users (email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        ['admin@example.com', hashedPassword, 'admin', true]
      );

      console.log('✅ Admin user created successfully!');
      console.log('\n📧 Login Credentials:');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('\n🔗 Admin Panel: http://localhost:5173/admin/login');
    }

    await connection.end();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();
