export const validateUpload = (req, res, next) => {
  const { name, message } = req.body;

  const errors = [];

  if (!name?.trim()) {
    errors.push('Name is required');
  }

  if (!message?.trim()) {
    errors.push('Message is required');
  }

  if (!req.file) {
    errors.push('File is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};