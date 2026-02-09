const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage - images folder is at project root (start-2026/images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // From backend/controllers/ go up 2 levels to project root, then into images
        const dir = path.join(__dirname, '../../images');
        
        // Create images folder if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp and random ID
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const name = file.originalname
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 30);
        
        cb(null, `${name}-${uniqueSuffix}${extension}`);
    }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
    
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'), false);
    }
};

// Multer upload configuration
// Make max upload size configurable via env (bytes). Default to 25MB.
const MAX_UPLOAD_SIZE = process.env.MAX_UPLOAD_SIZE ? parseInt(process.env.MAX_UPLOAD_SIZE, 10) : 25 * 1024 * 1024;

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: MAX_UPLOAD_SIZE },
});

// Upload handler controller
const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                error: 'No file uploaded' 
            });
        }

        // Build full URL so frontend can preview directly (e.g. http://localhost:5000/images/abc.jpg)
        const imageUrlPath = `/images/${req.file.filename}`;
        const fullUrl = `${req.protocol}://${req.get('host')}${imageUrlPath}`;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: fullUrl,
            path: imageUrlPath,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Error uploading image',
            message: error.message
        });
    }
};

module.exports = {
    upload,
    uploadImage
};
