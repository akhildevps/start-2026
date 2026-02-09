const express = require('express');
const { upload, uploadImage } = require('../controllers/uploadController');

const router = express.Router();

// POST /api/upload - Upload single image
router.post('/', upload.single('image'), uploadImage);

// Error handling for multer
router.use((error, req, res, next) => {
    if (error instanceof Error) {
        return res.status(400).json({
            success: false,
            error: error.message || 'File upload failed'
        });
    }
    next(error);
});

module.exports = router;
