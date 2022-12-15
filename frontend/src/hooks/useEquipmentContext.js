import { EquipmentContext } from "../context/EquipmentContext"
import { useContext } from "react"

export const useEquipmentContext = () => {
    const context = useContext(EquipmentContext)

    if (!context) {
        throw Error ('useEquipmentContext must be used inside an EquipmentContextProvider')
    }
    return context
}