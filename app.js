const express = require('express')


const app = express();



app.use('/api/cross-send', require('./routes/cross.route'));

app.listen(5000,() => {
    console.log("EXCELLENT, SERVER RUNNING!!!!! FOR PORT 5000 😜 ")
})