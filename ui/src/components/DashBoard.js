import { useEffect, useState } from "react"
import Form from "./Form"
import { useDispatch, useSelector } from "react-redux"
import { startAddCategories, startGetCategory } from "../actions/category"
import { startGetExpense, startDeleteExpense } from "../actions/expenseAction"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
const DashBoard = (props) => {
    const [category, setCategory] = useState('')
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [edit, setEdit] = useState({})
    const [messageError, setMessageError] = useState({})
    const err = {}
    const dispacth = useDispatch()
   
    useEffect(() => {
        //Get Expense
        dispacth(startGetExpense())
        //Get Category
        dispacth(startGetCategory())
    }, [dispacth])
    const handleChange = (e) => {
        setCategory(e.target.value)
    }
    //expense
     const expense = useSelector((state) => {
        return state.expense.data
    })

    //Category Adding validation
    const validation = () => {
        if (category.length === 0) {
            err.category = 'Please Enter Category Name'
        }
    }
    //Add Category
    const handleClick = (e) => {
        setMessageError({})
        e.preventDefault()
        validation()
        const categoryData = {
            name: category
        }
        const reset = () => {
            setCategory('')
        }
        if (Object.keys(err).length===0) {
            
            dispacth(startAddCategories(categoryData, reset))
        }else{
            setMessageError(err)
        }
    }
    // Get All Category 
    const allCategory = useSelector((state) => {
        return state.category.data
    })
    const findCategoryOnId = (id) => {
        if (allCategory.length>0) {
            const res = allCategory.find(ele => { return ele._id === id }).name
            return res
        }
    }
    //expense delete    
    const handleDeleteExpense = (id) => {
        dispacth(startDeleteExpense(id))
    }
    const handleEdit = (ele) => {
        toggle()
        setEdit(ele)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleClick}>
                        <div className="form-group">
                            <label ><span style={{ color: "rgb(64, 65, 0)", font: 'bold' }}>A</span>dd Category</label>
                            <input type="text" className="form-control" value={category} placeholder="Enter Category Name" style={{ width: 200, borderColor: "black" }} onChange={handleChange}  />{messageError.category && <div><span style={{color:"red"}}>{messageError.category}</span><br/></div>} 
                            <input type="submit" className="btn btn-primary" value='Add' style={{ backgroundColor: "green" }} />
                        </div>
                    </form>
                    {expense.length !== 0 ? <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                expense.map((ele, i) => {
                                    return (
                                        <tr key={i}>
                                            <td >{i + 1}</td>
                                            <td >{ele.note}</td>
                                            <td >{expense && findCategoryOnId(ele.categoryId)}</td>
                                            <td >{ele.date.split('T')[0]}</td>
                                            <td >{ele.amount}</td>
                                            <td ><button class="btn btn-primary" onClick={() => { handleEdit(ele) }}>edit</button></td>
                                            <td ><button class="btn btn-danger" onClick={() => { handleDeleteExpense(ele._id) }}>*</button></td>

                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table> : <h2><span style={{ color: 'rgb(195, 65, 0)' }}>N</span>o Expense Found</h2>}
                </div>
                <div className="col-md-4" style={{}}>
                    <center>
                        <h2><span style={{ color: "blue" }}>A</span>dd <span style={{ color: "blue" }}>E</span>xpense</h2>
                    </center>
                    <Form />
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Expense</ModalHeader>
                <ModalBody >
                    <div className="col-md-12">
                        <Form data={edit} toggle={toggle} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default DashBoard