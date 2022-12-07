import { useEffect } from 'react'
import { useClientContext } from '../hooks/useClientContext'


// components
const ClientPage = () => {
  const {clients, dispatch} = useClientContext()

  useEffect(() => {
    const fetchClients = async() => {
    }
    fetchClients()
  }, [dispatch])

  return (
    <div className="home">
    <center><h3> Strona startowa Sieci Weterynaryjnej</h3></center>
    <br></br>
    <p>Jesteś zalogowany jako administrator</p>
    <przyciski_nawigacji>

<form action="/clients">
 <input type="submit" value="Klienci" />
</form>
<form action="/patients">
    <input type="submit" value="Pacjenci" />
</form> 
<form action="/schedules">
    <input type="submit" value="Wizyty" />
</form> 
<form action="/equipments">
    <input type="submit" value="Sprzęt" />
</form> 
<form action="/employees">
    <input type="submit" value="Zatrudnieni" />
</form> 
<form action="/clinics">
    <input type="submit" value="Zakłady" />
</form> 
</przyciski_nawigacji>

    </div>
  )
}

export default ClientPage