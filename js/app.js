(() => {
    "use strict";
    const burger = document.getElementById("sidebarToggle");
    document.getElementById("sidebar");
    const page = document.getElementById("page");
    const body = document.body;
    burger.addEventListener("click", (event => {
        if (body.classList.contains("show-sidebar")) closeSidebar(); else showSidebar();
    }));
    function showSidebar() {
        let mask = document.createElement("div");
        mask.classList.add("page__mask");
        mask.addEventListener("click", closeSidebar);
        page.appendChild(mask);
        body.classList.add("show-sidebar");
    }
    function closeSidebar() {
        body.classList.remove("show-sidebar");
        document.querySelector(".page__mask").remove();
    }
    const textArea = document.querySelectorAll("[data-autoresize");
    textArea.forEach((item => {
        let textAreaH = item.offsetHeight;
        item.addEventListener("input", (event => {
            let $this = event.target;
            $this.style.height = textAreaH + "px";
            $this.style.height = $this.scrollHeight + "px";
        }));
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const form = document.getElementById("form");
        form.addEventListener("submit", formSend);
        async function formSend(e) {
            e.preventDefault();
            let error = formValidate(form);
            let formData = new FormData(form);
            if (0 === error) {
                let response = await fetch("componetns/sendmail/sendmail.php", {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                } else alert("Ошибка!");
            } else alert("Заполните обязательные поля!");
        }
        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll("._req");
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
                if (input.classList.contains("_email")) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if ("" === input.value) {
                    formAddError(input);
                    error++;
                }
            }
            return error;
        }
        function formAddError(input) {
            input.parentElement.classList.add("_error");
            input.classList.add("_error");
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove("_error");
            input.classList.remove("_error");
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
    }));
    const modalBtn = document.querySelectorAll("[data-modal]");
    const app_body = document.body;
    const modalCancel = document.querySelectorAll(".popup__cancel");
    const modal = document.querySelectorAll(".popup");
    modalBtn.forEach((item => {
        item.addEventListener("click", (event => {
            let $this = event.currentTarget;
            let modalId = $this.getAttribute("data-modal");
            let modal = document.getElementById(modalId);
            let modalContent = modal.querySelector(".popup__content");
            modalContent.addEventListener("click", (event => {
                event.stopPropagation();
            }));
            modal.classList.add("show");
            app_body.classList.add("no-scroll");
            setTimeout((() => {
                modalContent.style.transform = "none";
                modalContent.style.opacity = "1";
            }), 100);
        }));
    }));
    modalCancel.forEach((item => {
        item.addEventListener("click", (event => {
            let currentModal = event.currentTarget.closest(".popup");
            closeModal(currentModal);
        }));
    }));
    modal.forEach((item => {
        item.addEventListener("click", (event => {
            let currentModal = event.currentTarget;
            closeModal(currentModal);
        }));
    }));
    function closeModal(currentModal) {
        let modalContent = currentModal.querySelector(".popup__content");
        modalContent.removeAttribute("style");
        setTimeout((() => {
            currentModal.classList.remove("show");
            app_body.classList.remove("no-scroll");
        }), 200);
    }
})();