import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// ELEMENTS////

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "77570098-8218-4305-94d2-93e61885b891",
    "Content-Type": "application/json",
  },
});

const profileEditBtn = document.querySelector("#profile__edit-button");
const modalInputTitle = document.querySelector("#modal__input-title");
const profileInputDescrption = document.querySelector(
  "#profile__description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const cardForm = document.forms["card_form"];
const profileForm = document.forms["profile_form"];
// ADD NEW CARD /////

const addFormValidator = new FormValidator(config, cardForm);
const editFormValidator = new FormValidator(config, profileForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

api.getInitialCards().then((cards) => {
  const section = new Section(
    {
      items: cards,
      renderer: renderCard,
    },
    ".cards__list"
  );
  section.renderItems(cards);
});

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

// FUNCTIONS/////
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

function handleImageClick(name, link) {
  popupImage.open(name, link);
}

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
  popupEditForm.close();
}

function handleAddCardSubmit(cardData) {
  renderCard({ name: cardData.title, link: cardData.url });
  cardForm.reset();
  addFormValidator.disableButton();
  popupEditForm.close();
}

// BUTTONS////

profileEditBtn.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  modalInputTitle.value = cardData.title;
  profileInputDescrption.value = cardData.description;
  popupEditForm.open();
});

addNewCardButton.addEventListener("click", () => popupAddForm.open());
