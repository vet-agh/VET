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
        case 'DELETE_EQUIPMENT':
            return {
                equipment: state.equipment.filter((e) => e._id !== action.payload._id )
            }
        default:
            return state
    }
}
export const EquipmentContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(equipmentReducer, {
        equipment: null
    })

    return (
        <EquipmentContext.Provider value={{...state, dispatch}}> 
            { children }
        </EquipmentContext.Provider>
    )
}

