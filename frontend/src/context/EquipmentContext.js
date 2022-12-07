import { createContext, useReducer } from 'react'

export const EquipmentContext = createContext()

export const equipmentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EQUIPMENT':
            return {
                equipment: action.payload
            }
        case 'CREATE_EQUIPMENT':
            return {
                equipment: [action.payload, ...state.equipment]
            }
        default:
            return state
    }
}
const EquipmentContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(equipmentReducer, {
        equipment: null
    })

    return (
        <EquipmentContext.Provider value={{...state, dispatch}}> 
            { children }
        </EquipmentContext.Provider>
    )
}