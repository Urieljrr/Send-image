const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')



const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors());



app.get('/' , (req, resp ) => {
     resp.sendFile(__dirname + '/index.html')
})
app.use('/api/cross-send', require('./routes/cross.route'));

app.listen(5000,() => {
    console.log("EXCELLENT, SERVER RUNNING!!!!! FOR PORT 5000 😜 ")
})