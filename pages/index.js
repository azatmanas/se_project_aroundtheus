import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Chicago",
    link: "https://imageio.forbes.com/specials-images/imageserve/64c3fc893e9ca5472f03e583/Chicago-River-Tourboat-Downtown-Chicago-Skyscrapers/960x0.jpg?format=jpg",
  },

  {
    name: "San Francisco",
    link: "https://worldstrides.com/wp-content/uploads/2015/07/iStock_000061296808_Large-1.jpg",
  },

  {
    name: "Miami",
    link: "https://www.islands.com/wp-content/uploads/2021/09/miami-beach-shutterstock.jpg",
  },

  {
    name: "Los Angeles",
    link: "https://static.independent.co.uk/2023/07/07/10/iStock-515064346.jpg",
  },

  {
    name: "Hawaii",
    link: "https://ik.imgkit.net/3vlqs5axxjf/TW/ik-seo/uploadedImages/Art/2023/0703/T0703HAWISLANDHOP_C_HR/What-to-know-about-island-hopping-in-Hawaii.jpg",
  },

  {
    name: "Las Vegas",
    link: "https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg",
  },
];

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormElement = document.querySelector("#add__card-form");
const editFormElement = document.querySelector(".modal__form");

const addFormValidator = new FormValidator(config, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");

const profileTitle = document.querySelector("#profile__title");
const profileDescrption = document.querySelector(".profile__description");

const modalInputTitle = document.querySelector("#modal__input-title");
const modalInputDescrption = document.querySelector(
  "#profile__description-input"
);

const addCardFormElement = profileAddModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardUrlInput = addCardFormElement.querySelector("#profile-input-url");

const addNewCardButton = document.querySelector(".profile__add-button");
const modalFormEdit = document.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#modal__image");
const previewImageEl = previewImageModal.querySelector(".modal__image");
const previewTextEl = previewImageModal.querySelector(".modal__text-preview");

const closeButtons = document.querySelectorAll(".modal__close");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverLay);
}

function closePopup(modal) {
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverLay);
  modal.classList.remove("modal_opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".modal_opened");
    closePopup(popup);
  }
}

function handleOverLay(evt) {
  if (Array.from(evt.target.classList).includes("modal_opened")) {
    closePopup(evt.target);
  }
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function handleImageClick(cardData) {
  previewTextEl.textContent = cardData.name;
  previewImageEl.src = cardData.link;
  previewImageEl.alt = cardData.name;
  openModal(previewImageModal);
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
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closePopup(profileAddModal);
  addFormValidator.disableButton();
}

modalFormEdit.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  modalInputTitle.value = profileTitle.textContent;
  modalInputDescrption.value = profileDescrption.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});
