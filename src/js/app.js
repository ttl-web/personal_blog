import "../scss/style.scss";
import "./openBurger.js";

const modalBtn = document.querySelectorAll("[data-modal]");
const body = document.body;
const modalCancel = document.querySelectorAll(".popup__cancel");
const modal = document.querySelectorAll(".popup");

modalBtn.forEach((item) => {
  item.addEventListener("click", (event) => {
    let $this = event.currentTarget;
    let modalId = $this.getAttribute("data-modal");
    let modal = document.getElementById(modalId);
    let modalContent = modal.querySelector(".popup__content");

    modalContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    modal.classList.add("show");
    body.classList.add("no-scroll");
    setTimeout(() => {
      modalContent.style.transform = "none";
      modalContent.style.opacity = "1";
    }, 100);
  });
});

modalCancel.forEach((item) => {
  item.addEventListener("click", (event) => {
    let currentModal = event.currentTarget.closest(".popup");
    closeModal(currentModal);
  });
});

modal.forEach((item) => {
  item.addEventListener("click", (event) => {
    let currentModal = event.currentTarget;
    closeModal(currentModal);
  });
});

function closeModal(currentModal) {
  let modalContent = currentModal.querySelector(".popup__content");
  modalContent.removeAttribute("style");
  setTimeout(() => {
    currentModal.classList.remove("show");
    body.classList.remove("no-scroll");
  }, 200);
}
