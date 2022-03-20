// отдельный модуль
class Counter {
  _count = 0;

  constructor(params) {
    this._inc_selector = params.inc_selector;
    this._dec_selector = params.dec_selector;
    this._onCounterUpdate = params.onCounterUpdate ?? function () {};
  }

  init() {
    const inc_elem = document.querySelector(this._inc_selector);
    const dec_elem = document.querySelector(this._dec_selector);
    inc_elem.addEventListener("click", this._incCount);
    dec_elem.addEventListener("click", this._decCount);
  }

  _incCount = () => {
    this._count += 1;
    this._onCounterUpdate();
  };

  _decCount = () => {
    this._count = this._count - 1 < 0 ? 0 : this._count - 1;
    this._onCounterUpdate();
  };

  reset() {
    this._count = 0;
    this._onCounterUpdate();
  }

  getCurrentValue() {
    return this._count;
  }

  destroy() {
    this.reset();
    const inc_elem = document.querySelector(this._inc_selector);
    const dec_elem = document.querySelector(this._dec_selector);
    inc_elem.removeEventListener("click", this._incCount);
    dec_elem.removeEventListener("click", this._decCount);
  }
}

// отдельный модуль
class Modal {
  constructor(params) {
    this._main_moda_ref = params.main_wrapper_ref; // querySelector('#modal')
    this._close_btn_ref = params.close_btn_ref; // querySelector('#modal_close_btn')
    this._modal_counter = params.modal_counter;
    this._onClose = params.onClose ?? function () {};
    this._close_btn_ref.onclick = this.hide.bind(this);
  }

  show() {
    this._main_moda_ref.style.display = "block";
  }

  hide() {
    this._onClose();
    this._main_moda_ref.style.display = "none";
  }

  updateCounter(value) {
    this._modal_counter.innerText = value;
  }
}

class Slide {
  _swiper = null;

  constructor(params) {
    this._main_wrapper = params.main_wrapper;
    this._next_el = params.next_el;
    this._prev_el = params.prev_el;
    this._activeIndexChange = params.activeIndexChange ?? function () {};
  }

  init() {
    this._swiper = new Swiper(this._main_wrapper, {
      loop: true,
      on: {
        activeIndexChange: this._activeIndexChange,
      },
      navigation: {
        nextEl: this._next_el,
        prevEl: this._prev_el,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  destroy() {
    this._swiper = null;
  }
}

// класс для основного счетчика
class MainCounter {
  constructor(main_counter_ref) {
    this._main_counter_ref = main_counter_ref;
  }
  update(value) {
    this._main_counter_ref.innerText = value;
  }
}

//
class MainInit {
  constructor(show_btn_ref) {
    this._show_btn_ref = show_btn_ref;

    //
    this._main_counter_instance = new MainCounter(
      document.querySelector("#menu_counter")
    );

    // инстарнс счетчика
    this._counter_instance = new Counter({
      inc_selector: "#buttonCountPlus",
      dec_selector: "#buttonCountMinus",
      onCounterUpdate: this.onCounterUpdate.bind(this),
    });

    // инстарнс модального окна
    this._modal_instance = new Modal({
      main_wrapper_ref: document.querySelector("#modal"),
      close_btn_ref: document.querySelector("#swiper_close"),
      modal_counter: document.querySelector("#buttonCountNumber"),
      onClose: this.onCloseModal.bind(this),
    });

    // инстарнс cлайдера
    this._slide_instance = new Slide({
      main_wrapper: ".swiper-container",
      next_el: ".swiper-button-next",
      prev_el: ".swiper-button-prev",
      activeIndexChange: this.onChangeSlide.bind(this),
    });

    this._show_btn_ref.onclick = this.tryShowModal.bind(this);
  }

  onCloseModal() {
    this._main_counter_instance.update(
      this._counter_instance.getCurrentValue()
    );
    this._counter_instance.destroy();
    this._slide_instance.destroy();
  }

  onChangeSlide() {
    this._counter_instance.reset();
  }

  onCounterUpdate() {
    this._modal_instance.updateCounter(
      this._counter_instance.getCurrentValue()
    );
  }

  tryShowModal() {
    // покажем модальное окно
    this._modal_instance.show();

    // инициализируес свайпер
    this._counter_instance.init();
    this._slide_instance.init();
  }
}

//
new MainInit(document.querySelector("#menu_open_modal"));

/*
const menu = document.querySelector(".menu");

const btn = document.querySelector(".menu__button");

btn.addEventListener("click", () => {
  menu.style.display = "none;";
});
*/
