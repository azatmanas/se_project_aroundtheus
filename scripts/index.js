const initialCards = [
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");

const addCardModalCloseBtn = document.querySelector("#modal__close-add-button");
const profileTitle = document.querySelector("#profile__title");
const profileDescrption = document.querySelector(".profile__description");

const modalInputTitle = document.querySelector("#modal__input-title");
const modalInputDescrption = document.querySelector("#modal__input-url");

const addNewCardButton = document.querySelector(".profile__add-button");
const modalFormEdit = document.querySelector(".modal__form");
const addCardFormElement = document.querySelector("#add__card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleInput = addCardFormElement.querySelector("#modal__input-title");
const cardUrlInput = addCardFormElement.querySelector("#modal__input-url");

const previewImageModal = document.querySelector("#modal__image");
const previewImageEl = previewImageModal.querySelector(".modal__image");
const previewTextEl = previewImageModal.querySelector(".modal__text-preview");

const closeButtons = document.querySelectorAll(".modal__close");

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardListEl[method](cardElement);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalInputTitle.value;
  profileDescrption.textContent = modalInputDescrption.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const data = { name, link };
  renderCard(data);
  closePopup(profileAddModal);
  evt.target.reset();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewTextEl.textContent = data.name;
    openModal(previewImageModal);
  });

  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;

  return cardElement;
}

modalFormEdit.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  modalInputTitle.value = profileTitle.textContent;
  modalInputDescrption.value = profileDescrption.innerText;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

addCardModalCloseBtn.addEventListener("click", () =>
  closePopup(profileAddModal)
);

initialCards.forEach((data) => renderCard(data));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});
