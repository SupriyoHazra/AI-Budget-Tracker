/**
 * Request Validation Helpers
 */
function validateRequiredFields(fields) {
  return (req, res, next) => {
    const missing = [];
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }

    next();
  };
}

function validatePositiveNumber(field) {
  return (req, res, next) => {
    const val = Number(req.body[field]);
    if (isNaN(val) || val <= 0) {
      return res.status(400).json({
        success: false,
        message: `Field '${field}' must be a positive number greater than 0`,
      });
    }
    next();
  };
}

module.exports = {
  validateRequiredFields,
  validatePositiveNumber,
};
