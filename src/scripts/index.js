import { createCard } from "./render.js";
import { createPost, requestRegister } from "./requests.js";
import { toast } from "./toast.js";


const red = 'hsl(349, 69%, 55%)'

const authentication = () => {
  const token = localStorage.getItem("@infoPet:token");

  if (token) {
    location.replace("./src/pages/signup.html?");
  }
};

const newUser = () => {
  const inputs = document.querySelectorAll(".usuario__inputs");

  const button = document.querySelector(".register");

  let body = {};
  let count = 0;

  button.addEventListener("click", (event) => {
    event.preventDefault();
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      body[input.name] = input.value.trim();
      
    });

    if (count !== 0) {
      count = 0;
      return toast("Por favor preencha todos os campos para o cadastro", red);
         } 
         else {
          requestRegister(body);
         }
  });
};

authentication()
newUser()
createPost()
createCard()
