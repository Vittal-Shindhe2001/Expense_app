import { ADD_EXPENSE, DELETE_AllEXPENSE, DELETE_EXPENSE, GET_EXPENSE, GET_ISDELETED, UNDO_EXPENSE,EDIT_EXPENSE } from "../actions/expenseAction"

const initialExpense = { error: '', data: [] }

export const expeseReducer = (state = initialExpense, action) => {
   switch (action.type) {
      case ADD_EXPENSE: {
         return { ...state, data: [...state.data, action.payload] }
      }
      case GET_EXPENSE: {
         return {
            ...state, data: action.payload
         }
      }

      case DELETE_EXPENSE: {
         const result = state.data.filter(ele => { return ele._id !== action.payload._id })
         return { ...state, data: result }
      }
      case GET_ISDELETED: {
         return { ...state, data: action.payload }


      } case UNDO_EXPENSE: {
         const result = state.data.filter(ele => { return ele._id !== action.payload._id })
         return { ...state, data: result }
      }
      //DELETE ALL EXPENSE
      case DELETE_AllEXPENSE: {
         return { ...state, data: [] }
      }
      //EDIT EXPENSE
      case EDIT_EXPENSE: {
         const edit = state.data.map(ele => {
            if (ele._id === action.payload._id) {
               return { ...ele, ...action.payload }
            } else {
               return { ...ele }
            }
         })
         return { ...state, data: edit }
      }

      default: {
         return { ...state }
      }
   }
}