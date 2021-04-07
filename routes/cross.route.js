const { Router } = require('express');
const { sendData } = require("../controller/cross.controller");
const router = Router();

router.post('/', sendData);


module.exports = router;