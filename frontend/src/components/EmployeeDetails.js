import { useEmployeesContext } from "../hooks/useEmployeeContext"

const EmployeeDetails = ({employee}) => {
    const {dispatch} = useEmployeesContext()
    const handleClickDelete = async () => {
        const response = await fetch('/api/employees/' + employee._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EMPLOYEES', payload: json})
        }
    }

    return (
        <div className="employee-details">
            <button onClick={handleClickDelete}>Usuń pracownika</button>
            <strong><p>{employee.imie} {  } {employee.nazwisko}</p></strong>
            <p>Data dodania do rejestru pracowników: {employee.createdAt.substring(0, 10)}</p>
            <p>Numer telefonu: {employee.numer_telefonu}</p>
            <p>Numer konta: {employee.numer_konta}</p>
            <p>Adres: {employee.adres}</p>
            <p>Numer identyfikacyjny kliniki: {employee.id_kliniki}</p>
        </div>
    )
}

export default EmployeeDetails