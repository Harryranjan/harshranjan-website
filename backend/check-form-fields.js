const { connectDB } = require("./config/database");
const Form = require("./models/Form");

async function checkFormFields() {
  try {
    await connectDB();
    const form = await Form.findByPk(4);
    
    if (!form) {
      console.log("❌ Form 4 not found");
      process.exit(1);
    }
    
    console.log("✅ Form 4 Data:");
    console.log("   ID:", form.id);
    console.log("   Name:", form.name);
    console.log("   Type:", form.type);
    console.log("   Status:", form.status);
    
    console.log("\n📋 Fields:");
    console.log("   Raw Type:", typeof form.fields);
    console.log("   Raw Value:", form.fields);
    
    if (form.fields) {
      try {
        const fields = typeof form.fields === 'string' ? JSON.parse(form.fields) : form.fields;
        console.log("   Parsed Fields:", JSON.stringify(fields, null, 2));
        console.log("   Field Count:", Array.isArray(fields) ? fields.length : "Not an array");
      } catch (e) {
        console.log("   Parse Error:", e.message);
      }
    }
    
    console.log("\n🎨 Styling:");
    console.log("   Raw Type:", typeof form.styling);
    console.log("   Raw Value:", form.styling);
    
    console.log("\n💻 Custom Code:");
    console.log("   Raw Type:", typeof form.custom_code);
    console.log("   Has Custom Code:", !!form.custom_code);
    console.log("   Custom Code Length:", form.custom_code ? form.custom_code.length : 0);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

checkFormFields();
