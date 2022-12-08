import { useEffect} from "react";
import { usePatientContext } from "../hooks/usePatientContext";

// components
import PatientDetails from '../components/PatientsDetails'

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
        <div className="home">
            <div className = "patient">
                {patient && patient.map(()=>(
                    <PatientDetails ket = {patient._id} patient = {patient}/>
                ))}
        <h2> Rejestr pacjentów </h2>
        </div> 
    </div>
    )
}

export default PatientPage;