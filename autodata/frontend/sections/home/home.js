window.addEventListener('DOMContentLoaded', () => {
    const ip = '192.168.1.60'
    const productsContainer = document.getElementById('inventory-products')

    fetch(`http://${ip}:3000/home`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
        .then(response => {
            return response.json()
        })
        .then(json => {
            if(json.message) {
                return window.location.href = `http://${ip}:5500/frontend/error.html`
            }

            fetch(`http://${ip}:3000/inventory`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
                .then(data => {
                    return data.json()
                })
                .then(json => {
                    if(json.message) {
                        const p = document.createElement('p')
                        
                        p.innerHTML = json.message
                        p.style.margin = '40px 0'
                        productsContainer.appendChild(p)
                    } else {
                        json.user.products.map(obj => {
                            productsContainer.innerHTML = 
                            productsContainer.innerHTML + 
                            `<div class="inventory-product">
                                <div class="right">
                                    <p>Ref: ${obj.reference}</p>
                                    <p>Nombre: ${obj.name}</p>
                                    <p>Precio: ${obj.price}</p>
                                </div>
                                <div class="left">
                                    <button>Eliminar</button>
                                </div>
                            </div>`

                            /*const div = document.createElement('div')
                            const p = document.createElement('p')
                            const btn = document.createElement('button')

                            btn.innerHTML = 'Eliminar'
                            div.appendChild(p)
                            div.appendChild(btn)
                            p.textContent = obj.name
                            productsContainer.appendChild(div)*/
                        })
                    }

                    const ref = document.getElementById('inventory-ref')
                    const nombre = document.getElementById('inventory-nombre')
                    const precio = document.getElementById('inventory-precio')
                    const btn = document.getElementById('inventory-btn')

                    btn.addEventListener('click', async() => {
                        const product = {
                            reference: ref.value,
                            name: nombre.value,
                            price: precio.value
                        }

                        fetch(`http://${ip}:3000/inventory`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(product)
                        })
                            .then(response => {
                                const res = response.json()
                                fetch(`http://${ip}:3000/inventory`, {
                                    headers: {
                                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                                    }
                                }).then(res => {
                                    return res.json()
                                }).then(json => {
                                    const lastIndex = json.user.products[json.user.products.length-1]
                                    console.log(lastIndex)
                                    console.log(JSON.stringify(json))
                                    const div = 
                                    `<div class="inventory-product">
                                        <div class="right">
                                            <p>Ref: ${lastIndex['reference']}</p>
                                            <p>Nombre: ${lastIndex['name']}</p>
                                            <p>Precio: ${lastIndex['price']}</p>
                                        </div>
                                        <div class="left">
                                            <button>Eliminar</button>
                                        </div>
                                    </div>`

                                    productsContainer.innerHTML += div
                                    /*console.log(JSON.stringify(json))
                                    json.user.products.map(obj => {
                                        productsContainer.innerHTML = 
                                        productsContainer.innerHTML + 
                                        `<div class="inventory-product">
                                            <div class="right">
                                                <p>Ref: ${obj.reference}</p>
                                                <p>Nombre: ${obj.name}</p>
                                                <p>Precio: ${obj.price}</p>
                                            </div>
                                            <div class="left">
                                                <button>Eliminar</button>
                                            </div>
                                        </div>`
                                    })*/
                                })
                            })
                    })
                })
        })
})