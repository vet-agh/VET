import { createContext, useReducer } from 'react'

export const ClientContext = createContext()

export const clientsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLIENTS': return {clients: action.payload}
        case 'CREATE_CLIENT':return {clients: [action.payload, ...state.clients]}
        case 'DELETE_CLIENT': return {clients: state.clients.filter((c) => c._id !== action.payload._id)}
        case 'UPDATE_CLIENTS': 
        const updatedClients = state.clients.map(client => {
            if (client._id === action.payload._id) {
            return action.payload;
            }
            return client;
        });
        return {clients: updatedClients};
        default: return state
    }
}

export const ClientContextProvider = ({ children }) => {
    const[state, dispatch] = useReducer(clientsReducer, {
        clients: null
    })

    return (
        <ClientContext.Provider value = {{ ...state, dispatch }}>
            {children}
        </ClientContext.Provider>
    )
}
