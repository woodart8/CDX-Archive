const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const { mongoDB } = require('./db');
const { upload, deletePhoto } = require('./controllers/s3Controller');
const Photo = require('./models/photoModel');
const ObjectId = require('mongodb').ObjectId;
let isDisableKeepAlive = false;

mongoDB();
dotenv.config();

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
    if(isDisableKeepAlive) {
        res.set('Connection', 'close');
    }
    next();
})

app.get("/gallery", async(req, res) => {
    try{
        let pageSize = req.query.pageSize;
        let pageNo = req.query.pageNo;
        let isDesc = JSON.parse(req.query.isDesc);
        let list;
        let edge;
        let isEnd = false;

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

        if(isDesc === true) {
            list = await Photo.find().sort({"_id":-1})
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize);
            edge = await Photo.find().limit(1);
            if(list[list.length - 1].photoUrl === edge[0].photoUrl) isEnd = true;
        } else {
            list = await Photo.find()
                .skip(pageSize * (pageNo - 1))
                .limit(pageSize);
            edge = await Photo.find().sort({"_id":-1}).limit(1);
            if(list[list.length - 1].photoUrl === edge[0].photoUrl) isEnd = true;
        }
        return res.status(200).send({total, list, isEnd});
    } catch(err){
        return res.status(500).send({ err : err.message });
    }
})

app.post("/upload", upload.array('images'), async(req, res) => {
    try{
        let photo;
        req.files.forEach((element) => {
            photo = new Photo({
                photoUrl : element.location,
            })
            photo.save();
        })
        return res.status(200).send("Upload Success");
    } catch(err){
        return res.status(500).send({ err : err.message });
    }
});

app.delete('/delete/:id', async(req, res) => {
    const id = new ObjectId(req.params.id);
    const photo = await Photo.findById(id);
    const url = photo.photoUrl.split('/');
    const keyName = decodeURI(url[url.length - 1]);
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
    process.send('ready');
    console.log(`server is on ${process.env.PORT}`);
});

process.on('SIGINT', function() {
    isDisableKeepAlive = true;
    app.close(function () {
        console.log('server closed');
        process.exit(0);
    })
})