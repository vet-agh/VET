// Providing global state to components in application. [...]
// ... we can update that state by dispatching actions [...]
// ... from those components. 

import {createContext, useReducer} from 'react'

export const ScheduleContext = createContext()

export const scheduleReducer = (state, action) => {
  switch (action.type) {
    case "SET_SCHEDULE": return {schedule: action.payload}
    case "CREATE_SCHEDULE": return {schedule: [action.payload, ...state.schedule]}
    case "DELETE_SCHEDULE": return {schedule: state.schedule.filter(s => s._id !== action.payload._id)}
    case 'UPDATE_SCHEDULE':
      const updatedSchedule = state.schedule.map(schedule => {
          if (schedule._id === action.payload._id) {
            return action.payload;
          }
          return schedule;
      });
      return {schedule: updatedSchedule};
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