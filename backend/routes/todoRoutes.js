const express = require('express');
const { createList, getList, deleteList, updateTask } = require('../controllers/todoContreoller');

const router = express.Router()

router.post('/' , createList)
router.get('/', getList)
router.delete('/:id', deleteList)
router.patch('/:id', updateTask)

module.exports = router