import { toast } from "./toast.js"

const baseUrl = 'http://localhost:3333'
const green = 'hsl(162, 88%, 26%)'
const red = 'hsl(349, 69%, 55%)'

// criar usuario
export const requestRegister = async(requestBody) => { 
  const token = await fetch(`${baseUrl}/users/create`, { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody) 
  })
  .then(async (res) => {  
    const resJson = await res.json() 

    if(res.ok) {  
      toast('Cadastro realizado com sucesso, redirecionando...', green )
      
      setTimeout(() => {
        location.replace('./src/pages/signup.html?')
      }, 2000);
      
      return resJson 
    } else {  
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err.message, red)) 

  return token
}

// fazer login
export const request = async(requestBody) => { 
  console.log(requestBody)
  const token = await fetch(`${baseUrl}/login`, { 
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(async (res) => {  
    const resJson = await res.json() 
    console.log(res)
    if(res.ok) { 
      const {name, token} = resJson
      localStorage.setItem('@infoPet: userName', name)
      localStorage.setItem('@infoPet:token', token) 
      
      toast('Login realizado com sucesso, redirecionando...', green )
      
      setTimeout(() => {
        location.replace('./dashboard.html')
      }, 2000);
      
      return resJson 
    } else { 
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err.message, red)) 

  return token
}

// criando novo post
export const createPost = async (Body) => {
  const token = localStorage.getItem('@infoPet:token')
  const newCreatePost = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(Body)
  })
  .then(async (res) => {
    const resJson = await res.json()

    if(res.ok) {
      toast('Tarefa criada com sucesso', green)

      return resJson
    } else {
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err.message, red))

  return newCreatePost
}

// buscar as informações do usuario logado
export const search = async () => {
  const token = localStorage.getItem('@infoPet:token')
  const allSearch = await fetch (`${baseUrl}/users/profile`,{
    method: "GET",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      return resJson
    } else {
      throw new Error('Problemas no servidor, tente mais tarde')
    }
  })
  .catch(err => toast(err, red))

  return allSearch
}

// atualizar usuario logado
export const usersLogged = async () => {
  const token = localStorage.getItem('@infoPet:token')
  const allLogged = await fetch (`${baseUrl}/users/profile`,{
    method: "PATCH",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      return resJson
    } else {
      throw new Error('Problemas no servidor, tente mais tarde')
    }
  })
  .catch(err => toast(err, red))

  return allLogged
}

// deletar de usuario logado
export const deleteAtentication = async () => {
  const token = localStorage.getItem('@infoPet:token')
  const allDelete = await fetch (`${baseUrl}/users/profile`,{
    method: "DELETE",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      return resJson
    } else {
      throw new Error('Problemas no servidor, tente mais tarde')
    }
  })
  .catch(err => toast(err, red))

  return allDelete
}

export const createPostsId = async () => {
  const token = localStorage.getItem('@infoPet:token')
  const allCreate = await fetch (`${baseUrl}/posts/create`,{
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      return resJson
    } else {
      throw new Error('Problemas no servidor, tente mais tarde')
    }
  })
  .catch(err => toast(err, red))

  return allCreate
}

//busca todos os posts usuario logado
export const posts = async () => {
  const token = localStorage.getItem('@infoPet:token')
  const allSearch = await fetch (`${baseUrl}/posts`,{
    method: "GET",
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      console.log(resJson)
      return resJson
    } else {
      throw new Error('Problemas no servidor, tente mais tarde')
    }
  })
  .catch(err => toast(err, red))

  return allSearch
}


// buscando por id usuario logado
export const searchId = async() => {

  const token = localStorage.getItem('@infoPet:token')
  const upInfos = await fetch(`${baseUrl}/posts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()

    if(res.ok) {
      return resJson
    } else {
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err, red))

  return upInfos
}

// atualizando os posts
const updateId = async (id, body) => {
const token = localStorage.getItem('@infoPet:token')
  const update = await fetch(`${baseUrl}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  .then(async (res) =>{
    const resJson = await res.json

    if(res.ok){
      toast('Tarefa atualizada com sucesso, green')
      return resJson
    }else{
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err.message, red))

  return update
}

// deletar as informações por id
export const deleteId = async(id) => {
  const token = localStorage.getItem('@infoPet:token')
  const deleteProfile = await fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(async (res) => {
    const resJson = await res.json()
    if(res.ok) {
      toast('Perfil deletado com sucesso',green)
      return resJson
    } else {
      throw new Error(resJson.message)
    }
  })
  .catch(err => toast(err,red))

  return deleteProfile
}


posts()
// createPost()
// search()
// searchId()
// updateId()
// deleteId()
