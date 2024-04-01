const express = require("express");
const router = express.Router();

const { itemSubmit, getItemData } = require('../controllers/itemController');

router.post('/itemSubmit', itemSubmit);
router.get('/getItemData', getItemData);

module.exports = router;