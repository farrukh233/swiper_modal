import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper(".swiper-container", {
  modules: [Navigation, Pagination],
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
