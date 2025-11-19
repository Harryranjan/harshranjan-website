const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller");
const formSubmissionController = require("../controllers/formSubmission.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Form routes (protected)
router.get("/", authMiddleware, formController.getAllForms);
router.get("/stats", authMiddleware, formController.getFormStats);

// Submission-specific routes (must come before /:id to avoid conflicts)
router.post(
  "/submissions/bulk-update",
  authMiddleware,
  formSubmissionController.bulkUpdateSubmissions
);
router.get(
  "/submissions/:id",
  authMiddleware,
  formSubmissionController.getSubmissionById
);
router.put(
  "/submissions/:id",
  authMiddleware,
  formSubmissionController.updateSubmissionStatus
);
router.delete(
  "/submissions/:id",
  authMiddleware,
  formSubmissionController.deleteSubmission
);

// Form CRUD routes
router.get("/:id", authMiddleware, formController.getFormById);
router.post("/", authMiddleware, formController.createForm);
router.put("/:id", authMiddleware, formController.updateForm);
router.delete("/:id", authMiddleware, formController.deleteForm);
router.post("/:id/duplicate", authMiddleware, formController.duplicateForm);

// Form submission routes
router.post("/:formId/submit", formSubmissionController.submitForm); // Public endpoint
router.get(
  "/:formId/submissions",
  authMiddleware,
  formSubmissionController.getSubmissionsByFormId
);
router.get(
  "/:formId/submissions/export",
  authMiddleware,
  formSubmissionController.exportSubmissions
);

module.exports = router;
