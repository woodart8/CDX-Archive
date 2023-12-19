const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "public");
const uuid4 = require('uuid4');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET','POST'],
    credentials : true,
}));

app.use(express.json());
app.use(express.static(publicPath));

const upload = multer({
    storage: multer.diskStorage({
      filename(req, file, done) {
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const filename = randomID + ext;
        done(null, filename);
      },
      destination(req, file, done) {
        done(null, "./public/image");
      },
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
});

app.get("/upload", (req,res) => {
    res.send("hello");
});

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req);
    res.send("uploaded");
 });

app.listen(process.env.PORT, () => {
    console.log(`server is on ${process.env.PORT}`);
});