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

    <div className="home">
    <div className="go_back">
  <form action="/">
    <input type="submit" value="Wróć do strony głównej" /></form></div><ClientForm/>
      <div className="clients">
              <h2>Lista klientów:</h2>
        {clients && clients.map(client => (
          <ClientDetails client={client} key={client._id}  />
        ))}
      </div>

    </div>
  )
}

export default ClientPage