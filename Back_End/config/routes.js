
const express = require('express')
const router = express.Router()
const userController = require('../app/controller/userCtrl')
const categoryController = require('../app/controller/categoryCtrl')
const authenticateUser = require('../middleware/authenticateUser')
const expenseController = require('../app/controller/expenseCtrl')

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/info', authenticateUser, userController.show)
router.put('/user/budget', authenticateUser, userController.budget)
//DELETE USER ACCOUNT
router.post('/user/account', authenticateUser, userController.deleteAccount)


//category api
router.get('/user/categorgies', authenticateUser, categoryController.list)
router.post('/user/category', authenticateUser, categoryController.create)
router.get('/user/category/:id', authenticateUser, categoryController.show)
router.put('/user/category/:id', authenticateUser, categoryController.update)
router.delete('/user/category/:id', authenticateUser, categoryController.destroy)

//expense api
router.get('/user/expense', authenticateUser, expenseController.list)
router.post('/user/expense', authenticateUser, expenseController.create)
router.get('/user/expense/show', authenticateUser, expenseController.show)
router.put('/user/expense/:id', authenticateUser, expenseController.update)
router.delete('/user/expense/:id', authenticateUser, expenseController.destroy)
router.delete('/user/expenses/softdelete/:id', authenticateUser, expenseController.softDelet)
//get all isDeleted=true 
router.get('/user/expense/isDeleted', authenticateUser, expenseController.isDeleted)
//Undo Expense
router.put('/user/expenses/undo/:id', authenticateUser, expenseController.undoDelete)
//DELETE ALL {ISDELETED:TRUE}
router.delete('/user/expenses/deleteAll', authenticateUser, expenseController.deleteAllExpense)


// category deleted then delete all  expenses releaded category
router.delete('/user/expenses/deletemany/:id', authenticateUser, categoryController.deleteMany)



module.exports = router