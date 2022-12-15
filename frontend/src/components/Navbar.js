import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>System zarządzania siecią weterynaryjną</h1>
            </Link>
            <nav>
                {!user &&(
                <div>
                    <Link to="/login"> Zaloguj się </Link>
                </div>
                )}

                {user && (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}> Wyloguj się </button>
                </div>
                )}
            </nav>
        </div>
    </header>
    )
}
export default Navbar





