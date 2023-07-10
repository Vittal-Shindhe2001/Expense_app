import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { startAddBudget } from "../actions/user_Action";
import { startGetCategory, startDeleteCategory } from "../actions/category";
import { startGetisDeleted, startGetExpense, startDeleteExpense, startUndoexpense, startDeleteAllExpense } from "../actions/expenseAction";
import Swal from "sweetalert2";
export default function Setting(props) {
    const [amount, setAmount] = useState('')
    const [messageError, setMessageError] = useState({})
    const err = {}
    
    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(startGetCategory())
        //It's for get all isDeletedd:true expenses
        dispacth(startGetisDeleted())
        dispacth(startDeleteExpense())

    }, [dispacth])
    //all catergory
    const allCategory = useSelector(state => {
        return state.category.data
    }
    )
    //find Category name on id
    const findCategoryOnId = (id) => {
        if (allCategory.length > 0) {
            const res = allCategory.find(ele => {
                return ele._id === id
            })
            return res.name
        }

    }
    const expense = useSelector(state => {
        return state.expense.data
    })

    const handleDelteCategory = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispacth(startDeleteCategory(id))
                dispacth(startGetExpense())
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                )
            }
        })


    }

    //Undo Expense
    const handleUndo = (id) => {
        dispacth(startUndoexpense(id))
    }
    //DELETE ALL EXPENSE ON ONE CLICK
    const handleDeleteAllExpense = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispacth(startDeleteAllExpense())
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                )
            }
        })

    }

    const handleChange = (e) => {
        setAmount(e.target.value)
    }
    //Budget validation
    const validtion = () => {
        if (amount.length === 0) {
            err.amount = "Please Enter Amount"
         } 
        //  else if (Number(amount)= 0) {
        //     err.amount = "Please Enter more 0"
        // }
    }
    //handle add Budget
    const handleSubmit = (e) => {
        setMessageError({})
        e.preventDefault()
        validtion()
        const formdata = {
            amount: amount
        }
        const reset = () => {
            setAmount('')
        }
        if (Object.keys(err).length===0) {
            dispacth(startAddBudget(formdata, reset))
        }else{
            setMessageError(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label ><span style={{}}>A</span>dd Budget</label>
                    <input type="number" className="form-control" value={amount} placeholder="Enter Amount" style={{ width: 200, borderColor: "black" }} onChange={handleChange}  />{messageError.amount && <div><span style={{color:"red"}}>{messageError.amount}</span><br/></div> } 
                    <input type="submit" className="btn " value='Add' style={{ backgroundColor: "green" }} />
                </div>
            </form>
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card" >
                            <div className="card-body">
                                {expense.length !== 0 ? <div>
                                    <div className="container text-center">
                                        <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => { handleDeleteAllExpense() }}>Delete All</button>
                                    </div>
                                    <table className="table">

                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-secondary">
                                            {
                                                expense.map((ele, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td >{i + 1}</td>
                                                            <td >{ele.note}</td>
                                                            <td >{allCategory && findCategoryOnId(ele.categoryId)}</td>
                                                            <td >{ele.date.split("T")[0]}</td>
                                                            <td >{ele.amount}</td>
                                                            <td ><button type="button" className="btn btn-info" onClick={() => { handleUndo(ele._id) }}>Undo</button></td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table></div> : <h1>No Expense Found</h1>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card col-md-9">
                            <div className="card-body">

                                <h5 className="card-title"><span style={{ color: "#ff9900" }}>A</span>ll Category</h5>
                                {allCategory.length !== 0 ? <table className="table" border={"1"}>
                                    <thead>
                                        <tr>
                                            <th >S.no</th>
                                            <th >Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCategory.map((ele, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="table-light">{i + 1}</td>
                                                        <td className="table-light">{ele.name}</td>
                                                        <td className="table-light"><button type="button" className="btn btn-danger" onClick={() => { handleDelteCategory(ele._id) }}>Delete</button></td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> : <h1>No Categories Found</h1>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}