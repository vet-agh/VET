import { useEffect } from 'react'
import { usePatientContext } from '../hooks/usePatientContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import PatientDetails from '../components/PatientDetails'
import PatientForm from '../components/PatientForm'

const PatientPage = () => {
    const {patient, dispatch} = usePatientContext()
    const {user} = useAuthContext()

    useEffect(() => {
    const fetchPatient = async() => {
        const response = await fetch('/api/patients', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'SET_PATIENT', payload: json})
        }
    }

    if (user) {
      fetchPatient()
    }
    }, [dispatch, user])

    return(
       <>
        <div className="go_back">
          <form action="/">
            <input className="go-back-button" type="submit" value="Wróć do strony głównej" />
          </form>
        </div>
        {(user.role === 1 || user.role === 2) && <PatientForm/>}
        
        <h2> Rejestr pacjentów </h2>
        {patient && patient.map(p => (
        <PatientDetails patient={p} key={p._id}/>))}
      </>
    )
}

export default PatientPage;