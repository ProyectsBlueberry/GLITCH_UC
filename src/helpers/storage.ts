import fs from 'fs';
import multer, { Multer } from 'multer';
import path from 'path';
import { Request } from 'express';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const destinationPath = path.join(__dirname, '../../public/storage');

// Asegúrate de que el directorio de destino exista
const createDestinationDir = () => {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
};

export const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: (error: Error | null, destination: string) => void) => {
    createDestinationDir();
    cb(null, destinationPath);
  },
  filename: (req: Request, file: File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload: Multer = multer({
  storage: storage, // Proporciona la configuración de almacenamiento aquí
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB límite de tamaño del archivo
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime', 'application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF images, MP4, MOV videos, and PDF files are allowed.'));
    }
  },
});

export { upload };
