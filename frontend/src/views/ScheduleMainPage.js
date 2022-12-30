import { useEffect } from 'react'
import { useScheduleContext } from '../hooks/useScheduleContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ScheduleDetails from '../components/ScheduleDetails'
import ScheduleForm from '../components/ScheduleForm'


const SchedulePage = () => {
    const {schedule, dispatch} = useScheduleContext()
    const {user} = useAuthContext()

    useEffect(() => {
      const fetchSchedule = async() => {
        const response = await fetch('/api/schedule', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if (response.ok)
        {
          dispatch({type: 'SET_SCHEDULE', payload: json})
        }
      }

      if (user) {
        fetchSchedule()
      }
    }, [dispatch, user])
    return (
      <>
        <div className="go_back">
          <form action="/">
          <input className="go-back-button" type="submit" value="Wróć do strony głównej" /></form>
        </div>
        <ScheduleForm/>

        <h2>Harmonogram wizyt:</h2>
        {schedule && schedule.map(s => (
        <ScheduleDetails schedule={s} key={s._id}  />))}
      </>
    )

}

export default SchedulePage;