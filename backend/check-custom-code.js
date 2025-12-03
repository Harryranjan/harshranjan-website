const { connectDB } = require("./config/database");
const Form = require("./models/Form");

async function checkCustomCode() {
  try {
    await connectDB();
    const form = await Form.findByPk(4);
    
    if (!form) {
      console.log("❌ Form 4 not found");
      process.exit(1);
    }
    
    console.log("✅ Form 4 Details:");
    console.log("   Type:", form.type);
    console.log("   Has custom_code:", !!form.custom_code);
    
    if (form.custom_code) {
      console.log("\n📝 Custom Code (first 500 chars):");
      console.log(form.custom_code.substring(0, 500));
      console.log("\n... (truncated)");
      
      // Check if it's already a full HTML document
      const isFullHTML = /^\s*<!DOCTYPE/i.test(form.custom_code);
      console.log("\n🔍 Analysis:");
      console.log("   Is full HTML document:", isFullHTML);
    } else {
      console.log("\n⚠️  No custom_code found");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkCustomCode();
