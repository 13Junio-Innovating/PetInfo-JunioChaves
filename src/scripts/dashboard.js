import { createPost } from "./requests.js";
import { toast } from "./toast.js";

const baseUrl = 'http://localhost:3333'
const red = 'hsl(349, 69%, 55%)'

const authentication = () => {
  const token = localStorage.getItem('@petInfo:token')

  if(!token) {
    location.replace('../../')
  }
}

const newPost = () => {
  const inputs = document.querySelectorAll(".create__newPost")
  const button = document.querySelector(".submit__newPost")
  const newPostModal = document.querySelector('.newPost')
  const post = {}
  let count = 0

  button.addEventListener('click', (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if(input.value.trim() === '') {
        count++
      }

      post[input.name] = input.value
      createPost(post)
    })

    if(count !== 0) {
      count = 0
      toast('Por favor preencha todos os campos', red)
    } else {
      newPostModal.close()

      inputs.forEach(input => {
        input.value = ''
      })
    }
  })
}

const editNewPost = () => {
  const inputs = document.querySelectorAll(".create__editNewPost")
  const button = document.querySelector(".submit__editNewPost")
  const editNewPostModal = document.querySelector('.editNewPost')
  const post = {}
  let count = 0

  button.addEventListener('click', (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if(input.value.trim() === '') {
        count++
      }

      post[input.name] = input.value
    })

    if(count !== 0) {
      count = 0
      toast('Por favor preencha todos os campos', red)
    } else {
      editNewPostModal.close()

      inputs.forEach(input => {
        input.value = ''
      })
    }
  })
}



// Abre modal
const openModal = () => {
  const btn = document.querySelector("#openModal");
  const dialog = document.querySelector("#myModal")

  btn.addEventListener('click', (e) => {
      e.preventDefault()
      dialog.showModal()
  })
  
  }
    
    // Função para fechar o modal
  const closeModal = () => {
  const close = document.getElementById("closeModalButton")
  const modal = document.querySelector("#myModal")
  console.log(close)
  close.addEventListener('click', (e) =>{
      e.preventDefault()
      modal.close()
  })
  }

authentication()
editNewPost()
newPost()
openModal()
closeModal()

