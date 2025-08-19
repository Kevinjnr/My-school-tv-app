import multer from "multer";
import path from "node:path";
const __dirname = path.resolve();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export default multer({ storage: fileStorageEngine });
