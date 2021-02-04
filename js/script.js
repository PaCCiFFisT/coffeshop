"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
; //burer animation

document.getElementById('burger__btn').onclick = function () {
  document.getElementById('burger__btn').classList.toggle('cross__btn');
  document.getElementById('burger__btn').classList.toggle('burger__menu-animation');
  document.getElementById('burger__list').classList.toggle('burger__menu-list');
  document.getElementById('burger__list').classList.toggle('show__burger');
}; //showing search btn


document.getElementById('search_activation').onclick = function () {
  document.getElementById('aside__search-field').classList.toggle('aside__search-field-hide');
  document.getElementById('aside__search-field').classList.toggle('aside__search-field');
  var x = document.getElementById('search_activation');

  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}; //adding "show more" btn to coffee__desc


$.expr[':'].truncated = function (obj) {
  var $this = $(obj);
  var $c = $this.clone().css({
    height: 'auto',
    visibility: 'hidden'
  }).appendTo('.coffe__desc');
  var c_height = $c.height();
  $c.remove();
  if (c_height > $this.height()) return true;else return false;
};

$(".coffe__desc:truncated").addClass("truncated"); //show desc after click on "show more"

document.getElementById('show__more-btn').onclick = function () {
  document.getElementById('popup__desc').classList.toggle('popup');
  document.getElementById('close__popup').classList.toggle('popup');
}; // debounce from underscore.js
//main slider


function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

; // use x and y mousewheel event data to navigate flickity

function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
  // do not trigger a slide change if another is being animated
  if (!slick_is_animating) {
    // pick the larger of the two delta magnitudes (x or y) to determine nav direction
    var direction = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

    if (direction > 0) {
      // next slide
      slick_instance.slick("slickNext");
    } else {
      // prev slide
      slick_instance.slick("slickPrev");
    }
  }
} // debounce the wheel event handling since trackpads can have a lot of inertia


var slick_handle_wheel_event_debounced = debounce(slick_handle_wheel_event, 100, true); // init slider 

var slick_2 = $(".slides");
slick_2.slick({
  dots: true,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
  asNavFor: '.dots__slider'
});
var slick_2_is_animating = false;
slick_2.on("afterChange", function (index) {
  console.log("Slide after change " + index);
  slick_2_is_animating = false;
});
slick_2.on("beforeChange", function (index) {
  console.log("Slide before change " + index);
  slick_2_is_animating = true;
});
slick_2.on("wheel", function (e) {
  slick_handle_wheel_event_debounced(e.originalEvent, slick_2, slick_2_is_animating);
}); //slider for navigatiion

$('.dots__slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  asNavFor: '.slides',
  centerMode: true,
  focusOnSelect: true,
  centerPadding: '60px',
  vertical: true,
  verticalSwiping: true
});