// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {index, search, admin}= require('../controllers/mainController');

router.get('/', index); 
router.get('/search', search);
router.get('/admin', admin);  

module.exports = router;
