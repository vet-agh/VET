// Providing global state to components in application. [...]
// ... we can update that state by dispatching actions [...]
// ... from those components. 

import {createContext, useReducer} from 'react'

export const ScheduleContext = createContext()

export const scheduleReducer = (state, action) => {
  switch (action.type)
  {
    case "SET_SCHEDULE": return {schedule: action.payload}
    case "CREATE_SCHEDULE": return {schedule: [action.payload, ...state.schedule]}
    default: return state
  }
}

export const ScheduleContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(scheduleReducer, {
    schedule: null
  })

  return (
    <ScheduleContext.Provider value={{...state, dispatch}}>
      {children}
    </ScheduleContext.Provider>
  )
}