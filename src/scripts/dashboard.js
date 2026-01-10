import { createPost, updateId, deleteId, posts } from "./requests.js";
import { toast } from "./toast.js";
import { render } from "./render.js";

const baseUrl = 'http://localhost:3333'
const red = 'hsl(349, 69%, 55%)'

const authentication = () => {
  const token = localStorage.getItem('@infoPet:token')

  if (!token) {
    location.replace('../../')
  }
}

const loadPosts = async () => {
  const allPosts = await posts()
  render(allPosts)
}

const newPost = () => {
  const inputs = document.querySelectorAll(".create__newPost")
  const button = document.querySelector(".submit__newPost")
  const newPostModal = document.querySelector('#modalCreate')
  const post = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        count++
      }

      post[input.name] = input.value
    })

    if (count !== 0) {
      count = 0
      toast('Por favor preencha todos os campos', red)
    } else {
      await createPost(post)
      newPostModal.close()

      inputs.forEach(input => {
        input.value = ''
      })
    }
  })
}

let currentEditId = null;

const editNewPost = () => {
  const inputs = document.querySelectorAll(".create__editNewPost")
  const button = document.querySelector("#addPublicEdit")
  const editNewPostModal = document.querySelector('#modalEdit')
  const post = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        count++
      }

      post[input.name] = input.value
    })

    if (count !== 0) {
      count = 0
      toast('Por favor preencha todos os campos', red)
    } else {
      if (currentEditId) {
        await updateId(currentEditId, post)
        editNewPostModal.close()
        inputs.forEach(input => {
          input.value = ''
        })
        currentEditId = null
        setTimeout(() => location.reload(), 1000)
      }
    }
  })
}

// Abre modal
const openModal = () => {
  const btn = document.querySelector("#openModal");
  const dialog = document.querySelector("#modalCreate")

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    dialog.showModal()
  })
}

// Função para fechar o modal
const closeModal = () => {
  const closeButtons = document.querySelectorAll(".closeModalButton")
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const modalId = btn.dataset.modal
      const modal = document.getElementById(modalId)
      if (modal) modal.close()
    })
  })
}

const handlePostActions = () => {
  const list = document.querySelector('.list__container')

  if (list) {
    list.addEventListener('click', async (event) => {
      if (event.target.classList.contains('button__edit')) {
        const id = event.target.dataset.usersId
        currentEditId = id
        const modal = document.querySelector("#modalEdit")
        modal.showModal()
      }

      if (event.target.classList.contains('button__delete')) {
        const id = event.target.dataset.usersId
        if (confirm("Tem certeza que deseja excluir?")) {
          await deleteId(id)
          setTimeout(() => location.reload(), 1000)
        }
      }
    })
  }
}

authentication()
loadPosts()
editNewPost()
newPost()
openModal()
closeModal()
handlePostActions()

