import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import cors from "cors";
import { validateUpload } from './validation.js';


config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });
const { BACKEND_PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

// add new code
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueName = file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.post('/api/submit', 
  upload.single("file"), 
  validateUpload,
  (req, res) => {
      res.json(
        {
        body: req.body,
        }
      );
});

// eslint-disable-next-line no-console
app.listen(BACKEND_PORT, () => console.log(`Server running on port ${BACKEND_PORT}`));
