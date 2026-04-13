import multer from "multer"
import path from "path"
import fs from "fs"

// create uploads folder if not exists
const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let folder = "uploads"

    // dynamic folder based on route
    if (req.baseUrl.includes("product")) folder = "uploads/products"
    else if (req.baseUrl.includes("category")) folder = "uploads/categories"
    else if (req.baseUrl.includes("user")) folder = "uploads/users"

    createFolder(folder)

    cb(null, folder)
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9)

    const ext = path.extname(file.originalname)

    cb(null, uniqueName + ext)
  }
})

d
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )

  const mime = allowedTypes.test(file.mimetype)

  if (ext && mime) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed"))
  }
}


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
})

export default upload