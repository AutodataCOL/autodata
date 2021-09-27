import { useState, useEffect } from 'react'

import NavigationBar from '../components/NavigationBar'
import Input from '../components/Input'
import Button from '../components/Button'
import Item from '../components/Item'
import Loader from '../components/Loader'

import styles from '../styles/inventory.module.css'

const Inventory = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState('Cargando...')
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [inventory, setInventory] = useState({
        reference: '',
        name: '',
        price: '',
        cost: '',
        units: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
        const res = await fetch('http://localhost:3000/home', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        const json = await res.json()

        if(json.message) {
            setError('No autorizado')
            return
        } else {
            const res = await fetch('http://localhost:3000/inventory', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            const json = await res.json()
            
            try {
                setItems(json.inv.products)
            } catch {
                setItems([])
            }
            setIsAuth(true)
            console.log(items)
            console.log(json)
        }
    }

    const addItem = async() => {
        setLoading(true)
        const res = await fetch('http://localhost:3000/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(inventory)
        })

        const json = await res.json()

        setLoading(false)

        if(json.message) {
            alert(json.message)
        }
        
        if(json.success) {
            setItems([...items, inventory])
        }
    }

    const deleteProduct = async(e) => {
        const res = await fetch(`http://localhost:3000/inventory/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(inventory)
        })

        const json = await res.json()

        if(json.message) {
            alert(json.message)
        }

        const products = items.filter(item => item.reference !== e.target.id)

        setItems(products)
    }

    return (
        isAuth
        ? <div className="container">
            <div className="content">
                <div className={`${styles._container} ${styles.section1} ${loading ? "opacity" : ""}`}>
                    <Input type="text"
                        text="Referencia"
                        value={inventory.ref}
                        onChange={(e) => setInventory({...inventory, reference: e.target.value})}
                    />
                    <Input type="text"
                        text="Descripcion"
                        value={inventory.name}
                        onChange={(e) => setInventory({...inventory, name: e.target.value})}
                    />
                    <Input type="number"
                        text="Precio venta"
                        value={inventory.price}
                        onChange={(e) => setInventory({...inventory, price: e.target.value})}
                    />
                    <Input type="number"
                        text="Costo"
                        value={inventory.cost}
                        onChange={(e) => setInventory({...inventory, cost: e.target.value})}
                    />
                    <Input type="number"
                        text="Unidades"
                        value={inventory.units}
                        onChange={(e) => setInventory({...inventory, units: e.target.value})}
                    />
                    <Button disabled={`${loading ? true : false}`} text="Guardar" handleClick={addItem} />
                </div>
                <Input text="Buscar producto..." />
                <div className={`${styles._container} ${styles.section2}`}>
                    {
                        items.length > 0
                        ? items.map(item => (
                            <li key={item.reference}>
                                <Item
                                    key={item._id}
                                    reference={item.reference}
                                    name={item.name}
                                    cost={item.price}
                                    units={item.units}
                                    handleClick={deleteProduct}
                                    btnRef={item.reference}
                                />
                            </li>
                        ))
                        : <h1>No hay productos</h1>
                    }
                </div>
            </div>
            <div className="navbar-container">
                <NavigationBar route='/inventory'/>
            </div>
        </div>
        : <h1>{error}</h1>
    )
}

export default Inventory