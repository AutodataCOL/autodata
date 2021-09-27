import NavigationBar from '../components/NavigationBar'

const History = () => {
    return (
        <div className="container">
            <div className="content">
                <h1>Historial</h1>
            </div>
            <div className="navbar-container">
                <NavigationBar route='/history'/>
            </div>
        </div>
    )
}

export default History