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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileModalCloseBtn = document.querySelector("#modal__close-button");
const addCardModalCloseBtn = document.querySelector("#modal__close-button");
const profileTitle = document.querySelector("#profile__title");
const profileDescrption = document.querySelector(".profile__description");

const modalInputTitle = document.querySelector("#modal__input-title");
const modalInputDescrption = document.querySelector("#modal__input-descrption");

const addNewCardButton = document.querySelector(".profile__add-button");
const modalEditForm = document.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

// function openModal() {
//   modalInputTitle.value = profileTitle.textContent;
//   modalInputDescrption.value = profileDescrption.textContent;
//   profileEditModal.classList.add("modal_opened");
// }

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalInputTitle.value;
  profileDescrption.textContent = modalInputDescrption.value;
  closePopup();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = data.link;
  cardTitleEl.textContent = data.name;
  cardImageEl.alt = data.name;

  return cardElement;
}

modalEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditBtn.addEventListener("click", () => {
  modalInputTitle.value = profileTitle.textContent;
  modalInputDescrption.value = profileDescrption.textContent;
  openModal(profileEditModal);
});

profileModalCloseBtn.addEventListener("click", () =>
  closePopup(profileEditModal)
);

/////ADD NEW CARD////

addNewCardButton.addEventListener("click", () => openModal(profileAddModal));
addCardModalCloseBtn.addEventListener("click", () =>
  closePopup(profileAddModal)
);

initialCards.forEach((data) => {
  cardListEl.prepend(getCardElement(data));
});
