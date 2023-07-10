const mongoose = require('mongoose')


const Schema = mongoose.Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        required:true
    },
    note: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
       
        
    }
})

const Category=mongoose.model('Category',CategorySchema)

module.exports=Category