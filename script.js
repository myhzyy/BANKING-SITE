"use strict";

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// const openModal = function (e) {
//   e.preventDefault();
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// btnsOpenModal.forEach(btn => addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

////////////////
/// BUTTON SCROLLING

btnScrollTo.addEventListener("click", function (e) {
  const s1coord = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. add event listener to common parent element
// 2. determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();

    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  /// Guard clause
  if (!clicked) return;

  // Remove active class
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  // Activate tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// // Sticky Navigation
// const intialCoords = section1.getBoundingClientRect();
// console.log(intialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if ((this.window.scrollY = intialCoords.top)) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/// ADDING STICKY NAVIGATION

/// getting the coordinates of section 1 and storing them in a const
/// adding event listener to the whole window with scroll,
/// this logs everytime we scroll and where we are on the page

/// if the y coordinates of the window, are = to the initialcoords.top
/// which is the section 1 coordinates.top,
/// then add a new classlist called sticky
/// if it's not this, then remove it
/// this makes it so the classlist is only on sticky when we are = to the class coords

/// STICKY NAV - INTERSECTION

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const mainHeader = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect();
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});

headerObserver.observe(mainHeader);

/// Reveal Sections

const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

/// LAZY LOADING IMAGES

const imgTarget = document.querySelectorAll("img[data-src]");
console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  /// Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

/// SLIDER

const sliders = function () {
  const slides = document.querySelectorAll(".slide");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  /// Functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  /// This is added so that when we load the page, it has a white button highlighted

  /// CREATING DOTS

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  /// NEXT SLIDE

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  /// adding the starting values in a function and calling it straight away
  /// the order is importan
  /// we want to create dots before we activate them

  /// event handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);

    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

sliders();
//////////////////////////////////
/// ADDING CURRENT PAGE DOT

///////////////////////////////////

console.log(document.documentElement);
/// highlights the entire html document
console.log(document.head);
/// just the head
console.log(document.body);
/// just the body

const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);
/// elementByTag name returns a HTML collection of which updates in real time,
/// unlike a Node list

console.log(document.getElementsByClassName("btn"));

/// Creating and inserting elements

// insertAdjacentHTML

const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button';

// header.prepend(message);

header.append(message);

// header.before(message);
// header.after(message);

/// Deleting an element

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// /// styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// /// these get added as inline styles, which are styles that we set here

// // console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// /// allows us to access the css styles

// /// changing CSS style directly
// console.log(getComputedStyle(message).height);

// const messageStyle = (message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px');

// console.log(messageStyle);

// /// storing the computed style in a variable, although you can also directly apply it
// /// message.style.height = getComputedStyle(message).height + 40 + px
// /// as the console log returns a string, we need to use Number Parse Float to take the
// /// number out of this string, the float part makes it a whole number, not a decimel
// /// the 10 is based 10, we always used this unless we're doing binary

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// /// one gets the actual URL and one points to the file

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// /// same with href

// /// Data attributes
// console.log(logo.dataset.versionNumber);
// /// start by adding "Data-", then add whatever we want
// /// camel case when calling in javascript
// /// this allows you to store data in the user interface

// /// Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();
// /// can pass multiple classes to these

// /// Don't use - this overrides all other classes, and will only allow 1 class element
// logo.className = 'Jonas';

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coord = section1.getBoundingClientRect();

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

/// easy way

// const h1 = document.querySelector('h1');

// const alerth1 = function (e) {
//   alert('addEventListener: Great! you are reading the heading :D');

//   h1.removeEventListener('mouseenter', alerth1);
// };

// h1.addEventListener('mouseenter', alerth1);

// settimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);

/// can remove event anywhere in the code, settimeout shows this

// h1.onmouseenter = function (e) {
//   alert('onMouseEnter: Great! you are reading the heading :D');
// };

/// RGB (255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// console.log(randomInt(2, 6));

/// const randomInt makes a random number between the 2 values we call it with
/// min number, max number
///   Math.random TIMES the number generated from max - min
/// + 1 is because it's between then number, so we add it so the 6 can be gotten
/// then + min to that

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// /// randomColor = a string which is rbg, with 3 random numbers called between
// /// 0 and 255

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('link');
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   /// stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log('link');
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     // console.log('link');
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

const h1 = document.querySelector("h1");

/// Going downwards; child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes); /// shows all the children elements
console.log(h1.children); /// works just for direct children
h1.firstElementChild.style.color = "white"; /// changes first elements color
h1.lastElementChild.style.color = "orangered"; /// changes last elements color

/// gets the children of the h1 elements

/// Going upwards: parents
console.log(h1.parentNode); /// shows h1 elements parent (node)
console.log(h1.parentElement); /// shows h1 elements parent

/// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
/// h1 does not not have a previousElement, so it returns as null
/// next element to h1 is h4 in the element tab

console.log(h1.previousSibling);
console.log(h1.nextSibling);
/// not really used ^

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
/// this takes the h1.parent.children element, and stores them in an array
/// we then loop over these. and check if each one of them is different to the h1
/// if it is different to the h1, then adding scale. 0.5

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

/// DOM CONTENT LOADED

/// script javascript is the last thing to load if it's placed at the bottom
/// as all the HTML previous is laoded first
/// in which case, we do NOT need to do DOMContentLoaded

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});
