const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();
// allows sending json objects
app.use(express.json());
// use dotnev files
dotenv.config();
// fixes mongoose error
mongoose.set('strictQuery', false)



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to MongoDB.'))
  .catch((err) => console.log('error: ', err))


app.get('/api', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

// auth route
app.use('/api/auth', authRoute);

app.listen(3000, () => {
    console.log(`listening on port 3000...`)
})