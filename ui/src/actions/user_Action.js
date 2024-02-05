import axios from "../config_axios/axios"
import Swal from "sweetalert2"
export const GET_USER = 'GET_USER'
export const ADD_BUDGET = 'ADD_BUDGET'


export const startPostUsers = (formSubmit, props) => {
    return (dispatch) => {
        axios.post('/user/register', formSubmit)
            .then((res) => {
                if (res) {
                    props.history.push('/login')
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }
            }).catch((err) => {
                alert(err)
            });
    }

}
export const startLoginUser = (formLogin, props, setIsLogin,setIsSubmitting) => {
    return () => {
        axios.post('/user/login', formLogin)
            .then((res) => {
                if (res.data.hasOwnProperty('error')) {
                    setIsSubmitting(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${JSON.stringify(res.data.error)}`,
                    })
                } else {
                    localStorage.setItem('token', res.data.token)
                    props.history.push('/DashBoard')
                    setIsSubmitting(false)
                    setIsLogin(true)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((err) => {
                alert(err)
            });
    }
}

export const setAddBudget = (data) => {
    return {
        type: ADD_BUDGET,
        payload: data
    }
}

export const startAddBudget = (formdata, reset) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const result = await axios.put('/user/budget', formdata, { headers: { 'authorization': localStorage.getItem('token') } })
                    if (result) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'BUDGET ADDED',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        dispatch(setAddBudget(result.data))
                        reset()
                    }
                } catch (error) {
                    alert(error)
                }

            }
        )()
    }
}

export const setGetUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}

export const startGetUser = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const res = await axios.get('/user/info', { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(setGetUser(res.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startUserDelete = (data, props, setIsLogin) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const res = await axios.post('/user/account', data, { headers: { 'authorization': localStorage.getItem('token') } })
                    if (res.data.hasOwnProperty('error')) {
                        alert(res.data.error)
                    }
                    else {
                        const confirm = window.confirm('Are You sure')
                        if (confirm) {
                            props.history.push('/register')
                            setIsLogin(false)
                            localStorage.removeItem("token")
                        }
                    }
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}