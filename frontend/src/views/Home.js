import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => 
{
  const { user } = useAuthContext()
  return (
  <>
    <center><h3> Strona startowa Sieci Weterynaryjnej</h3></center>
    <br></br>
    <p>{user.role === 1 && "Jesteś zalogowany jako administrator"}</p>
    <p>{user.role === 2 && "Jesteś zalogowany jako recepcja"}</p>
    <p>{user.role === 3 && "Jesteś zalogowany jako lekarz"}</p>
    <div className="NavigationButtons">

      <form action="/clients">
      <input type="submit" value="Klienci"/></form>
      
      <form action="/patients">
      <input type="submit" value="Pacjenci"/></form> 
      
      <form action="/schedule">
      <input type="submit" value="Harmonogram"/></form> 
      
      <form action="/equipment">
      <input type="submit" value="Sprzęt"/></form> 
      
      <form action="/employees">
      <input type="submit" value="Pracownicy"/></form> 
      
      <form action="/clinics">
      <input type="submit" value="Kliniki"/></form> 

    </div>
  </>
  )
}

export default Home
