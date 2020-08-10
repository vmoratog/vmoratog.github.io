const container = document.querySelector('.carousel-container')
const animatable = container.querySelector('.myCarousel')
const leftButton = container.querySelector('.left')
const rightButton = container.querySelector('.right')
const title = container.querySelector('.label-item span')

animatable.options = {
  duration: 2000,
  fill: 'both', //none, forwards, backwards, both
  easing: 'ease-in-out-sine', // easing functions or custom function
  composite: 'replace', //replace, add, accumulate
  direction: 'normal', //normal, reverse, alternate, alternate-reverse
  iterations: 1, // Infinity
}

const delay = 2000
let currentDirection = 1
let counter = 0
let timer = 0
function playCarousel(direction = currentDirection) {
  clearTimeout(timer)
  let nextCounter = 0
  const cols = animatable.querySelectorAll(".row > .col")
  const totalItems = cols.length
  if (direction > 0) {
    nextCounter = counter + 1 >= totalItems ? 0 : counter + 1
  } else {
    nextCounter = counter < 1 ? totalItems - 1 : counter - 1
  }
  animatable.keyFrames = [
    {
      offset: 0,
      easing: 'ease-out',
      transform: `translateX(calc(-${counter}*100%))`
    },
    {
      offset: 1,
      easing: 'ease-out',
      transform: `translateX(calc(-${nextCounter}*100%))`
    }
  ]
  counter = nextCounter
  const currentLabel = cols[counter].querySelector('.label-carousel')
  title.innerHTML = currentLabel.innerHTML
}

animatable.addEventListener("finish", function () {
  timer = setTimeout(playCarousel, delay)
})

leftButton.addEventListener("click", function () {
  playCarousel(-1)
})
rightButton.addEventListener("click", function () {
  playCarousel(+1)
})

playCarousel()