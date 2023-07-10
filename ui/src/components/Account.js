import React, { useEffect, useState } from "react"
import PiChart from "./helper_Function/PieChart"
import { useDispatch, useSelector } from "react-redux"
import { startGetExpense } from "../actions/expenseAction"
import { startGetUser, startUserDelete } from "../actions/user_Action"

const Account = (props) => {
    const [accountD, setAccountD] = useState(false)
    const [password, setPassword] = useState('')

    const dispacth = useDispatch()
    useEffect(() => {
        dispacth(startGetExpense())
        dispacth(startGetUser())
    }, [dispacth])
    const expense = useSelector(state => {
        return state.expense.data
    })
    const user = useSelector(state => {
        return state.user.data
    })
    const result = expense.reduce((iv, cv) => {
        return iv + cv.amount
    }, 0)
    

    const handleDeleteAccount = (e) => {
        e.preventDefault()
        if (password.length === 0) {
            alert( 'Please Enter Your Password')
        } else {
            const data = {
                password: password
            }
            dispacth(startUserDelete(data, props, props.setIsLogin))
        }
    }
    
    return (
        <div className="container">

            <div className="col-md-6">
                <h1 style={{ color: "green" }}>Budget-{user.amount || 0}</h1>
                <h1 style={{ color: "red" }}>Total Expense- {result}</h1>
                <h1 style={{ color: "green" }}>Remaining Budget-{user.amount - result || 0}</h1>
                <PiChart budget={user.amount} result={result} />
            </div>
            <div className="col-md-4">
                {!accountD && <button className="btn btn-danger" onClick={() => { setAccountD(true) }}>Delete Account</button>}
            </div>
            {accountD && <div className="card bg-light mb-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <form onSubmit={handleDeleteAccount}>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" style={{ width: 200 }} />
                        </div>
                        <input type="submit" value='Delete' className="btn btn-danger" />
                    </form>
                </div>
            </div>}
        </div>
    )

}
export default Account