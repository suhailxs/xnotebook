const express = require('express');
const router = express.Router();


router.get('/',(req ,res)=>{
    obj = {
        name : "this",
        number : 345
    }
    res.json(obj);
});


module.exports = router;