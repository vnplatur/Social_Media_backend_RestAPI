// 1. Import multer.
import multer from "multer";

// 2. Configure storage with filename and location.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
  },
});


export const upload = multer({
  storage: storage,
});

// import multer from 'multer';
// import fs from 'fs';

// // Helper to create folder if it doesn't exist
// const createFolder = (folderPath) => {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }
// };

// // Configure storage with dynamic folder paths
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let folder;

//     // Determine the folder based on a request field or file type
//     switch (req.body.uploadType) {
//       case 'profileImage':
//         folder = './uploads/user-profiles/';
//         break;
//       case 'jobApplication':
//         folder = './uploads/job-applications/';
//         break;
//       case 'productImage':
//         folder = './uploads/product-images/';
//         break;
//       default:
//         folder = './uploads/others/';
//         break;
//     }

//     // Ensure the folder exists
//     createFolder(folder);

//     cb(null, folder);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = new Date().toISOString().replace(/:/g, "_") + '-' + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });

// // Export the configured multer instance
// export const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     // Validate file types (example: only allow images and PDFs)
//     if (
//       file.mimetype.startsWith('image/')
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'), false);
//     }
//   },
// });
