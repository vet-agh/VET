import { useEffect } from "react";
import { usePatientContext } from "../hooks/usePatientContext";

// components
import PatientDetails from '../components/PatientDetails'
import PatientForm from "../components/PatientForm";

const PatientPage = () => {
    const {patient, dispatch} = usePatientContext()

    useEffect(() => {
    const fetchPatient = async() => {
        const response = await fetch('/api/patients')
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'SET_PATIENT', payload: json})
        }
    }

    fetchPatient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
       <>
        <div className="go_back">
          <form action="/">
          <input className="go-back-button" type="submit" value="Wróć do strony głównej" /></form>
        </div>
          <PatientForm/>
        
        <h2> Rejestr pacjentów </h2>
        {patient && patient.map(p => (
        <PatientDetails patient={p} key={p._id}  />))}
      </>
    )
}

export default PatientPage;