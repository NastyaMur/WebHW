let isEdit = false;
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
    editItem({ title, img, body, id, provider });
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
  window.localStorage.clear();
  window.location.reload();
}
function addItem(item) {
  const cardsContainer = window.document.querySelector(".main-page_cards");
  cardsContainer.append(addCard(item));
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
      const cards = JSON.parse(window.localStorage.getItem("cards"));
      const obj = {};
      inputs.forEach((item) => (obj[item.id] = item.value));
      obj.body = textarea.value;
      let indexOf = -1;
      cards.forEach((item, index) => {
        if (+obj.id === item.id) {
          indexOf = index;
        }
      });
      cards[indexOf] = obj;
      window.localStorage.setItem("cards", JSON.stringify(cards));
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
      isEdit = false;
    },
    { once: true }
  );
}
function deleteItem(id) {
  const cards = window.document.querySelector(".main-page_cards");
  const cardsStorage = JSON.parse(window.localStorage.getItem("cards"));
  const card = cards.querySelector(`[id="${id}"]`);
  const newCards = cardsStorage.filter((item) => item.id !== id);
  window.localStorage.setItem("cards", JSON.stringify(newCards));
  card.remove();
}
document.addEventListener("DOMContentLoaded", function () {
  const cards = JSON.parse(window.localStorage.getItem("cards"));
  const cardsContainer = window.document.querySelector(".main-page_cards");
  if (cards) {
    cards.map((item) => cardsContainer.append(addCard(item)));
  } else {
    const cards = [
      {
        title: "TestName1",
        img: "https://sun9-9.userapi.com/impg/0sALSBNn1UiE2p2x1Fw68lL4M56hxISRHjlhUQ/I74shcNHPTo.jpg?size=500x471&quality=95&sign=f8b7fbdf7b50cec1538266e4ab4c4f8b&type=album",
        body: "Класс",
        id: 1,
        provider: "Dog",
      },
      {
        title: "TestName2",
        img: "https://sun9-9.userapi.com/impg/0sALSBNn1UiE2p2x1Fw68lL4M56hxISRHjlhUQ/I74shcNHPTo.jpg?size=500x471&quality=95&sign=f8b7fbdf7b50cec1538266e4ab4c4f8b&type=album",
        body: "Класс2",
        id: 2,
        provider: "Dog 2",
      },
    ];
    cards.map((item) => cardsContainer.append(addCard(item)));
    window.localStorage.setItem("cards", JSON.stringify(cards));
  }
});
const setupButton = document.querySelector(".setup");
const form = document.querySelector(".main-page .add-form");
setupButton.addEventListener("click", setup);
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!isEdit) {
    const cards = JSON.parse(window.localStorage.getItem("cards"));
    const obj = {};
    const inputs = evt.target.querySelectorAll("input");
    const textarea = evt.target.querySelector("textarea");
    inputs.forEach((item) => (obj[item.id] = item.value));
    obj.body = textarea.value;
    cards.push(obj);
    window.localStorage.setItem("cards", JSON.stringify(cards));
    addItem(obj);
    inputs.forEach((item) => (item.value = ""));
    textarea.value = "";
  }
});
