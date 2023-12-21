const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { mongoDB } = require('./db');
const { upload, deletePhoto } = require('./controllers/s3Controller');
const Photo = require('./models/photoModel');
const ObjectId = require('mongodb').ObjectId;

mongoDB();
dotenv.config();

app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET','POST','DELETE'],
    credentials : true,
}));

app.use(express.json());

app.get("/gallery", async(req, res) => {
    try{
        const list = await Photo.find({});
        return res.status(200).send({list})
    } catch(err){
        return res.status(500).send({ err : err.message });
    }
})

app.post("/upload", upload.single('file'), async(req, res) => {
    try{
        const photo = new Photo({
            photoUrl : req.file.location,
        });
        await photo.save();
        return res.status(200).send("Upload Success");
    } catch(err){
        return res.status(500).send({ err : err.message });
    }
});

app.delete('/delete/:id', async(req, res) => {
    const id = new ObjectId(req.params.id);
    const photo = await Photo.findById(id);
    const url = photo.photoUrl.split('/');
    const keyName = url[url.length - 1];
    try{
        Photo.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success : false,
                    message : "Photo not found with id " + req.params.id
                });
            }
        }).then(() => {
            deletePhoto(keyName, (err, data) => {
                if(err) {
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    });
                }
                res.status(200).send("Delete Success")
            })
        })
    } catch(err){
        return res.status(500).send({ err : err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`server is on ${process.env.PORT}`);
});