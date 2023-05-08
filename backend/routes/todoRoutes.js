const express = require('express');
const { createList, getList, deleteList, updateTask, getListPending, getListCompleted, deleteAll } = require('../controllers/todoContreoller');

const router = express.Router()

router.post('/' , createList)
router.get('/', getList)
router.delete('/:id', deleteList)
router.patch('/:id', updateTask)
router.get('/pending', getListPending)
router.get('/complete', getListCompleted)
router.delete('/all',deleteAll)

module.exports = router