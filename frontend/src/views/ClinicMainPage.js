import { useEffect } from 'react'
import { useClinicContext } from '../hooks/useClinicContext'
import { useAuthContext } from '../hooks/useAuthContext'

import ClinicDetails from '../components/ClinicDetails'
import ClinicForm from '../components/ClinicForm'

const ClinicPage = () => {
    const {clinics, dispatch} = useClinicContext()
    const {user} = useAuthContext()

        useEffect(() => {
        const fetchClinics = async () => {
            const response = await fetch('/api/clinics', {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CLINICS', payload: json})
            }
        }

        if (user) {
            fetchClinics()
        }
    }, [dispatch, user])

    return (
        <>
            <div className="go_back">   
                <form action="/">
                    <input className="go-back-button" type="submit" value="Wróć do strony głównej"/>
                </form>
            </div>
            {user.role === 1 && <ClinicForm/>}

            <h2>Lista zakładów:</h2>
            {clinics && clinics.map((c) => (
            <ClinicDetails clinic={c} key={c._id}/>
            ))}
        </>
    )
}

export default ClinicPage