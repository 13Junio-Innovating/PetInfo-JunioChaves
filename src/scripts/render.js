import { deleteId, posts } from "./requests.js"
import { toast } from "./toast.js"


export const render = (array) => { 
    const list = document.querySelector('.list__container')
    
    if(array.message) {
      toast(red, array.message)
      array = []
    }
  
    list.innerHTML = ''
  
    array.forEach(posts => {
      const card = createCard(posts)
  
      list.appendChild(card)
      console.log(list)
    })

    deleteId()
    
  } 

  const acessButonsEvent = () => {
    const buttons = document.querySelectorAll("button")

    buttons.forEach(button => {
      button.addEventListener('click', async () =>{
        const modal = document.querySelector(".modal__postCompleted")

        const users = await posts()

       users.find((user) => user.id === Number(".link"))
      })
    })
  } 
  
  export const createCard = async () => {
    const cardUl = document.querySelector(".list__container")
    const users = await posts()

    users.forEach(user => {
      const cardContainer = document.createElement("li")
      const cardHeaderContainer = document.createElement("header")
      const cardDiv = document.createElement('div') 
      const cardFoto = document.createElement("img") 
      const cardtitle = document.createElement("h2") 
      const cardDate = document.createElement("p") 
      const cardButtonsContainer = document.createElement("div") 
      const cardEdit = document.createElement("button") 
      const cardDelete = document.createElement("button") 
      const cardtext = document.createElement('div') 
      const cardDescription = document.createElement("p") 
      const cardBar = document.createElement("p") 
      const cardAcess = document.createElement('button')
    
      cardContainer.classList.add("card__container")
    
      cardHeaderContainer.classList.add("card__header")
    
      cardtitle.classList.add("card__title")
      cardtitle.innerText = user.title
    
      cardButtonsContainer.classList.add("card__buttons--container")
    
      cardFoto.src = "../src/image/img/Ellipse2.svg"
      cardFoto.alt = "Foto avatar"
    
      cardDescription.classList.add("card__description")
    
    
      cardEdit.classList.add('button__edit')
      cardEdit.innerText = 'Editar'
      cardEdit.dataset.usersId = user.id
    
      cardDelete.classList.add('button__delete')
      cardDelete.innerText = 'Excluir'
      cardDelete.dataset.usersId = user.id
  
      cardAcess.classList.add(".link")
      cardAcess.dataset.usersid = user.id
      cardAcess.innerText = "Acessar publicação"
      cardBar.classList.add("card__bar")
    
      cardtext.append(cardDescription, cardBar, cardAcess)
      cardButtonsContainer.append(cardEdit, cardDelete)
      cardHeaderContainer.append(cardDiv,cardFoto,cardtitle,cardDate)
      cardContainer.appendChild(cardHeaderContainer)
      cardUl.appendChild(cardContainer)
    
    })

    acessButonsEvent()
  }
  createCard()    