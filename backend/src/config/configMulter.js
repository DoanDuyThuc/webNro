const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu trữ trực tiếp trên hệ thống file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = upload = multer({ storage: storage });