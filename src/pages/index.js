import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// ELEMENTS////

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileTitle = document.querySelector("#modal__input-title");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const modalInputDescrption = document.querySelector(
  "#profile__description-input"
);
const profileDescrption = document.querySelector(".profile__description");
const profileTitleMain = document.querySelector(".profile__title");

const cardTitleInput = document.querySelector("#profile-title-input");
const modalFormEdit = document.querySelector(".modal__form");
const addFormElement = document.querySelector("#add__card-form");
const editFormElement = document.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#modal__image");
const previewImageEl = previewImageModal.querySelector(".modal__image");

// ADD NEW CARD /////

const addFormValidator = new FormValidator(config, addFormElement);
const editFormValidator = new FormValidator(config, editFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

const popupEditForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardSubmit
);
popupAddForm.setEventListeners();

const popupImage = new PopupWithImage("#modal__image");
popupImage.setEventListiners();

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

// FUNCTIONS/////

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

function handleImageClick(cardData) {
  popupImage.open(cardData);
}

function handleProfileEditSubmit(evt) {
  userInfo.setUserInfo(evt);
  popupEditForm.close();
}

function handleAddCardSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.Url });
  addFormElement.reset();
  addFormValidator.disableButton();
  popupAddForm.close();
}

// BUTTONS////

modalFormEdit.addEventListener("submit", handleProfileEditSubmit);
addFormElement.addEventListener("submit", handleAddCardSubmit);

profileEditBtn.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  profileTitle.value = cardData.title;
  modalInputDescrption.value = cardData.description;
  popupEditForm.open();
});

addNewCardButton.addEventListener("click", () => popupAddForm.open());

/////// set up /////

// const closeButtons = document.querySelectorAll(".modal__close");
// const modalInputTitle = document.querySelector("#modal__input-title");
// const modalInputDescrption = document.querySelector(
//   "#profile__description-input"
// );
// const addCardFormElement = profileAddModal.querySelector(".modal__form");
//
// const cardUrlInput = addCardFormElement.querySelector("#profile-input-url");
// const previewImageModal = document.querySelector("#modal__image");
// const previewImageEl = previewImageModal.querySelector(".modal__image");
// const previewTextEl = previewImageModal.querySelector(".modal__text-preview");

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closePopup(modal));
// });

// modalInputTitle.value = profileTitle.textContent;
// modalInputDescrption.value = profileDescrption.textContent;
// openModal(profileEditModal);

// function profileInputData() {
//   const { name, description } = userInfo.getUserInfo();
//   profileTitle.value = name;
//   profileDescrption.value = description;
//   editFormValidator.resetValidation();
//   editFormElement.open();
// }
