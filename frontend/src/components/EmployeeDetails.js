import { useEmployeesContext } from '../hooks/useEmployeeContext'
import { useAuthContext } from '../hooks/useAuthContext'

const EmployeeDetails = ({employee}) => {
    const { dispatch } = useEmployeesContext()
    const { user } = useAuthContext()

    const handleClickDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/employees/' + employee._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EMPLOYEES', payload: json})
        }
    }

    return (
        <div className="form-details">
            {user.role === 1 && <button className="delete-button" onClick={handleClickDelete}>Usuń pracownika</button>}
            {user.role === 1 && <button className="modify-button" onClick={handleClickDelete}>Modyfikuj pracownika</button>}
            <p><strong>Imię: </strong>{employee.imie}</p>
            <p><strong>Nazwisko: </strong>{employee.nazwisko}</p>
            <p><strong>Numer telefonu: </strong>{employee.numer_telefonu}</p>
            <p><strong>Numer konta: </strong>{employee.numer_konta}</p>
            <p><strong>Adres: </strong>{employee.adres}</p>
            <p><strong>ID Kliniki: </strong>{employee.id_kliniki}</p>
            <p><i>Data dodania do rejestru pracowników: </i>{employee.createdAt.substring(0, 10)}</p>
        </div>
    )
}

export default EmployeeDetails