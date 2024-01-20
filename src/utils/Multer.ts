import multer from 'multer';

export const fileUploadOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (_req: any, _file: any, cb: any) => {
    cb(null, true);
  },
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 2,
  },
};
