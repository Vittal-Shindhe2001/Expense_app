import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { startGetCategory } from "../actions/category";
import { startAddExpense, startGetExpense, startUpdateExpense } from "../actions/expenseAction";
export default function Form(props) {
    const [eAmount, setEAmount] = useState('')
    const [note, setNote] = useState('')
    const [id, setId] = useState('')
    const [date, setdate] = useState('')
    const dispacth = useDispatch()
    const [messageError, setMessageError] = useState({})
    const err = {}
    const categories = useSelector((state) => {
        return state.category.data
    })
    useEffect(() => {
        dispacth(startGetCategory())
        dispacth(startGetExpense())
        if (props.data) {
            setEAmount(props.data.amount
                || "")
            setId(props.data.categoryId
                || "")
            setNote(props.data.note
                || "")
            setdate(props.data.date || "")
        }
    }, [dispacth, props.data])
    //form validation
    const validation = () => {
        if (eAmount.length === 0) {
            err.eAmount = "Please Enter Amount"
        }

        if (id.length===0) {
            err.id="Please Select Category"
        }
        if (date.length===0) {
            err.date="Please Select Date"
        }
    }

    //form Submit Handle
    const handleSubmit = (e) => {
        setMessageError({})
        e.preventDefault()
        validation()
        const formdata = {
            amount: eAmount,
            note: note,
            categoryId: id,
            date: date
        }

        const reset = () => {
            setEAmount('')
            setNote('')
            setId('')
            setdate('')
        }
        if (Object.keys(err).length === 0) {
            if (props.data) {
                dispacth(startUpdateExpense(props.data._id, formdata))
                props.toggle()
            } else {
                dispacth(startAddExpense(formdata, reset))
            }
            dispacth(startGetExpense())
        } else {
            setMessageError(err)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label >Amount</label>
                <input type="number" className="form-control" placeholder="Enter Amount" value={eAmount} onChange={(e) => { setEAmount(e.target.value) }} />{messageError.eAmount && <span style={{color:"red"}}>{messageError.eAmount}</span>}
            </div>
            <div className="form-group">
                <label >note</label>
                <input type="text" className="form-control" value={note} onChange={(e) => { setNote(e.target.value) }} /> <br />
                <select className="form-control " aria-label="Example select with button addon" value={id} style={{ borderColor: "black", width: 300 }} onChange={(e) => { setId(e.target.value) }} required>
                    <option >Select Category</option>
                    {
                        categories.map((ele, i) => {
                            return (
                                <option key={i} value={ele._id}>{ele.name}</option>
                            )
                        })
                    }
                </select>{messageError.id && <span style={{color:"red"}}>{messageError.id}</span>}<br />
                <label>Date</label>
                <input type="Date" className="form-control" value={date} onChange={(e) => { setdate(e.target.value) }}  />{messageError.date && <span style={{color:"red"}}>{messageError.date}</span>}
            </div>
            <input type="submit" className="btn btn-success" value={props.data ? "Upadate" : "Add"} />
        </form>
    )
}