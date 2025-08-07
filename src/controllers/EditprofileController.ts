import { AppDataSource } from '../dbconfig/dbconfig';
import { StudentSignup } from '../Entities/StudentSignup.entity';
import { createResponse } from '../Helpers/createResponse';
import { uploadFileHelper } from '../Helpers/UploadFilehelper';
import path from 'path';
import fs from 'fs';

const studentRepo = AppDataSource.getRepository(StudentSignup);

const EditProfileController = async (req: any, res: any) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json(createResponse(res, 400, 'All fields are required', [], false, true));
    }

    const student = await studentRepo.findOne({ where: { email } });
    if (!student) {
      return res.status(404).json(createResponse(res, 404, 'Student not found', [], false, true));
    }

    if (req.files?.photo) {
      const photo: any = req.files.photo;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(photo.mimetype)) {
        return res.status(400).json(createResponse(res, 400, 'Only JPG, JPEG, PNG formats are allowed', [], false, true));
      }

      const uploadPath = path.join(__dirname, '../profilepics/');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const uploadedPhotoName = await uploadFileHelper(photo, uploadPath, res);
      student.profile = uploadedPhotoName;
    }

    student.name = name;
    student.mobile = phone;

    await studentRepo.save(student);

    return res.status(200).json(createResponse(res, 200, 'Profile updated successfully', student, true, false));
  } catch (err) {
    console.error('Edit Profile Error:', err);
    return res.status(500).json(createResponse(res, 500, 'Something went wrong', [], false, true));
  }
};

export default EditProfileController;
