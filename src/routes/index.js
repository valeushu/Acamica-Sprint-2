const { Router } = require('express');
const router = Router();

router.get('/test', (req , res) =>{
    const data = {
        "name": "Valeria",
        "website": "GoU.com"
    };
    res.json(data);
})

module.exports = router;