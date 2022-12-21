const express = require('express');
const router = express.Router();

// C -> Create
router.post('/', (req, res) => {

});
// R -> Read
router.get('/', (req, res) => {

});
// U -> Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    console.log("[+] ID: ", id);
});
// D -> Delete
router.delete('/', (req, res) => {

});

module.exports = router