var express = require('express')
var router = express.Router()

router.get('/:user', function(req, res) {
	res.set('Content-Type', 'application/json;charset=utf-8');
    res.end('用户' + req.params.user)
})

module.exports = router