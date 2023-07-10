import axios from "../config_axios/axios";

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_DELETE = 'SET_DELETE'

//Add Category
export const setCategory = (data) => {
    return {
        type: ADD_CATEGORIES,
        payload: data
    }
}
export const startAddCategories = (categoryData, reset) => {
    return (dispacth) => {
        (
            async () => {
                try {
                    const res = await axios.post('/user/category', categoryData, { headers: { 'authorization': localStorage.getItem('token') } })
                    dispacth(setCategory(res.data))
                    reset()
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//get all Category
export const setGetCategory = (data) => {
    return {
        type: GET_CATEGORIES,
        payload: data
    }
}

export const startGetCategory = () => {
    return (dispacth) => {
        axios.get('/user/categorgies', { headers: { 'authorization': localStorage.getItem('token') } })
            .then((result) => {
                dispacth(setGetCategory(result.data))
            }).catch((err) => {
                alert(err)
            });
    }
}

//delete Category and expense
export const setDelete = (data) => {
    return {
        type: SET_DELETE,
        payload: data
    }
}


export const startDeleteCategory = (id) => {
    return (dispacth) => {
        (
            async () => {
                try {
                    const result = await axios.delete(`/user/expenses/deletemany/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
                        dispacth(setDelete(result.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}