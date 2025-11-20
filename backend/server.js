const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { connectDB } = require("./config/database");
const { schedulePostPublisher } = require("./services/scheduler");
const emailService = require("./services/emailService");

// Import models to ensure they're registered
const User = require("./models/User");
const BlogPost = require("./models/BlogPost");
const Page = require("./models/Page");
const Form = require("./models/Form");
const FormSubmission = require("./models/FormSubmission");
const Modal = require("./models/Modal");
const Popup = require("./models/Popup");
const Setting = require("./models/Setting");
const Download = require("./models/Download");
const DownloadLead = require("./models/DownloadLead");

const app = express();

// Connect to database (non-blocking)
connectDB()
  .then(async () => {
    // Start the post scheduler after database connection
    schedulePostPublisher();

    // Load email settings from database and initialize
    try {
      const Setting = require("./models/Setting");
      const emailSettings = await Setting.getByCategory("email");

      // Update process.env with database settings if they exist
      if (emailSettings.email_host)
        process.env.EMAIL_HOST = emailSettings.email_host;
      if (emailSettings.email_port)
        process.env.EMAIL_PORT = String(emailSettings.email_port);
      if (emailSettings.email_user)
        process.env.EMAIL_USER = emailSettings.email_user;
      if (emailSettings.email_password)
        process.env.EMAIL_PASSWORD = emailSettings.email_password;
      if (emailSettings.email_from)
        process.env.EMAIL_FROM = emailSettings.email_from;
      if (emailSettings.email_provider)
        process.env.EMAIL_PROVIDER = emailSettings.email_provider;
      if (emailSettings.admin_email)
        process.env.ADMIN_EMAIL = emailSettings.admin_email;
      if (emailSettings.email_secure !== undefined)
        process.env.EMAIL_SECURE = String(emailSettings.email_secure);

      // Initialize email service
      await emailService.initialize();
    } catch (err) {
      console.log(
        "⚠️  Email service initialization skipped. Configure settings to enable emails."
      );
    }
  })
  .catch((err) => {
    console.log("⚠️  Database connection failed. Server will run without DB.");
    console.log(
      "💡 Please configure MySQL and update .env file to enable database features."
    );
  });

// Security middleware - Configure helmet to allow images
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Disable CSP for now to allow images
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use("/uploads", express.static("uploads"));

// Logging middleware
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Higher limit for development
});
app.use("/api/", limiter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Serve static files (uploads)
app.use("/uploads", express.static("uploads"));

// API routes (will be added)
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/blog", require("./routes/blog.routes"));
app.use("/api/pages", require("./routes/page.routes"));
app.use("/api/testimonials", require("./routes/testimonial.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/forms", require("./routes/form.routes"));
app.use("/api/modals", require("./routes/modal.routes"));
app.use("/api/popups", require("./routes/popup.routes"));
app.use("/api/embed", require("./routes/embed.routes"));
app.use("/api/email", require("./routes/email.routes"));
app.use("/api/settings", require("./routes/settings.routes"));
app.use("/api/downloads", require("./routes/download.routes"));
app.use("/api/download-leads", require("./routes/downloadLead.routes"));
app.use("/api/menus", require("./routes/menu.routes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Server is ready to accept connections`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Keep process alive
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Heartbeat to show server is alive
setInterval(() => {
  console.log(`[${new Date().toISOString()}] Server is running...`);
}, 30000);

module.exports = app;
