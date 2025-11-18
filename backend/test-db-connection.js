require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Testing connection with:');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Password:', process.env.DB_PASSWORD ? '***' : '(empty)');
    console.log('Database:', process.env.DB_NAME);
    console.log('Port:', process.env.DB_PORT);
    console.log('\n---\n');

    // First, connect without database to check server connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ MySQL server connection successful!\n');

    // Check if database exists
    const [databases] = await connection.query('SHOW DATABASES');
    console.log('Available databases:');
    databases.forEach(db => console.log('  -', db.Database));

    const dbExists = databases.some(db => db.Database === process.env.DB_NAME);
    
    if (dbExists) {
      console.log(`\n✅ Database '${process.env.DB_NAME}' exists!`);
      
      // Try to connect to the specific database
      await connection.query(`USE ${process.env.DB_NAME}`);
      console.log(`✅ Successfully connected to database '${process.env.DB_NAME}'`);
    } else {
      console.log(`\n❌ Database '${process.env.DB_NAME}' NOT found!`);
      console.log('Creating database...');
      await connection.query(`CREATE DATABASE ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);
    }

    await connection.end();
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
