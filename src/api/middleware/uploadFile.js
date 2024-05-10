const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, path.join(__dirname, '..', 'storages')); 
    },
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, 
    limits: { fileSize: 10000000000 }, 
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|svg|pdf|gif/; 
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Invalid file type"));
    }
});

module.exports = upload;
