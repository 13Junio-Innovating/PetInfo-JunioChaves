export const render = (array) => { 
  const list = document.querySelector('.list__container')
  
  if (!list) return;

  list.innerHTML = ''

  if (array.length === 0) {
      list.innerHTML = '<p>Nenhum post encontrado.</p>'
      return
  }

  array.forEach(user => { // user is actually a post
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
  
    cardFoto.src = "../image/img/Ellipse 1.png"
    cardFoto.alt = "Foto avatar"
  
    cardDescription.classList.add("card__description")
    cardDescription.innerText = user.content || user.description // Handle different field names
  
    cardEdit.classList.add('button__edit')
    cardEdit.innerText = 'Editar'
    cardEdit.dataset.usersId = user.id
  
    cardDelete.classList.add('button__delete')
    cardDelete.innerText = 'Excluir'
    cardDelete.dataset.usersId = user.id

    cardAcess.classList.add("link") // Removed dot
    cardAcess.dataset.usersid = user.id
    cardAcess.innerText = "Acessar publicação"
    cardBar.classList.add("card__bar")
  
    cardtext.append(cardDescription, cardBar, cardAcess)
    cardButtonsContainer.append(cardEdit, cardDelete)
    // Check if current user is owner? For now show buttons for all or logic is in backend.
    // Assuming user can manage all posts for this simple app or logic is handled elsewhere.
    
    cardHeaderContainer.append(cardDiv,cardFoto,cardtitle,cardDate)
    // cardContainer.appendChild(cardHeaderContainer) // Header
    // cardContainer.appendChild(cardtext) // Content
    // cardContainer.appendChild(cardButtonsContainer) // Actions
    
    // Re-arranging based on structure
    cardContainer.append(cardHeaderContainer, cardtext, cardButtonsContainer)

    list.appendChild(cardContainer)
  })
}    