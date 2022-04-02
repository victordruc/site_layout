// Initialization slider ------------------------------------->
(function () {
  const dotsContainer = document.getElementById("dotsContainer");
  $("#sliderHero").on("init", function (event, slick) {
    dotsContainer.append(slick.$dots[0]);
  });

  $("#sliderHero").on("breakpoint", function (event, slick) {
    dotsContainer.append(slick.$dots[0]);
  });

  $("#sliderHero").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: $("#sliderHero+.slider-hero-action .next-btn"),
    prevArrow: $("#sliderHero+.slider-hero-action .prev-btn"),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $("#sliderArticles").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    // nextArrow: $("#sliderHero+.slider-hero-action .next-btn"),
    // prevArrow: $("#sliderHero+.slider-hero-action .prev-btn"),
  });
})();
// Initialization slider -------------------------------------<

// Open search ----------------------------------------------->
(function () {
  const searchBtn = document.querySelectorAll(".search-navbar-btn");
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;
  searchBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInput.classList.toggle("search-navbar-active");
    });
  });

  searchInput.addEventListener("click", (e) => e.stopPropagation());
  document.body.addEventListener("click", (e) =>
    searchInput.classList.remove("search-navbar-active")
  );
})();
// Open search -----------------------------------------------<

// Toggle registration menu ---------------------------------->
function openRegistrationMenu() {
  const btnOpen = document.querySelector(".toggle-reg-menu");
  const menu = document.querySelector(".section-registration-menu-wrapper");
  if (!btnOpen || !menu) return;

  btnOpen.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open-menu");
  });

  menu.addEventListener("click", (e) => e.stopPropagation());

  document.body.addEventListener("click", () =>
    menu.classList.remove("open-menu")
  );
}

openRegistrationMenu();
// Toggle registration menu ----------------------------------<

// Show and hide password on the input ------------------------>
function buttonTogglePassword() {
  const btn = document.querySelectorAll(".btn-toggle-pass");
  btn.forEach((elem) => {
    elem.addEventListener("pointerdown", ({ currentTarget }) => {
      const input = currentTarget.parentElement.querySelector("input");
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  });
}

buttonTogglePassword();
// Show and hide password on the input ------------------------<

// Autoresize input in personal cabinet ---------------------->
function autoResize() {
  const autoResize = document.querySelectorAll(".autoresize");
  autoResize.forEach((input) => {
    resizeElementAction(input);
    input.addEventListener("input", (e) => {
      const { target } = e;
      resizeElementAction(target);
    });
  });
}

function resizeElementAction(element) {
  element.style.width = "fit-content";
  element.style.width = element.scrollWidth + "px";
  element.style.width = element.scrollWidth + 10 + "px";
}

autoResize();
// Autoresize input in personal cabinet ----------------------<

// Change user information ------------------------------------>
function cabinetDetailChange() {
  const action = document.querySelectorAll(".cabinet-detail-action");
  const btn = document.querySelectorAll(".btn-toggle-pass");

  btn.forEach((item) => {
    item.addEventListener("pointerdown", ({ currentTarget }) => {
      const actionElement = currentTarget.parentElement.querySelector(
        ".cabinet-detail-action"
      );
      setTimeout(() => {
        actionElement.dispatchEvent(new Event("click"));
      }, 0);
    });
  });

  btn.forEach((item) => {
    item.addEventListener("touchstart", ({ currentTarget }) => {
      const actionElement = currentTarget.parentElement.querySelector(
        ".cabinet-detail-action"
      );
      setTimeout(() => {
        actionElement.dispatchEvent(new Event("click"));
      }, 0);
    });
  });

  action.forEach((el) => {
    el.addEventListener("click", ({ currentTarget }) => {
      const thisElement = currentTarget;
      const siblingElement = currentTarget.parentElement.querySelectorAll(
        ":not(.cabinet-detail-show)"
      );
      const valueInitial = thisElement.nextElementSibling.value;
      thisElement.style.display = "none";
      siblingElement.forEach((item) => (item.style.display = "block"));
      resizeElementAction(thisElement.nextElementSibling);
      const type = thisElement.nextElementSibling.type;
      thisElement.nextElementSibling.type = "text";
      const length = thisElement.nextElementSibling.value.length;
      thisElement.nextElementSibling.setSelectionRange(length, length);
      thisElement.nextElementSibling.type = type;
      thisElement.nextElementSibling.addEventListener(
        "blur",
        () => {
          thisElement.style.display = null;
          siblingElement.forEach((item) => (item.style.display = null));
        },
        { once: true }
      );
      thisElement.nextElementSibling.addEventListener(
        "change",
        ({ currentTarget }) => {
          if (currentTarget.value) {
            thisElement.innerText = currentTarget.value;
          } else {
            thisElement.innerText = valueInitial;
            currentTarget.value = valueInitial;
          }
        },
        { once: true }
      );
    });
  });
}

cabinetDetailChange();
// Change user information ------------------------------------<

function emulationElement(number) {
  const container = document.querySelector(".doctors-list");

  if (!container) return;

  for (let i = 0; i < number - 1; i++) {
    const element = document.querySelector(".doctors-item").cloneNode(true);
    if (!element) return;
    container.append(element);
  }
}

emulationElement(6);

function changeTopNavbarMobile() {
  const btn = document.querySelector(".navbar-toggler");
  const user = document.querySelector(".nav-user-mob");
  const lang = document.querySelector(".lang-setup-mob");
  if (!btn || !user || !lang) return;

  const config = {
    attributes: true,
  };

  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if(mutation.target.classList.contains("collapsed")) {
        user.classList.remove("d-none")
        lang.classList.add("d-none")
      } else {
        user.classList.add("d-none")
        lang.classList.remove("d-none")
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(btn, config);
}

changeTopNavbarMobile()