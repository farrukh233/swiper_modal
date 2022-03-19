let count = document.getElementById("buttonCountNumber");
const swiper_close = document.querySelector(".swiper-close");
const btn = document.querySelector(".menu__button");
const modal = document.querySelector(".modal");
const wrapper1 = document.querySelector(".menu");
let title = document.querySelector(".menu__count");

title = count.innerHTML;

swiper_close.addEventListener("click", () => {
  modal.style.display = "none";
  wrapper1.style.display = "block";
});

btn.addEventListener("click", () => {
  modal.style.display = "block";
  wrapper1.style.display = "none";
});

document.getElementById("buttonCountPlus").onclick = function () {
  let countPlus = count.innerHTML;
  if (+countPlus <= 20) {
    count.innerHTML++;
  }
};

document.getElementById("buttonCountMinus").onclick = function () {
  let countMinus = count.innerHTML;
  if (+countMinus >= 1) {
    count.innerHTML--;
  }
};
