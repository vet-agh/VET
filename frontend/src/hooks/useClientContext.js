import { ClientContext } from "../context/ClientContext";
import { useContext } from "react";

export const useClientContext = () => {
    const context = useContext(ClientContext)

    if(!context){
    throw Error('useClientsContext must be used inside an ClientsContextProvider')
    }

    return context
}