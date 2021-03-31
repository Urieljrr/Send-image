const express = require('express')
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())

app.use(require('./routes/cross-fod.route'));

app.listen(5000,() => {
    console.log("GREATE RUN SERVER!!!!!")
})