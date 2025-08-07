import path from 'path';

export const uploadFileHelper = (file: any, uploadPath: string, res: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filename = Date.now() + '-' + file.name;
    const fullPath = path.join(uploadPath, filename);

    file.mv(fullPath, (err: any) => {
      if (err) {
        console.error('Upload failed:', err);
        reject(err);
      } else {
        resolve(filename);
      }
    });
  });
};
