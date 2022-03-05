import express from 'express';
import models from './models/index.js';
import mongoose from 'mongoose';

const PORT = 3001;
const app = express();

app.use(express.json());

const log = (msg) => console.log(msg);

const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};

const connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if(err){
            console.error(err);
        }
        else log("database connection established");
    })
}

connectWithDb();

app.get('/', (req, res) => {
    // const params = JSON.stringify(req.query.id );
    // res.send("hello viewers " + params);
    res.send("hello viewers " + req.query.id);    
});

app.post('/', (req, res) => {
    const body = req.body;

    const user = new models.User({
        username: body.username,
        createdAt: new Date()
    })
    
    user.save().then((savedUser) => {
        res.status(201).send('User saved. Id: ' + savedUser._id);
    }).catch((err) => {
      //  console.log(error);
        res.status(500).send(err);
    })
    // console.log(`hello viewers i am post`+ body);
    // res.send('hello viewers this is post : ' + body.username);
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);

});

log(models);