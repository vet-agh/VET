import { createContext, useReducer } from "react"

export const ClinicContext = createContext()

export const ClinicReducer = (state, action) => {
    switch (action.type){

    case 'SET_CLINICS':
        return {clinics: action.payload}
    case 'CREATE_CLINICS':
        return {clinics: [action.payload, ...state.clinics]}
    case 'DELETE_CLINICS':
        return {clinics: state.clinics.filter((c) => c._id !== action.payload._id)}
    default:
        return state
    }
}

export const ClinicContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(ClinicReducer, {
        clinics: null
    })

    return (
        <ClinicContext.Provider value={{...state,dispatch}}>
            {children}
        </ClinicContext.Provider>
    )
}


