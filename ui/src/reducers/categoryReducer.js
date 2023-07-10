import { ADD_CATEGORIES, GET_CATEGORIES, SET_DELETE } from "../actions/category"

const initialCategory = { error: '', data: [] }

const categoryReducer = (state = initialCategory, action) => {
    switch (action.type) {
        case ADD_CATEGORIES: {
            return { ...state, data: [...state.data, action.payload] }
        }
        case GET_CATEGORIES: {
            return { ...state, data: action.payload }
        }
        //when Category is deleted all expense  deleted realted to category
        case SET_DELETE: {
           
            return { ...state, data:[...state.data.filter(ele=>{
                return ele._id!==action.payload._id
            })] }
        }
        default: {
            return { ...state }
        }

    }
}

export default categoryReducer

