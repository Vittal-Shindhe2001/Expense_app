const mongoose=require('mongoose')


const config=()=>{
mongoose.connect('mongodb://localhost:27017/Expenseeve_database')
.then((result) => {
    console.log('Database connected successfuly');

}).catch((err) => {
    console.log(err);
});
}
module.exports=config