const { connectDB } = require("./config/database");
const Form = require("./models/Form");

async function checkForm4() {
  try {
    await connectDB();
    const form = await Form.findByPk(4);

    if (!form) {
      console.log("❌ Form 4 not found");
      process.exit(1);
    }

    console.log("✅ Form 4 found:");
    console.log("   ID:", form.id);
    console.log("   Name:", form.name);
    console.log("   Type:", form.type);
    console.log("   Status:", form.status);
    console.log("   Submit Text:", form.submit_button_text);
    console.log("   Success Message:", form.success_message);
    console.log("   Error Message:", form.error_message);
    console.log(
      "   Fields Count:",
      form.fields
        ? typeof form.fields === "string"
          ? JSON.parse(form.fields).length
          : form.fields.length
        : 0
    );

    console.log("\n🔗 Embed URL:");
    console.log("   http://localhost:5000/api/embed/forms/4/html");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkForm4();
