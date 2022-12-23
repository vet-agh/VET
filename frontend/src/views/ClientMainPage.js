import { useEffect } from 'react'
import { useClientContext } from '../hooks/useClientContext'

// components
import ClientDetails from '../components/ClientDetails'
import ClientForm from '../components/ClientForm'


const ClientPage = () => {
  const {clients, dispatch} = useClientContext()

  useEffect(() => {
    const fetchClients = async() => {
      const response = await fetch('/api/clients')
      const json = await response.json()

      if (response.ok){
          dispatch({type:'SET_CLIENTS', payload: json}) 
      }
    }
    fetchClients()
  }, [dispatch])


  return (
    <>
        <div className="go_back">
            <form action="/">
              <input className="go-back-button" type="submit" value="Wróć do strony głównej" />
            </form>
        </div>
        <ClientForm/>
        <h2>Lista klientów:</h2>

        {clients && clients.map(c => (
        <ClientDetails client={c} key={c._id} /> 
        ))}
        
    </>
  )
}

export default ClientPage