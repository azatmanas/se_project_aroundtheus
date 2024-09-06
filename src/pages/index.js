import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import { config } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector("#profile__edit-button");
const modalInputTitle = document.querySelector("#modal__input-title");
const profileInputDescrption = document.querySelector(
  "#profile__description-input"
);
/* -------------------------------------------------------------------------- */
/*                                  ADD NEW CARD                                  */
/* -------------------------------------------------------------------------- */
const addNewCardButton = document.querySelector(".profile__add-button");
const cardForm = document.forms["card_form"];
const profileForm = document.forms["profile_form"];

/* -------------------------------------------------------------------------- */
/*                                  Api                                   */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "eac0c1a2-60c5-44c4-979d-14695d75b6b5",
    "Content-Type": "application/json",
  },
});

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

api
  .getInitialCards()
  .then((cards) => {
    section.setItems(cards);
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */
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
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeClicks,
    handleDeleteSubmit
  );
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

function handleImageClick(cardData) {
  popupImage.open(cardData);
}

const handleAvatarSubmit = ({ avatar }) => {
  editAvatar.renderLoading(true);
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.updateProfileInfo(res.avatar);
      editAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editAvatar.renderLoading(false));
};

function handleProfileEditSubmit({ name, about }) {
  popupEditForm.renderLoading(true);
  api
    .updateProfileInfo(name, about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
    });
}

function handleAddCardSubmit({ title, url }) {
  popupAddForm.renderLoading(true);

  api
    .addCard({ name: title, link: url })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      popupAddForm.close();
      popupAddForm.reset();
      addFormValidator.resetValidation();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    });
}

const modalDelete = new PopupConfirmDelete("#modal__delete");
modalDelete.setEventListeners();

function handleDeleteSubmit(card) {
  modalDelete.open();

  modalDelete.setSubmit(() => {
    modalDelete.renderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.deleteCardFromDom();
        modalDelete.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        modalDelete.renderLoading(false);
      });
  });
}

function handleLikeClicks(card) {
  if (!card.isLiked) {
    api
      .likeCard(card._id)
      .then(() => {
        card.setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
    if (card.isLiked) {
      api
        .disLikeCard(card._id)
        .then(() => {
          card.setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

api
  .getUserInfo()
  .then((data) => {
    userInfo.updateProfileInfo(data);
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* -------------------------------------------------------------------------- */
/*                                  Buttons                                   */
/* -------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();
  modalInputTitle.value = cardData.name;
  profileInputDescrption.value = cardData.description;
  popupEditForm.open();
});

addNewCardButton.addEventListener("click", () => popupAddForm.open());

/* -------------------------------------------------------------------------- */
/*                                  Validations                                   */
/* -------------------------------------------------------------------------- */
const editAvatar = new PopupWithForm("#edit-avatar-modal", handleAvatarSubmit);
editAvatar.setEventListeners();
const addFormValidator = new FormValidator(config, cardForm);
const editFormValidator = new FormValidator(config, profileForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
