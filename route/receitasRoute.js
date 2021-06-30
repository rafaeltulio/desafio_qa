const express = require('express');
const router = express.router();

router.get('api/pessoas', async function (req, res) {
    res.json()
});

router.get('api/pessoas/:id', async function (req, res) {

});
router.post('api/pessoas', async function (req, res) {
    res.send('POST request to the homepage')
});
router.put('api/pessoas/:id', async function (req, res) {

})

// Esta faltando o Delet

module.exports = router;