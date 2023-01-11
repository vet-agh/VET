import { createContext, useReducer } from "react"

export const ClinicContext = createContext()

export const ClinicReducer = (state, action) => {
    switch (action.type) {
    case 'SET_CLINICS': return {clinics: action.payload}
    case 'CREATE_CLINICS': return {clinics: [action.payload, ...state.clinics]}
    case 'DELETE_CLINICS': return {clinics: state.clinics.filter((c) => c._id !== action.payload._id)}
    case 'UPDATE_CLINICS':
        const updatedClinics = state.clinics.map(clinic => {
            if(clinic._id === action.payload._id) {
                return action.payload;
            }
            return clinic;
        })
    return { clinics: updatedClinics };
    default: return state
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


