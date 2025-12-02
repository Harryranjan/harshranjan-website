const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

async function checkHeaderNow() {
  try {
    const [results] = await sequelize.query(
      'SELECT id, name, is_active, settings FROM menus WHERE location = "header" ORDER BY id DESC LIMIT 1'
    );
    
    if (results.length === 0) {
      console.log('No header found');
      process.exit(0);
    }
    
    const header = results[0];
    const settings = JSON.parse(header.settings);
    const code = settings.customCode || '';
    
    console.log('Header ID:', header.id);
    console.log('Name:', header.name);
    console.log('Active:', header.is_active);
    console.log('\nFirst 100 chars of customCode:');
    console.log(code.substring(0, 100));
    console.log('\nIs Encoded?', code.includes('&lt;') ? 'YES (BAD)' : 'NO (GOOD)');
    
    if (code.includes('&lt;')) {
      console.log('\n❌ HTML is encoded in database!');
      console.log('This happened because something re-saved it.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkHeaderNow();
