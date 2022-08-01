"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBook);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.deleteById);

module.exports = router;
