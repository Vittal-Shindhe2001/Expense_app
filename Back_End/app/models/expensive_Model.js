
const mongoose=require('mongoose')

const Schema=mongoose.Schema
const expensiveSchema=new Schema({
    amount:{
        type:Number,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    note:{
        type:String
    },
    date:{
        type:String,
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Expense=mongoose.model('Expense',expensiveSchema)

module.exports=Expense