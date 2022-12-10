import {useEffect} from "react";
import {useScheduleContext} from "../hooks/useScheduleContext";
import ScheduleDetails from '../components/ScheduleDetails'
import ScheduleForm from "../components/ScheduleForm";


const SchedulePage = () => {
    const {schedule, dispatch} = useScheduleContext()

    useEffect(() => {
      const fetchSchedule = async() => {
        const response = await fetch('/api/schedule')
        const json = await response.json()

        if (response.ok)
        {
          dispatch({type: 'SET_SCHEDULE', payload: json})
        }
      }

      fetchSchedule()
    }, [])
    return (
      <>
        <div className="go_back">
          <form action="/">
          <input type="submit" value="Wróć do strony głównej" /></form>
        </div>
        <ScheduleForm/>
        <h2>Harmonogram wizyt:</h2>
        {schedule && schedule.map(s => (
        <ScheduleDetails schedule={s} key={s._id}  />))}
      </>
    )

}

export default SchedulePage;