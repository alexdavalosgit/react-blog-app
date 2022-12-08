const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const blogPostRoute = require('./routes/blogposts');
const categoryRoute = require('./routes/categories');

const app = express();
app.use(express.json());
dotenv.config();
// Fix mongoose error
mongoose.set('strictQuery', false)

// Connect DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to MongoDB.'))
  .catch((err) => console.log('error: ', err))

// Handle image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

// Handle image upload
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded.");
})


app.get('/api', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

// auth route
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/blogposts', blogPostRoute);
app.use('/api/categories', categoryRoute);

app.listen(3000, () => {
    console.log(`listening on port 3000...`)
})