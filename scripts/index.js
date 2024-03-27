let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");

const modalCloseBtn = document.querySelector("#modal__close-button");

const profileTitle = document.querySelector("#profile__title");
const profileDescrp = document.querySelector(".profile__description");

const modalInputTitle = document.querySelector("#modat__input-title");
const modalInputDescrp = document.querySelector("#modal__input-descrp");

const modalEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = data.name;
  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalInputTitle.value;
  profileDescrp.textContent = modalInputDescrp.value;
  closePopup();
}

profileEditBtn.addEventListener("click", () => {
  modalInputTitle.value = profileTitle.textContent;
  modalInputDescrp.value = profileDescrp.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseBtn.addEventListener("click", closePopup);

modalEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);

  cardListEl.prepend(cardElement);
});
