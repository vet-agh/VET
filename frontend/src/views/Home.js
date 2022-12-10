const Home = () => 
{
  return (
  <>
    <center><h3> Strona startowa Sieci Weterynaryjnej</h3></center>
    <br></br>
    <p>Jesteś zalogowany jako administrator</p>
    <div class="NavigationButtons">

      <form action="/clients">
      <input type="submit" value="Klienci"/></form>
      
      <form action="/patients">
      <input type="submit" value="Pacjenci"/></form> 
      
      <form action="/schedule">
      <input type="submit" value="Wizyty"/></form> 
      
      <form action="/equipment">
      <input type="submit" value="Sprzęt"/></form> 
      
      <form action="/employees">
      <input type="submit" value="Pracownicy"/></form> 
      
      <form action="/clinics">
      <input type="submit" value="Zakłady"/></form> 

    </div>
  </>
  )
}

export default Home
