const Category = require('../models/category_Model')
const Expense = require('../models/expensive_Model')
const categoryController = {}

categoryController.list = (req, res) => {
    Category.find({userId:req.user.id})
        .then((category) => {
            res.json(category)
            
        }).catch((err) => {
            res.json(err)
        });
}

categoryController.create = (req, res) => {
    const { body } = req
    body.userId = req.user.id
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            res.json(err)
        });
}

categoryController.show = (req, res) => {
    const { id } = req.params
    Category.findById(id)
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            res.json(err)
        });
}

categoryController.update = (req, res) => {
    const { id } = req.params
    const { body } = req
    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            res.json(err)
        });
}

categoryController.destroy = (req, res) => {
    const { id } = req.params
    Category.findByIdAndDelete(id)
        .then((category) => {
            res.json(category)
        }).catch((err) => {
            res.json(err)
        });
}

categoryController.deleteMany = async (req, res) => {
    try {
        const { id } = req.params
        const category = Category.findByIdAndDelete(id)
        const expense = Expense.deleteMany({ categoryId: id })
        const promise = await Promise.all([category, expense])
        if (promise) {
            res.json(promise[0])
        }else{
            res.json({})
        }
    }
    catch (error) {
        res.json(error)
    }
}
module.exports = categoryController