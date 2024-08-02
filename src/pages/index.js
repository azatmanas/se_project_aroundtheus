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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "eac0c1a2-60c5-44c4-979d-14695d75b6b5",
});

let section;
api
  .getAll()
  .then(([initialCards, userData]) => {
    userInfo.updateProfileImage(userData.avatar);
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    section = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
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
popupImage.setEventListeners();

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatar: ".profile__image",
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

const formValidators = {};
const forms = document.querySelectorAll(".modal__form");
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidators[form.id] = formValidator;
  formValidator.enableValidation();
});

const handleAvatarSubmit = ({ avatar }) => {
  editAvatar.setLoading(true);
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.updateProfileImage(res.avatar);
      editAvatar.close();
      formValidators["#edit-avatar-form"].toggleButtonState();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editAvatar.setLoading(false));
};

const editAvatar = new PopupWithForm("#edit-avatar-modal", handleAvatarSubmit);
editAvatar.setEventListeners();

function handleProfileEditSubmit(data) {
  api.updateProfileInfo(data).then((res) => {
    userInfo.setUserInfo(res);
  });
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
