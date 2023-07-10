import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { startPostUsers } from '../actions/user_Action'

const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState({})
    const error = {}
    const emailInput = useRef()
    const dispatch = useDispatch()
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    //form validation
    const formvalidation = () => {
        if (email.trim().length === 0) {
            error.email = 'Email cannot be empty'
        }

        if (password.trim().length === 0) {
            error.password = "Password cannot be empty"
        } else if (password.length < 8 || password.length > 128) {
            error.password = "Password length is to short"
        }
    }
    const handleSubmit = (e) => {
        setMessageError({})
        e.preventDefault()
        formvalidation()
        const formSubmit = {
            email: email,
            password: password,
        }
        if (Object.keys(error).length === 0) {
            dispatch(startPostUsers(formSubmit, props))
        } else {
            setMessageError(error)
        }

    }
    //input UseRef
    useEffect(() => {
        emailInput.current.focus()
    }, [])
    return (
        <div className='container fuild'>
            <div className='col-md-8'>
                <center> <h1>Register</h1>  </center>
                <form onSubmit={handleSubmit}>
                    <label className="form-label" >Email </label>
                    <input type="email" value={email} ref={emailInput} className="form-control" min={{ length: 8 }} max={{ length: 128 }} placeholder="Enter email" style={{ width: 200 }} onChange={handleEmailChange} />{messageError.email && <span style={{ color: "red" }}>{messageError.email}</span>} <br />
                    <label className="form-label">Password</label>
                    <input type="password" name='password' autoComplete='on' value={password} className="form-control" placeholder="Enter  Password" style={{ width: 200 }} onChange={handlePasswordChange} />{messageError.password && <div><span style={{ color: "red" }}>{messageError.password}</span><br /></div>}
                    <input type="submit" value='Submit' className="btn btn-primary" />
                </form>
            </div>
        </div>

    )
}
export default Register