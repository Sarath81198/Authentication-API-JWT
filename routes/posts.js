const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        title: 'First post',
        description:'Not acccessible without login'
    })
})


module.exports = router;