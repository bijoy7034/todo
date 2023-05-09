const express = require('express');
const { createList, getList, deleteList, updateTask, getListPending, getListCompleted, deleteAll } = require('../controllers/todoContreoller');

const router = express.Router()
//Different routes the functions are imported from contollers/todoControllers
//Route for Add task
router.post('/' , createList)

//Route for getting all task
router.get('/', getList)

//Route for deleting a specific task 
router.delete('/:id', deleteList)

//Route for update
router.patch('/:id', updateTask)

//Route for filters
router.get('/pending', getListPending)
router.get('/complete', getListCompleted)

//Route for delete all
router.delete('/all',deleteAll)

module.exports = router