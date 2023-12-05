let isEdit = false;
const cardsContainer = window.document.querySelector(".main-page_cards");
const loaderContainer = document.querySelector('.loader-container');
function getInfo(){
  return fetch('http://localhost:3000/creatorInfo').then((res) => res.json()).catch((e) => console.error(e));
}
function getCard(id){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return fetch(`http://localhost:3000/items/${id}`).then((res) => {
    loaderContainer.style.display = 'none';
    return res.json()})
}
function getCards(){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return fetch('http://localhost:3000/items').then((res) => {
    loaderContainer.style.display = 'none';
    return res.json()}
    )
}
function createCard(data){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return fetch('http://localhost:3000/items', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
  body:JSON.stringify(data)
  }).then((res) => {
    loaderContainer.style.display = 'none';
    return res.json()}).catch((e) => console.error(e));
}
function deleteCard(id){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return fetch(`http://localhost:3000/items/${id}`,{
    method: 'DELETE'
  }).then(() => loaderContainer.style.display = 'none').catch((e) => console.error(e));
}
function editCard(data){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return fetch(`http://localhost:3000/items/${data.id}`, {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(data)
  }).then((res) =>  {
    loaderContainer.style.display = 'none';
    return res.json()}).catch((e) => console.error(e));
}
function deleteAllCards(){
  if(loaderContainer.style.display !== 'flex'){
    loaderContainer.style.display = 'flex'
  }
  return getCards().then((data) => data.forEach((item) => deleteCard(item.id))).then(() => loaderContainer.style.display = 'none').catch((e) => console.error(e));
}
function addCard({ title, img, body, id, provider }) {
  const container = document.createElement("div");
  container.classList.add("main-page_cards__card");
  container.id = id;
  const info = document.createElement("div");
  info.classList.add("main-page_cards__card__info");
  const titleContainer = document.createElement("h4");
  titleContainer.classList.add("title");
  titleContainer.append(document.createTextNode(title));
  const bodyContainer = document.createElement("p");
  bodyContainer.classList.add("body");
  bodyContainer.append(document.createTextNode(`Описание: ${body}`));
  const providerContainer = document.createElement("p");
  providerContainer.classList.add("provider");
  providerContainer.append(document.createTextNode(`Поставщик: ${provider}`));
  const idContainer = document.createElement("p");
  idContainer.classList.add("id");
  idContainer.append(document.createTextNode(`Код товара: ${id}`));
  const imgContainer = document.createElement("img");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("main-page_cards__buttons");
  const editBtn = document.createElement("button");
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getCard(id).then((res) => editItem(res));
  });
  editBtn.append(document.createTextNode("Edit"));
  const deleteBtn = document.createElement("button");
  deleteBtn.append(document.createTextNode("Delete"));
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteItem(id);
  });
  imgContainer.src = img;
  imgContainer.style.height = "50%";
  imgContainer.style.width = "100%";
  info.append(titleContainer);
  info.append(bodyContainer);
  info.append(providerContainer);
  info.append(idContainer);
  buttonContainer.append(editBtn);
  buttonContainer.append(deleteBtn);
  container.append(imgContainer);
  container.append(info);
  container.append(buttonContainer);
  return container;
}
function setup() {
  const data = {
    "id": 1,
    "title": "Firt item",
    "body": "Крутой айтем",
    "img": "https://sun9-9.userapi.com/impg/0sALSBNn1UiE2p2x1Fw68lL4M56hxISRHjlhUQ/I74shcNHPTo.jpg?size=500x471&quality=95&sign=f8b7fbdf7b50cec1538266e4ab4c4f8b&type=album",
    "code": "1",
    "provider": "ООО ТрансОбщажный сервис"
  };
  deleteAllCards().then(() => createCard(data).then(() => window.location.reload()));
}
function addItem(item) {
  const cardsContainer = window.document.querySelector(".main-page_cards");
  cardsContainer.append(addCard(item));
  createCard(item);
}
function editItem(data) {
  isEdit = true;
  const form = document.querySelector(".main-page .add-form");
  const inputs = form.querySelectorAll("input");
  const textarea = form.querySelector("textarea");
  const button = document.querySelector(".add-button");
  button.textContent = "Изменить";
  inputs.forEach((item) => (item.value = data[item.id]));
  textarea.value = data.body;
  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const prefix = {
        body: "Описание",
        provider: "Поставщик",
        id: "Код товара",
      };
      const obj = {};
      inputs.forEach((item) => (obj[item.id] = item.value));
      obj.body = textarea.value;
      editCard(obj);
      inputs.forEach((item) => (item.value = ""));
      textarea.value = "";
      button.textContent = "Добавить";
      const cardImg = window.document
        .querySelector(".main-page_cards")
        .querySelector(`[id="${data.id}"]`)
        .querySelector("img");
      const cardInfo = window.document
        .querySelector(".main-page_cards")
        .querySelector(`[id="${data.id}"]`)
        .querySelector(".main-page_cards__card__info").childNodes;
      cardInfo.forEach((item) =>
        item.className === "title"
          ? (item.textContent = obj[item.className])
          : (item.textContent = `${prefix[item.className]}: ${
              obj[item.className]
            }`)
      );
      cardImg.src = obj.img;
      document.getElementById(data.id).id = obj.id;
      isEdit = false;
    },
    {once:true}
  );
}
function deleteItem(id) {
  const cards = window.document.querySelector(".main-page_cards");
  const card = cards.querySelector(`[id="${id}"]`);
  deleteCard(id);
  card.remove();
}
getInfo().then((res) => {
  const headerInfo = document.querySelector('.header__info');
  headerInfo.innerHTML = `${res.group} ${res.name} <a href=${res.repo} target="_blank">${res.repo}</a>`
})
getCards().then((res) => {
  return res.map((item) => cardsContainer.append(addCard(item)))
});
const setupButton = document.querySelector(".setup");
const form = document.querySelector(".main-page .add-form");
setupButton.addEventListener("click", (e) => {
  e.preventDefault();
  setup();
});
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!isEdit) {
    const obj = {};
    const inputs = evt.target.querySelectorAll("input");
    const textarea = evt.target.querySelector("textarea");
    inputs.forEach((item) => (obj[item.id] = item.value));
    obj.id = +obj.id;
    obj.body = textarea.value;
    addItem(obj);
    inputs.forEach((item) => (item.value = ""));
    textarea.value = "";
  }
});
