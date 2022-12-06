const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const port = 3000;

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(console.log('Connected to MongoDB.'))
  .catch((err) => console.log('error: ', err))


app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})