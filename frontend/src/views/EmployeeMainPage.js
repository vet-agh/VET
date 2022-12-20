import { useEffect } from 'react'
import { useEmployeesContext } from '../hooks/useEmployeeContext'

import EmployeeDetails from '../components/EmployeeDetails'
import EmployeeForm from '../components/EmployeeForm'

const EmployeePage = () => {
    const {employees, dispatch} = useEmployeesContext()

        useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/employees')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_EMPLOYEES', payload: json})
            }
        }
        fetchEmployees()
    }, [dispatch])

    return (
        <>
            <div className="go_back">   
                <form action="/">
                    <input className="go-back-button" type="submit" value="Wróć do strony głównej"/>
                </form>
            </div>
            <EmployeeForm/>

            <h2>Lista pracowników:</h2>
            {employees && employees.map((e) => (
            <EmployeeDetails employee={e} key={e._id} />
            ))}

        </>

    )
}

export default EmployeePage