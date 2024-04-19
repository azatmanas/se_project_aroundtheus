const initialCards = [
  {
    name: "Chicago",
    link: "https://imageio.forbes.com/specials-images/imageserve/64c3fc893e9ca5472f03e583/Chicago-River-Tourboat-Downtown-Chicago-Skyscrapers/960x0.jpg?format=jpg",
    // name: "Yosemite Valley",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "San Francisco",
    link: "https://worldstrides.com/wp-content/uploads/2015/07/iStock_000061296808_Large-1.jpg",
    // name: "Lake Louise",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Miami",
    link: "https://www.islands.com/wp-content/uploads/2021/09/miami-beach-shutterstock.jpg",
    // name: "Bald Mountains",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Los Angeles",
    link: "https://static.independent.co.uk/2023/07/07/10/iStock-515064346.jpg",
    // name: "Latemar",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Hawaii",
    link: "https://ik.imgkit.net/3vlqs5axxjf/TW/ik-seo/uploadedImages/Art/2023/0703/T0703HAWISLANDHOP_C_HR/What-to-know-about-island-hopping-in-Hawaii.jpg",
    // name: "Vanoise National Park",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Las Vegas",
    link: "https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg",
    // name: "Lago di Braies",
    // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");

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
  modalInputDescrption.value = modalInputDescrption.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

initialCards.forEach((data) => renderCard(data));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});
