const { sequelize } = require('./config/database');

async function addCustomCodeColumn() {
  try {
    console.log('Adding custom_code column to forms table...');
    
    await sequelize.query(`
      ALTER TABLE forms 
      ADD COLUMN IF NOT EXISTS custom_code LONGTEXT NULL
    `);
    
    console.log('✅ custom_code column added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding column:', error);
    process.exit(1);
  }
}

addCustomCodeColumn();
