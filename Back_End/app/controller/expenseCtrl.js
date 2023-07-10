const Expense = require('../models/expensive_Model')

const expenseController = {}

expenseController.list = (req, res) => {
    Expense.find()
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        });
}

expenseController.create = (req, res) => {
    const { body } = req
    // const {id}=req.query 
    // body.categoryId=id
    body.userId = req.user.id
    const expense = new Expense(body)
    expense.save()
        .then((exp) => {
            res.json(exp)
        }).catch((err) => {
            res.json(err)
        });
}
expenseController.show = (req, res) => {
    Expense.find({ userId: req.user.id, isDeleted: false })
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        });
}
expenseController.update = (req, res) => {
    const { id } = req.params
    const { body } = req
    Expense.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        });
}
expenseController.destroy = (req, res) => {
    const { id } = req.params
    Expense.findByIdAndDelete(id)
        .then((expense) => {
            res.json(expense)
        }).catch((err) => {
            res.json(err)
        });
}

expenseController.softDelet = (req, res) => {
    const { id } = req.params
    Expense.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true, runValidators: true })
        .then((expense) => {
            if (expense) {
                res.json(expense)
            } else {
                res.json({})
            }
        }).catch((err) => {
            res.json(err)
        });
}

//Get all isDeleted=ture that user
expenseController.isDeleted = async (req, res) => {
    try {

        const result = await Expense.find({ userId: req.user.id, isDeleted: true })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

//Undo Expense
expenseController.undoDelete = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Expense.findOneAndUpdate({ _id: id }, { $set: { isDeleted: false } }, { new: true, runValidators: true })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

//DELETE ALL EXPENSE  ON{ISDELETED:TRUE}
expenseController.deleteAllExpense = async (req, res) => {
    try {
        const result = await Expense.deleteMany({ isDeleted: true }, { userId: req.user.id })
        if (result) {
            res.json(result)
        }

    } catch (error) {
        res.json(error)
    }
}

module.exports = expenseController