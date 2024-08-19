import { request } from "./requests.js"
import { toast } from "./toast.js"

const baseUrl = 'http://localhost:3333'
const green = 'hsl(162, 88%, 26%)'
const red = 'hsl(349, 69%, 55%)'

export const handleLogin = () => {
    const inputs = document.querySelectorAll('.input__login')
    const button = document.querySelector('#login')
    let body = {}
    let count = 0

    button.addEventListener('click', (event) => {
      event.preventDefault()
  
      inputs.forEach(input => {
        if(input.value.trim() === ''){
          count++
        }
        body[input.name] = input.value.trim()
      })
      if(count !== 0){
        count = 0

        toast('Por favor preencha todos os campos para fazer o login', red)
        
      }else{
        request(body)
        toast('Login realizado com sucesso, redirecionando...', green )
        setTimeout(() =>{
          location.replace('./dashboard.html?')
        },2000)
      }
  
    })
  }
  // Bscando as informações usuario logado
  export const infos = async () => {
    const token = localStorage.getItem('@infoPet:token')
    const infos = await fetch(`${baseUrl}/users/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (res) => {
      const resJson = await res.json()
  
      if(res.ok) {
        toast('Login realizado com sucesso', green )
        return resJson
      } else {
        throw new Error(resJson.message)
      }
    })
    .catch(err => toast(err, red))
  
    return infos
  }

  // Não aparecer a senha
  export const show =() => {
    const senha = document.querySelector('#password')
    if (senha.type === "password") {
      senha.type = "text";
    } else {
      senha.type = "password";
    }
  }
  
show()
handleLogin()