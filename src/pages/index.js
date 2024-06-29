import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const addFormElement = document.querySelector("#add__card-form");
const editFormElement = document.querySelector(".modal__form");

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

const addFormValidator = new FormValidator(config, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, editFormElement);
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
popupImage.setEventListeners();

const userInfo = new UserInfo(profileEditModal, profileDescrption);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

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

function 

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = userInfo.value;
  const link = userInfo.value;
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
