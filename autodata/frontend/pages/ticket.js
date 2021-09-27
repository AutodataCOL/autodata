import NavigationBar from '../components/NavigationBar'

const Ticket = () => {
    return (
        <div className="container">
            <div className="content">
                <h1>Ventas</h1>
            </div>
            <div className="navbar-container">
                <NavigationBar route='/ticket'/>
            </div>
        </div>
    )
}

export default Ticket