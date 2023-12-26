const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { mongoDB } = require('./db');
const { upload, deletePhoto } = require('./controllers/s3Controller');
const Photo = require('./models/photoModel');
const ObjectId = require('mongodb').ObjectId;

mongoDB();
dotenv.config();

app.use(cors());

app.use(express.json());

app.get("/gallery", async(req, res) => {
    try{
        let pageSize = req.query.pageSize;
        let pageNo = req.query.pageNo;

        if(pageSize == undefined || typeof pageSize == "undefined" || pageSize == null){
            pageSize = 16;
        } else {
            pageSize = parseInt(pageSize);
        }
        if(pageNo == undefined || typeof pageNo == "undefined" || pageNo == null){
            pageNo = 1;
        } else {
            pageNo = parseInt(pageNo);
        }

        const total = await Photo.countDocuments();
        const list = await Photo.find()
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize);
        return res.status(200).send({total, list})
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