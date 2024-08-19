import { show } from "./login.js";
import { toast } from "./toast.js";

const baseUrl = "http://localhost:3333";
const green = 'hsl(162, 88%, 26%)'
const red = 'hsl(349, 69%, 55%)'

export const createUsers = async (requestBody) => {
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
    .then(async (res)=> {
        const resJson = await res.json()
        if (res.ok){
            toast('Login realizado com sucesso', green )
            return resJson
        }else {
            throw new error(
                resJson.messagte
            )
        }
    })
    .catch((err) => toast(err, red))

    return newUser
}

export const newUser = () => {
   const inputs = document.querySelectorAll('input')
   const button = document.querySelector('.register')
   let body = {}
  
   button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
         
      body[input.name] = input.value.trim()

    }) 

    await createUsers(body)
    show()
})
}
