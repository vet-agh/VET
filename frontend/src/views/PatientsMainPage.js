import { useEffect} from "react";
import { usePatientContext } from "../hooks/usePatientContext";

// components
import PatientDetails from '../components/PatientsDetails'
import PatientForm from "../components/PatientForm";

const PatientPage = () => {
    const {patient, dispatch} = usePatientContext()

    useEffect(() => {
    const fetchPatient = async() => {
        const response = await fetch('/api/patient')
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'SET_PATIENT', payload: json})
        }
    }

    fetchPatient()
    }, [])

    return(
       <>
        <div className="go_back">
          <form action="/">
          <input type="submit" value="Wróć do strony głównej" /></form>
        </div>
          <PatientForm/>
        
        <h2> Rejestr pacjentów </h2>
        {schedule && patient.map(s => (
        <PatientDetails patient={s} key={s._id}  />))}
      </>
    )
}

export default PatientPage;