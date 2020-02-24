const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index success');
});

router.get('/test', (req, res) => {
    res.send('test2');
})

module.exports = router;