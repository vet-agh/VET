import { createContext, useReducer } from 'react'

export const EquipmentContext = createContext()

export const equipmentReducer = (state, action) => {
    switch (action.type) {
        case "SET_EQUIPMENT": return {equipment: action.payload}
        case "CREATE_EQUIPMENT": return {equipment: [action.payload, ...state.equipment]}
        case "DELETE_EQUIPMENT": return {equipment: state.equipment.filter(e => e._id !== action.payload._id )}
        case 'UPDATE_EQUIPMENT':
            const updatedEquipment = state.equipment.map(equipment => {
                if (equipment._id === action.payload._id) {
                    return action.payload;
                }
                return equipment;
            });
            return {equipment: updatedEquipment};
        default: return state
    }
}
export const EquipmentContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(equipmentReducer, {
        equipment: null
    })

    return (
        <EquipmentContext.Provider value={{...state, dispatch}}> 
            {children}
        </EquipmentContext.Provider>
    )
}

