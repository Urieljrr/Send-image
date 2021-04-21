const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))

const app = express();

app.use(cors());

app.get('/' , (req, resp ) => {
     resp.json({
         ok:true,
         msg:'Good!!!'
     });
})
app.use('/api/cross-send', require('./routes/cross.route'));

app.listen(5000,() => {
    console.log("EXCELLENT, SERVER RUNNING!!!!! FOR PORT 5000 😜 ")
})