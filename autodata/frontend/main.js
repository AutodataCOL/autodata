const username = document.getElementById('login-username')
const password = document.getElementById('login-password')
const btn = document.getElementById('login-button')
const errorDiv = document.getElementById('login-error')
import { ip } from './ip/ip.js'

btn.addEventListener('click', () => {
    const user = {
        username: username.value,
        password: password.value
    }

    if(localStorage.getItem('token')) {
        localStorage.removeItem('token')
    }

    fetch(`http://${ip}:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).then(json => {
        if(json.message) {
            const p = document.createElement('p')
            p.innerHTML = json.message
            errorDiv.appendChild(p)
            errorDiv.style.display = 'block'

            setTimeout(() => {
                errorDiv.style.display = 'none'
                errorDiv.innerHTML = ''
            }, 3000)
        } else {
            sessionStorage.setItem('token', json.token)
            location.href = `http://${ip}:5500/frontend/sections/home/home.html`
        }

    })
})