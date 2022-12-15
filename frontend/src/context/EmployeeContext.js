import { createContext, useReducer } from "react"

export const EmployeeContext = createContext()

export const EmployeeReducer = (state, action) => {
    switch (action.type){

    case 'SET_EMPLOYEES':
        return {employees: action.payload}
    case 'CREATE_EMPLOYEES':
        return {employees: [action.payload, ...state.employees]}
    default:
        return state
    }
}

export const EmployeeContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(EmployeeReducer, {
        employees: null
    })

    return (
        <EmployeeContext.Provider value={{...state,dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}


