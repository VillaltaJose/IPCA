const { Router } = require('express');
const router = Router();

module.exports = router;

router.get('/users', (req, res) => {
	res.send("Users");
});