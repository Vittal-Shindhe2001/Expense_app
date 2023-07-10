import axios from "../config_axios/axios"
import Swal from "sweetalert2"

export const ADD_EXPENSE = 'ADD_EXPENSE'
export const GET_EXPENSE = 'GET_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const GET_ISDELETED = 'GET_ISDELETED'
export const UNDO_EXPENSE = 'UNDO_EXPESE'
export const DELETE_AllEXPENSE='DELETE_AllEXPENSE'
export const EDIT_EXPENSE='EDIT_EXPENSE'
//add Expense
export const setExpense = (data) => {
    return {
        type: ADD_EXPENSE,
        payload: data
    }
}

export const startAddExpense = (formdata, reset) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const res = await axios.post('/user/expense', formdata, { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(setExpense(res.data))
                    reset()
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//Get Expense is deleted:true
export const setGetExpense = (data) => {
    return {
        type: GET_EXPENSE,
        payload: data
    }
}
export const startGetExpense = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expense = await axios.get('/user/expense/show', { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(setGetExpense(expense.data))
                   
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//softDelete Expense
export const setDeleteExpense = (data) => {
    return {
        type: DELETE_EXPENSE,
        payload: data
    }
}

export const startDeleteExpense = (id) => {

    return (dispatch) => {
        (
            async () => {
                try {
                    const res = await axios.delete(`/user/expenses/softdelete/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(setDeleteExpense(res.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }


}

//To Get All Soft Deleted Expense
export const setIsDeleted = (data) => {
    return {
        type: GET_ISDELETED,
        payload: data
    }
}

export const startGetisDeleted = () => {
    return (dispacth) => {
        (
            async () => {
                try {
                    const res = await axios.get('/user/expense/isDeleted', { headers: { 'authorization': localStorage.getItem('token') } })
                    dispacth(setIsDeleted(res.data))

                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//Undo Expense
export const setUndoExpense = (data) => {
    return {
        type: UNDO_EXPENSE,
        payload: data
    }
}

export const startUndoexpense = (id) => {
    return (dispacth) => {
        (
            async () => {
                try {
                    const result = await axios.put(`/user/expenses/undo/${id}`,{}, { headers: { 'authorization': localStorage.getItem('token') } })
                   dispacth(setUndoExpense(result.data)) 
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

//DELETE ALL EXPENSE {ISDELETED:TRUE}
export const setDeleteAllExpense=(data)=>{
    return{
        type:DELETE_AllEXPENSE,
        payload:data
    }
}

export const startDeleteAllExpense=()=>{
    return(dispacth)=>{
        (
            async()=>{
                try {
                    const result=axios.delete('/user/expenses/deleteAll',{ headers: { 'authorization': localStorage.getItem('token') } })
                    if (result) {
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
                              dispacth(setDeleteAllExpense({error:"",data:[]}))
                            } else if (
                              /* Read more about handling dismissals below */
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              swalWithBootstrapButtons.fire(
                                'Cancelled',
                                'error'
                              )
                            }
                          })
                    }
                    
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}
export const setEditExpense=(data)=>{
    return{
        type:EDIT_EXPENSE,
        payload:data
    }
}

export const startUpdateExpense=(id,data)=>{
    return(dispacth)=>{
        (
            async()=>{
                try {
                    const Upadate=await axios.put(`/user/expense/${id}`, data,{ headers: { 'authorization': localStorage.getItem('token') } })
                    dispacth(setEditExpense(Upadate.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}
 