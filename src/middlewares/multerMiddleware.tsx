import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { CustomError_Class } from './jwtMiddleware';

const uploadDirectory = 'uploads/';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, uploadDirectory);
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req: Request, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('허용되지 않는 파일 형식입니다');
      if (error instanceof CustomError_Class) {
        error.code = 'INCORRECT_FILETYPE';
        return cb(error, false);
      }
    } else {
      cb(null, true);
    }
  },
});

export default upload;
