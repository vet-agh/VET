import { useEffect } from 'react'
import { useClinicContext } from '../hooks/useClinicContext'

import ClinicDetails from '../components/ClinicDetails'
import ClinicForm from '../components/ClinicForm'

const ClinicPage = () => {
    const {clinics, dispatch} = useClinicContext()

        useEffect(() => {
        const fetchClinics = async () => {
            const response = await fetch('/api/clinics')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CLINICS', payload: json})
            }
        }
        fetchClinics()
    }, [dispatch])

    return (
        <>
            <div className="go_back">   
                <form action="/">
                <input className="go-back-button" type="submit" value="Wróć do strony głównej"/></form>
            </div>
            <ClinicForm/>
            <h2>Lista zakładów:</h2>
            {clinics && clinics.map((clinic) => (
            <ClinicDetails key={clinic._id} clinic={clinic}/>
            ))}
        </>
    )
}

export default ClinicPage