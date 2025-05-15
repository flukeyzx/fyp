import multer from "multer";

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }

    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    const allowedMimeType = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeType.includes(file.mimetype)) {
      return cb(
        new Error("Only PNG, JPEG, and WebP images are allowed."),
        false
      );
    }

    return cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const multerErrorHandler = (err, _, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }

  next();
};
