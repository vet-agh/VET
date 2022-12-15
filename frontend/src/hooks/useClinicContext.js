import { ClinicContext } from "../context/ClinicContext";
import { useContext } from "react";

export const useClinicContext = () => {
    const context = useContext(ClinicContext)

    if (!context)
    {
        throw Error('useClinicContext must be used inside an ClinicContextProvider')
    }
    return context
}