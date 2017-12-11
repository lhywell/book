var express = require('express')
var router = express.Router()

router.get('/:productId', function(req, res) {
    res.end('用户' + req.params.productId)
})

module.exports = router