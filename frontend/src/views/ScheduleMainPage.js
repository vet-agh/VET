import {useEffect} from "react";
import {useScheduleContext} from "../hooks/useScheduleContext";
import ScheduleDetails from '../components/ScheduleDetails'
import ScheduleForm from "../components/ScheduleForm";


const SchedulePage = () => {
    const {schedule, dispatch} = useScheduleContext()

    useEffect(() => {
      const fetchSchedule = async() => {
        const response = await fetch('/api/equipment')
        const json = await response.json()

        if (response.ok)
        {
          dispatch({type: 'SET_SCHEDULE', payload: json})
        }
      }

      fetchSchedule()
    }, [])

    return (
      <div className="home">
        <div className="schedule">
          {schedule && schedule.map(() => (
            <ScheduleDetails key = {schedule._id} schedule = {schedule} />
          ))}
        </div>
        <ScheduleForm/>
      </div>
    )

}

export default SchedulePage;