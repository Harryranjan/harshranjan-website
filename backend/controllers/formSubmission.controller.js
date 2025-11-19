const FormSubmission = require("../models/FormSubmission");
const Form = require("../models/Form");
const { Op } = require("sequelize");
const emailService = require("../services/emailService");

// Get all submissions for a form
exports.getSubmissionsByFormId = async (req, res) => {
  try {
    const { formId } = req.params;
    const {
      status,
      search,
      page = 1,
      limit = 20,
      startDate,
      endDate,
    } = req.query;
    const offset = (page - 1) * limit;

    const where = { form_id: formId };
    if (status) where.status = status;

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) where.created_at[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await FormSubmission.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });

    res.json({
      submissions: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch submissions", error: error.message });
  }
};

// Get single submission
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await FormSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Mark as read if it was new
    if (submission.status === "new") {
      await submission.update({ status: "read" });
    }

    res.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch submission", error: error.message });
  }
};

// Submit form (public endpoint)
exports.submitForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const formData = req.body;

    // Get form to validate
    const form = await Form.findByPk(formId);
    if (!form || form.status !== "active") {
      return res.status(404).json({ message: "Form not found or inactive" });
    }

    // Create submission
    const submission = await FormSubmission.create({
      form_id: formId,
      data: formData,
      user_agent: req.headers["user-agent"],
      ip_address: req.ip,
      referrer: req.headers.referer || req.headers.referrer,
      status: "new",
    });

    // Update form submission count and last submission date
    await form.update({
      submission_count: form.submission_count + 1,
      last_submission_at: new Date(),
    });

    // Send email notifications (async, don't wait)
    const emailPromises = [];

    // 1. Send admin notification if enabled
    if (form.settings?.notifications?.admin) {
      emailPromises.push(
        emailService
          .sendFormSubmissionNotification({
            formName: form.name,
            formId: form.id,
            submissionData: formData,
            submissionId: submission.id,
          })
          .catch((err) => console.error("Admin email error:", err))
      );
    }

    // 2. Send user confirmation if enabled and email field exists
    if (form.settings?.notifications?.user) {
      const emailField = form.fields.find(
        (f) =>
          f.type === "email" ||
          f.name?.toLowerCase().includes("email") ||
          f.id?.toLowerCase().includes("email")
      );

      if (emailField && formData.data?.[emailField.id]) {
        const userEmail = formData.data[emailField.id];
        const nameField = form.fields.find(
          (f) =>
            f.name?.toLowerCase().includes("name") ||
            f.id?.toLowerCase().includes("name")
        );
        const userName = nameField ? formData.data[nameField.id] : null;

        emailPromises.push(
          emailService
            .sendFormConfirmation({
              formName: form.name,
              userEmail: userEmail,
              userName: userName,
              customMessage:
                form.settings?.notifications?.userMessage ||
                form.success_message,
            })
            .catch((err) => console.error("User email error:", err))
        );
      }
    }

    // Send all emails (don't wait for completion)
    if (emailPromises.length > 0) {
      Promise.all(emailPromises).catch((err) =>
        console.error("Email notification error:", err)
      );
    }

    res.status(201).json({
      message: form.success_message,
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res
      .status(500)
      .json({ message: "Failed to submit form", error: error.message });
  }
};

// Update submission status
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const submission = await FormSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    await submission.update({ status, notes });
    res.json(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    res
      .status(500)
      .json({ message: "Failed to update submission", error: error.message });
  }
};

// Delete submission
exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await FormSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    await submission.destroy();
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res
      .status(500)
      .json({ message: "Failed to delete submission", error: error.message });
  }
};

// Bulk update submissions
exports.bulkUpdateSubmissions = async (req, res) => {
  try {
    const { ids, status } = req.body;

    await FormSubmission.update(
      { status },
      { where: { id: { [Op.in]: ids } } }
    );

    res.json({ message: "Submissions updated successfully" });
  } catch (error) {
    console.error("Error bulk updating submissions:", error);
    res
      .status(500)
      .json({ message: "Failed to update submissions", error: error.message });
  }
};

// Export submissions as CSV
exports.exportSubmissions = async (req, res) => {
  try {
    const { formId } = req.params;
    const { startDate, endDate, status } = req.query;

    const where = { form_id: formId };
    if (status) where.status = status;
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) where.created_at[Op.lte] = new Date(endDate);
    }

    const submissions = await FormSubmission.findAll({ where });

    // Convert to CSV format
    const form = await Form.findByPk(formId);
    const fields = form.fields.map((f) => f.name);

    let csv =
      ["Date", "Status", ...fields, "IP Address", "User Agent"].join(",") +
      "\n";

    submissions.forEach((sub) => {
      const row = [
        new Date(sub.created_at).toISOString(),
        sub.status,
        ...fields.map((field) => {
          const value = sub.data[field] || "";
          return `"${String(value).replace(/"/g, '""')}"`;
        }),
        sub.ip_address || "",
        `"${(sub.user_agent || "").replace(/"/g, '""')}"`,
      ];
      csv += row.join(",") + "\n";
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="form-${formId}-submissions-${Date.now()}.csv"`
    );
    res.send(csv);
  } catch (error) {
    console.error("Error exporting submissions:", error);
    res
      .status(500)
      .json({ message: "Failed to export submissions", error: error.message });
  }
};
