import { createContext, useReducer } from 'react'

export const PatientContext = createContext()

export const patientReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PATIENT': return { patient: action.payload }
        case 'CREATE_PATIENT': return {patient: [action.payload, ...state.patient] }
        default: return state
    }
}
export const PatientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(patientReducer, {
        patient: null
    })

    return (
        <PatientContext.Provider value={{...state, dispatch}}> 
            { children }
        </PatientContext.Provider>
    )
}