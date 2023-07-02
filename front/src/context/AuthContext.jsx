import { useEffect, useReducer } from "react"; // useReducer is a hook that allows to manage state transitions using a reducer function.
import { createContext } from "react";

const INITIAL_STATE = {                                   // The INITIAL_STATE object is defined with properties user, loading, and error.
 user: JSON.parse(localStorage.getItem("user")) || null,  //The user property is set by parsing the value stored in the localStorage with the key "user". If no value is found, it is set to null.
 loading: false, 
 error: null, 
};

export const AuthContext = createContext(INITIAL_STATE) // The AuthContext is created using the createContext function, and the INITIAL_STATE object is provided as the initial value of the context.

// Defining the AuthReducer:

const AuthReducer = (state, action) => { // The AuthReducer function is defined to handle state transitions based on dispatched actions.
    switch(action.type) {
        case "LOGIN_START": 
        return {
            user: null, 
            loading: true, 
            error: null, 
        }
        case "LOGIN_SUCCESS": 
        return {
            user: action.payload, 
            loading: false, 
            error: null, 
        }
        case "LOGIN_FAILURE": 
        return {
            user: null, 
            loading: false, 
            error: action.payload, 
        };
        case "LOGOUT": 
        return {
            user: null, 
            loading: false, 
            error: null, 
        };
        
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); 

useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
}, [state.user])

    return(
        <AuthContext.Provider value={{user: state.user, loading: state.loading, error: state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}