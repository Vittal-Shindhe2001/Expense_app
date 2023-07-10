import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension' 
import categoryReducer from "../reducers/categoryReducer";
import userReducer from "../reducers/user_Reducer";
import { expeseReducer } from "../reducers/expenseReducer";
const configStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        category:categoryReducer,
        expense:expeseReducer
    }),composeWithDevTools(applyMiddleware(thunk)))
    return store
}
export default configStore